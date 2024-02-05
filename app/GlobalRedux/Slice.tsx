'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';

export interface ArrayItem {
  id: number;
  name: string; 
  time: {date: number, month: string};
}

// Extend the existing AppState interface
export interface AppState {
  value: string;
  isOpened: boolean;
  // Add five state arrays of objects
  backlogIssues: ArrayItem[];
  progressIssues: ArrayItem[];
  todoIssues: ArrayItem[];
  doneIssues: ArrayItem[];
  reviewIssues: ArrayItem[];
}

const initialState: AppState = {
  value: 'todo',
  isOpened: false,
  backlogIssues: [],
  progressIssues: [],
  todoIssues: [],
  doneIssues: [],
  reviewIssues: [],
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setValue: (state: AppState, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setIsOpened: (state: AppState, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
    },
    addInReview: (state: AppState, action: PayloadAction<ArrayItem>) => {
      state.reviewIssues.push(action.payload);
    },
    addInProgress: (state: AppState, action: PayloadAction<ArrayItem>) => {
      state.progressIssues.push(action.payload);
    },
    addInTodo: (state: AppState, action: PayloadAction<ArrayItem>) => {
      state.todoIssues.push(action.payload);
    },
    addInBacklog: (state: AppState, action: PayloadAction<ArrayItem>) => {
      state.backlogIssues.push(action.payload);
    },
    addInDone: (state: AppState, action: PayloadAction<ArrayItem>) => {
      state.doneIssues.push(action.payload);
    },
    deleteFromReview: (state: AppState, action: PayloadAction<number>) => {
      const indexToDelete = action.payload;
      state.reviewIssues = state.reviewIssues.filter((_, index) => index !== indexToDelete);
    },
    
    deleteFromProgress: (state: AppState, action: PayloadAction<number>) => {
      const indexToDelete = action.payload;
      state.progressIssues = state.progressIssues.filter((_, index) => index !== indexToDelete);
    },

    deleteFromTodo: (state: AppState, action: PayloadAction<number>) => {
      const indexToDelete = action.payload;
      state.todoIssues = state.todoIssues.filter((_, index) => index !== indexToDelete);
    },

    deleteFromBacklog: (state: AppState, action: PayloadAction<number>) => {
      const indexToDelete = action.payload;
      state.backlogIssues = state.backlogIssues.filter((_, index) => index !== indexToDelete);
    },

    deleteFromDone: (state: AppState, action: PayloadAction<number>) => {
      const indexToDelete = action.payload;
      console.log("confirm deleting", indexToDelete);
      console.log("Current doneIssues:", state.doneIssues); // Add this line
      state.doneIssues = state.doneIssues.filter((item, index) => index !== indexToDelete);
    },
  },
});

export const {
  setValue,
  setIsOpened,
  addInBacklog,
  addInDone,
  addInProgress,
  addInReview,
  addInTodo,
  deleteFromReview,
  deleteFromProgress,
  deleteFromTodo,
  deleteFromBacklog,
  deleteFromDone,
} = appSlice.actions;

export default appSlice.reducer;
