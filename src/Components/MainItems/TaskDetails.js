import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { closeDetailsPop } from "../../Redux/UX";
import { updateSubtaskStatus } from "../../Redux/data";
// ===== React Icons.
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { BiEdit } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";


function TaskDetails({darkTheme}) {
    const dispatch = useDispatch();

    // ===== Redux state.
    const activeBoardId = useSelector((state) => state.ux.activeBoardId);
    const seeDetailsForTask = useSelector((state) => state.ux.detailsForTask);
    const boards = useSelector((state) => state.data.boards.filter(el => el.board_id === activeBoardId)[0]);

    // ===== Local state.
    const [isDropdown, setIsDropdown] = useState(false);

    // ===== Ref.
    const dropdownRef = useRef(null);

    // ===== React Spring Transition.
    const transition = useTransition(seeDetailsForTask, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    // ===== Close component outside click.
    const closeTaskDetailPop = (event) => {
        if (!isDropdown) {
            if (seeDetailsForTask && event.target.className === "task-details-wrapper") {
                dispatch(closeDetailsPop());
            }
        }
    };

    // ===== Close dropdown.
    const closeDropdownOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdown(false);
        }
    };

    // Handle checkbox.
    const handleCheckbox = (index) => {
        const updatedArray = seeDetailsForTask.subtasks.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    isComplete: !item.isComplete
                }
            }
            return item;
        })

        // console.log(updatedArray);
        dispatch(updateSubtaskStatus({parentId: activeBoardId, updateObj: updatedArray}));
    }

    useEffect(() => {
        document.addEventListener("click", closeTaskDetailPop);
        document.addEventListener("click", closeDropdownOutsideClick);

        return () => {
            document.removeEventListener("click", closeTaskDetailPop);
            document.removeEventListener("click", closeDropdownOutsideClick);
        }
    })

    return (
        transition((style, seeDetailsForTask) => seeDetailsForTask ? (
            <animated.div style={style} className="task-details-wrapper">
                <div className={darkTheme ? "task-details-container" : "task-details-container task-details-container-light"}>

                    <div className='task-title-and-menu'>
                        <h1>{seeDetailsForTask.task_title}</h1>

                        <div className='menu-buttons-container' ref={dropdownRef}>
                            <button className='open-menu-btn' onClick={() => setIsDropdown(true)}><HiOutlineEllipsisVertical /></button>
                            <div className={isDropdown ? "dropdown-menu" : "dropdown-menu dropdown-menu-hide"}>
                                <button className='edit-board-btn'><BiEdit /> Edit</button>
                                <button className='delete-board-btn'><TiDelete /> Delete</button>
                            </div>
                        </div>
                    </div>
                    
                    <p>{seeDetailsForTask.task_desc}</p>

                    <div className='subtasks-container'>
                        <h2>Subtasks: ({`${seeDetailsForTask.subtasks.reduce((count, sub) => sub.isComplete ? count + 1 : count, 0)} out of ${seeDetailsForTask.subtasks.length}`})</h2>
                        {seeDetailsForTask.subtasks.map((sub, i) => sub.isComplete ? (
                            <div className='checkbox-container' key={i} onClick={() => handleCheckbox(i)}>
                                <input type="checkbox"/>
                                <span class="checkmark checked"></span>
                                <del>{sub.subtask_name}</del>
                            </div>
                        ) : (
                            <div className='checkbox-container' key={i} onClick={() => handleCheckbox(i)}>
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                                <label>{sub.subtask_name}</label>
                            </div>
                        ))}
                    </div>

                    <div className='status-container'>
                        <h2 onClick={() => console.log(boards)}>Status</h2>
                        <select>
                            {boards.board_avaiableStatuses.map((brd, j) => (
                                <option key={j}>{brd}</option>
                            ))}
                        </select>
                    </div>     

                </div>
            </animated.div>
        ) : null)
    )
}

export default TaskDetails;