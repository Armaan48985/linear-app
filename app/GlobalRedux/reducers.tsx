'use client'
import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './Slice'; // Adjust the path

const rootReducer = combineReducers({
  app: appReducer,
  // ... other reducers
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
