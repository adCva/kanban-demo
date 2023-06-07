import React, { useState, useEffect } from 'react';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import EmptyBoard from './EmptyBoard';

function TasksList({darkTheme}) {
    const dispatch = useDispatch();

    // ===== Redux state.
    const activeBoardId = useSelector((state) => state.ux.activeBoardId);
    const board = useSelector((state) => state.data.boards.filter(board => board.board_id === activeBoardId)[0]);
    const tasks = useSelector((state) => state.data.tasks);

    // ===== Local state.
    const [areThereTasks, setAreThereTasks] = useState(false);
    const [isAccordionExpanded, setIsAccordionExpanded] = useState([]);

    const toggleAccordion = (status) => {
        if (isAccordionExpanded.includes(status)) {
            setIsAccordionExpanded(isAccordionExpanded.filter(element => element !== status));
        } else {
            setIsAccordionExpanded([...isAccordionExpanded, status]);
        }
    }

    useEffect(() => {
        setAreThereTasks(tasks.filter(task => task.task_parent_id === activeBoardId).length > 0);
    }, [activeBoardId])


    return (
        areThereTasks ? (
            <div className={darkTheme ? "tasks-wrapper" : "tasks-wrapper tasks-wrapper-light"} >
                <div className='tasks-container'>
                    {board.board_avaiableStatuses.map((status, i) => {
                        return (
                            <div className='task-group' key={i}>
                                <h1 className={`${status}-color status-title`} onClick={() => toggleAccordion(status)}>{status === "todo" ? "To Do" : status}</h1>
                                {isAccordionExpanded.includes(status) && tasks.map((task, j) => task.task_parent_id === activeBoardId && task.task_status === status ? (
                                    <div className='task-card' key={j}>
                                        <h1>{task.task_title}</h1>
                                        <p>{task.subtasks.filter(subtask => subtask.isComplete === true).length} out of {task.subtasks.length}</p>
                                    </div>
                                ) : null)}
                            </div>
                        )
                    })}
                    <button className='add-column-btn'>+ New Column</button>
                </div>
            </div>
        ) : (
            <EmptyBoard />
        )
    )
}

export default TasksList;