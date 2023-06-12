import React from 'react';
// ===== Redux.
import { useSelector } from 'react-redux';
// ===== Components.
import MainTopbar from './MainItems/MainTopbar';
import TasksList from './MainItems/TasksList';
import TaskDetails from './MainItems/TaskDetails';
import EditDetails from './MainItems/EditDetails';

function Main() {
  // ===== Redux state.
  const isDarkMode = useSelector((state) => state.ux.darkMode);
  const isDetailsPopOpen = useSelector((state) => state.ux.isDetailsPopOpen);
  const editTaskActive = useSelector((state) => state.ux.isEditDetailsPopOpen);

  return (
    <div className={isDarkMode ? "main-content-wrapper" :"main-content-wrapper main-content-wrapper-light"} >

      <MainTopbar darkTheme={isDarkMode} />
      <TasksList darkTheme={isDarkMode} />
      <TaskDetails darkTheme={isDarkMode} />
      <EditDetails darkTheme={isDarkMode} />
      
    </div>
  )
}

export default Main;