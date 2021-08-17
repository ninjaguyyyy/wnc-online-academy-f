import { configureStore } from '@reduxjs/toolkit';
import sign from './signSlice';
import user from './userSlice';
import teacher from './teacherSlice';

const rootReducer = {
  sign,
  user,
  teacher,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
