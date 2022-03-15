import { createSlice } from '@reduxjs/toolkit';
import { TabOptions } from 'helpers/constants';

const initialState = {
  tab: TabOptions.Conversations,
};

export const messengerSlice = createSlice({
  name: 'messenger',
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { changeTab } = messengerSlice.actions;

export default messengerSlice.reducer;
