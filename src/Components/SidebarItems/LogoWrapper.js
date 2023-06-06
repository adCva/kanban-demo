import React, { useState, useRef, useEffect } from 'react';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
// ===== Components.
import Logo from "../Logo";
// ===== React Icons.
import { BiChevronUp, BiChevronDown, BiEdit } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { HiEllipsisVertical } from "react-icons/hi2";

function LogoWrapper({isMobileCardOpen, onValueToggle, darkTheme }) {
    const dispatch = useDispatch();

    // ===== Redux state.
    const activeBoardName = useSelector((state) => state.ux.activeBoardName);

    // ===== Local state.
    const [isDropdown, setIsDropdown] = useState(false);

    // ===== Ref.
    const mobilDropdownRef = useRef(null);

    // ===== Close edit/delete dropdown.
    const closeDropdownOutsideClick = (event) => {
        if (mobilDropdownRef.current && !mobilDropdownRef.current.contains(event.target)) {
            setIsDropdown(false);
        }
    };

    // ===== Callback for parent state value.
    const handleMobileCardChange = () => {
        onValueToggle();
    }

    useEffect(() => {
        document.addEventListener("click", closeDropdownOutsideClick);

        return () => {
            document.removeEventListener("click", closeDropdownOutsideClick);
        }
    })

    return (
        <div className={darkTheme ? "logo-wrapper" : "logo-wrapper logo-wrapper-light"}>
            <div className='logo-container'>
                <Logo />
                <h2>{activeBoardName}</h2>
                <button className='logo-open-btn' onClick={handleMobileCardChange} >{isMobileCardOpen ? <BiChevronDown /> : <BiChevronUp />}</button>
            </div>
            <div className='logo-mobile-btns'>
                <button className='logo-mobile-add'><IoIosAdd /></button>
                <div className='mobile-dropdown-wrapper' ref={mobilDropdownRef} >
                    <button className='board-options-btn' onClick={() => setIsDropdown(!isDropdown)}><HiEllipsisVertical /></button>
                    <div className={isDropdown ? "dropdown-container" : "dropdown-container dropdown-container-hide"} >
                        <button className='edit-board-btn'><BiEdit /> Edit</button>
                        <button className='delete-board-btn'><TiDelete /> Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoWrapper;