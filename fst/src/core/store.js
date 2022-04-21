import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/user/userSlice.js';

export default configureStore({
    reducer: {
        user: userReducer
    }
});