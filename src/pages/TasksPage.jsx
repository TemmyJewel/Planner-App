// ================================================
// TASKS PAGE — CLEANED, FIXED, ORGANIZED + COMMENTED
// ================================================
// Comments written clearly in your style 👇
// (Simple, direct, easy to understand)

import dayjs from 'dayjs';
import './TasksPage.css';
import PageHeader from '../components/PageHeader';
import TaskHeader from "../assets/Task Header.png";
import { useState } from 'react';

// ================================================
// 📌 MAIN COMPONENT: TasksPage
// ================================================
function TasksPage() {
    return (
        <div className='task-page'>
            <PageHeader pageName="Your Tasks" pageImage={TaskHeader} />

            {/* Category section */}
            <TaskCategories />

            {/* Task list by status */}
            <div className="due-task">
                <TaskList status={'overdue'} title={'Tasks Overdue'} />
                <TaskList status={'dueToday'} title={'Tasks Due Today'} />
                <TaskList status={'dueSoon'} title={'Tasks Due Soon'} />
            </div>
        </div>
    );
}

// ================================================
// 📌 TASK DATA (inside component to allow updates)
// ================================================
function TaskCategories() {
    const [taskCategories, setTaskCategories] = useState(initialCategories);
    const [categoryName, setCategoryName] = useState("");
    const [categoryColor, setCategoryColor] = useState("#fdd0d2");

    return (
        <div className="task-categories">
            {/* Display all categories */}
            {taskCategories.map((taskCategory) => (
                <div key={taskCategory.id} className='task-category'>
                    <h3>{taskCategory.name}</h3>

                    {taskCategory.tasks.map((task) => (
                        <div key={task.id}>
                            <p>{task.name}</p>
                            <p>{task.dateDue}</p>
                        </div>
                    ))}
                </div>
            ))}

            {/* Button to open category form */}
            <button className='create-category-btn'>
                <span className="material-symbols-outlined">add_2</span>
            </button>

            {/* New Category Form */}
            <AddTaskCategory
                taskCategories={taskCategories}
                setTaskCategories={setTaskCategories}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                categoryColor={categoryColor}
                setCategoryColor={setCategoryColor}
            />
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
}) {
    function handleCreateNewCategory(e) {
        e.preventDefault();

        // generate new id
        const newID = crypto.randomUUID();

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
        <form className='add-task-form' onSubmit={handleCreateNewCategory}>
            {/* Category name input */}
            <input
                type="text"
                className='add-task-input'
                placeholder='Name your new category'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
            />

            {/* Color selector */}
            <select
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
            }));
    });
}

// ================================================
// 📌 TASK LIST SECTIONS (Overdue / Due Today / Due Soon)
// ================================================
function TaskList({ status, title }) {
    const tasks = getTasksByStatus(initialCategories, status);

    if (tasks.length === 0) return null;

    return (
        <div className={`task-list ${status}`}>
            <h2>{title}</h2>

            {tasks.map((task) => (
                <p key={task.id}>
                    <strong>{task.category}</strong> {task.name} — {task.dateDue}
                </p>
            ))}
        </div>
    );
}

