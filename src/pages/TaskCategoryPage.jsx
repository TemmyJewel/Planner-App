import { useParams } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import "./TaskCategoryPage.css";

// ================================
// HELPER FUNCTION: filter tasks by status
// ================================
function getTasksByStatus(taskCategory, status) {
  const today = dayjs().startOf("day");
  

  return taskCategory.tasks
    .filter((task) => {
      const dueDate = dayjs(task.dateDue).startOf("day");

      switch (status) {
        case "dueToday":
          return dueDate.isSame(today) && !task.completed;
        case "dueSoon":
          return (
            dueDate.diff(today, "day") >= 1 && dueDate.diff(today, "day") <= 3 && !task.completed
          );

        case "overdue":
          return dueDate.isBefore(today) && task.completed === false;
        
        case "completed":
          return task.completed === true;
        default:
          return false;
      }
    })
    .map((task) => ({
      ...task,
      category: taskCategory.name,
      categoryId: taskCategory.id,
      dueDate: task.dateDue,
      createdDate: task.dateCreated,
    }));
}

// ================================
// TASK LIST COMPONENT (for one status)
// ================================
function TaskList({
  status,
  category,
  editingTaskId,
  setEditingTaskId,
  deletePopUp,
  deleteTask,
  deleteTaskId,
  setDeletePopUp,
  setTaskCategories,
}) {

  const [editDetails, setEditDetails] = useState({
    name: "",
    dateDue: "",
    completed: false,
  });

  // Get tasks filtered by status
  const tasks = getTasksByStatus(category, status);

  if (tasks.length === 0) return null;

  function startEdit(task) {
    if (editingTaskId === task.id) {
      setEditingTaskId(null);
      return;
    }

    setEditingTaskId(task.id);
    setEditDetails({
      name: task.name,
      dateDue: task.dateDue,
      completed: task.completed,
    });
  }

  // Function to handle editing a task
  function saveEdit(categoryId, taskId) {
    setTaskCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              tasks: cat.tasks.map((t) =>
                t.id === taskId ? { ...t, ...editDetails } : t
              ),
            }
          : cat
      )
    );

    setEditingTaskId(null);
    // Update task logic here
  }

  return (
    <div className="task-category-tasks">
      {tasks.map((task) => (
        // Shows a task by status
        <div key={task.id} className={`task-category-task-item ${status}`}>
          <h4>{task.name}</h4>
          {/* Task metadata */}
          <div className="task-metadata">
            <span>Created: {task.dateCreated}</span>
            <span>Due: {task.dateDue}</span>
          </div>

          {/* Form for editing a task */}
          {editingTaskId === task.id && (
            <form
              className={"edit-form"}
              onSubmit={(e) => {
                e.preventDefault();
                saveEdit(category.id, task.id);
              }}
            >
              <input
                type="text"
                value={editDetails.name}
                onChange={(e) => {
                  setEditDetails((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
              <input
                type="date"
                value={editDetails.dateDue}
                onChange={(e) => {
                  setEditDetails((prev) => ({
                    ...prev,
                    dateDue: e.target.value,
                  }));
                }}
              />

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={editDetails.completed}
                  onChange={(e) => {
                    setEditDetails((prev) => ({
                      ...prev,
                      completed: e.target.checked,
                    }));
                  }}
                />
                <span className="checkmark"></span>
                Completed
              </label>

              <div className="edit-btns">
                <button type="submit" className="save">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setEditingTaskId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Edit & Delete buttons */}
          <div className="task-category-span-icons">
            <button className="edit-btn" onClick={() => startEdit(task)}>
              <span className="material-symbols-outlined edit-icon">edit</span>
            </button>
            <button className="delete-btn" onClick={() => setDeletePopUp(true, task.id)}>
              <span className="material-symbols-outlined delete-icon">
                delete
              </span>
            </button>

            {/* Delete confirmation popup */}
            {deletePopUp && deleteTaskId === task.id && (
              <div className="delete-popup">
                <p>Are you sure you want to delete this task?</p>
                <div className="delete-btns">
                  <button className="yes" onClick={() => deleteTask(false)}>Yes</button>
                <button className="no" onClick={() => setDeletePopUp(false, null)}>No</button>
                </div>
                
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
  const category = taskCategories.find((cat) => cat.id === Number(categoryId));

  // ================================
  // STATE
  // ================================
  const [editedCategory, setEditedCategory] = useState(null);
  const [deletePopUp, setDeletePopUpState] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    dueDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
  });

  // UseState for Task edit form
  const [editingTaskId, setEditingTaskId] = useState(null);

  
  // ================================
  // FUNCTIONS
  // ================================

  // start editing task/category
  function editCategory(e, id) {
    e.preventDefault();
    setEditedCategory(id);
  }

  // stop editing when pressing Enter
  function handleKeyDown(e) {
    if (e.key === "Enter") setEditedCategory(null);
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
      const updatedCategories = taskCategories.filter(
        (cat) => cat.id !== deleteTaskId
      );
      setTaskCategories(updatedCategories);
      window.history.back();
    } else {
      setTaskCategories((prev) =>
        prev.map((cat) => {
          if (cat.id === category.id) {
            const updatedTasks = cat.tasks.filter(
              (task) => task.id !== deleteTaskId
            );
            return { ...cat, tasks: updatedTasks };
          }
          return cat;
        })
      );
    }
  }

  // update task/category name
  function saveEditedTask(id, newName) {
    setTaskCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
    );
    return;
  }

  // add new task
  function handleAddTask() {
    setShowAddTask((prev) => !prev);
    if (!newTask.name.trim()) return;
    const taskToAdd = {
      id: `${category.name.charAt(0).toLowerCase()}${Date.now()}`,
      name: newTask.name,
      dateCreated: dayjs().format("YYYY-MM-DD"),
      dateDue: newTask.dueDate,
    };

    setTaskCategories((prev) =>
      prev.map((cat) =>
        cat.id === category.id
          ? { ...cat, tasks: [...cat.tasks, taskToAdd] }
          : cat
      )
    );

    setNewTask({
      name: "",
      dueDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
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
        <span
          className="material-symbols-outlined back-icon"
          onClick={() => window.history.back()}
        >
          arrow_back
        </span>
        {editedCategory === category.id ? (
          <input
            value={category?.name}
            onChange={(e) => saveEditedTask(category.id, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            autoFocus
            onBlur={() => setEditedCategory(null)}
          />
        ) : (
          <h2>{category?.name}</h2>
        )}

        <div className="task-category-span-icons">
          <button
            className="edit-btn"
            onClick={(e) => editCategory(e, category.id)}
          >
            <span className="material-symbols-outlined header-edit-icon">
              edit
            </span>
          </button>
          <button
            className="delete-btn"
            onClick={() => setDeletePopUp(true, category.id)}
          >
            <span className="material-symbols-outlined header-delete-icon">
              delete
            </span>
          </button>

          {deletePopUp && deleteTaskId === category.id && (
            <div className="delete-popup">
              <p>Are you sure you want to delete this category?</p>
              <div className="delete-btns">
                <button className="yes" onClick={() => deleteTask(true)}>Yes</button>
                <button className="no" onClick={() => setDeletePopUp(false, null)}>No</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tasks Section */}
      <div className="task-category-tasks-header">
        <h2 className="task-category-h2">Tasks in this category:</h2>
        <div className="add-task-section">
          <div className="add-task-inputs">
            <input
            className={`add-task-input ${showAddTask ? "show" : ""}`}
            type="text"
            value={newTask.name}
            placeholder="New task name"
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, name: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
          />
          <input
            type="date"
            className={`add-task-input ${showAddTask ? "show" : ""}`}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
            }
            value={newTask.dueDate}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
          />
          </div>
          <button className="add-task-btn" onClick={() => handleAddTask()}>
            Add Task
          </button>
        </div>
      </div>

      {category.tasks.length === 0 ? (
        <p>No tasks in this category.</p>
      ) : (
        <>
          <TaskList
            status="overdue"
            category={category}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
            deletePopUp={deletePopUp}
            deleteTask={deleteTask}
            deleteTaskId={deleteTaskId}
            setDeletePopUp={setDeletePopUp}
            setTaskCategories={setTaskCategories}
          />
          <TaskList
            status="dueToday"
            category={category}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
            deletePopUp={deletePopUp}
            deleteTask={deleteTask}
            deleteTaskId={deleteTaskId}
            setDeletePopUp={setDeletePopUp}
            setTaskCategories={setTaskCategories}
          />
          <TaskList
            status="dueSoon"
            category={category}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
            deletePopUp={deletePopUp}
            deleteTask={deleteTask}
            deleteTaskId={deleteTaskId}
            setDeletePopUp={setDeletePopUp}
            setTaskCategories={setTaskCategories}
          />
        </>
      )}

      <div className="completed-tasks-section">
        <h2>Completed Tasks</h2>
        <TaskList
            status="completed"
            category={category}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
            deletePopUp={deletePopUp}
            deleteTask={deleteTask}
            deleteTaskId={deleteTaskId}
            setDeletePopUp={setDeletePopUp}
            setTaskCategories={setTaskCategories}
          />
      </div>
    </div>
  );
}

export default TaskCategoryPage;
