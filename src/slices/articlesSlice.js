import { fetchArticleById } from '../thunk/fetchArticleById';
import { fetchArticlesList } from '../thunk/fetchArticlesList';
import { createSlice } from '@reduxjs/toolkit';
import { timeoutIdReducer } from '../reducers/timeoutIdReducer';

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    loading: 'idle',
    ids: [],
    entities: {},
    timeoutId: null,
  },
  reducers: {
    timeoutId: {
      reducer: timeoutIdReducer
    },
  },
  extraReducers: {
    [fetchArticleById.pending]: (state, action) => {
      const id = action.meta.arg;
      if (!state.entities[id]) {
        state.entities[id] = { status: 'loading' };
      }
    },
    [fetchArticleById.rejected]: (state, action) => {
      const id = action.meta.arg;
      state.entities[id] = { status: 'failure' };
    },
    [fetchArticleById.fulfilled]: (state, action) => {
      const id = action.meta.arg;
      if (action.payload === null) {
        state.entities[id] = { status: 'failure' };  
      } else { 
        state.entities[id] = { status: 'success', data: action.payload };
      }
    },
    [fetchArticlesList.pending]: state => {
      if (!state.ids) {
        state.ids = { status: 'loading' };
      }
    },
    [fetchArticlesList.rejected]: (state, action) => {
      state.ids = { status: 'failure', data: action.payload };      
    },
    [fetchArticlesList.fulfilled]: (state, action) => {
      state.ids = { status: 'success', data: action.payload };
    }
  }
})