import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { updateDetailsForView, closeDetailsPop, openFullEditTaskPop } from "../../Redux/UX";
import { updateSubtasks, updateTaskStatus } from "../../Redux/data";
// ===== React Icons.
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { BiEdit } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";


function TaskDetails({darkTheme}) {
    const dispatch = useDispatch();

    // ===== Redux state.
    const isDetailsPopOpen = useSelector((state) => state.ux.isDetailsPopOpen);
    const activeBoardId = useSelector((state) => state.ux.activeBoardId);
    const currentBoard = useSelector((state) => state.data.boards.filter(el => el.board_id === activeBoardId)[0]);
    const getTaskDetails = useSelector((state) => state.ux.getDetailsForTask);
    
    // ===== Local state.
    const [isDropdown, setIsDropdown] = useState(false);

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
                dispatch(updateTaskStatus({thisTaskId: getTaskDetails.task_id, newStatus: getTaskDetails.task_status}));
                dispatch(closeDetailsPop());
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

    // ===== Handle Subtask Checkbox.
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

        dispatch(updateDetailsForView({newSubtasks: updatedArray}));
        dispatch(updateSubtasks({thisTaskId: getTaskDetails.task_id, updatedObj: updatedArray}));
    }

    // ===== Handle Status Change.
    const handleChange = (event) => {
        dispatch(updateDetailsForView({newStatus: event.target.value}))
    };

    // ===== Open full edit & close this pop.
    const openFullEdit = () => {
        dispatch(openFullEditTaskPop());
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

                        {/* ===================== Title & Dropdown ===================== */}
                        <div className='task-title-and-menu'>
                            <h1>{getTaskDetails.task_title}</h1>

                            <div className='menu-buttons-container' ref={dropdownRef}>
                                <button className='open-menu-btn' onClick={() => setIsDropdown(true)} ><HiOutlineEllipsisVertical /></button>
                                <div className={isDropdown ? "dropdown-menu" : "dropdown-menu dropdown-menu-hide"} >
                                    <button className='edit-board-btn' onClick={openFullEdit} ><BiEdit /> Edit</button>
                                    <button className='delete-board-btn' ><TiDelete /> Delete</button>
                                </div>
                            </div>
                        </div>

                        {/* ===================== Description ===================== */}
                        <p>{getTaskDetails.task_desc}</p>

                        {/* ===================== Subtasks ===================== */}
                        <div className='subtasks-container'>
                            <h2>Subtasks: {`(${getTaskDetails.subtasks.reduce((count, sub) => sub.isComplete ? count + 1 : count, 0)} out of ${getTaskDetails.subtasks.length})`}</h2>
                            {getTaskDetails.subtasks.map((sub, i) => sub.isComplete ? (
                                <div className='checkbox-container' key={i} onClick={() => handleCheckbox(sub.subtask_id)} >
                                    <input type="checkbox" />
                                    <span className="checkmark checked" ></span>
                                    <del>{sub.subtask_name}</del>
                                </div>
                            ) : (
                                <div className='checkbox-container' key={i} onClick={() => handleCheckbox(sub.subtask_id)} >
                                    <input type="checkbox" />
                                    <span className="checkmark" ></span>
                                    <label>{sub.subtask_name}</label>
                                </div>
                            ))}
                        </div>

                        {/* ===================== Status ===================== */}
                        <div className='status-container'>
                            <h2>Status</h2>
                            <select value={getTaskDetails.task_status} onChange={handleChange} >
                                {currentBoard.board_avaiableStatuses.map((status, j) => (
                                    <option key={j} value={status}>{status}</option>
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