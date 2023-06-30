import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from "../Redux/data";
import { toggleAddTaskPop } from "../Redux/UX";
// ===== React Icons.
import { MdClose } from "react-icons/md";

function AddTask({darkTheme}) {
  const dispatch = useDispatch();

  // ===== Redux state.
  const isOpen = useSelector((state) => state.ux.isAddTaskPop);
  const activeBoard = useSelector((state) => state.ux.activeBoardId);
  const board = useSelector((state) => state.data.boards.filter(board => board.board_id === activeBoard));
  const tasks = useSelector((state) => state.data.tasks);

  // ===== Local state.
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskId, setSubtasksId] = useState(0);
  const [status, setStatus] = useState("todo");


  // ===== React Spring Transition.
  const transition = useTransition(isOpen, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
  });

  // ===== Close pop on outside click.
  const closePopOutsideClick = (e) => {
    if (isOpen && e.target.className === "add-task-wrapper") {
      dispatch(toggleAddTaskPop());
      resetData();
    }
  }

  // ===== Add Subtask Field Input.
  const addSubTaskInput = () => {
    if (subtasks.length < 3)  setSubtasks([...subtasks, {subtask_id: subtaskId, subtask_name: "", isComplete: false}]);
    setSubtasksId(subtaskId + 1);
  };

  // ===== Handle Subtask Field Input.
  const handleTextInput = (e, id) => {
    const handleArray = subtasks.map(el => {
      if (el.subtask_id === id) {
        return {
          ...el,
          subtask_name: e.target.value
        }
      }
      return el
    });

    setSubtasks(handleArray);
  }

  // ===== Delete Subtask Field Input.
  const deleteSubtaskField = (id) => {
    const tempSubtasksArray = subtasks.filter(el => el.subtask_id !== id);
    setSubtasks(tempSubtasksArray);
  };

  // ===== Reset local state data.
  const resetData = () => {
    setTitle("");
    setDesc("");
    setSubtasks([]);
    setSubtasksId(0);
    setStatus("todo");
  }

  // ===== Form Submit.
  const handleSubmit = (e) => {
    e.preventDefault();
    const biggestTaskId = tasks.length === 0 ? 0 : tasks.reduce((prev, current) => { return (current.task_id > prev.task_id) ? current : prev }).task_id;

    dispatch(addTask({newTask: {
      task_id: biggestTaskId + 1,
      task_parent_id: activeBoard,
      task_title: title,
      task_desc: desc,
      task_status: status,
      subtasks: subtasks
    }}));
    
    dispatch(toggleAddTaskPop());
    resetData();
  };


  useEffect(() => {
    document.addEventListener("click", closePopOutsideClick);

    return () => {
      document.removeEventListener("click", closePopOutsideClick);
    }
  })


  return (
    transition((style, isOpen) => isOpen ? (
      <animated.div style={style} className="pop-up-wrapper" >
          <div className={darkTheme ? "pop-up-container" : "pop-up-container pop-up-container-light"} >

            <h1 className='component-title'>Add New Task</h1>

            <form className='add-task-form' onSubmit={handleSubmit}>
              {/* ===================== Title ===================== */}
              <div className='form-group' >
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' name='title' defaultValue={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                <p>Fielr required.</p>
              </div>

              {/* ===================== Description ===================== */}
              <div className='form-group' >
                <label htmlFor='description'>Description</label>
                <textarea id='description' name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Description' ></textarea>
              </div>

              {/* ===================== Subtasks ===================== */}
              <div className='subtasks-group-container' >
                <label>Subtasks</label>
                {subtasks.map((el, i) => (
                  <div key={i} className='subtask-input-container' >
                    <input type='text' value={el.subtask_name} onChange={(e) => handleTextInput(e, el.subtask_id)} />
                    <button type='button' onClick={() => deleteSubtaskField(el.subtask_id)}><MdClose /></button>
                  </div>
                ))}
                <button type='button' onClick={addSubTaskInput}>+ Add New Subtask</button>
              </div>

              {/* ===================== Status ===================== */}
              <div className='status-group'>
                  <label>Status</label>
                  <select name='add-task-status' value={status} onChange={(e) => setStatus(e.target.value)}>
                    {board[0].board_avaiableStatuses.map((status, j) => (
                      <option key={j} value={status}>{status}</option>
                    ))}
                  </select>
              </div>

              {/* ===================== Submit ===================== */}
              <button type='submit' className='add-task-submit-button' >Create Task</button>
            </form>

          </div>
      </animated.div>
    ) : null)
  )
}

export default AddTask;