import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { changeViewMode, hideSidebar } from "../Redux/UX";
// ===== React Icons.
import { HiSun } from "react-icons/hi2";
import { BsMoonStarsFill, BsClipboard2Plus, BsClipboard2Check, BsClipboard2 } from "react-icons/bs";
// ===== Components.
import LogoWrapper from './SidebarItems/LogoWrapper';

function Sidebar() {
  const dispatch = useDispatch();

  // ===== Redux state.
  const isDarkMode = useSelector((state) => state.ux.darkMode);

  // ===== Local state.
  const [isMobileCard, setIsMobileCard] = useState(false);

  // ===== React Spring Transition.
  const transition = useTransition(isMobileCard, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
  });

  // ===== Callback for LogoWrapper component.
  const handleMobileValueToggle  = () => {
    setIsMobileCard(!isMobileCard);
  };

  // ===== Close boards modal on outside click.
  const closeBoardModalOutsideClick = (event) => {
    if (isMobileCard && event.target.className === "sidebar-content-wrapper") {
      setIsMobileCard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeBoardModalOutsideClick);

    return () => {
      document.removeEventListener("click", closeBoardModalOutsideClick);
    }
  })


  return (
    <div className={isDarkMode ? "sidebar-wrapper" : "sidebar-wrapper sidebar-wrapper-light"}>

      <LogoWrapper isMobileCardOpen={isMobileCard} onValueToggle={handleMobileValueToggle} darkTheme={isDarkMode} />

      {/* ===================== Sidebar Content ===================== */}
      {transition((style, isMobileCard) => isMobileCard ? (
        <animated.div style={style} className="sidebar-content-wrapper" >
          
          <div className='sidebar-content-container'>

            {/* =========== Boards List =========== */}
            <div className='boards-list-container'>
              <h1>All boards: 3</h1>
              <div className='boards-list'>
                <button className='board-btn active-board-btn'><span><BsClipboard2Check /></span> Board #1</button>
                <button className='board-btn'><span><BsClipboard2 /></span> Board #2</button>
                <button className='board-btn'><span><BsClipboard2 /></span> Board #3</button>
              </div>
              <button className='new-board-btn'><span><BsClipboard2Plus /></span> + Create New Board</button>
            </div>

            {/* =========== Theme Btn Container =========== */}
            <div className='theme-btn-wrapper'>
              <div className='theme-btn-container'>
                <dfn><HiSun /></dfn>
                <div className='theme-switcher' onClick={() => dispatch(changeViewMode())}>
                  <button className={isDarkMode ? "theme-btn theme-btn-right" : "theme-btn" } />
                </div>
                <dfn><BsMoonStarsFill /></dfn>
              </div>
              <button className='hide-sidebar-btn' onClick={() => dispatch(hideSidebar())}>Hide Sidebar</button>
            </div>

          </div>

        </animated.div>
      ) : null)}

    </div>
  )
}

export default Sidebar;