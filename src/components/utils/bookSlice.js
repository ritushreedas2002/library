import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    category: null,
  },
  reducers: {
    modifyCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { modifyCategory } = bookSlice.actions;
export default bookSlice.reducer;
