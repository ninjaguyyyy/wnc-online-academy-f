import { configureStore } from '@reduxjs/toolkit';
import sign from './signSlice';
import user from './userSlice';
import teacher from './teacherSlice';
import messenger from './messengerSlice';

const rootReducer = {
  sign,
  user,
  teacher,
  messenger,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
