import { articleListAPI } from '../api/articleListApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { timeoutIdActionCreator } from '../reducers/timeoutIdReducer';

export const fetchArticlesList = createAsyncThunk(
  'articles/fetchIds',
  async (_, { dispatch, getState }) => {
    const { timeoutId } = getState();
    clearTimeout(timeoutId);
    const response = await articleListAPI.fetchIds();
    const nextTimeoutId = setTimeout(() => {
      dispatch(fetchArticlesList())
    }, 60_000);
    dispatch(timeoutIdActionCreator(nextTimeoutId));
    return response;
  }
);