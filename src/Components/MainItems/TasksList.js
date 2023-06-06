import React, { useState, useEffect } from 'react';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import EmptyBoard from './EmptyBoard';

function TasksList({darkTheme}) {
    const dispatch = useDispatch();

    // ===== Redux state.
    const activeBoardId = useSelector((state) => state.ux.activeBoardId);
    const tasks = useSelector((state) => state.data.tasks);

    // ===== Local state.
    const [areThereTasks, setAreThereTasks] = useState(false);

    useEffect(() => {
        setAreThereTasks(tasks.filter(task => task.task_parent_id === activeBoardId).length > 0);
    }, [activeBoardId])

    return (
        areThereTasks ? (
            <div className={darkTheme ? "tasks-wrapper" : "tasks-wrapper tasks-wrapper-light"} >
                <div className='tasks-container'>
                    {tasks.map((task, i) => task.task_parent_id === activeBoardId ? (
                        <div className='tasks-group'>
                            <h1>{task.task_status}</h1>
                            <div className='task-card'>
                                <h1>{task.task_title}</h1>
                                <p>{task.subtasks.filter(subtask => subtask.isComplete === true).length} out of {task.subtasks.length}</p>
                            </div>
                        </div>
                    ) : null)}
                    <button className='add-column-btn'>+ New Column</button>
                </div>
            </div>
        ) : (
            <EmptyBoard />
        )
    )
}

export default TasksList;