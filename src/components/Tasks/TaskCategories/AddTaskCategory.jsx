import { useEffect, useRef } from "react";
import './AddTaskCategory.css';

function AddTaskCategory({
    taskCategories,
    setTaskCategories,
    categoryName,
    setCategoryName,
    formActive,
    setFormActive
}) {

    // Ref that points to add task form
    const formRef = useRef();

    useEffect(() => {
        // Click outside form to close it
        function handleClickOutside(event) {
            if (
                formActive && 
                formRef.current && 
                !formRef.current.contains(event.target)
            ) {
                setFormActive(false);
            }
        }
            
        document.addEventListener("mousedown", handleClickOutside);
        return () => 
            document.removeEventListener("mousedown", handleClickOutside);
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
            tasks: []
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
            <button type='submit'>Create</button>
        </form>
    );
}

export default AddTaskCategory;