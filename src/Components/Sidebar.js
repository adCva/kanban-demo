import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { changeViewMode, hideSidebar, changeActiveBoardId } from "../Redux/UX";
// ===== React Icons.
import { HiSun } from "react-icons/hi2";
import { BsMoonStarsFill, BsClipboard2Plus, BsClipboard2Check, BsClipboard2 } from "react-icons/bs";
import { BiHide } from "react-icons/bi";
// ===== Components.
import LogoWrapper from './SidebarItems/LogoWrapper';

function Sidebar() {
  const dispatch = useDispatch();

  // ===== Redux state.
  const isDarkMode = useSelector((state) => state.ux.darkMode);
  const activeBoardId = useSelector((state) => state.ux.activeBoardId);
  const boards = useSelector((state) => state.data.boards);

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

  // ===== Change isMobileCard value when resizing.
  const displayContentBigScreen = () => {
    if (window.innerWidth > 1000) {
      setIsMobileCard(true);
    } else {
      setIsMobileCard(false);
    }
  };

  // ===== 
  const changeBoard = (id, name) => {
    dispatch(changeActiveBoardId({newId: id, newName: name}));
    
    if (window.innerWidth < 1000) {
      setIsMobileCard(false);
    }
  }

  useEffect(() => {
    // Change isMobileCard value when loading page on bigger screens.
    if (window.innerWidth > 1000) {
      setIsMobileCard(true);
    }

    document.addEventListener("click", closeBoardModalOutsideClick);
    window.addEventListener("resize", displayContentBigScreen);

    return () => {
      document.removeEventListener("click", closeBoardModalOutsideClick);
      window.removeEventListener("resize", displayContentBigScreen);
    }
  }, [isMobileCard])


  return (
    <div className={isDarkMode ? "sidebar-wrapper" : "sidebar-wrapper sidebar-wrapper-light"}>

      <LogoWrapper isMobileCardOpen={isMobileCard} onValueToggle={handleMobileValueToggle} darkTheme={isDarkMode} />

      {/* ===================== Sidebar Content ===================== */}
      {transition((style, isMobileCard) => isMobileCard ? (
        <animated.div style={style} className="sidebar-content-wrapper" >
          
          <div className='sidebar-content-container'>

            {/* =========== Boards List =========== */}
            <div className='boards-list-container'>
              <h1>All boards: {boards.length}</h1>
              <div className='boards-list'>
                {boards.map((board, i) => {
                  return (
                    <button 
                      className={activeBoardId === board.board_id ? "board-btn active-board-btn" : "board-btn"}
                      onClick={() => changeBoard(board.board_id, board.board_name)}
                    >
                      {activeBoardId === board.board_id ? <span><BsClipboard2Check /></span> : <span><BsClipboard2 /></span> } {board.board_name}
                    </button>
                  )
                })}
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
              <button className='hide-sidebar-btn' onClick={() => dispatch(hideSidebar())}><BiHide /> Hide Sidebar</button>
            </div>

          </div>

        </animated.div>
      ) : null)}

    </div>
  )
}

export default Sidebar;