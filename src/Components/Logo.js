import React from 'react';
// ===== Redux.
import { useSelector } from 'react-redux';

function Logo() {
  const isDarkMode = useSelector((state) => state.ux.darkMode);

  return (
    <div className={isDarkMode ? "logo-wrapper" : "logo-wrapper logo-wrapper-light"}>
        <div className='lines-container'>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
        </div>
        <h1>kanban</h1>
    </div>
  )
}

export default Logo;