﻿"use client";
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

  var fulldate = new Date();
  var date = fulldate.getDate();
  var month = fulldate.toLocaleString("en-US", { month: "long" });
  var time = { date, month };

  const actionCreators: Record<string, Function> = {
    review: addInReview,
    todo: addInTodo,
    progress: addInProgress,
    backlog: addInBacklog,
    done: addInDone,
  };

  const addIssuetoReview = (
    issueTitle: string,
    value: string,
    priority: string,
    label: string,
    dueDate: { date: number; month: number }
  ) => {
    const newIssue = {
      id: reviewIssues.length + 1,
      name: issueTitle,
      time: time,
      priority: priority,
      label: label,
      dueDate: dueDate,
    };
    const selectedAction =
      actionCreators[value as keyof typeof actionCreators] || addInReview;
    addDataToFireStore(
      issueTitle,
      value || "review",
      "naruto",
      time,
      priority,
      label,
      dueDate
    );
    dispatch(selectedAction(newIssue));
  };

  const addIssuetoProgress = (
    issueTitle: string,
    value: string,
    priority: string,
    label: string,
    dueDate: { date: number; month: number }
  ) => {
    const newIssue = {
      id: progressIssues.length + 1,
      name: issueTitle,
      time: time,
      priority: priority,
      label: label,
      dueDate: dueDate,
    };
    const selectedAction =
      actionCreators[value as keyof typeof actionCreators] || addInProgress;
    addDataToFireStore(
      issueTitle,
      value || "progress",
      "naruto",
      time,
      priority,
      label,
      dueDate
    );
    dispatch(selectedAction(newIssue));
  };

  const addIssuetoBacklog = (
    issueTitle: string,
    value: string,
    priority: string,
    label: string,
    dueDate: { date: number; month: number }
  ) => {
    const newIssue = {
      id: backlogIssues.length + 1,
      name: issueTitle,
      time: time,
      priority: priority,
      label: label,
      dueDate: dueDate,
    };
    const selectedAction =
      actionCreators[value as keyof typeof actionCreators] || addInBacklog;
    addDataToFireStore(
      issueTitle,
      value || "progress",
      "naruto",
      time,
      priority,
      label,
      dueDate
    );
    dispatch(selectedAction(newIssue));
  };

  const addIssuetoDone = (
    issueTitle: string,
    value: string,
    priority: string,
    label: string,
    dueDate: { date: number; month: number }
  ) => {
    const newIssue = {
      id: doneIssues.length + 1,
      name: issueTitle,
      time: time,
      priority: priority,
      label: label,
      dueDate: dueDate,
    };
    const selectedAction =
      actionCreators[value as keyof typeof actionCreators] || addInDone;
    addDataToFireStore(
      issueTitle,
      value || "done",
      "naruto",
      time,
      priority,
      label,
      dueDate
    );
    console.log("added");
    dispatch(selectedAction(newIssue));
  };

  const addIssuetoTodo = (
    issueTitle: string,
    value: string,
    priority: string,
    label: string,
    dueDate: { date: number; month: number }
  ) => {
    const newIssue = {
      id: todoIssues.length + 1,
      name: issueTitle,
      time: time,
      priority: priority,
      label: label,
      dueDate: dueDate,
    };
    const selectedAction =
      actionCreators[value as keyof typeof actionCreators] || addInTodo;
    addDataToFireStore(
      issueTitle,
      value || "todo",
      "naruto",
      time,
      priority,
      label,
      dueDate
    );
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
