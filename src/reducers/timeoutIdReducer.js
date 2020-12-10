import { createAction, createReducer } from '@reduxjs/toolkit';

export const timeoutIdActionCreator = createAction('articles/timeoutId');

export const timeoutIdReducer = createReducer(null, {
  [timeoutIdActionCreator]: (state, action) => {
    state.timeoutId = action.payload
  },
});