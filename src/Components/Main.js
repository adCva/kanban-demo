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


function Main() {
  // ===== Redux state.
  const isDarkMode = useSelector((state) => state.ux.darkMode);

  return (
    <div className={isDarkMode ? "main-content-wrapper" :"main-content-wrapper main-content-wrapper-light"} >

      <MainTopbar darkTheme={isDarkMode} />
      <TasksList darkTheme={isDarkMode} />
      <AddTask darkTheme={isDarkMode} />
      <TaskDetails darkTheme={isDarkMode} />
      <EditDetails darkTheme={isDarkMode} />
      <NewBoard />
      <EditBoard />
      
    </div>
  )
}

export default Main;