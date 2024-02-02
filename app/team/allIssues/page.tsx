"use client";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import Sidebar from '@/pages/Sidebar'
import "@/app/globals.css";
import { FaDotCircle, FaRegStar } from "react-icons/fa";
// import {ComboBoxResponsive} from './filter't
import { FaAlignJustify } from "react-icons/fa6";
import { LuAlignVerticalJustifyCenter } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { MdFilterList } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoBellFill } from "react-icons/go";
import Sidebar from "@/components/Sidebar";
// import { ComboBoxResponsive } from '@/components/ui/shadcn/filter';
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { TbCircleDotted } from "react-icons/tb";
import { GoPlus } from "react-icons/go";
import { BiSolidCircleHalf } from "react-icons/bi";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/reducers";
import {
  addInBacklog,
  addInDone,
  addInProgress,
  addInReview,
  addInTodo,
} from "@/app/GlobalRedux/Slice";
import CreateIssue from "@/components/CreateIssue";
import { useIssueUtils } from "./AddingIssues";

const page = () => {
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="bg-grey gap-2 py-0 h-8 px-3 text-[13px] hover:bg-grey rounded-lg ml-2"
                  >
                    <span className="rotate-90">
                      <GiSettingsKnobs />
                    </span>{" "}
                    Display
                    <MdKeyboardArrowDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[18rem] bg-[#282a39] border-none outline-none rounded-xl ml-4 py-2 px-4 mr-[11rem] mt-2">
                  <DropdownMenuGroup className="">
                    <DropdownMenuItem className="opacity-[.6] flex-between">
                      Grouping
                      <Select>
                        <SelectTrigger className="w-24 h-7 bg-lightgrey">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="border-none outline-none">
                          <SelectGroup className="bg-lightgrey border-none outline-none rounded-lg w-28 ml-[-1rem] gap-0">
                            {/* <SelectLabel>Fruits</SelectLabel> */}
                            <SelectItem value="Status">Status</SelectItem>
                            <SelectItem value="Asignee">Asignee</SelectItem>
                            <SelectItem value="Project">Project</SelectItem>
                            <SelectItem value="Priority">Priority</SelectItem>
                            <SelectItem value="Cycle">Cycle</SelectItem>
                            <SelectItem value="Label">Label</SelectItem>
                            <SelectItem value="No grouping">
                              No grouping
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="opacity-[.6] flex-between">
                      Ordering
                      <Select>
                        <SelectTrigger className="w-24 h-7 bg-lightgrey">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="border-none outline-none">
                          <SelectGroup className="bg-lightgrey border-none outline-none rounded-lg w-28 ml-[-1rem] gap-0">
                            {/* <SelectLabel>Fruits</SelectLabel> */}
                            <SelectItem value="Status">Status</SelectItem>
                            <SelectItem value="Asignee">Asignee</SelectItem>
                            <SelectItem value="Project">Project</SelectItem>
                            <SelectItem value="Priority">Priority</SelectItem>
                            <SelectItem value="Cycle">Cycle</SelectItem>
                            <SelectItem value="Label">Label</SelectItem>
                            <SelectItem value="No grouping">
                              No grouping
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gray-700 my-2 w-full mx-0" />
                    <DropdownMenuItem className="text-sm py-2 flex-between">
                      Showsubissues
                      <Switch />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700 my-2 w-full mx-0" />
                    <DropdownMenuItem className="text-sm py-2">
                      List options
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm py-2">
                      Display Properties
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm py-2">
                      /////////List//////////
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="bg-grey gap-2 py-0 h-8 px-3 text-[13px] hover:bg-grey mx-3"
                  >
                    <GoBellFill />
                    Notifications <MdKeyboardArrowDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto bg-grey mr-24 mt-2 border-none outline-none rounded-xl ml-4 py-2 px-4">
                  <DropdownMenuGroup className="w-auto">
                    <DropdownMenuLabel className="py-2 mt-1 text-sm">
                      Subscribe to notifications
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="text-smm opacity-50 flex justify-between gap-2">
                      An issue is added to active issues
                      <Checkbox id="terms" className="w-3 h-3" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-smm opacity-50 mb-2 flex justify-between gap-2">
                      An issue is marked completed or canceled
                      <Checkbox id="terms" className="w-3 h-3" />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="h-5 w-[2px] bg-gray-600 mr-3"></div>

              <span className="icon-hover font-extrabold text-md ml-3">
                <BsLayoutSidebarReverse />
              </span>
            </div>
          </nav>

          <DndProvider backend={HTML5Backend}>
            {reviewIssues.length > 0 && (
              <div>
                <header className="bg-darkgrey w-full h-12 flex-between px-6">
                  <p>In Review</p>
                  <CreateIssue
                    trigger={<GoPlus />}
                    createIssue={addIssuetoReview}
                  />
                </header>

                <main>
                  {reviewIssues.map((e, i) => (
                    <p key={i}>{e.name}</p>
                  ))}
                </main>
              </div>
            )}
            {progressIssues.length > 0 && (
              <div>
                <header className="bg-darkgrey w-full h-12 flex-between px-6">
                  <p>In Progress</p>
                  <CreateIssue
                    trigger={<GoPlus />}
                    createIssue={addIssuetoProgress}
                  />
                </header>

                <main>
                  {progressIssues.map((e, i) => (
                    <p key={i}>{e.name}</p>
                  ))}
                </main>
              </div>
            )}
            {todoIssues.length > 0 && (
              <div>
                <header className="bg-darkgrey w-full h-12 flex-between px-6">
                  <p>Todo</p>
                  <CreateIssue
                    trigger={<GoPlus />}
                    createIssue={addIssuetoTodo}
                  />
                </header>

                <main>
                  {todoIssues.map((e, i) => (
                    <p key={i}>{e.name}</p>
                  ))}
                </main>
              </div>
            )}
            {backlogIssues.length > 0 && (
              <div>
                <header className="bg-darkgrey w-full h-11 flex-between px-6">
                  <p>Backlog</p>
                  <CreateIssue
                    trigger={<GoPlus />}
                    createIssue={addIssuetoBacklog}
                  />
                </header>

                <main className="w-full flex flex-col items-center">
                  {backlogIssues.map((e, i) => (
                    <div className="border-b-2 bgHover-darkgrey duration-75 border-gray-800 h-12 flex-between w-full px-6">
                      <p key={i}>{e.name}</p>
                      <div className="flex-center gap-2">
                        <p>{e.time.getDate()}</p>
                        <p>
                          {e.time
                            .toLocaleString("en-US", { month: "long" })
                            .slice(0, 3)}
                        </p>
                      </div>
                    </div>
                  ))}
                </main>
              </div>
            )}
            {doneIssues.length > 0 && (
              <div>
                <header className="bg-darkgrey w-full h-12 flex-between px-6">
                  <p>Done</p>
                  <CreateIssue
                    trigger={<GoPlus />}
                    createIssue={addIssuetoDone}
                  />
                </header>

                <main>
                  {doneIssues.map((e, i) => (
                    <p key={i}>{e.name}</p>
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
                      createIssue={addIssuetoBacklog}
                    />
                  </div>
                </div>
              )}
          </DndProvider>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default page;
