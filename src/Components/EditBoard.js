import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { toggleEditBoardPop } from "../Redux/UX";
import { editBoard } from "../Redux/data";
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';

function EditBoard() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const darkTheme = useSelector((state) => state.ux.darkMode);
    const isOpen = useSelector((state) => state.ux.editBoardPop);
    const activeBoard = useSelector((state) => state.ux.activeBoardId);
    const allAvailabelStatusesForBoard = useSelector((state) => state.data.boards.filter(el => el.board_id === activeBoard)[0]);
    const areThereTasksForStatusAndActiveBoard = useSelector((state) => state.data.tasks.filter(el => el.task_parent_id === activeBoard));

    // ===== Helper.
    let containsSubtasks  = {};
    areThereTasksForStatusAndActiveBoard.forEach(task => {
        const status = task.task_status
        containsSubtasks[status] = (containsSubtasks[status] || 0) + 1;
    });

    // ===== Local state.
    const [status, setStatus] = useState();

    // ===== Local state.
    const selectStatusForDeletion = (index) => {
        let tempArray = [...status];

        if (areThereTasksForStatusAndActiveBoard.filter(el => el.task_status === tempArray[index].name) .length > 0) {
            tempArray[index].hasError = true;
            setStatus(tempArray)
        } else if (tempArray[index].isActive === false) {
            tempArray[index].isActive  = true;
            setStatus(tempArray)
        } else {
            tempArray[index].isActive = false;
            setStatus(tempArray)
        }
    };

    // ===== React Spring Transition.
    const transition = useTransition(isOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    // ===== Handle Form Submit.
    const handleSubmit = (e) => {
        e.preventDefault();

        const statuses = status.reduce((acc, el) => {
            if (el.isActive) {
                acc.push(el.name);
            }
            return acc
        }, []);

        dispatch(editBoard({
            currentBoard: activeBoard,
            boardName: e.target.title.value,
            editedStatuses: statuses
        }));

        dispatch(toggleEditBoardPop());
    };

    // ===== Close pop on outside click.
    const closePopOutsideClick = (e) => {
        if (isOpen && e.target.className === "edit-board-wrapper") {
          dispatch(toggleEditBoardPop());
        }
    }

    useEffect(() => {
        setStatus(allAvailabelStatusesForBoard ? allAvailabelStatusesForBoard.board_avaiableStatuses.map(el => {
            return {
                name: el,
                isActive: true,
                hasError: false,
                containsSubtasksWithThisStatus: containsSubtasks[el] || 0
            }
        }) : null);

        document.addEventListener("click", closePopOutsideClick);

        return () => {
            document.removeEventListener("click", closePopOutsideClick);
        }
    }, [allAvailabelStatusesForBoard, isOpen]);

    return (
        transition((style, isOpen) => isOpen ? (
            <animated.div style={style} className="edit-board-wrapper" >
                <div className={darkTheme ? "edit-board-container" : "edit-board-container edit-board-container-light"} >

                    <h1 className='component-title' onClick={() => console.log(allAvailabelStatusesForBoard)}>Edit Board</h1>

                    <form className='edit-board-form' onSubmit={handleSubmit} >

                        <div className='form-group'>
                            <label htmlFor='title'>Name</label>
                            <input type='text' id='title' name='title' defaultValue={allAvailabelStatusesForBoard.board_name} />
                        </div>

                        <div className='edit-statuses-group'>
                            <label>Delete Status</label>
                            {status.map((el, i) => (
                                <div key={i}>
                                    {el.containsSubtasksWithThisStatus > 0 ? <p>X</p> : <input type='checkbox' id={`checkbox-${el.name}`} onChange={() => selectStatusForDeletion(i)} /> }
                                    {!el.isActive ? <del>{el.name}</del> : <label htmlFor={`checkbox-${el.name}`}>{el.name}</label>}
                                    {el.containsSubtasksWithThisStatus > 0 ? <p>This status has active subtasks. Please delete them first.</p> : null }
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