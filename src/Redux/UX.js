import { createSlice } from '@reduxjs/toolkit';

export const UX = createSlice({
    name: "User Experience",
    initialState: {
        darkMode: true,
        isSidebarHidden: false,
        activeBoardId: 0,
        activeBoardName: "Platform Launch",
        detailsForTask: null 
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
            state.detailsForTask = action.payload.seeTask;
        },
        closeDetailsPop: (state) => {
            state.detailsForTask = null
        }
    }
})

export const { changeViewMode, hideSidebar, changeActiveBoardId, openDetailsPop, closeDetailsPop } = UX.actions;

export default UX.reducer;