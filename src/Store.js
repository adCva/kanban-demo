import { configureStore  } from '@reduxjs/toolkit';
import UX from "./Redux/UX";
import data from "./Redux/data";

export default configureStore({
    reducer: {
        ux: UX,
        data: data
    }
})