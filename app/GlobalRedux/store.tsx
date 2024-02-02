'use client'
import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from './reducers';

const store = configureStore({
  reducer: rootReducer,
  // Other middleware and configuration options can be added here
});

export default store;
