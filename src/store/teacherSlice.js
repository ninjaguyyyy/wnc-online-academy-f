import { createSlice } from '@reduxjs/toolkit';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"


const initialState = {
  categories:null

};

const userSlice = createSlice({
  name: 'teacher',
  initialState: initialState,
  reducers: {
    categories:(state, action)=>{
      state.categories=action.payload
    },
  }
});

const { reducer, actions } = userSlice
export const { categories } = actions
export default reducer;
