import { createSlice } from '@reduxjs/toolkit';

export const UX = createSlice({
    name: "User Experience",
    initialState: {
        darkMode: true,
        isSidebarHidden: false,
        activeBoardId: 0,
        activeBoardName: "Platform Launch",
        isAddTaskPop: false,
        isDetailsPopOpen: false,
        isEditDetailsPopOpen: false,
        getDetailsForTask: null,
        newBoardPop: false,
        editBoardPop: false,
        deleteBoardPop: false,
        deleteTaskPop: false,
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
        },
        openFullEditTaskPop: (state) => {
            state.isEditDetailsPopOpen = true;
            state.isDetailsPopOpen = false;
        },
        closeFullEditTaskPop: (state) => {
            return {
                ...state,
                isEditDetailsPopOpen: false,
                getDetailsForTask: null
            }
        },
        toggleAddTaskPop: (state) => {
            return {
                ...state,
                isAddTaskPop: !state.isAddTaskPop
            }
        },
        toggleNewBoardPop: (state) => {
            return {
                ...state,
                newBoardPop: !state.newBoardPop
            }
        },
        toggleEditBoardPop: (state) => {
            return {
                ...state,
                editBoardPop: !state.editBoardPop
            }
        },
        toggleDeleteBoardPop: (state) => {
            return {
                ...state,
                deleteBoardPop: !state.deleteBoardPop
            }
        },
        toggleDeleteTaskPop: (state) => {
            return {
                ...state,
                deleteTaskPop: !state.deleteTaskPop
            }
        }
    }
})

export const { changeViewMode, hideSidebar, changeActiveBoardId, openDetailsPop, updateDetailsForView, closeDetailsPop, openFullEditTaskPop, closeFullEditTaskPop, toggleAddTaskPop, toggleNewBoardPop, toggleEditBoardPop, toggleDeleteBoardPop, toggleDeleteTaskPop } = UX.actions;

export default UX.reducer;