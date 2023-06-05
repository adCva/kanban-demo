import React from 'react';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { hideSidebar } from "../Redux/UX";
// ===== React Icons.
import { BiShowAlt } from "react-icons/bi";


function ShowSidebar() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const isSidebarHidden = useSelector((state) => state.ux.isSidebarHidden);

    return (
        <div className={!isSidebarHidden ? "show-sidebar-container show-sidebar-container-hide" : "show-sidebar-container"} onClick={() => dispatch(hideSidebar())} >
            <BiShowAlt />
        </div>
    )
}

export default ShowSidebar;