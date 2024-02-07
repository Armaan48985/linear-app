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
import { MdLabel } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

const CreateIssue = ({ trigger, createIssue, issueType }: any) => {
  const [issueTitle, setIssueTitle] = useState("");
  const [value, setValue] = useState(issueType);
  const [priority, setPriority] = useState("");
  const [label, setLabel] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSelectType = (selectedValue: string) => {
    setValue(selectedValue);
  };

  const handleSelectPriority = (e: string) => {
    console.log(e);
    setPriority(e);
  };
  const handleSelectLabel = (e: string) => {
    setLabel(e);
  };
  const handleSelectDueDate = (e: string) => {
    setDueDate(e);
  };

  const handleSaveIssue = () => {
    if (issueTitle.trim() !== "") {
      createIssue(issueTitle, value, priority, label, dueDate);
      console.log("priority sent from createIssue:", priority);
      setIssueTitle("");
      setPriority("");
      setLabel("");
      setDueDate("");
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
              <SelectTrigger className="w-[100px] border-none outline-none bg-[--gray-2400] h-7 mt-2 flex-center px-0 mx-0 gap-2 rounded-smm group">
                <SelectValue
                  placeholder={value}
                  className="text-red-900 group-hover:placeholder:opacity-100"
                />
              </SelectTrigger>
              <SelectContent className="w-[200px] bg-grey shadow-none border-2 border-[--gray-2300]">
                <SelectGroup className="">
                  <SelectItem value="backlog" className="pl-3 py">
                    Backlog
                  </SelectItem>
                  <SelectItem value="todo" className="pl-3 py-2">
                    Todo
                  </SelectItem>
                  <SelectItem value="progress" className="pl-3 py-2">
                    In Progress
                  </SelectItem>
                  <SelectItem value="review" className="pl-3 py-2">
                    In review
                  </SelectItem>
                  <SelectItem value="done" className="pl-3 py-2">
                    Done
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={handleSelectPriority}>
              <SelectTrigger className="w-[100px] border-none outline-none bg-[--gray-2400] h-7 mt-2 flex-center px-0 mx-0 gap-2 rounded-smm">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="w-[200px] bg-grey shadow-none border-2 border-[--gray-2300]">
                <SelectGroup className="flex flex-col justify-start items-start">
                  <SelectItem value="no priority" className="pl-3 py-2">
                    No Priority
                  </SelectItem>
                  <SelectItem value="urgent" className="pl-3 py-2">
                    Urgent
                  </SelectItem>
                  <SelectItem value="high" className="pl-3 py-2">
                    High
                  </SelectItem>
                  <SelectItem value="medium" className="pl-3 py-2">
                    Medium
                  </SelectItem>
                  <SelectItem value="low" className="pl-3 py-2">
                    Low
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[100px] border-none outline-none bg-[--gray-2400] h-7 mt-2 flex-center px-0 mx-0 gap-2 rounded-smm">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
            </Select>
            <Select onValueChange={handleSelectLabel}>
              <SelectTrigger className="w-auto border-none outline-none bg-[--gray-2400] h-7 mt-2 flex-center px-0 mx-0 gap-2 rounded-smm">
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
              <SelectTrigger className="w-[100px] border-none outline-none bg-[--gray-2400] h-7 mt-2 flex-center px-0 mx-0 gap-2 rounded-smm">
                <SelectValue placeholder="project" />
              </SelectTrigger>
            </Select>
            <Select>
              <SelectTrigger className="w-[100px] border-none outline-none bg-[--gray-2400] h-7 mt-2 flex-center px-0 mx-0 gap-2 rounded-smm">
                <SelectValue placeholder="doticon" />
              </SelectTrigger>
              <SelectContent className="w-[200px] bg-grey shadow-none border-2 border-[--gray-2300]">
                <SelectGroup className="flex flex-col justify-start items-start">
                  <SelectItem
                    value="backlog"
                    className="pl-3 py-2"
                    onClick={() => handleSelectDueDate}
                  >
                    Set due date...
                  </SelectItem>
                  <SelectItem value="todo" className="pl-3 py-2">
                    Link to URL...
                  </SelectItem>
                  <Separator className="bg-white text-white h-[5px]" />
                  <SelectItem value="progress" className="pl-3 py-2">
                    Add sub-issue
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
