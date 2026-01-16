import { Link } from 'react-router-dom';
import '../../Tasks/TaskCategories/CategoryCard.css'

function NoteCategoryCard({ noteCategory, deleteCategory}) {
    return (
        <Link to={`/notes/category/${noteCategory.id}`} key={noteCategory.id}>
            <div  className='task-category'>
                <h3>{noteCategory.name}</h3>

                {noteCategory.notes.slice(0, 3).map((note) => (
                    <p key={note.id}>{note.title}</p>
                ))}

                <button className="delete-category-btn" onClick={(e) => {
                    e.preventDefault();   
                    e.stopPropagation();
                    deleteCategory(noteCategory.id);
                }}
                >
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
        </Link>
    );
}

export default NoteCategoryCard;