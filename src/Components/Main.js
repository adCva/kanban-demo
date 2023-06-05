import React from 'react';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
// ===== Components.
import MainTopbar from './MainItems/MainTopbar';
import EmptyBoard from './MainItems/EmptyBoard';

function Main() {
  const dispatch = useDispatch();

  // ===== Redux state.
  const isDarkMode = useSelector((state) => state.ux.darkMode);


  return (
    <div className={isDarkMode ? "main-content-wrapper" :"main-content-wrapper main-content-wrapper-light"} >
      
      <MainTopbar darkTheme={isDarkMode} />

      <EmptyBoard />

    </div>
  )
}

export default Main;