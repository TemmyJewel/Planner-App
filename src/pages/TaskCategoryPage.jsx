import { useParams } from "react-router-dom";
import { useState } from "react";
import dayjs from 'dayjs';
import './TaskCategoryPage.css';

// ================================
// HELPER FUNCTION: filter tasks by status
// ================================
function getTasksByStatus(taskCategory, status) {
    const today = dayjs().startOf('day');

    return taskCategory.tasks
        .filter((task) => {
            const dueDate = dayjs(task.dateDue).startOf('day');

            switch (status) {
                case "dueToday":
                    return dueDate.isSame(today);
                case "dueSoon":
                    return dueDate.diff(today, 'day') >= 1 && dueDate.diff(today, 'day') <= 3;

                case "overdue":
                    return dueDate.isBefore(today);
                default:
                    return false;
            }
        })
        .map((task) => ({
            ...task,
            category: taskCategory.name,
            categoryId: taskCategory.id,
            dueDate: task.dateDue,
            createdDate: task.dateCreated
        }));
}

// ================================
// TASK LIST COMPONENT (for one status)
// ================================
function TaskList({
    status,
    category,
    deletePopUp,
    deleteTask,
    deleteTaskId,
    setDeletePopUp
}) {

    const [showEditForm, setShowEditForm] = useState(false);
    const [editDetails, setEditDetails] = useState({
        name: "",
        dateDue: "",
        completed: false
    });
    // Get tasks filtered by status
    const tasks = getTasksByStatus(category, status);

    if (tasks.length === 0) return null;

    function handleEditForm(id) {
        setShowEditForm(false);
        // Update task logic here

    }

    return (
        <div className="task-category-tasks">
            {tasks.map(task => (
                <div key={task.id} className={`task-category-task-item ${status}`}>

                        <h4>{task.name}</h4>


                    {/* Task metadata */}
                    <div className="task-metadata">
                        <span>Created: {task.dateCreated}</span>
                        <span>Due: {task.dateDue}</span>
                    </div>

                    <form className={`edit-form ${showEditForm ? 'show' : ''}`} onSubmit={() => handleEditForm(task.id)}>
                        <input type="text" value={task.name} />
                        <input type="date" value={task.dateDue} />
                        <input type="checkbox" checked={task.completed} />
                        <button type="submit">Save</button>
                    </form>

                    {/* Edit & Delete buttons */}
                    <div className="task-category-span-icons">
                        <button className="edit-btn" onClick={() => setShowEditForm(true)}>
                            <span className="material-symbols-outlined edit-icon">edit</span>
                        </button>
                        <button className="delete-btn" onClick={() => setDeletePopUp(true)}>
                            <span className="material-symbols-outlined delete-icon">delete</span>
                        </button>

                        {/* Delete confirmation popup */}
                        {deletePopUp && deleteTaskId === task.id && (
                            <div className="delete-popup">
                                <p>Are you sure you want to delete this task?</p>
                                <button onClick={() => deleteTask(false)}>Yes</button>
                                <button onClick={() => setDeletePopUp(false, null)}>No</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ================================
// MAIN PAGE COMPONENT
// ================================
function TaskCategoryPage({ taskCategories, setTaskCategories }) {
    const { categoryId } = useParams();
    const category = taskCategories.find(cat => cat.id === Number(categoryId));

    // ================================
    // STATE
    // ================================
    const [editedTask, setEditedTask] = useState(null);
    const [deletePopUp, setDeletePopUpState] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState(null);
    const [showAddTask, setShowAddTask] = useState(false);
    const [newTask, setNewTask] = useState({
        name: "",
        dueDate: dayjs().add(1, 'day').format('YYYY-MM-DD')
    });
    // ================================
    // FUNCTIONS
    // ================================

    // start editing task/category
    function editTask(e, id) {
        e.preventDefault();
        setEditedTask(id);
    }

    // stop editing when pressing Enter
    function handleKeyDown(e) {
        if (e.key === 'Enter') setEditedTask(null);
    }

    // show delete popup
    function setDeletePopUp(show, id) {
        setDeletePopUpState(show);
        setDeleteTaskId(id);
    }

    // delete task or category
    function deleteTask(isCategory) {
        setDeletePopUpState(false);

        if (isCategory) {
            const updatedCategories = taskCategories.filter(cat => cat.id !== deleteTaskId);
            setTaskCategories(updatedCategories);
            window.history.back();
        } else {
            setTaskCategories(prev => prev.map(cat => {
                if (cat.id === category.id) {
                    const updatedTasks = cat.tasks.filter(task => task.id !== deleteTaskId);
                    return { ...cat, tasks: updatedTasks };
                }
                return cat;
            }));
        }
    }

    // update task/category name
    function updateTask(id, newName, isCategory) {
        if (isCategory) {
            setTaskCategories(prev => prev.map(cat => 
                cat.id === id ? { ...cat, name: newName } : cat
            ));
            return;
        }

        const taskIndex = category.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            setTaskCategories(prev => prev.map(cat => {
                if (cat.id === category.id) {
                    const updatedTasks = [...cat.tasks];
                    updatedTasks[taskIndex].name = newName;
                    return { ...cat, tasks: updatedTasks };
                }
                return cat;
            }));
        }
    }

    // add new task
    function handleAddTask() {
        setShowAddTask(prev => !prev);
        if (!newTask.name.trim()) return;
        const taskToAdd = {
            id: `${category.name.charAt(0).toLowerCase()}${Date.now()}`,
            name: newTask.name,
            dateCreated: dayjs().format('YYYY-MM-DD'),
            dateDue: newTask.dueDate
        }

        setTaskCategories(prev =>
            prev.map(cat =>
                cat.id === category.id
                    ? { ...cat, tasks: [...cat.tasks, taskToAdd] }
                    : cat
            )
        );

        setNewTask({
        name: "",
        dueDate: dayjs().add(1, 'day').format('YYYY-MM-DD')
    });
    }

    // ================================
    // RENDER
    // ================================
    if (!category) return <p>Category not found.</p>;

    return (
        <div className="task-category-detail">

            {/* Category Header */}
            <div className="task-category-header">
                <button className="back-btn">
                    <span className="material-symbols-outlined back-icon" onClick={() => window.history.back()}>arrow_back</span>
                </button>
                {editedTask === category.id ? (
                    <input
                        value={category?.name}
                        onChange={(e) => updateTask(category.id, e.target.value, true)}
                        onKeyDown={(e) => handleKeyDown(e)}
                        autoFocus
                        onBlur={() => setEditedTask(null)}
                    />
                ) : (
                    <h2>{category?.name}</h2>
                )}

                <div className="task-category-span-icons">
                    <button className="edit-btn" onClick={(e) => editTask(e, category.id)}>
                        <span className="material-symbols-outlined header-edit-icon">edit</span>
                    </button>
                    <button className="delete-btn" onClick={() => setDeletePopUp(true, category.id)}>
                        <span className="material-symbols-outlined header-delete-icon">delete</span>
                    </button>

                    {deletePopUp && deleteTaskId === category.id && (
                        <div className="delete-popup">
                            <p>Are you sure you want to delete this category?</p>
                            <button onClick={() => deleteTask(true)}>Yes</button>
                            <button onClick={() => setDeletePopUp(false, null)}>No</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Tasks Section */}
            <div className="task-category-tasks-header">
            <h2 className="task-category-h2">Tasks in this category:</h2>
            <div className="add-task-section">
                <input 
                    className={`add-task-input ${showAddTask ? 'show' : ''}`} 
                    type="text" 
                    value ={newTask.name}
                    placeholder="New task name"
                    onChange={(e) => setNewTask( prev => ({...prev, name: e.target.value}))}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {handleAddTask()};
                    }} 
                />
                <input type="date" 
                    className={`add-task-input ${showAddTask ? 'show' : ''}`}
                    onChange={(e) => setNewTask(prev => ({...prev, dueDate: e.target.value}))}
                    value={newTask.dueDate}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {handleAddTask()};
                    }}
                />
                <button className="add-task-btn" onClick={() => handleAddTask()}>Add Task</button>
            </div>
            </div>

            {category.tasks.length === 0 ? (
                <p>No tasks in this category.</p>
            ) : (
                <>
                    <TaskList
                        status="overdue"
                        category={category}
                        editTask={editTask}
                        updateTask={updateTask}
                        editedTask={editedTask}
                        setEditedTask={setEditedTask}
                        deletePopUp={deletePopUp}
                        deleteTask={deleteTask}
                        deleteTaskId={deleteTaskId}
                        setDeletePopUp={setDeletePopUp}
                        handleKeyDown={handleKeyDown}
                    />
                    <TaskList
                        status="dueToday"
                        category={category}
                        editTask={editTask}
                        updateTask={updateTask}
                        editedTask={editedTask}
                        setEditedTask={setEditedTask}
                        deletePopUp={deletePopUp}
                        deleteTask={deleteTask}
                        deleteTaskId={deleteTaskId}
                        setDeletePopUp={setDeletePopUp}
                        handleKeyDown={handleKeyDown}
                    />
                    <TaskList
                        status="dueSoon"
                        category={category}
                        editTask={editTask}
                        updateTask={updateTask}
                        editedTask={editedTask}
                        setEditedTask={setEditedTask}
                        deletePopUp={deletePopUp}
                        deleteTask={deleteTask}
                        deleteTaskId={deleteTaskId}
                        setDeletePopUp={setDeletePopUp}
                        handleKeyDown={handleKeyDown}
                    />
                </>
            )}
        </div>
    );
}

export default TaskCategoryPage;
