import { createSlice } from '@reduxjs/toolkit';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"


const initialState = {
  categories:null,
  courses:null,
  promotions:null,
  sections:[]
};

const userSlice = createSlice({
  name: 'teacher',
  initialState: initialState,
  reducers: {
    categories:(state, action)=>{
      state.categories=action.payload
    },
    courses: (state,action)=>{
      state.courses=action.payload
    },
    promotions:(state,action)=>{
      state.promotions=action.payload
    },
    setSections: (state,action)=>{
      let obj ={
        name: action.payload,
        lecture: null,
      }
      state.sections.push(obj)
    }
  }
});

const { reducer, actions } = userSlice
export const { categories,courses,promotions,setSections } = actions
export default reducer;
