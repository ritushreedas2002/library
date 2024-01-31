import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    theuser: null,
    isLoading: true,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = null;
    },
    addtheUser: (state, action) => {
      state.theuser = action.payload;
    },
    removetheUser: (state, action) => {
      state.theuser = null;
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { addUser, removeUser, setisLoading, addtheUser, removetheUser } =
  userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
