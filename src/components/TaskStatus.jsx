import { useState } from 'react';
import TaskList from './TaskList';
import './TaskStatus.css';

function TaskStatus({ taskCategories }) {
    const [selectedStatus, setSelectedStatus] = useState('overdue');

    return (
        <div className="task-status">
            <h2>Tasks by Status</h2>
            {/* Task list by status */}
            <div className="due-task">
                <div className="btn">
                    <button 
                        className={`overdue ${selectedStatus === 'overdue' ? 'active' : ''}`}
                        onClick={() => setSelectedStatus('overdue')}
                        >Task OverDue</button>
                    <button className={`due-today ${selectedStatus === 'dueToday' ? 'active' : ''}`}
                        onClick={() => setSelectedStatus('dueToday')}
                        >Task Due Today</button>
                    <button className={`due-soon ${selectedStatus === 'dueSoon' ? 'active' : ''}`}
                        onClick={() => setSelectedStatus('dueSoon')}
                        >Task Due Soon</button>
                </div>

                <TaskList 
                    status={selectedStatus} 
                    taskCategories={taskCategories} 
                />
            </div>
        </div>
    );
}

export default TaskStatus;