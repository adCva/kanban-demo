import { createSlice } from '@reduxjs/toolkit';

export const UX = createSlice({
    name: "User Experience",
    initialState: {
        darkMode: false,
        isSidebarHidden: false
    },

    reducers: {
        changeViewMode: (state) => {
            state.darkMode = !state.darkMode;
        },
        hideSidebar: (state) => {
            state.isSidebarHidden = true;
        }
    }
})

export const { changeViewMode, hideSidebar } = UX.actions;

export default UX.reducer;