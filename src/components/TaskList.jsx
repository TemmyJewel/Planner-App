import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import './TaskList.css';

function getTasksByStatus(taskCategories, status) {
    if (!Array.isArray(taskCategories)) {
        return [];
    }
    
    const today = dayjs().startOf('day');

    return taskCategories.flatMap((taskCategory) => {
        return taskCategory.tasks
            .filter(task => task.completed === false )
            .filter((t) => {
                const dueDate = dayjs(t.dateDue).startOf('day');

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
            .map((t) => ({
                ...t,
                category: taskCategory.name,
                categoryId: taskCategory.id
            }));
    });
}

function TaskList({ status, taskCategories }) {
    const tasks = getTasksByStatus(taskCategories, status);

    if (!tasks.length) return null;

    return (
        <div className={`task-list ${status}`}>
            {tasks.map((task) => (
                <Link to={`/tasks/category/${task.categoryId}`} key={task.id}>
                    <div className='task-item'>
                        <div className="section1">
                            <p className='task-name'>{task.name}</p>
                            <p className='cat-name'>
                                <strong>{task.category}</strong>
                            </p>
                        </div>
                        <p>{task.dateDue}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default TaskList;

