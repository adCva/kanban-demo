import React, { useState, useEffect } from 'react';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { openDetailsPop, openNewColumnPop } from "../../Redux/UX";
// ===== Components.
import EmptyBoard from './EmptyBoard';

function TasksList({darkTheme}) {
    const dispatch = useDispatch();

    // ===== Redux state.
    const activeBoardId = useSelector((state) => state.ux.activeBoardId);
    const board = useSelector((state) => state.data.boards.filter(board => board.board_id === activeBoardId)[0]);
    const tasks = useSelector((state) => state.data.tasks);

    // ===== Local state.
    const [isAccordionExpanded, setIsAccordionExpanded] = useState([]);

    // ===== Open/Close accordion.
    const toggleAccordion = (status) => {
        console.log(tasks);
        
        if (isAccordionExpanded.includes(status)) {
            setIsAccordionExpanded(isAccordionExpanded.filter(element => element !== status));
        } else {
            setIsAccordionExpanded([...isAccordionExpanded, status]);
        }
    };

    // ===== Open semi-interactive details pop-up component.
    const openDetails = (obj) => {
        dispatch(openDetailsPop({taskDetails: obj}));
    };


    useEffect(() => {
        setIsAccordionExpanded([]);
    }, [activeBoardId]);


    return (
        tasks.filter(task => task.task_parent_id === activeBoardId).length > 0 ? (
            <div className={darkTheme ? "tasks-wrapper" : "tasks-wrapper tasks-wrapper-light"} >
                <div className='tasks-container'>

                    {/* ===================== List of tasks ===================== */}
                    <div className='tasks-list'>
                        {board.board_avaiableStatuses.map((status, i) => {
                            return (
                                <div className='task-group' key={i} >
                                    <h1 className={`${status}-color status-title`} onClick={() => toggleAccordion(status)} >{status} ({tasks.reduce((count, task) => task.task_parent_id === activeBoardId && task.task_status === status ? count + 1 : count, 0)})</h1>
                                    {isAccordionExpanded.includes(status) && tasks.map((task, j) => task.task_parent_id === activeBoardId && task.task_status === status ? (
                                        <div className='task-card' key={j} onClick={() => openDetails(task)} >
                                            <h1>{task.task_title}</h1>
                                            <p>{task.subtasks.reduce((count, subtask) => subtask.isComplete ? count + 1 : count, 0)} out of {task.subtasks.length}</p>
                                        </div>
                                    ) : null)}
                                </div>
                            )
                        })}
                    </div>

                    {/* ===================== New Column Button ===================== */}
                    <button className='add-column-btn' onClick={() => dispatch(openNewColumnPop())} >+ New Column</button>

                </div>

            </div>
        ) : (
            <EmptyBoard />
        )
    )
}

export default TasksList;