// ================================================
// 📌 INITIAL CATEGORY DATA (kept clean + separate)
// ================================================
const initialCategories = [
    // --- CORE CATEGORIES (1-3) ---
    {
        id: 101,
        name: 'School',
        tasks: [
            { id: 's1', name: 'Submit final essay draft', dateCreated: '2025-12-01', dateDue: '2025-12-15' },
            { id: 's2', name: 'Study for history quiz', dateCreated: '2025-12-08', dateDue: '2025-12-11' }, // *** DUE TODAY ***
            { id: 's3', name: 'Review math homework', dateCreated: '2025-12-10', dateDue: '2025-12-11' },   // *** DUE TODAY ***
            { id: 's4', name: 'Email professor about extension', dateCreated: '2025-12-09', dateDue: '2025-12-10' }, // *** OVERDUE ***
            { id: 's5', name: 'Form study group for biology', dateCreated: '2025-12-05', dateDue: '2025-12-16' },
        ]
    },
    {
        id: 102,
        name: 'Work',
        tasks: [
            { id: 'w1', name: 'Review Q4 budget proposal', dateCreated: '2025-11-20', dateDue: '2025-12-31' },
            { id: 'w2', name: 'Schedule team kickoff meeting', dateCreated: '2025-12-09', dateDue: '2025-12-13' }, // *** DUE SOON (13th) ***
            { id: 'w3', name: 'Update client status report', dateCreated: '2025-12-10', dateDue: '2025-12-10' }, // *** OVERDUE ***
            { id: 'w4', name: 'Submit vacation request form', dateCreated: '2025-12-01', dateDue: '2025-12-15' },
            { id: 'w5', name: 'Prepare Q1 presentation slides', dateCreated: '2025-12-05', dateDue: '2026-01-05' },
        ]
    },
    {
        id: 103,
        name: 'Personal',
        tasks: [
            { id: 'p1', name: 'Call dentist for appointment', dateCreated: '2025-12-01', dateDue: '2025-12-24' },
            { id: 'p2', name: 'Buy groceries', dateCreated: '2025-12-09', dateDue: '2025-12-11' }, // *** DUE TODAY ***
            { id: 'p3', name: 'Renew library card', dateCreated: '2025-12-05', dateDue: '2025-12-18' },
            { id: 'p4', name: 'Book haircut', dateCreated: '2025-12-01', dateDue: '2025-12-15' },
            { id: 'p5', name: 'Organize junk drawer', dateCreated: '2025-12-10', dateDue: '2025-12-30' },
            { id: 'p6', name: 'Research new phone plans', dateCreated: '2025-11-28', dateDue: '2025-12-25' },
        ]
    },
    
    // --- HEALTH & HOME (4-7) ---
    {
        id: 104,
        name: 'Fitness',
        tasks: [
            { id: 'f4', name: 'Plan next week\'s workouts', dateCreated: '2025-12-08', dateDue: '2025-12-15' },
            { id: 'f5', name: 'Go for a morning run', dateCreated: '2025-12-10', dateDue: '2025-12-11' }, // *** DUE TODAY ***
            { id: 'f6', name: 'Buy new gym shoes', dateCreated: '2025-12-03', dateDue: '2025-12-20' },
            { id: 'f7', name: 'Measure and track progress', dateCreated: '2025-12-01', dateDue: '2025-12-31' },
            { id: 'f8', name: 'Stretch for 15 minutes', dateCreated: '2025-12-10', dateDue: '2025-12-10' }, // *** OVERDUE ***
        ]
    },
    {
        id: 105,
        name: 'Financial',
        tasks: [
            { id: 'fn5', name: 'Pay rent/mortgage', dateCreated: '2025-12-01', dateDue: '2025-12-01' }, // *** OVERDUE ***
            { id: 'fn6', name: 'Review utility bills', dateCreated: '2025-12-10', dateDue: '2025-12-17' },
            { id: 'fn7', name: 'Transfer money to savings', dateCreated: '2025-12-05', dateDue: '2025-12-31' },
            { id: 'fn8', name: 'Set up automatic bill payments', dateCreated: '2025-12-08', dateDue: '2025-12-15' },
            { id: 'fn9', name: 'Check credit score', dateCreated: '2025-11-25', dateDue: '2025-12-25' },
        ]
    },
    {
        id: 106,
        name: 'Home Chores',
        tasks: [
            { id: 'h6', name: 'Clean kitchen countertops', dateCreated: '2025-12-10', dateDue: '2025-12-10' }, // *** OVERDUE ***
            { id: 'h7', name: 'Laundry day', dateCreated: '2025-12-09', dateDue: '2025-12-11' }, // *** DUE TODAY ***
            { id: 'h8', name: 'Mow the lawn', dateCreated: '2025-12-05', dateDue: '2025-12-14' }, // *** DUE SOON (14th) ***
            { id: 'h9', name: 'Change bed sheets', dateCreated: '2025-12-05', dateDue: '2025-12-12' }, // *** DUE SOON (12th) ***
            { id: 'h10', name: 'Take garbage bins out', dateCreated: '2025-12-10', dateDue: '2025-12-11' }, // *** DUE TODAY ***
        ]
    },
    {
        id: 107,
        name: 'Health',
        tasks: [
            { id: 'hl7', name: 'Schedule annual physical', dateCreated: '2025-11-15', dateDue: '2025-12-30' },
            { id: 'hl8', name: 'Refill prescription', dateCreated: '2025-12-08', dateDue: '2025-12-12' }, // *** DUE SOON (12th) ***
            { id: 'hl9', name: 'Log dinner calories', dateCreated: '2025-12-10', dateDue: '2025-12-10' } // *** OVERDUE ***
        ]
    },
    
    // --- HOBBIES & CREATIVE (8-11) ---
    {
        id: 108,
        name: 'Hobby',
        tasks: [
            { id: 'hb8', name: 'Work on coding project', dateCreated: '2025-12-01', dateDue: '2025-12-25' },
            { id: 'hb9', name: 'Practice guitar scales', dateCreated: '2025-12-05', dateDue: '2025-12-11' }, // *** DUE TODAY ***
            { id: 'hb10', name: 'Buy new yarn for knitting', dateCreated: '2025-12-10', dateDue: '2025-12-12' } // *** DUE SOON (12th) ***
        ]
    },
    {
        id: 109,
        name: 'Reading',
        tasks: [
            { id: 'r9', name: 'Finish "Dune"', dateCreated: '2025-12-01', dateDue: '2025-12-20' },
            { id: 'r10', name: 'Read article on AI ethics', dateCreated: '2025-12-07', dateDue: '2025-12-14' }, // *** DUE SOON (14th) ***
            { id: 'r11', name: 'Annotate Chapter 3', dateCreated: '2025-12-10', dateDue: '2025-12-12' } // *** DUE SOON (12th) ***
        ]
    },
    {
        id: 110,
        name: 'Travel',
        tasks: [
            { id: 't10', name: 'Book flight tickets for holiday', dateCreated: '2025-11-01', dateDue: '2025-12-15' },
            { id: 't11', name: 'Pack essentials bag', dateCreated: '2025-12-09', dateDue: '2025-12-28' },
            { id: 't12', name: 'Confirm hotel reservation', dateCreated: '2025-12-05', dateDue: '2025-12-20' }
        ]
    },
    {
        id: 111,
        name: 'Social',
        tasks: [
            { id: 'sc11', name: 'Call Mom', dateCreated: '2025-12-01', dateDue: '2025-12-15' },
            { id: 'sc12', name: 'Plan dinner with friends', dateCreated: '2025-12-05', dateDue: '2025-12-14' }, // *** DUE SOON (14th) ***
            { id: 'sc13', name: 'Send birthday card to Alex', dateCreated: '2025-12-10', dateDue: '2025-12-12' } // *** DUE SOON (12th) ***
        ]
    },
    
    // --- MISCELLANEOUS (12-15) ---
    {
        id: 112,
        name: 'Admin',
        tasks: [
            { id: 'ad12', name: 'Sort and file receipts', dateCreated: '2025-12-01', dateDue: '2025-12-31' },
            { id: 'ad13', name: 'Empty old email folders', dateCreated: '2025-12-08', dateDue: '2025-12-15' },
            { id: 'ad14', name: 'Update passwords in manager', dateCreated: '2025-12-10', dateDue: '2025-12-17' }
        ]
    },
    {
        id: 113,
        name: 'Learning',
        tasks: [
            { id: 'lr13', name: 'Complete React course module 3', dateCreated: '2025-12-05', dateDue: '2025-12-19' },
            { id: 'lr14', name: 'Watch CSS tutorial', dateCreated: '2025-12-10', dateDue: '2025-12-11' }, // *** DUE TODAY ***
            { id: 'lr15', name: 'Find resource on API security', dateCreated: '2025-12-03', dateDue: '2025-12-14' } // *** DUE SOON (14th) ***
        ]
    },
    {
        id: 114,
        name: 'Reminders',
        tasks: [
            { id: 'rm14', name: 'Water the plants', dateCreated: '2025-12-09', dateDue: '2025-12-12' }, // *** DUE SOON (12th) ***
            { id: 'rm15', name: 'Charge laptop battery', dateCreated: '2025-12-10', dateDue: '2025-12-10' }, // *** OVERDUE ***
            { id: 'rm16', name: 'Take out the trash', dateCreated: '2025-12-05', dateDue: '2025-12-11' } // *** DUE TODAY ***
        ]
    },
    {
        id: 115,
        name: 'Shopping',
        tasks: [
            { id: 'sh15', name: 'Order headphones', dateCreated: '2025-12-01', dateDue: '2025-12-15' },
            { id: 'sh16', name: 'Return library books', dateCreated: '2025-12-09', dateDue: '2025-12-12' }, // *** DUE SOON (12th) ***
            { id: 'sh17', name: 'Buy birthday gift for friend', dateCreated: '2025-12-05', dateDue: '2025-12-25' }
        ]
    }
];

export default TasksPage;
