import { articleAPI } from '../api/articleApi';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchArticleById = createAsyncThunk(
  'articles/fetchByIdStatus',
  async (articleId) => {
    const response = await articleAPI.fetchById(articleId)
    return response;
  }
);