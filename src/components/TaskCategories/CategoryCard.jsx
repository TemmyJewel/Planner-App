import { Link } from 'react-router-dom';
import './CategoryCard.css';

function CategoryCard({ taskCategory, deleteCategory}) {
    return (
        <Link to={`/tasks/category/${taskCategory.id}`} key={taskCategory.id}>
            <div  className='task-category'>
                <h3>{taskCategory.name}</h3>

                {taskCategory.tasks.slice(0, 3).map((task) => (
                    <p key={task.id}>{task.name}</p>
                ))}

                <button className="delete-category-btn" onClick={(e) => {
                    e.preventDefault();   
                    e.stopPropagation();
                    deleteCategory(taskCategory.id);
                }}
                >
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
        </Link>
    );
}

export default CategoryCard;