import React from 'react';
// ===== Redux.
import { useSelector } from 'react-redux';
// ===== Components.
import MainTopbar from './MainItems/MainTopbar';
import TasksList from './MainItems/TasksList';
import AddTask from './AddTask';
import TaskDetails from './MainItems/TaskDetails';
import EditDetails from './MainItems/EditDetails';
import NewBoard from './NewBoard';
import EditBoard from './EditBoard';
import DeleteBoard from './MainItems/DeleteBoard';
import NoBoards from './NoBoards';
import NewColumn from './MainItems/NewColumn';


function Main() {
  // ===== Redux state.
  const isDarkMode = useSelector((state) => state.ux.darkMode);
  const areThereBoards = useSelector((state) => state.data.boards);

  return (
    <div className={isDarkMode ? "main-content-wrapper" :"main-content-wrapper main-content-wrapper-light"} >

      <MainTopbar darkTheme={isDarkMode} />
      {areThereBoards.length === 0 ? <NoBoards /> : <TasksList darkTheme={isDarkMode} />}
      <AddTask darkTheme={isDarkMode} />
      <TaskDetails darkTheme={isDarkMode} />
      <EditDetails darkTheme={isDarkMode} />
      <NewBoard />
      <EditBoard />
      <DeleteBoard />
      <NewColumn />
      
    </div>
  )
}

export default Main;