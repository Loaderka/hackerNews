import { configureStore } from '@reduxjs/toolkit';
import { articlesSlice } from '../slices/articlesSlice';

export const store = configureStore({
  reducer: articlesSlice.reducer,
})
