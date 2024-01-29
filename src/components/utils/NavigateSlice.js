import { createSlice } from "@reduxjs/toolkit";

const NavigateSlice = createSlice({
  name: 'navigate',
  initialState: {
    isOpen: false,
  },
  reducers: {
    setNavigation: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setNavigation } = NavigateSlice.actions;
export default NavigateSlice.reducer;
