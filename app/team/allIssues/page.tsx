"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import "@/app/globals.css";
import { FaCheckCircle, FaDotCircle, FaRegCalendar, FaRegCircle, FaRegStar } from "react-icons/fa";
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
import { GoDotFill, GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/reducers";
import CreateIssue from "@/components/CreateIssue";
import { useIssueUtils } from "./AddingIssues";
import DisplayDropdown from "@/components/dropdowns/DisplayDropdown";
import NotificationDropdown from "@/components/dropdowns/NotificationDropdown";
import fetchIssues from "@/components/fetchIssues";
import { IssueEdit } from "@/components/issueEdit";
import { BsThreeDots } from "react-icons/bs";
import PriorityCheck from "@/components/PriorityCheck";
import { FaUser } from "react-icons/fa";
import RightSidebar from "@/components/RightSidebar";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { PiCircleHalfFill } from "react-icons/pi";
import { TbCircleDotted } from "react-icons/tb";

const page = () => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const storedInitialized = localStorage.getItem("initialized"); // Check local storage
    if (storedInitialized !== "true") {
      fetchDataAndInitializeState("backlog");
      fetchDataAndInitializeState("todo");
      fetchDataAndInitializeState("review");
      fetchDataAndInitializeState("done");
      fetchDataAndInitializeState("progress");

      localStorage.setItem("initialized", "true"); // Save to local storage
    }
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem("initialized");
    };

    window.addEventListener("beforeunload", clearLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);


  const [rightSidebarOpen, setRightSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("rightSidebarOpen");
      return storedValue ? JSON.parse(storedValue) : false;
    } else {
      return false; // Default value if localStorage is not available
    }
  });

  const handleClick = () => {
    const newValue = !rightSidebarOpen; // Toggle the value
    setRightSidebarOpen(newValue); // Update the state
    localStorage.setItem("rightSidebarOpen", JSON.stringify(newValue)); // Store in local storage
  };

  const {
    addIssuetoBacklog,
    addIssuetoDone,
    addIssuetoProgress,
    addIssuetoReview,
    addIssuetoTodo,
  } = useIssueUtils();

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
                        onClick={() => setHorizontal(false)}
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
                        onClick={() => setHorizontal(true)}
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

              <span
                className="icon-hover font-extrabold text-md ml-3"
                onClick={handleClick}
              >
                <BsLayoutSidebarReverse />
              </span>
            </div>
          </nav>

          <div className="flex overflow-x-auto overflow-y-hidden min-h-[93vh]">
            <div className={`w-full ${horizontal ? "flex" : "block"}`}>
              {reviewIssues.length > 0 && (
                <div>
                  <header
                    className={`w-full h-11 flex-between px-6 ${
                      horizontal ? "bg-body w-[450px]" : "bg-darkgrey"
                    }`}
                  >
                    <p>Review</p>
                    <CreateIssue
                      trigger={<GoPlus />}
                      createIssue={addIssuetoReview}
                      issueType="review"
                    />
                  </header>

                  <main
                    className={`w-full flex flex-col ${
                      horizontal
                        ? "mt-10 items-start justify-start gap-20"
                        : " items-center"
                    }`}
                  >
                    {reviewIssues.map((e, i) => (
                      <IssueEdit
                        key={i}
                        id={i}
                        type="review"
                        clickEl={
                          <div
                            className={`flex w-full ${
                              horizontal
                                ? "bg-darkgrey py-3 pl-2 h-[100px] border-2 border-gray-600 mt-104 flex-col justify-start items-start rounded-sm"
                                : "justify-between"
                            }`}
                          >
                            <div className="flex-between gap-3">
                              <PriorityCheck priority={e.priority} />
                              <span className="text-green-600">
                                <BiSolidCircleThreeQuarter />
                              </span>
                              <p key={i}>{e.name}</p>
                            </div>
                            <div className="flex-center gap-3 text-[--low-opacity-txt]">
                              {e.dueDate.date != -1 && (
                                <span className="rounded-lgg flex-center gap-2 text-sm px-3 py-1 border-[1px] border-gray-800">
                                  <span>
                                    <FaRegCalendar />
                                  </span>
                                  {e.dueDate.date}{" "}
                                  {months[e.dueDate.month]?.slice(0, 3)}
                                </span>
                              )}
                              {e.label && (
                                <span className="rounded-lgg flex-center gap-2 text-sm px-3 py-1 border-[1px] border-gray-800">
                                  <span
                                    className={`${
                                      e.label == "bug"
                                        ? "text-[--red-100]"
                                        : e.label == "feature"
                                        ? "text-[--blue-300]"
                                        : "text-[--purpleMagenta-100]"
                                    } text-2xl`}
                                  >
                                    <GoDotFill />
                                  </span>
                                  {e.label}
                                </span>
                              )}
                              {!horizontal && (
                                <div className="flex-center gap-2 text-md">
                                  <p>{e.time.date}</p>
                                  <p>{e.time.month.slice(0, 3)}</p>
                                </div>
                              )}

                              {!horizontal && (
                                <span className="text-[9px] border-2 border-dotted border-[--low-opacity-txt] rounded-full p-[.1rem]">
                                  <FaUser />
                                </span>
                              )}
                            </div>
                          </div>
                        }
                      />
                    ))}
                  </main>
                </div>
              )}

              {progressIssues.length > 0 && (
                <div>
                  <header
                    className={`w-full h-11 flex-between px-6 ${
                      horizontal ? "bg-body w-[450px]" : "bg-darkgrey"
                    }`}
                  >
                    <p>In Progress</p>

                    <CreateIssue
                      trigger={<GoPlus />}
                      createIssue={addIssuetoProgress}
                      issueType="progress"
                    />
                  </header>

                  <main
                    className={`w-full flex flex-col ${
                      horizontal
                        ? "mt-10 items-start justify-start gap-20"
                        : " items-center"
                    }`}
                  >
                    {progressIssues.map((e, i) => (
                      <IssueEdit
                        key={i}
                        id={i}
                        type="progress"
                        clickEl={
                          <div
                            className={`flex w-full ${
                              horizontal
                                ? "bg-darkgrey py-3 pl-2 h-[100px] border-2 border-gray-600 mt-104 flex-col justify-start items-start rounded-sm"
                                : "justify-between"
                            }`}
                          >
                            <div className="flex-between gap-3">
                              <PriorityCheck priority={e.priority} />
                              <span className="text-yellow-400">
                                <PiCircleHalfFill />
                              </span>
                              <p key={i}>{e.name}</p>
                            </div>
                            <div className="flex-center gap-3 text-[--low-opacity-txt]">
                              {e.dueDate.date != -1 && (
                                <span className="rounded-lgg flex-center gap-2 text-sm px-3 py-1 border-[1px] border-gray-800">
                                  <span>
                                    <FaRegCalendar />
                                  </span>
                                  {e.dueDate.date}{" "}
                                  {months[e.dueDate.month]?.slice(0, 3)}
                                </span>
                              )}
                              {e.label && (
                                <span className="rounded-lgg flex-center gap-2 text-sm px-3 py-1 border-[1px] border-gray-800">
                                  <span
                                    className={`${
                                      e.label == "bug"
                                        ? "text-[--red-100]"
                                        : e.label == "feature"
                                        ? "text-[--blue-300]"
                                        : "text-[--purpleMagenta-100]"
                                    } text-2xl`}
                                  >
                                    <GoDotFill />
                                  </span>
                                  {e.label}
                                </span>
                              )}
                              <div className="flex-center gap-2 text-md">
                                <p>{e.time.date}</p>
                                <p>{e.time.month.slice(0, 3)}</p>
                              </div>

                              <span className="text-[9px] border-2 border-dotted border-[--low-opacity-txt] rounded-full p-[.1rem]">
                                <FaUser />
                              </span>
                            </div>
                          </div>
                        }
                      />
                    ))}
                  </main>
                </div>
              )}

              {todoIssues.length > 0 && (
                <div>
                  <header
                    className={`w-full h-11 flex-between px-6 ${
                      horizontal ? "bg-body w-[450px]" : "bg-darkgrey"
                    }`}
                  >
                    <p>Todo</p>
                    <CreateIssue
                      trigger={<GoPlus />}
                      createIssue={addIssuetoTodo}
                      issueType="todo"
                    />
                  </header>

                  <main
                    className={`w-full flex flex-col ${
                      horizontal
                        ? "mt-10 items-start justify-start gap-20"
                        : " items-center"
                    }`}
                  >
                    {todoIssues.map((e, i) => (
                      <IssueEdit
                        key={i}
                        id={i}
                        type="todo"
                        clickEl={
                          <div
                            className={`flex w-full ${
                              horizontal
                                ? "bg-darkgrey py-3 pl-2 h-[100px] border-2 border-gray-600 mt-104 flex-col justify-start items-start rounded-sm"
                                : "justify-between"
                            }`}
                          >
                            <div className="flex-between gap-3">
                              <PriorityCheck priority={e.priority} />
                              <FaRegCircle />
                              <p key={i}>{e.name}</p>
                            </div>
                            <div className="flex-center gap-3 text-[--low-opacity-txt]">
                              {e.dueDate.date != -1 && (
                                <span className="rounded-lgg flex-center gap-2 text-sm px-3 py-1 border-[1px] border-gray-800">
                                  <span>
                                    <FaRegCalendar />
                                  </span>
                                  {e.dueDate.date}{" "}
                                  {months[e.dueDate.month]?.slice(0, 3)}
                                </span>
                              )}
                              {e.label && (
                                <span className="rounded-lgg flex-center gap-2 text-sm px-3 py-1 border-[1px] border-gray-800">
                                  <span
                                    className={`${
                                      e.label == "bug"
                                        ? "text-[--red-100]"
                                        : e.label == "feature"
                                        ? "text-[--blue-300]"
                                        : "text-[--purpleMagenta-100]"
                                    } text-2xl`}
                                  >
                                    <GoDotFill />
                                  </span>
                                  {e.label}
                                </span>
                              )}
                              <div className="flex-center gap-2 text-md">
                                <p>{e.time.date}</p>
                                <p>{e.time.month.slice(0, 3)}</p>
                              </div>

                              <span className="text-[9px] border-2 border-dotted border-[--low-opacity-txt] rounded-full p-[.1rem]">
                                <FaUser />
                              </span>
                            </div>
                          </div>
                        }
                      />
                    ))}
                  </main>
                </div>
              )}

              {backlogIssues.length > 0 && (
                <div>
                  <header
                    className={`w-full h-11 flex-between px-6 ${
                      horizontal ? "bg-body w-[450px]" : "bg-darkgrey"
                    }`}
                  >
                    <p>Backlog</p>
                    <CreateIssue
                      trigger={<GoPlus />}
                      createIssue={addIssuetoBacklog}
                      issueType="backlog"
                    />
                  </header>

                  <main
                    className={`w-full flex flex-col ${
                      horizontal
                        ? "mt-10 items-start justify-start gap-20"
                        : " items-center"
                    }`}
                  >
                    {backlogIssues.map((e, i) => (
                      <IssueEdit
                        key={i}
                        id={i}
                        type="backlog"
                        clickEl={
                          <div
                            className={`flex w-full ${
                              horizontal
                                ? "bg-darkgrey py-3 pl-2 h-[100px] border-2 border-gray-600 mt-104 flex-col justify-start items-start rounded-sm"
                                : "justify-between"
                            }`}
                          >
                            <div className="flex-between gap-3">
                              <PriorityCheck priority={e.priority} />
                              <TbCircleDotted />
                              <p key={i}>{e.name}</p>
                            </div>
                            <div className="flex-center gap-3 text-[--low-opacity-txt]">
                              {e.dueDate.date != -1 && (
                                <span className="rounded-lgg flex-center gap-2 text-sm px-3 py-1 border-[1px] border-gray-800">
                                  <span>
                                    <FaRegCalendar />
                                  </span>
                                  {e.dueDate.date}{" "}
                                  {months[e.dueDate.month]?.slice(0, 3)}
                                </span>
                              )}
                              {e.label && (
                                <span className="rounded-lgg flex-center gap-2 text-sm px-2 py-[1px] border-[1px] border-gray-800">
                                  <span
                                    className={`${
                                      e.label == "bug"
                                        ? "text-[--red-100]"
                                        : e.label == "feature"
                                        ? "text-[--blue-300]"
                                        : "text-[--purpleMagenta-100]"
                                    } text-2xl`}
                                  >
                                    <GoDotFill />
                                  </span>
                                  {e.label}
                                </span>
                              )}
                              <div className="flex-center gap-2 text-md">
                                <p>{e.time.date}</p>
                                <p>{e.time.month.slice(0, 3)}</p>
                              </div>

                              <span className="text-[9px] border-2 border-dotted border-[--low-opacity-txt] rounded-full p-[.1rem]">
                                <FaUser />
                              </span>
                            </div>
                          </div>
                        }
                      />
                    ))}
                  </main>
                </div>
              )}

              {doneIssues.length > 0 && (
                <div>
                  <header
                    className={`w-full h-11 flex-between px-6 ${
                      horizontal ? "bg-body w-[450px]" : "bg-darkgrey"
                    }`}
                  >
                    <p>Done</p>

                    <CreateIssue
                      trigger={<GoPlus />}
                      createIssue={addIssuetoDone}
                      issueType="done"
                    />
                  </header>

                  <main
                    className={`w-full flex flex-col ${
                      horizontal
                        ? "mt-10 items-start justify-start gap-20"
                        : " items-center"
                    }`}
                  >
                    {doneIssues.map((e, i) => (
                      <IssueEdit
                        id={i}
                        key={i}
                        type="done"
                        clickEl={
                          <div
                            className={`flex w-full ${
                              horizontal
                                ? "bg-darkgrey py-3 pl-2 h-[100px] border-2 border-gray-600 mt-104 flex-col justify-start items-start rounded-sm"
                                : "justify-between"
                            }`}
                          >
                            <div className="flex-between gap-3">
                              <PriorityCheck priority={e.priority} />
                              <span className="text-blue-700">
                                <FaCheckCircle />
                              </span>
                              <p key={i}>{e.name}</p>
                            </div>
                            <div className="flex-center gap-3 text-[--low-opacity-txt]">
                              {e.dueDate.date != -1 && (
                                <span className="rounded-lgg flex-center gap-2 text-sm px-3 py-1 border-[1px] border-gray-800">
                                  <span>
                                    <FaRegCalendar />
                                    dfdf
                                  </span>
                                  {e.dueDate.date}{" "}
                                  {months[e.dueDate.month]?.slice(0, 3)}
                                </span>
                              )}
                              {e.label && (
                                <span className="rounded-lgg flex-center gap-2 text-sm px-3 py-1 border-[1px] border-gray-800">
                                  <span
                                    className={`${
                                      e.label == "bug"
                                        ? "text-[--red-100]"
                                        : e.label == "feature"
                                        ? "text-[--blue-300]"
                                        : "text-[--purpleMagenta-100]"
                                    } text-2xl`}
                                  >
                                    <GoDotFill />
                                  </span>
                                  {e.label}
                                </span>
                              )}
                              <div className="flex-center gap-2 text-md">
                                <p>{e.time.date}</p>
                                <p>{e.time.month.slice(0, 3)}</p>
                              </div>

                              <span className="text-[9px] border-2 border-dotted border-[--low-opacity-txt] rounded-full p-[.1rem]">
                                <FaUser />
                              </span>
                            </div>
                          </div>
                        }
                      />
                    ))}
                  </main>
                </div>
              )}

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
                      All Issues is the place where you can see all of your
                      team's work in one view.
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

            {rightSidebarOpen && (
              <div className="w-[28rem]">
                <RightSidebar />
              </div>
            )}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default page;
