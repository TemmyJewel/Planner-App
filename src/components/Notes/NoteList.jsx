import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import '../Tasks/TaskList.css';
import './NoteList.css';

function NoteList({ noteCategories }) {
    const notes = noteCategories.flatMap((noteCat) => {
        return noteCat.notes
            .sort((a, b) => dayjs(b.dateUpdated).diff(a.dateUpdated))
            .map((n)=>({
                ...n,
                category: noteCat.name,
                categoryId: noteCat.id
            }));
    });


    return (
        <div className="recent-notes">
            <h2>Recent Notes</h2>
            <div className={`note-list`}>
                {notes.slice(0,5).map((note) => (
                    <Link to={`/notes/category/${note.categoryId}`} key={note.id}>
                        <div className='note-item'>
                            <div className="section2">
                                <p className='note-date'>{note.dateUpdated}</p>
                                <p className='cat-name'>
                                    <strong>{note.category}</strong>
                                </p>
                            </div>
                            <p className='note-name'>{note.title}</p>
                            <hr />
                            <p>{note.content}</p>
                            
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        
    );
}

export default NoteList;

// import { useState } from "react";
// import TaskList from "./TaskList";
// import "./TaskStatus.css";

// function TaskStatus({ taskCategories }) {
//   const [selectedStatus, setSelectedStatus] = useState("overdue");

//   return (
//     <div className="task-status">
      

//         <TaskList status={selectedStatus} taskCategories={taskCategories} />
//       </div>
//     </div>
//   );
// }

// export default TaskStatus;

