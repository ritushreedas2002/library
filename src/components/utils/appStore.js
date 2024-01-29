import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import navigateReducer from './NavigateSlice';
const appStore=configureStore({
    reducer:{
        user:userReducer,
        navigate:navigateReducer
    }
})

export default appStore;