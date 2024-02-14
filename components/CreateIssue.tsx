"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  MdLabel,
  MdOutlineSignalCellularAlt2Bar,
  MdSignalCellularAlt1Bar,
} from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { MdOutlineEditCalendar } from "react-icons/md";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDots } from "react-icons/bs";
import DueDateDropdown from "./dropdowns/DueDateDropdown";
import { TbCircleDotted } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { PiCircleHalfFill } from "react-icons/pi";
import {
  BiSolidCircleThreeQuarter,
  BiSolidMessageSquareError,
} from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { LiaSignalSolid } from "react-icons/lia";
import PriorityDropDown from "./dropdowns/PriorityDropDown";

const CreateIssue = ({ trigger, createIssue, issueType }: any) => {
  const [issueTitle, setIssueTitle] = useState("");
  const [value, setValue] = useState(issueType);
  const [priority, setPriority] = useState("");
  const [label, setLabel] = useState("");
  const [dueDate, setDueDate] = useState<Date>();

  const today = new Date();
  let differenceInDays: Number;

  if (dueDate) {
    const differenceInMs = dueDate.getTime() - today.getTime();
    differenceInDays = Math.ceil(differenceInMs / (1000 * 3600 * 24));
  } else {
    differenceInDays = 0;
  }

  const handleSelectType = (selectedValue: string) => {
    setValue(selectedValue);
  };

  const handleSelectPriority = (e: string) => {
    setPriority(e);
  };
  const handleSelectLabel = (e: string) => {
    setLabel(e);
  };

  const handleSaveIssue = () => {
    if (issueTitle.trim() !== "") {
      createIssue(issueTitle, value, priority, label, {
        date: dueDate?.getDate() || -1,
        month: dueDate?.getMonth() || -1,
      });
      console.log("priority sent from createIssue:", priority);
      setIssueTitle("");
      setPriority("");
      setLabel("");
      setDueDate(undefined);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="m-0 p-0">
          {trigger}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50rem] bg-grey border-none outline-none">
        <DialogHeader>
          <DialogTitle className="text-md">New Issue</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              placeholder="Issue Title"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              className="col-span-3 border-none bg-transparent outline-none placeholder:text-2xl placeholder:font-bold placeholder:text-gray-500 text-lg"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="description"
              placeholder="Add description..."
              className="col-span-3 border-none outline-none placeholder:text-lg placeholder:font-bold placeholder:text-gray-500 text-sm"
            />
          </div>

          <div className="flex item-center gap-2">
            <Select onValueChange={handleSelectType}>
              <SelectTrigger className="w-[100px] border-none outline-none bg-[#3e3b48] text-gray-200 h-7 mt-2 flex-center px-0 mx-0 gap-2 rounded-smm group">
                <SelectValue
                  placeholder={value || "backlog"}
                  className="text-red-900 group-hover:placeholder:opacity-100"
                />
              </SelectTrigger>
              <SelectContent className="w-[200px] bg-grey shadow-none border-2 border-[--gray-2300]">
                <SelectGroup className="">
                  <SelectItem
                    value="backlog"
                    className="pl-3 py-2 flex flex-row gap-12"
                  >
                    <div className="flex-center gap-2">
                      <TbCircleDotted />
                      <h3>Backlog</h3>
                    </div>
                  </SelectItem>
                  <SelectItem value="todo" className="pl-3 py-2 flex gap-2">
                    <div className="flex-center gap-2">
                      <FaRegCircle /> Todo
                    </div>
                  </SelectItem>
                  <SelectItem value="progress" className="pl-3 py-2 flex gap-2">
                    <div className="flex-center gap-2">
                      <span className="text-yellow-400">
                        <PiCircleHalfFill />
                      </span>{" "}
                      <p>In Progress</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="review" className="pl-3 py-2 flex gap-2">
                    <div className="flex-center gap-2">
                      <span className="text-green-600">
                        <BiSolidCircleThreeQuarter />
                      </span>
                      In review
                    </div>
                  </SelectItem>
                  <SelectItem value="done" className="pl-3 py-2 flex gap-2">
                    <div className="flex-center gap-2">
                      <span className="text-blue-700">
                        <FaCheckCircle />
                      </span>{" "}
                      Done
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <PriorityDropDown
              handleSelectPriority={handleSelectPriority}
              trigger="priority"
            />
            <Select>
              <SelectTrigger className="w-[100px] border-none outline-none bg-[#3e3b48] text-gray-200 h-7 mt-2 flex-center px-0 mx-0 gap-2 rounded-smm group">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
            </Select>
            <Select onValueChange={handleSelectLabel}>
              <SelectTrigger className="w-auto border-none outline-none bg-[#3e3b48] text-gray-200  h-7 mt-2 flex-center px-0 mx-0 gap-2 rounded-smm">
                <span className="px-3 text-gray-300 text-lg">
                  {" "}
                  <MdLabel />
                </span>
              </SelectTrigger>
              <SelectContent className="w-[200px] bg-grey shadow-none border-2 border-[--gray-2300]">
                <SelectGroup className="flex flex-col justify-start items-start">
                  <SelectItem value="bug" className="pl-3 py-3">
                    <div className="items-top flex-center space-x-2">
                      <Checkbox id="terms1" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-center gap-2"
                        >
                          <span className="text-[--red-100] text-2xl">
                            <GoDotFill />
                          </span>
                          Bug
                        </label>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="feature" className="pl-3 py-3">
                    <div className="items-top flex space-x-2">
                      <Checkbox id="terms1" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-center gap-2"
                        >
                          <span className="text-[--purpleMagenta-100] text-2xl">
                            <GoDotFill />
                          </span>
                          Feature
                        </label>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="improvement" className="pl-3 py-3">
                    <div className="items-top flex space-x-2">
                      <Checkbox id="terms1" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-center gap-2"
                        >
                          <span className="text-[--blue-300] text-2xl">
                            <GoDotFill />
                          </span>
                          Improvement
                        </label>
                      </div>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[100px] border-none outline-none bg-[#3e3b48] text-gray-200 h-7 mt-2 flex-center px-0 mx-0 gap-2 rounded-smm group">
                <SelectValue placeholder="project" />
              </SelectTrigger>
            </Select>

            {dueDate && (
              <DueDateDropdown
                date={dueDate}
                setDate={setDueDate}
                trigger={differenceInDays + " days"}
              />
            )}

            <div>
              <DueDateDropdown
                date={dueDate}
                setDate={setDueDate}
                trigger={<BsThreeDots />}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="border-t-2 border-gray-600">
          <Button
            type="submit"
            className="bg-lightgrey hover:bg-lightgrey mt-5"
            onClick={handleSaveIssue}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIssue;
