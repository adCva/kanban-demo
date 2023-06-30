import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { updateDetailsForView, closeFullEditTaskPop } from "../../Redux/UX";
import { updateTask, deleteTask } from "../../Redux/data";
// ===== React Icons.
import { MdClose, MdOutlineDeleteOutline } from "react-icons/md";


function EditDetails({darkTheme}) {
    const dispatch = useDispatch();

    // ===== Redux state.
    const editTaskActive = useSelector((state) => state.ux.isEditDetailsPopOpen);
    const getTaskDetails = useSelector((state) => state.ux.getDetailsForTask);
    const activeBoardId = useSelector((state) => state.ux.activeBoardId);
    const currentBoard = useSelector((state) => state.data.boards.filter(el => el.board_id === activeBoardId)[0]);

    // ===== Local state.
    const [titleError, setTitleError] = useState(false);
    const subtaskPlaceholder = ["e.g. Drik coffee.", "e.g. Cope with life absurdity.", "e.g. Stare into the abyss"];

    // ===== React Spring Transition.
    const transition = useTransition(editTaskActive, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    // ===== Close component outside click.
    const fullEditTaskPop = (event) => {
        if (editTaskActive && event.target.className === "edit-task-wrapper") {
            dispatch(closeFullEditTaskPop());
        }
    };

    // ===== Add subtask input field.
    const addSubTaskInput = () => {
        if (getTaskDetails.subtasks.length < 3 && getTaskDetails.subtasks.length > 0) {
            const id = Number(getTaskDetails.subtasks[getTaskDetails.subtasks.length - 1].subtask_id) + 1;
            dispatch(updateDetailsForView({newSubtasks: [...getTaskDetails.subtasks, {subtask_id: id, subtask_name: "", isComplete: false}]}));
        } else if (getTaskDetails.subtasks.length == 0) {
            dispatch(updateDetailsForView({newSubtasks: [...getTaskDetails.subtasks, {subtask_id: 0, subtask_name: "", isComplete: false}]}));
        }
    };

    // ===== Change subtask input text.
    const changeSubtaskInput = (e, id) => {
        const updatedSubtasks = getTaskDetails.subtasks.map(subtask => {
            if (subtask.subtask_id === id) {
                return {
                    ...subtask,
                    subtask_name: e.target.value
                }
            }
            return subtask;
        });

        dispatch(updateDetailsForView({newSubtasks: updatedSubtasks}));
    };

    // ===== Delete subtask input field.
    const deleteSubtask = (id) => {
        const updatedSubtasks = getTaskDetails.subtasks.filter(subtask => subtask.subtask_id !== id);
        dispatch(updateDetailsForView({newSubtasks: updatedSubtasks}));
    };

    const deleteThisTask = (id) => {
        dispatch(deleteTask({deleteWithId: id}));
        dispatch(closeFullEditTaskPop());
    };

    // ===== Handle Form Submit.
    const handleSubmit = (e) => {
        e.preventDefault();

        if (getTaskDetails.task_title === "" || getTaskDetails.task_title.length === 1) {
            setTitleError(true);
        }else {
            setTitleError(false);
            dispatch(updateTask({updateAtThisId: getTaskDetails.task_id, updatedTask: getTaskDetails}));
            dispatch(closeFullEditTaskPop());
        }
    };

    useEffect(() => {
        document.addEventListener("click", fullEditTaskPop);

        return () => {
            document.removeEventListener("click", fullEditTaskPop);
        }
    });

    return (
        transition((style, editTaskActive) => editTaskActive ? (
            <animated.div style={style} className="pop-up-wrapper">
                <div className={darkTheme ? "pop-up-container" : "pop-up-container pop-up-container-light"} >

                    {getTaskDetails ? (
                        <>
                            <h1 className='component-title'>Edit Task</h1>

                            {/* ===================== Form ===================== */}
                            <form className='edit-task-from' onSubmit={handleSubmit} >
                            
                                {/* ===================== Title & Delete ===================== */}
                                <div className='edit-group'>
                                    <label htmlFor='title'>Title</label>
                                    <input type='text' defaultValue={getTaskDetails.task_title} id="title" name="title" onChange={(e) => dispatch(updateDetailsForView({newTitle: e.target.value}))} />
                                    <p className={titleError ? "error error-show" : "error"} >Field required or too short.</p>
                                </div>

                                {/* ===================== Description Input ===================== */}
                                <div className='edit-group'>
                                    <label htmlFor='description'>Description</label>
                                    <textarea id='description' value={getTaskDetails.task_desc} name="desc" onChange={(e) => dispatch(updateDetailsForView({newDesc: e.target.value}))} ></textarea>
                                </div>

                                {/* ===================== Subtasks ===================== */}
                                <div className='subtasks-edit-group'>
                                    <label>Subtasks</label>
                                    {getTaskDetails.subtasks.map((subtask, i) => (
                                            <div className='subtask-row' key={i} >
                                                <input type="text" value={subtask.subtask_name} onChange={(e) => changeSubtaskInput(e, subtask.subtask_id)} placeholder={subtaskPlaceholder[Math.floor(Math.random() * subtaskPlaceholder.length)]} />
                                                <button type='button' onClick={() => deleteSubtask(subtask.subtask_id)} className='delete-subtask-button'><MdClose /></button>
                                            </div>
                                        )
                                    )}
                                    <button type='button' onClick={addSubTaskInput} className='add-subtask-button' >+ Add Subtask</button>
                                </div>

                                {/* ===================== Status ===================== */}
                                <div className='status-edit-group'>
                                    <label>Status</label>
                                    <select name='status' value={getTaskDetails.task_status} onChange={(e) => dispatch(updateDetailsForView({newStatus: e.target.value}))} >
                                        {currentBoard.board_avaiableStatuses.map((status, i) => (
                                            <option key={i} value={status} >{status}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* ===================== Delete Task Button ===================== */}
                                <button type='button' className='delete-task-button' onClick={() => deleteThisTask(getTaskDetails.task_id)} ><MdOutlineDeleteOutline /></button>

                                {/* ===================== Submit ===================== */}
                                <button type='submit' className='submit-button' >Change Task</button>

                            </form>
                        </>
                    ) : null}
                </div>
            </animated.div>
        ) : null)
    )
}

export default EditDetails;