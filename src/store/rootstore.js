import { configureStore } from '@reduxjs/toolkit';
import guest from './guestSlice'
import user from './userSlice'
const rootReducer = {
    guest,
    user
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
