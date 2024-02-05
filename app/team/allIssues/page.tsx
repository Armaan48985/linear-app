"use client";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import "@/app/globals.css";
import { FaDotCircle, FaRegStar } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa6";
import { LuAlignVerticalJustifyCenter } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Sidebar from "@/components/Sidebar";
import { GoPlus } from "react-icons/go";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/reducers";
import {
  ArrayItem,
  addInBacklog,
  addInDone,
  addInProgress,
  addInReview,
  addInTodo,
  deleteFromDone,
} from "@/app/GlobalRedux/Slice";
import CreateIssue from "@/components/CreateIssue";
import { useIssueUtils } from "./AddingIssues";
import {
  DeleteDataFromFireStore,
  addDataToFireStore,
  fetchDataFromFireStore,
} from "@/app/db";
import { DropArea } from "@/components/DropArea";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import DisplayDropdown from "@/components/dropdowns/DisplayDropdown";
import NotificationDropdown from "@/components/dropdowns/NotificationDropdown";
import fetchIssues from "@/components/fetchIssues";

const page = () => {
  const dispatch = useDispatch();
  const backlogIssues = useSelector(
    (state: RootState) => state.app.backlogIssues
  );
  const todoIssues = useSelector((state: RootState) => state.app.todoIssues);
  const reviewIssues = useSelector(
    (state: RootState) => state.app.reviewIssues
  );
  const doneIssues = useSelector((state: RootState) => state.app.doneIssues);
  const progressIssues = useSelector(
    (state: RootState) => state.app.progressIssues
  );

  const { fetchDataAndInitializeState } = fetchIssues();

  useEffect(() => {
    fetchDataAndInitializeState("backlog");
    fetchDataAndInitializeState("todo");
    fetchDataAndInitializeState("review");
    fetchDataAndInitializeState("done");
    fetchDataAndInitializeState("progress");
  }, []);

  const {
    addIssuetoBacklog,
    addIssuetoDone,
    addIssuetoProgress,
    addIssuetoReview,
    addIssuetoTodo,
  } = useIssueUtils();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const draggedItem = Number(result.draggableId); // Access the dragged item ID
    const draggedFrom = result.source.droppableId; // Access the ID of the source list
    const droppedAt = result.destination?.droppableId;

    if (draggedFrom == "doneContainer" && droppedAt == "backlogContainer") {
      addInBacklog(doneIssues[draggedItem]);
      deleteFromDone(draggedItem);
      // addDataToFireStore(doneIssues[draggedItem].name, "backlog", 'naruto', doneIssues[draggedItem].time)
    }
  };

  const handleDragStart = (start: any) => {
    const draggedItem = Number(start.draggableId); // Access the dragged item ID
    const sourceListId = start.source.droppableId;

    if (sourceListId == "doneContainer") {
      // DeleteDataFromFireStore("naruto", "done", doneIssues[draggedItem].name);
      // setTimeout(() => location.reload(), 1500)
    }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen w-full bg-body"
    >
      <ResizablePanel defaultSize={35} className="max-w-[380px] min-w-[260px]">
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle className="text-gray" />
      <ResizablePanel defaultSize={65}>
        <div>
          <nav className="flex justify-between items-center border-b-2 border-slate-800 py-4 px-10">
            <div className="flex">
              <h2 className="flex text-md items-center gap-2 ">
                All issues{" "}
                <span className="opacity-60 ml-2 bgHover-grey p-1 rounded-lg">
                  <FaRegStar />
                </span>
              </h2>
              {/* <ComboBoxResponsive name={<p className='flex items-center gap-2 border-2 border-dashed border-gray-800 rounded-[.5rem] ml-8 py-1 px-3'><span className='opacity-60'><MdFilterList /></span>Filter</p>}/> */}
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="default"
                        className="bg-grey rounded-lg px-3 h-7"
                      >
                        <FaAlignJustify />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-grey border-none outline-none rounded-md mt-2">
                      <p className="text-[13px]">
                        List
                        <span className="bg-lightgrey rounded-md ml-2 px-1">
                          Ctrl
                        </span>
                        <span className="bg-lightgrey rounded-md px-1">B</span>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="default"
                        className="bg-darkgrey rounded-lg px-3 h-7 icon-hover"
                      >
                        <LuAlignVerticalJustifyCenter />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-grey border-none outline-none rounded-md mt-2">
                      <p className="text-[13px]">
                        Board
                        <span className="bg-lightgrey rounded-md ml-2 px-1">
                          Ctrl
                        </span>
                        <span className="bg-lightgrey rounded-md px-1">B</span>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <DisplayDropdown />
              <NotificationDropdown />

              <div className="h-5 w-[2px] bg-gray-600 mr-3"></div>

              <span className="icon-hover font-extrabold text-md ml-3">
                <BsLayoutSidebarReverse />
              </span>
            </div>
          </nav>

          {reviewIssues.length > 0 && (
            <div>
              <header className="bg-darkgrey w-full h-11 fle key={i}x-between px-6">
                <p>In Review</p>
                <CreateIssue
                  trigger={<GoPlus />}
                  createIssue={addIssuetoReview}
                  issueType="review"
                />
              </header>

              <main className="w-full flex flex-col items-center">
                {reviewIssues.map((e, i) => (
                  <div
                    key={i}
                    className="border-b-2 bgHover-darkgrey duration-75 border-gray-800 h-11 flex-between w-full px-6"
                  >
                    <p>{e.name}</p>
                    <div className="flex-center gap-2">
                      <p>{e.time.date}</p>
                      <p>{e.time.month}</p>
                    </div>
                  </div>
                ))}
              </main>
            </div>
          )}
          {progressIssues.length > 0 && (
            <div>
              <header className="bg-darkgrey w-full h-11 flex-between px-6">
                <p>In Progress</p>
                <CreateIssue
                  trigger={<GoPlus />}
                  createIssue={addIssuetoProgress}
                  issueType="progress"
                />
              </header>

              <main className="w-full flex flex-col items-center">
                {progressIssues.map((e, i) => (
                  <div
                    key={i}
                    className="border-b-2 bgHover-darkgrey duration-75 border-slate-800 h-11 flex-between w-full px-6"
                  >
                    <picture>{e.name}</picture>
                    <div className="flex-center gap-2">
                      <div className="flex-center gap-2">
                        <p>{e.time.date}</p>
                        <p>{e.time.month}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </main>
            </div>
          )}
          {todoIssues.length > 0 && (
            <div>
              <header className="bg-darkgrey w-full h-11 flex-between px-6">
                <p>Todo</p>
                <CreateIssue
                  trigger={<GoPlus />}
                  createIssue={addIssuetoTodo}
                  issueType="todo"
                />
              </header>

              <main className="w-full flex flex-col items-center">
                {todoIssues.map((e, i) => (
                  <div className="border-b-2 bgHover-darkgrey duration-75 border-gray-800 h-11 flex-between w-full px-6">
                    <p key={i}>{e.name}</p>
                    <div className="flex-center gap-2">
                      <div className="flex-center gap-2">
                        <p>{e.time.date}</p>
                        <p>{e.time.month}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </main>
            </div>
          )}
          <DragDropContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {backlogIssues.length > 0 && (
              <Droppable droppableId="backlogContainer" type="ISSUE_TYPE">
                {(dropabbleProvided) => (
                  <div
                    {...dropabbleProvided.droppableProps}
                    ref={dropabbleProvided.innerRef}
                  >
                    <header className="bg-darkgrey w-full h-11 flex-between px-6">
                      <p>Backlog</p>
                      {dropabbleProvided.placeholder}
                      <CreateIssue
                        trigger={<GoPlus />}
                        createIssue={addIssuetoBacklog}
                        issueType="backlog"
                      />
                    </header>

                    <main className="w-full flex flex-col items-center">
                      {backlogIssues.map((e, i) => (
                        <Draggable draggableId={`${i}`} index={i} key={i}>
                          {(draggableProvided) => (
                            <div
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                              ref={draggableProvided.innerRef}
                              className="border-b-2 bgHover-darkgrey duration-75 border-gray-800 h-11 flex-between w-full px-6"
                            >
                              <p key={i}>{e.name}</p>
                              <div className="flex-center gap-2">
                                <div className="flex-center gap-2">
                                  <p>{e.time.date}</p>
                                  <p>{e.time.month}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </main>
                  </div>
                )}
              </Droppable>
            )}

            {doneIssues.length > 0 && (
              <Droppable droppableId="doneContainer" type="ISSUE_TYPE">
                {(dropabbleProvided) => (
                  <div
                    {...dropabbleProvided.droppableProps}
                    ref={dropabbleProvided.innerRef}
                  >
                    <header className="bg-darkgrey w-full h-11 flex-between px-6">
                      <p>Done</p>
                      {dropabbleProvided.placeholder}
                      <CreateIssue
                        trigger={<GoPlus />}
                        createIssue={addIssuetoDone}
                        issueType="done"
                      />
                    </header>

                    <main className="w-full flex flex-col items-center">
                      {doneIssues.map((e, i) => (
                        <Draggable draggableId={`${i}`} index={i} key={i}>
                          {(draggableProvided) => (
                            <div
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                              ref={draggableProvided.innerRef}
                              className="border-b-2 bgHover-darkgrey duration-75 border-gray-800 h-11 flex-between w-full px-6"
                            >
                              <p key={i}>{e.name}</p>
                              <div className="flex-center gap-2">
                                <p>{e.time.date}</p>
                                <p>{e.time?.month}</p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </main>
                  </div>
                )}
              </Droppable>
            )}
          </DragDropContext>

          {reviewIssues.length === 0 &&
            progressIssues.length === 0 &&
            todoIssues.length === 0 &&
            backlogIssues.length === 0 &&
            doneIssues.length === 0 && (
              <div className="absolute w-[30rem] flex justify-center text-left flex-col px-10 gap-4 h-[25rem] translate-x-[-35%] translate-y-[-35%] left-[50%] top-[50%] bg-grey rounded-lg p-3">
                <h1 className="text-2xl text-left font-bold py-2">
                  All Issues
                </h1>
                <p className="opacity-70">
                  All Issues is the place where you can see all of your team's
                  work in one view.
                </p>
                <p className="opacity-70 mt-3">
                  Once you have created some issues for your team, they will
                  show up here.
                </p>

                <div className="bg-[#575AC6] w-[160px] h-[35px] flex-center rounded-md mt-5">
                  <CreateIssue
                    trigger="create a new issue"
                    createIssue={addIssuetoReview}
                  />
                </div>
              </div>
            )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default page;
