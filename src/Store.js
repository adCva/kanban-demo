import { configureStore  } from '@reduxjs/toolkit';
import UX from "./Redux/UX";

export default configureStore({
    reducer: {
        ux: UX
    }
})