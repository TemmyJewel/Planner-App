import { useState } from "react";
import AddTaskCategory from './AddTaskCategory';
import CategoryCard from "./CategoryCard";
import './TaskCategories.css'

function TaskCategories({taskCategories, setTaskCategories}) {
    const [formActive, setFormActive] = useState(false);
    const [categoryName, setCategoryName] = useState("");

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
                        formActive={formActive}
                        setFormActive={setFormActive}
                    />
            </div>
            <div className="task-categories">
                {/* Display all categories */}
                {taskCategories.map((taskCategory) => (
                    <CategoryCard
                        key={taskCategory.id}
                        taskCategory={taskCategory}
                        deleteCategory={deleteCategory}
                    />
                ))}
                
            </div>
        </div>
    );
}

export default TaskCategories;