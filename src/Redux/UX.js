import { createSlice } from '@reduxjs/toolkit';

export const UX = createSlice({
    name: "User Experience",
    initialState: {
        darkMode: true,
        isSidebarHidden: false,
        activeBoardId: 0,
        activeBoardName: "Platform Launch",
        isDetailsPopOpen: false,
        getDetailsForTask: null
    },

    reducers: {
        changeViewMode: (state) => {
            state.darkMode = !state.darkMode;
        },
        hideSidebar: (state) => {
            state.isSidebarHidden = !state.isSidebarHidden;
        },
        changeActiveBoardId: (state, action) => {
            state.activeBoardId = action.payload.newId
            state.activeBoardName = action.payload.newName
        },
        toggleDetailsPop: (state) => {
            state.isDetailsPopOpen = !state.isDetailsPopOpen;
        },
        openDetailsPop: (state, action) => {
            return {
                ...state,
                isDetailsPopOpen: true,
                getDetailsForTask: action.payload.taskDetails
            }
        },
        updateDetailsForView: (state, action) => {
            const resault = {
                ...state.getDetailsForTask,
                task_title: action.payload.newTitle ? action.payload.newTitle : state.getDetailsForTask.task_title,
                task_desc: action.payload.newDesc ? action.payload.newDesc : state.getDetailsForTask.task_desc,
                task_status: action.payload.newStatus ? action.payload.newStatus : state.getDetailsForTask.task_status,
                subtasks: action.payload.newSubtasks ? action.payload.newSubtasks : state.getDetailsForTask.subtasks
            }

            return {
                ...state,
                getDetailsForTask: resault
            }
        },
        closeDetailsPop: (state) => {
            return {
                ...state,
                isDetailsPopOpen: false,
                getDetailsForTask: null
            }
        }
    }
})

export const { changeViewMode, hideSidebar, changeActiveBoardId, toggleDetailsPop, openDetailsPop, updateDetailsForView, closeDetailsPop } = UX.actions;

export default UX.reducer;