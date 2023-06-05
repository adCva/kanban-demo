import React from 'react';

function EmptyBoard({darkTheme}) {
  return (
    <div className={darkTheme ? "empty-board-container" : "empty-board-container empty-board-container-light"}>
        <h1>This board contains no tasks.</h1>
        <button>Create Task</button>
    </div>
  )
}

export default EmptyBoard;