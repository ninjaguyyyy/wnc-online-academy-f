import { createSlice } from '@reduxjs/toolkit';
import { fetchCategoriesTree } from './thunks';

const initialState = {
  tree: [],
  list: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    change: (state, action) => {
      state.tree = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesTree.fulfilled, (state, action) => {
      state.tree = action.payload;
    });
  },
});

export const { change } = categoriesSlice.actions;

export default categoriesSlice.reducer;
