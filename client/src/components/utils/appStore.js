import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import bookReducer from "./bookSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
  },
});

export default appStore;
