import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState:{
    user:null,
    isLoading:true
  },
  reducers: {
    addUser: (state, action) => {
      state.user=action.payload
    },
    removeUser: (state, action) => {
      state.user=null;
    },
    setisLoading:(state,action)=>{
      state.isLoading=action.payload
    }
  },
});

export const { addUser, removeUser ,setisLoading} = userSlice.actions;
export default userSlice.reducer;
