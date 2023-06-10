import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { toggleDetailsPop, updateDetailsForView, closeDetailsPop } from "../../Redux/UX";
import { updateSubtasks, updateTaskStatus } from "../../Redux/data";
// ===== React Icons.
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { BiEdit } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";


function TaskDetails({darkTheme, details}) {
    const dispatch = useDispatch();

    // ===== Redux state.
    const activeBoardId = useSelector((state) => state.ux.activeBoardId);
    const isDetailsPopOpen = useSelector((state) => state.ux.isDetailsPopOpen);
    const getTaskDetails = useSelector((state) => state.ux.getDetailsForTask);
    const boards = useSelector((state) => state.data.boards.filter(el => el.board_id === activeBoardId)[0]);

    // ===== Local state.
    const [isDropdown, setIsDropdown] = useState(false);
    const [subtasks, setSubtasks] = useState(details.subtasks);
    const [status, setStatus] = useState(details.task_status);

    // ===== Ref.
    const dropdownRef = useRef(null);

    // ===== React Spring Transition.
    const transition = useTransition(isDetailsPopOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    // ===== Close component outside click.
    const closeTaskDetailPop = (event) => {
        if (!isDropdown) {
            if (isDetailsPopOpen && event.target.className === "task-details-wrapper") {
                dispatch(closeDetailsPop());
                dispatch(updateTaskStatus({thisTaskId: details.task_id, newStatus: getTaskDetails.task_status}));
            }
        }
    };

    // ===== Close dropdown.
    const closeDropdownOutsideClick = (event) => {
        if (isDropdown) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdown(false);

            }
        }
    };

    // Handle checkbox.
    const handleCheckbox = (id) => {
        const updatedArray = getTaskDetails.subtasks.map((item) => {
            if (item.subtask_id === id) {
                return {
                    ...item,
                    isComplete: !item.isComplete
                }
            }
            return item;
        })

        dispatch(updateDetailsForView({newSubtasks: updatedArray}))
        dispatch(updateSubtasks({thisTaskId: details.task_id, updatedObj: updatedArray}));
    }

    const handleChange = (e) => {
        dispatch(updateDetailsForView({newStatus: e.target.value}))
    };

    useEffect(() => {
        document.addEventListener("click", closeTaskDetailPop);
        document.addEventListener("click", closeDropdownOutsideClick);

        return () => {
            document.removeEventListener("click", closeTaskDetailPop);
            document.removeEventListener("click", closeDropdownOutsideClick);
        }
    })


    return (
        transition((style, isDetailsPopOpen) => isDetailsPopOpen ? (
            <animated.div style={style} className="task-details-wrapper">
                {getTaskDetails ? (
                    <div className={darkTheme ? "task-details-container" : "task-details-container task-details-container-light"}>

                        <div className='task-title-and-menu'>
                            <h1>{getTaskDetails.task_title}</h1>

                            <div className='menu-buttons-container' ref={dropdownRef}>
                                <button className='open-menu-btn' onClick={() => setIsDropdown(true)}><HiOutlineEllipsisVertical /></button>
                                <div className={isDropdown ? "dropdown-menu" : "dropdown-menu dropdown-menu-hide"}>
                                    <button className='edit-board-btn'><BiEdit /> Edit</button>
                                    <button className='delete-board-btn'><TiDelete /> Delete</button>
                                </div>
                            </div>
                        </div>

                        <p>{details.task_desc}</p>

                        <div className='subtasks-container'>
                            <h2>Subtasks: ({`${getTaskDetails.subtasks.reduce((count, sub) => sub.isComplete ? count + 1 : count, 0)} out of ${getTaskDetails.subtasks.length}`})</h2>
                            {getTaskDetails.subtasks.map((sub, i) => sub.isComplete ? (
                                <div className='checkbox-container' key={i} onClick={() => handleCheckbox(sub.subtask_id)}>
                                    <input type="checkbox"/>
                                    <span class="checkmark checked"></span>
                                    <del>{sub.subtask_name}</del>
                                </div>
                            ) : (
                                <div className='checkbox-container' key={i} onClick={() => handleCheckbox(sub.subtask_id)}>
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <label>{sub.subtask_name}</label>
                                </div>
                            ))}
                        </div>

                        <div className='status-container'>
                            <h2>Status</h2>
                            <select value={getTaskDetails.task_status} onChange={handleChange} >
                                {boards.board_avaiableStatuses.map((brd, j) => (
                                    <option key={j} value={brd}>{brd}</option>
                                ))}
                            </select>
                        </div>     

                    </div>
                ) : null}
            </animated.div>
        ) : null)
    )
}

export default TaskDetails;

/*
<div className={darkTheme ? "task-details-container" : "task-details-container task-details-container-light"}>


                    
                    <p>{seeDetailsForTask.task_desc}</p>

                    <div className='subtasks-container'>
                        <h2>Subtasks: ({`${seeDetailsForTask.subtasks.reduce((count, sub) => sub.isComplete ? count + 1 : count, 0)} out of ${seeDetailsForTask.subtasks.length}`})</h2>
                        {seeDetailsForTask.subtasks.map((sub, i) => sub.isComplete ? (
                            <div className='checkbox-container' key={i} onClick={() => handleCheckbox(sub.subtask_id)}>
                                <input type="checkbox"/>
                                <span class="checkmark checked"></span>
                                <del>{sub.subtask_name}</del>
                            </div>
                        ) : (
                            <div className='checkbox-container' key={i} onClick={() => handleCheckbox(sub.subtask_id)}>
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                                <label>{sub.subtask_name}</label>
                            </div>
                        ))}
                    </div>



                </div>

                */