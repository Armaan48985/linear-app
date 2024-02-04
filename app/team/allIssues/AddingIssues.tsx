"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/reducers";
import {
  addInBacklog,
  addInDone,
  addInProgress,
  addInReview,
  addInTodo,
} from "@/app/GlobalRedux/Slice";
import { addDataToFireStore } from "@/app/db";

export const useIssueUtils = () => {
  const dispatch = useDispatch();
  const reviewIssues = useSelector(
    (state: RootState) => state.app.reviewIssues
  );
  const progressIssues = useSelector(
    (state: RootState) => state.app.progressIssues
  );
  const backlogIssues = useSelector(
    (state: RootState) => state.app.backlogIssues
  );
  const doneIssues = useSelector((state: RootState) => state.app.doneIssues);
  const todoIssues = useSelector((state: RootState) => state.app.todoIssues);

  var date = new Date();
  
  const actionCreators: Record<string, Function> = {
    review: addInReview,
    todo: addInTodo,
    progress: addInProgress,
    backlog: addInBacklog,
    done: addInDone,
  };

  const addIssuetoReview = (issueTitle: string, value: string) => {
    const newIssue = {
      id: reviewIssues.length + 1,
      name: issueTitle,
      time: date,
    };
    const selectedAction = actionCreators[value as keyof typeof actionCreators] || addInReview;
    addDataToFireStore(issueTitle, value || "review", "naruto", date);
    dispatch(selectedAction(newIssue));
  };

  const addIssuetoProgress = (issueTitle: string, value: string) => {
    const newIssue = {
      id: progressIssues.length + 1,
      name: issueTitle,
      time: date,
    };
    const selectedAction = actionCreators[value as keyof typeof actionCreators] || addInProgress;
    addDataToFireStore(issueTitle, value || "progress", "naruto", date);
    dispatch(selectedAction(newIssue));
  };

  const addIssuetoBacklog = (issueTitle: string, value: string) => {
    const newIssue = {
      id: backlogIssues.length + 1,
      name: issueTitle,
      time: date,
    };
    const selectedAction = actionCreators[value as keyof typeof actionCreators] || addInBacklog;
    addDataToFireStore(issueTitle, value || "backlog", "naruto", date);
    dispatch(selectedAction(newIssue));
  };

  const addIssuetoDone = (issueTitle: string, value: string) => {
    const newIssue = {
      id: doneIssues.length + 1,
      name: issueTitle,
      time: date,
    };
    const selectedAction = actionCreators[value as keyof typeof actionCreators] || addInDone
    addDataToFireStore(issueTitle, value || "done", "naruto", date);
    dispatch(selectedAction(newIssue));
  };

  const addIssuetoTodo = (issueTitle: string, value: string) => {
    const newIssue = {
      id: todoIssues.length + 1,
      name: issueTitle,
      time: date,
    };
    const selectedAction = actionCreators[value as keyof typeof actionCreators] || addInTodo;
    addDataToFireStore(issueTitle, value || "todo", "naruto", date);
    dispatch(selectedAction(newIssue));
  };

  return {
    addIssuetoReview,
    addIssuetoProgress,
    addIssuetoBacklog,
    addIssuetoDone,
    addIssuetoTodo,
  };
};
