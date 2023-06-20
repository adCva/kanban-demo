import React, { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';

function EditBoard() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const darkTheme = useSelector((state) => state.ux.darkMode);
    const isOpen = useSelector((state) => state.ux.editBoardPop);
    const activeBoard = useSelector((state) => state.ux.activeBoardId);
    const allAvailabelStatusesForBoard = useSelector((state) => state.data.boards.filter(el => el.board_id === activeBoard)[0].board_avaiableStatuses);
    const areThereTasksForStatusAndActiveBoard = useSelector((state) => state.data.tasks.filter(el => el.task_parent_id === activeBoard));

    // ===== React Spring Transition.
    const transition = useTransition(isOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        transition((style, isOpen) => isOpen ? (
            <animated.div style={style} className="edit-board-wrapper" >
                <div className={darkTheme ? "edit-board-container" : "edit-board-container edit-board-container-light"} >

                    <h1 className='component-title' onClick={() => console.log(areThereTasksForStatusAndActiveBoard)}>Edit Board</h1>

                    <form className='edit-board-form' onSubmit={handleSubmit} >

                        <div className='form-group'>
                            <label htmlFor='title'>Name</label>
                            <input type='text' id='title' />
                        </div>

                        <div className='edit-statuses-group'>
                            <label>Delete Status</label>
                            {allAvailabelStatusesForBoard.map((status, i) => areThereTasksForStatusAndActiveBoard.filter(task => task.task_status === status) ? (
                                <div key={i}>
                                    <p>Delete</p>
                                    <input type='text' value={status} />
                                </div>
                            ) : (
                                <div>
                                    <p>Not Del</p>
                                    <input type='text' value={status} />
                                </div>
                            ))}
                        </div>

                        <button type='submit'>Change Board</button>

                    </form>

                </div>
            </animated.div>
        ) : null)
    )
}

export default EditBoard;