import { createAsyncThunk } from '@reduxjs/toolkit';
import categoriesAPI from 'api/categoriesApi';

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const { categories } = await categoriesAPI.getAll();
  return categories;
});

export const fetchCategoriesTree = createAsyncThunk('categories/fetchTree', async () => {
  const { categories } = await categoriesAPI.getTree();
  return categories;
});
