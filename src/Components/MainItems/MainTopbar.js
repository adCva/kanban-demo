import React, { useState, useRef, useEffect } from 'react';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { toggleAddTaskPop, toggleEditBoardPop, toggleDeleteBoardPop } from "../../Redux/UX";
// ===== React Icons.
import { IoIosAdd } from "react-icons/io";
import { HiEllipsisVertical } from "react-icons/hi2";
import { BiEdit } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";

function MainTopbar({darkTheme}) {
    const dispatch = useDispatch();

    // ===== Redux state.
    const activeBoardName = useSelector((state) => state.ux.activeBoardName);

    // ===== Local state.
    const [isDropdown, setIsDropdown] = useState(false);

    // ===== Ref.
    const dropdownRef = useRef(null);

    // ===== Close dropdown outside click.
    const closeDropdownOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", closeDropdownOutsideClick);

        return () => {
            document.removeEventListener("click", closeDropdownOutsideClick);
        }
    })


    return (
        <div className={darkTheme ? "main-topbar-container" : "main-topbar-container main-topbar-container-light"}>

            {/* ===================== Active board title. ===================== */}
            <h3>{activeBoardName}</h3>

            <div className='topbar-buttons'>
                {/* ===================== Add Task button. ===================== */}
                <button className='topbar-add' onClick={() => dispatch(toggleAddTaskPop())}><IoIosAdd /></button>

                {/* ===================== Dropdown. ===================== */}
                <div className='topbar-dropdown-wrapper' ref={dropdownRef} >
                    <button className='topbar-options-btn' onClick={() => setIsDropdown(!isDropdown)} ><HiEllipsisVertical /></button>
                    <div className={isDropdown ? "topbar-dropdown-container" : "topbar-dropdown-container topbar-dropdown-container-hide"} >
                        <button className='edit-board-btn' onClick={() => dispatch(toggleEditBoardPop())} ><BiEdit /> Edit</button>
                        <button className='delete-board-btn' onClick={() => dispatch(toggleDeleteBoardPop())} ><TiDelete /> Delete</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MainTopbar;