// ================================================
// TASKS PAGE — CLEANED, FIXED, ORGANIZED + COMMENTED
// ================================================
// Comments written clearly in your style 👇
// (Simple, direct, easy to understand)

import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import './TasksPage.css';
import PageHeader from '../components/PageHeader';
import TaskHeader from "../assets/Task Header.png";
import { useState, useRef, useEffect } from 'react';

// ================================================
// 📌 MAIN COMPONENT: TasksPage
// ================================================
function TasksPage({taskCategories, setTaskCategories}) {
    
    const [selectedStatus, setSelectedStatus] = useState('overdue');

    function handleStatusClick(status) {
        setSelectedStatus(status);

    }

    return (
        <div className='task-page'>
            <PageHeader pageName="Your Tasks" pageImage={TaskHeader} />


            {/* Category section */}
            <TaskCategories 
            taskCategories = {taskCategories}
            setTaskCategories = {setTaskCategories}/>

            <div className="task-status">
                <h2>Tasks by Status</h2>
                {/* Task list by status */}
                <div className="due-task">
                    <div className="btn">
                        <button 
                            className={`overdue ${selectedStatus === 'overdue' ? 'active' : ''}`}
                            onClick={() => handleStatusClick('overdue')}
                            >Task OverDue</button>
                        <button className={`due-today ${selectedStatus === 'dueToday' ? 'active' : ''}`}
                            onClick={() => handleStatusClick('dueToday')}
                            >Task Due Today</button>
                        <button className={`due-soon ${selectedStatus === 'dueSoon' ? 'active' : ''}`}
                            onClick={() => handleStatusClick('dueSoon')}
                            >Task Due Soon</button>
                    </div>

                    <TaskList 
                        status={selectedStatus} 
                        taskCategories={taskCategories} 
                    />
                    
            
                </div>
            </div>
        </div>   
    );
}


// ================================================
// 📌 TASK DATA (inside component to allow updates)
// ================================================
function TaskCategories({taskCategories, setTaskCategories}) {
    const [formActive, setFormActive] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryColor, setCategoryColor] = useState("#fdd0d2");

    function deleteCategory(categoryId) {
        const updatedCategories = taskCategories.filter(
            (category) => category.id !== categoryId
        );
        setTaskCategories(updatedCategories);
    }

    return (
        <div className="task-categories-section">
            <div className="task-categories-header">
                <h2>Task Categories</h2>
                {/* Button to open category form */}
                    <button className='create-category-btn' onClick={() => setFormActive(true)}>
                        Add Category
                    </button>
                {/* Category creation form */}
                    <AddTaskCategory
                        taskCategories={taskCategories}
                        setTaskCategories={setTaskCategories}
                        categoryName={categoryName}
                        setCategoryName={setCategoryName}
                        categoryColor={categoryColor}
                        setCategoryColor={setCategoryColor}
                        formActive={formActive}
                        setFormActive={setFormActive}
                    />
            </div>
            <div className="task-categories">
                {/* Display all categories */}
                {taskCategories.map((taskCategory) => (
                    <Link to={`/tasks/category/${taskCategory.id}`} key={taskCategory.id}>
                    <div  className='task-category'>
                        <h3>{taskCategory.name}</h3>

                        {taskCategory.tasks.slice(0, 3).map((task) => (
                                <p key={task.id}>{task.name}</p>
                        ))}

                        <button className="delete-category-btn" onClick={(e) => {
                            e.preventDefault();   
                            e.stopPropagation();
                            deleteCategory(taskCategory.id)}}>
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                    </div>
                    </Link>
                ))}
                
            </div>
        </div>
    );
}

// ================================================
// 📌 CATEGORY CREATION FORM
// ================================================
function AddTaskCategory({
    taskCategories,
    setTaskCategories,
    categoryName,
    setCategoryName,
    categoryColor,
    setCategoryColor,
    formActive,
    setFormActive
}) {

    // Ref that points to add task form
    const formRef = useRef();

    useEffect(() => {
        // Click outside form to close it
        function handleClickOutside(event) {
            if (formActive && formRef.current && !formRef.current.contains(event.target)) {
                setFormActive(false);
            }
        }
            document.addEventListener("mousedown", handleClickOutside);

            return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [formActive, setFormActive]);


    // Create new category handler
    function handleCreateNewCategory(e) {
        e.preventDefault();
        setFormActive(false);

        // generate new id
        const lastCategory = taskCategories[taskCategories.length - 1];
        const newID = lastCategory ? lastCategory.id + 1 : 1;

        // New category format
        const newCategory = {
            id: newID,
            name: categoryName,
            tasks: [],
            color: categoryColor,
        };

        // Update list
        setTaskCategories([...taskCategories, newCategory]);
        setCategoryName(""); // clear input
    }

    return (
        <form 
            ref={formRef}
            className={`add-task-form ${formActive ? 'active' : ''}`} 
            onSubmit={handleCreateNewCategory}
        >
            {/* Category name input */}
            <input
                name='taskCategory'
                type="text"
                className='add-task-input'
                placeholder='Name your new category'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
            />

            {/* Color selector */}
            <select
                name='chooseColor'
                className='chose-color'
                value={categoryColor}
                onChange={(e) => setCategoryColor(e.target.value)}
            >
                <option value="#ffecd9">Pale Peach</option>
                <option value="#e9d9ff">Soft Lilac</option>
                <option value="#d2fde8">Mint</option>
                <option value="#dcebe4">Soft Sage</option>
                <option value="#d2c3c1">Muted Clay</option>
                <option value="#d7d1c6">Light Taupe</option>
                <option value="#ede8d0">Light Khaki</option>
            </select>

            <button type='submit'>Create</button>
        </form>
    );
}

// ================================================
// 📌 FILTERING TASKS (due today, overdue, due soon)
// ================================================
function getTasksByStatus(taskCategories, status) {
    const today = dayjs().startOf('day');

    return taskCategories.flatMap((taskCategory) => {
        return taskCategory.tasks
            .filter((task) => {
                const dueDate = dayjs(task.dateDue).startOf('day');

                switch (status) {
                    case "dueToday":
                        return dueDate.isSame(today);
                    case "dueSoon":
                        return dueDate.diff(today, 'day') >= 0 && dueDate.diff(today, 'day') <= 3;
                    case "overdue":
                        return dueDate.isBefore(today);
                    default:
                        return false;
                }
            })
            .map((task) => ({
                ...task,
                category: taskCategory.name,
                categoryId: taskCategory.id
            }));
    });
}

// ================================================
// 📌 TASK LIST SECTIONS (Overdue / Due Today / Due Soon)
// ================================================
function TaskList({ status, taskCategories }) {
    const tasks = getTasksByStatus(taskCategories, status);

    if (tasks.length === 0) return null;

    return (
        <div className={`task-list ${status}`}>
            {tasks.map((task) => (
                <Link to={`/tasks/category/${task.categoryId}`} key={task.id}>
                    <div className='task-item'>
                        <div className="section1">
                            <p className='task-name'>{task.name}</p>
                            <p className='cat-name'><strong>{task.category}</strong></p>
                        </div>
                        <p>{task.dateDue}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}



export default TasksPage;
