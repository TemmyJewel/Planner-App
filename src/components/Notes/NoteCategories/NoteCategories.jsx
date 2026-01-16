import { useState } from "react";
import AddNoteCategory from './AddNoteCategory';
import NoteCategoryCard from "./NoteCategoryCard";
import '../../Tasks/TaskCategories/TaskCategories.css'

function NoteCategories({noteCategories, setNoteCategories}) {
    const [formActive, setFormActive] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    function deleteCategory(categoryId) {
        const updatedCategories = noteCategories.filter(
            (category) => category.id !== categoryId
        );
        setNoteCategories(updatedCategories);
    }

    return (
        <div className="task-categories-section">
            <div className="task-categories-header">
                <h2>Notes Categories</h2>
                {/* Button to open category form */}
                    <button className='create-category-btn' onClick={() => setFormActive(true)}>
                        Add Category
                    </button>
                {/* Category creation form */}
                    <AddNoteCategory
                        noteCategories={noteCategories}
                        setNoteCategories={setNoteCategories}
                        categoryName={categoryName}
                        setCategoryName={setCategoryName}
                        formActive={formActive}
                        setFormActive={setFormActive}
                    />
            </div>
            <div className="task-categories">
                {/* Display all categories */}
                {noteCategories.map((noteCategory) => (
                    <NoteCategoryCard
                        key={noteCategory.id}
                        noteCategory={noteCategory}
                        deleteCategory={deleteCategory}
                    />
                ))}
                
            </div>
        </div>
    );
}

export default NoteCategories;