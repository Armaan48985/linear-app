'use client'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/reducers';
import {
  addInBacklog,
  addInDone,
  addInProgress,
  addInReview,
  addInTodo,
} from '@/app/GlobalRedux/Slice';

export const useIssueUtils = () => {
  const dispatch = useDispatch();
  const reviewIssues = useSelector((state: RootState) => state.app.reviewIssues);
  const progressIssues = useSelector((state: RootState) => state.app.progressIssues);
  const backlogIssues = useSelector((state: RootState) => state.app.backlogIssues);
  const doneIssues = useSelector((state: RootState) => state.app.doneIssues);
  const todoIssues = useSelector((state: RootState) => state.app.todoIssues);

  var date = new Date();

  const addIssuetoReview = (issueTitle:string) => {
    const newIssue = {
      id: reviewIssues.length + 1,
      name: issueTitle,
      time: date
    };
    dispatch(addInReview(newIssue));
  };

  const addIssuetoProgress = (issueTitle:string) => {
    const newIssue = {
      id: progressIssues.length + 1,
      name: issueTitle,
      time: date
    };
    dispatch(addInProgress(newIssue));
  };

  const addIssuetoBacklog = (issueTitle:string) => {
    const newIssue = {
      id: backlogIssues.length + 1,
      name: issueTitle,
      time: date
    };
    console.log("add issue to backlog", newIssue)
    dispatch(addInBacklog(newIssue));
  };

  const addIssuetoDone = (issueTitle:string) => {
    const newIssue = {
      id: doneIssues.length + 1,
      name: issueTitle,
      time: date
    };
    dispatch(addInDone(newIssue));
  };

  const addIssuetoTodo = (issueTitle:string) => {
    const newIssue = {
      id: todoIssues.length + 1,
      name: issueTitle,
      time: date
    };
    dispatch(addInTodo(newIssue));
  };

  return {
    addIssuetoReview,
    addIssuetoProgress,
    addIssuetoBacklog,
    addIssuetoDone,
    addIssuetoTodo,
  };
};