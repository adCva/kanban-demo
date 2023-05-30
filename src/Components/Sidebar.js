import React, { useState, useRef } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import LogoWrapper from './SidebarItems/LogoWrapper';

function Sidebar() {
  const dispatch = useDispatch();

  // ===== Redux state.
  const isDarkMode = useSelector((state) => state.ux.darkMode);

  return (
    <div className={isDarkMode ? "sidebar-wrapper" : "sidebar-wrapper sidebar-wrapper-light"}>

      {/* ===================== Logo & Mobile Buttons ===================== */}
      <LogoWrapper />

    </div>
  )
}

export default Sidebar;