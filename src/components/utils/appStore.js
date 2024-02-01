import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import navigateReducer from "./NavigateSlice";
import bookReducer from "./bookSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    navigate: navigateReducer,
    book: bookReducer,
  },
});

export default appStore;
