import React from 'react';
// ===== Redux.
import { useDispatch } from 'react-redux';
import { toggleAddTaskPop } from "../../Redux/UX";

function EmptyBoard({darkTheme}) {
  const dispatch = useDispatch();

  return (
    <div className={darkTheme ? "empty-board-container" : "empty-board-container empty-board-container-light"}>
        <h1>This board contains no tasks.</h1>
        <button onClick={() => dispatch(toggleAddTaskPop())}>Create Task</button>
    </div>
  )
}

export default EmptyBoard;