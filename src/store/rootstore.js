import { configureStore } from '@reduxjs/toolkit';
import sign from './signSlice';
import user from './userSlice';
import teacher from './teacherSlice';
import messenger from './messengerSlice';
import categories from './categoriesSlice';

const rootReducer = {
  sign,
  user,
  teacher,
  messenger,
  categories,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
