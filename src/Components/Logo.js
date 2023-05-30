import React from 'react';
// ===== Redux.
import { useSelector } from 'react-redux';

function Logo() {
  const isDarkMode = useSelector((state) => state.ux.darkMode);

  return (
    <div className={isDarkMode ? "logo-icon-wrapper" : "logo-icon-wrapper logo-icon-wrapper-light"}>
        <div className='lines-container'>
            <div className='logo-line'></div>
            <div className='logo-line'></div>
            <div className='logo-line'></div>
        </div>
        <h1 className='logo-name'>kanban</h1>
    </div>
  )
}

export default Logo;