import React from 'react'
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
import { Button } from '../ui/button';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { GiSettingsKnobs } from 'react-icons/gi';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Switch } from '../ui/switch';

const DisplayDropdown = () => {
  return (
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
  )
}

export default DisplayDropdown