import { createSlice } from '@reduxjs/toolkit';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"


const initialState = {
  categories:null,
  courses:null,
  promotions:null,
  sections:[],
  selectChapter:null,
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
        lecture: [],
      }
      state.sections.push(obj)
    },
    sections:(state,action)=>{
      state.sections=action.payload
    },
    addLecture:(state,action)=>{
      console.log('action',action.payload)
      let lecture ={
        title:action.payload.title,
        video:action.payload.video[0].filename,
      }
      state.sections[action.payload.id].lecture.push(lecture)
    },
    selectChapter:(state,action)=>{
      state.selectChapter=action.payload

    },
  }
});

const { reducer, actions } = userSlice
export const { categories,
  courses,
  promotions,
  setSections,
  sections,
  addLecture,
  selectChapter
} = actions
export default reducer;
