import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: null,
  courses: null,
  promotions: null,
  sections: [],
  selectChapter: null,
};

const userSlice = createSlice({
  name: 'teacher',
  initialState: initialState,
  reducers: {
    categories: (state, action) => {
      state.categories = action.payload;
    },
    courses: (state, action) => {
      state.courses = action.payload;
    },
    promotions: (state, action) => {
      state.promotions = action.payload;
    },
    setSections: (state, action) => {
      let obj = {
        name: action.payload,
        lectures: [],
      };
      state.sections.push(obj);
    },
    sections: (state, action) => {
      state.sections = action.payload;
    },
    addLecture: (state, action) => {
      let lecture = {
        title: action.payload.title,
        video: action.payload.video[0].filename,
        isPreview: action.payload.isPreview,
      };
      state.sections[action.payload.id].lectures.push(lecture);
    },
    selectChapter: (state, action) => {
      state.selectChapter = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { categories, courses, promotions, setSections, sections, addLecture, selectChapter } = actions;
export default reducer;
