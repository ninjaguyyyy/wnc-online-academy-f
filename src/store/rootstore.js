import { configureStore } from '@reduxjs/toolkit';
import sign from './signSlice'
import user from './userSlice'
const rootReducer = {
    sign,
    user
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
