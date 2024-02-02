// Sidebar.jsx
"use client";
import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearchSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { GoInbox } from "react-icons/go";
import { SiGooglelens } from "react-icons/si";
import { FaMap } from "react-icons/fa";
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
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { GoIssueTrackedBy } from "react-icons/go";
import { HiOutlineViewGrid } from "react-icons/hi";
import { GrView } from "react-icons/gr";
import { MdCollections } from "react-icons/md";
import { VscSaveAll } from "react-icons/vsc";
import { LuPlus } from "react-icons/lu";
import { MdOutlinePlayCircle } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import CreateIssue from "./CreateIssue";
import page from "@/app/team/allIssues/page";
import { useIssueUtils } from "@/app/team/allIssues/AddingIssues";

const Sidebar = () => {
  const [teamsBarOpen, setTeamsBarOpen] = useState(true);
  const [teamDetailOpen, setTeamDetailOpen] = useState(true);
  const [tryDetailsOpen, setTryDetailsOpen] = useState(true);
  const  { addIssuetoBacklog }:any = useIssueUtils;

  return (
    <div className="flex-none p-4 border-r border-slate-800 min-h-screen text-primary pl-6">
      <div className="flex justify-between py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="hover:bg-[#272939] mt-0 pt-0 rounded-xl"
            >
              dummy-project
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[18rem] bg-[#282a39] border-none outline-none rounded-xl ml-4 py-2 px-4">
            <DropdownMenuGroup className="">
              <DropdownMenuItem className="opacity-[.6]">
                example123@gmail.com
              </DropdownMenuItem>
              <DropdownMenuLabel className="ml-2 py-3">
                Dummy Project
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700 my-2 w-full mx-0" />
              <DropdownMenuItem className="text-sm py-2">
                Workspace settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm py-2">
                Invite & manage members
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700 my-2" />
              <DropdownMenuItem className="text-sm py-2">
                Create or join a workspace
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm py-2">
                Add an account
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm py-2">
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default">
              <div className="w-7 h-7 rounded-full bg-slate-300"></div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[13rem] bg-[#282a39] border-none outline-none rounded-xl ml-[9rem] py-2 px-4">
            <DropdownMenuGroup>
              <DropdownMenuItem className="bgHover-grey">
                View Profile
                <DropdownMenuShortcut>O then M</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                  className="hover:bg-blue-400"
                  style={{ backgroundColor: 'var(--tw-bg-blue-400-hover)' }}
                >
                  Settings
                  <DropdownMenuShortcut>G then S</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-700 my-2" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="bgHover-grey">
                Help <DropdownMenuShortcut>?</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="bgHover-grey">
                Changelog
              </DropdownMenuItem>
              <DropdownMenuItem className="bgHover-grey">
                Documentation
              </DropdownMenuItem>
              <DropdownMenuItem className="bgHover-grey">
                Join Slack community
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-700 my-2" />
            <DropdownMenuItem className="bgHover-grey">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-center w-full gap-2 mr-10 px-5">
            <CreateIssue trigger={
                <div className="w-[305px] bg-grey h-9 rounded-[.3rem] text-left flex items-center justify-start text-sm hover:bg-[#262840] px-3 group">
                  <span className="pr-3 text-[1.1rem] group-hover:text-white">
                    <FiEdit />
                  </span>{" "}
                  New Issue
                </div>
                } 
                createIssue={addIssuetoBacklog}
            />
            <Button
              type="submit"
              className="px-2 bg-grey h-9 rounded-[.3rem] hover:text-white hover:bg-grey text-lg font-bold"
            >
              <IoSearchSharp />
            </Button>
      </div>

      <Link href="/inbox" className="flex justify-start items-center py-[.36rem] bgHover-grey w-full p-2 rounded-[.55rem] group pl-3">
        <span className="text-md mr-3 group-hover:text-white font-extrabold brightness-75 group-hover:brightness-200">
          <GoInbox />
        </span>
        <p>Inbox</p>
      </Link>
      <Link href="/my-issues" className="flex justify-start items-center py-[.36rem] bgHover-grey w-full p-2 rounded-[.55rem] group pl-3">
        <span className="text-md mr-3 group-hover:text-white font-extrabold brightness-75 group-hover:brightness-200">
          <SiGooglelens />
        </span>
        <p>My issues</p>
      </Link>
      <Link href="/views" className="flex justify-start items-center py-[.36rem] bgHover-grey w-full p-2 rounded-[.55rem] group pl-3">
        <span className="text-md mr-3 group-hover:text-white font-extrabold brightness-75 group-hover:brightness-200">
          <GrView />
        </span>
        <p>Views</p>
      </Link>
      <Link href="/roadmap" className="flex justify-start items-center py-[.36rem] bgHover-grey w-full p-2 rounded-[.55rem] group mb-4 pl-3">
        <span className="text-md mr-3 group-hover:text-white font-extrabold brightness-75 group-hover:brightness-200">
          <FaMap />
        </span>
        <p>Roadmaps</p>
      </Link>

      <div className="duration-75">
        <p
          className="flex gap-2 items-center bgHover-grey py-1 text-gray-400 rounded-[.55rem] pl-3"
          onClick={() => setTeamsBarOpen((e) => !e)}
        >
          Your teams{" "}
          {teamsBarOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
        </p>

        {teamsBarOpen && (
          <div className="pl-2 duration-300">
            <h6
              className="flex items-center gap-2 bgHover-grey pl-2 py-1 rounded-[.55rem] group"
              onClick={() => setTeamDetailOpen((e) => !e)}
            >
              <span className="text-green-600 bg-gray-800 rounded-full p-1 mr-2 text-lg">
                <MdCollections />
              </span>
              Error 404{" "}
              {teamDetailOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
              <span
                className="ml-auto pr-2 hidden group-hover:block brightness-75 hover:brightness-200"
                onClick={() => setTeamDetailOpen(false)}
              >
                <BsThreeDots />
              </span>
            </h6>

            {teamDetailOpen && (
              <div className="flex flex-col gap-2">
                <Link href="/team/issues">
                  <p className="flex items-center gap-2 bgHover-grey pl-7 py-1 group rounded-[.55rem]">
                    <span className="brightness-75 group-hover:brightness-200">
                      <GoIssueTrackedBy />
                    </span>
                    Issues
                  </p>
                </Link>
                <div className="pl-8 list-line my-0 py-0">
                  <Link href="/team/active"> <p className="mb-2 bgHover-grey ml-4 pl-4 rounded-[.55rem]">
                    Active
                  </p></Link>
                 <Link href="/team/backlog"> <p className="bgHover-grey  ml-4 pl-4 rounded-[.55rem]">
                    Backlog
                  </p></Link>
                </div>
                <Link href="/team/projects"><p className="flex items-center gap-2 bgHover-grey pl-7 py-1 group">
                  <span className="brightness-75 group-hover:brightness-200">
                    <HiOutlineViewGrid />
                  </span>
                  Projects
                </p>

                </Link>
                <Link href="/team/views">
                <p className="flex items-center gap-2 bgHover-grey pl-7 py-1 group">
                  <span className="brightness-75 group-hover:brightness-200">
                    <GrView />
                  </span>
                  Views
                </p></Link>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={`${teamsBarOpen ? "mt-8" : "mt-1"}`}>
        <p
          className="flex gap-2 items-center text-gray-400 rounded-[.55rem] pl-3 bgHover-grey py-1"
          onClick={() => setTryDetailsOpen((e) => !e)}
        >
          Try {tryDetailsOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
        </p>

        {tryDetailsOpen && (
          <div>
            <p className="flex items-center gap-2 bgHover-grey pl-7 py-1 group">
              <span className="brightness-75 group-hover:brightness-200">
                <VscSaveAll />
              </span>
              Import Issues
              <span className="ml-auto pr-2 hidden group-hover:block brightness-75 hover:brightness-200">
                <RxCross2 />
              </span>
            </p>
            <p className="flex items-center gap-2 bgHover-grey pl-7 py-1 group">
              <span className="brightness-75 group-hover:brightness-200">
                <LuPlus />
              </span>
              Invite people
              <span className="ml-auto pr-2 hidden group-hover:block brightness-75 hover:brightness-200">
                <RxCross2 />
              </span>
            </p>
            <p className="flex items-center gap-2 bgHover-grey pl-7 py-1 group">
              <span className="brightness-75 group-hover:brightness-200">
                <MdOutlinePlayCircle />
              </span>
              Cycles
              <span className="ml-auto pr-2 hidden group-hover:block brightness-75 hover:brightness-200">
                <RxCross2 />
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
