import { useParams } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import "./NoteCategoryPage.css";

    // ================================
    // TASK LIST COMPONENT (for one status)
    // ================================
    function NoteList({
    category,
    editingNoteId,
    setEditingNoteId,
    deletePopUp,
    deleteNote,
    deleteNoteId,
    setDeletePopUp,
    setNoteCategories,
    }) {

    const [editDetails, setEditDetails] = useState({
        title: "",
        content: "",
        dateUpdated: ""
    });

    // Get tasks filtered by status
    const notes = category.notes;

    if (notes.length === 0) return null;

    function startEdit(note) {
        if (editingNoteId === note.id) {
        setEditingNoteId(null);
        return;
        }

        setEditingNoteId(note.id);
        setEditDetails({
        title: note.title,
        content: note.content,
        dateUpdated: dayjs().format('YYYY-MM-DD')

        });
    }

    // Function to handle editing a task
    function saveEdit(categoryId, noteId) {
        setNoteCategories((prev) =>
        prev.map((cat) =>
            cat.id === categoryId
            ? {
                ...cat,
                notes: cat.notes.map((n) =>
                    n.id === noteId ? { ...n, ...editDetails} : n
                ),
                }
            : cat
        )
        );

        setEditingNoteId(null);
        // Update task logic here
    }

    return (
        <div className="note-list">
        {notes.map((note) => (
                        <div className='note-item'>
                            <div className="section2">
                                <p className='note-date'>{note.dateUpdated}</p>
                                    {/* Edit & Delete buttons */}
                                        <div className="task-category-span-icons">
                                            <button className="edit-btn" onClick={() => startEdit(note)}>
                                                <span className="material-symbols-outlined edit-icon">edit</span>
                                            </button>
                                            <button className="delete-btn" onClick={() => setDeletePopUp(true, note.id)}>
                                                <span className="material-symbols-outlined delete-icon">
                                                    delete
                                                </span>
                                            </button>

                                    {/* Delete confirmation popup */}
                                    {deletePopUp && deleteNoteId === note.id && (
                                    <div className="delete-popup">
                                        <p>Are you sure you want to delete this task?</p>
                                        <div className="delete-btns">
                                            <button className="yes" onClick={() => deleteNote(false)}>Yes</button>
                                            <button className="no" onClick={() => setDeletePopUp(false, null)}>No</button>
                                        </div>
                                        
                                    </div>
                                    )}
                                </div> 
                            </div>
                            {editingNoteId === note.id ? (
                                <div>
                                    <input 
                                        className='note-name'
                                        type="text" 
                                        value={editDetails.title} 
                                        onChange={(e) => 
                                            setEditDetails((prev) => ({ ...prev, title: e.target.value }))}
                                    />
                                    <hr/>
                                    <textarea
                                        className={`note-textarea ${editingNoteId === note.id ? "active" : ""}`}
                                        value={editDetails.content}
                                        onChange={(e) =>   
                                            setEditDetails((prev) => ({ ...prev, content: e.target.value }))}
                                    /> 
                                    <div className="edit-btns">
                                        <button 
                                        type="submit" 
                                        className="save"
                                        onClick={() => saveEdit(category.id, note.id)}>
                                            Save
                                        </button>
                                        <button
                                        type="button"
                                        className="cancel"
                                        onClick={() => setEditingNoteId(null)}
                                        >
                                        Cancel
                                        </button>
                                    </div>
                                </div>
                            )
                            : 
                            <div>
                                <p className='note-name'>{note.title}</p>
                                <hr />
                                <p>{note.content}</p>
                            </div>
                            } 
                        </div>
                ))}
        </div>
    );
    }

    // ================================
    // MAIN PAGE COMPONENT
    // ================================
    function NoteCategoryPage({ noteCategories, setNoteCategories }) {
    const { categoryId } = useParams();
    const category = noteCategories.find((cat) => cat.id === Number(categoryId));

    // ================================
    // STATE
    // ================================
    const [editedCategory, setEditedCategory] = useState(null);
    const [deletePopUp, setDeletePopUpState] = useState(false);
    const [deleteNoteId, setDeleteNoteId] = useState(null);
    const [showAddNote, setShowAddNote] = useState(false);
    const [newNote, setNewNote] = useState({
        title: "",
        dueUpdated: ""
    });

    // UseState for Task edit form
    const [editingNoteId, setEditingNoteId] = useState(null);

    
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
        setDeleteNoteId(id);
    }

    // delete task or category
    function deleteNote(isCategory) {
        setDeletePopUpState(false);

        if (isCategory) {
        const updatedCategories = noteCategories.filter(
            (cat) => cat.id !== deleteNoteId
        );
        setNoteCategories(updatedCategories);
        window.history.back();
        } else {
        setNoteCategories((prev) =>
            prev.map((cat) => {
            if (cat.id === category.id) {
                const updatedNotes = cat.notes.filter(
                (note) => note.id !== deleteNoteId
                );
                return { ...cat, notes: updatedNotes };
            }
            return cat;
            })
        );
        }
    }

    // update category name
    function saveEditedNote(id, newName) {
        setNoteCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
        );
        return;
    }

    // add new note
    function handleAddNote() {
        setShowAddNote((prev) => !prev);
        if (!newNote.title.trim()) return;
        const noteToAdd = {
        id: `${category.name.charAt(0).toLowerCase()}${Date.now()}`,
        title: newNote.title,
        dueUpdated: dayjs().format('YYYY-MM-DD'),
        content: ""
        };

        setNoteCategories((prev) =>
        prev.map((cat) =>
            cat.id === category.id
            ? { ...cat, notes: [...cat.notes, noteToAdd] }
            : cat
        )
        );

        setNewNote({
        title: "",
        dueDate: ""
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
                onChange={(e) => saveEditedNote(category.id, e.target.value)}
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

            {deletePopUp && deleteNoteId === category.id && (
                <div className="delete-popup">
                <p>Are you sure you want to delete this category?</p>
                <div className="delete-btns">
                    <button className="yes" onClick={() => deleteNote(true)}>Yes</button>
                    <button className="no" onClick={() => setDeletePopUp(false, null)}>No</button>
                </div>
                </div>
            )}
            </div>
        </div>

        {/* Notes Section */}
        <div className="task-category-tasks-header">
            <h2 className="task-category-h2">Notes in this category:</h2>
            <div className="add-task-section">
                <input
                className={`add-task-input ${showAddNote ? "show" : ""}`}
                type="text"
                value={newNote.name}
                placeholder="New task name"
                onChange={(e) =>
                setNewNote((prev) => ({ ...prev, title: e.target.value }))
                }
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleAddNote();
                }
                }}
            />
            <button className="add-task-btn" onClick={() => handleAddNote()}>
                Add Note
            </button>
            </div>
        </div>

        {category.notes.length === 0 ? (
            <p>No notes in this category.</p>
        ) : (

            <NoteList
                category={category}
                editingNoteId={editingNoteId}
                setEditingNoteId={setEditingNoteId}
                deletePopUp={deletePopUp}
                deleteNote={deleteNote}
                deleteNoteId={deleteNoteId}
                setDeletePopUp={setDeletePopUp}
                setNoteCategories={setNoteCategories}
            />
          
        )}

       
        </div>
    );
}

export default NoteCategoryPage;
