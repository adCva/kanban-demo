import { createSlice } from '@reduxjs/toolkit';

export const UX = createSlice({
    name: "User Experience",
    initialState: {
        darkMode: true,
        isSidebarHidden: false,
        activeBoardId: 0,
        activeBoardName: "Platform Launch" 
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
        }
    }
})

export const { changeViewMode, hideSidebar, changeActiveBoardId } = UX.actions;

export default UX.reducer;