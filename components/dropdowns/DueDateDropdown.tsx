import React from "react";
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
import { Button } from "../ui/button";
import { format } from "date-fns";
import { GoLink } from "react-icons/go";
import { LuCalendarPlus } from "react-icons/lu";
import { TbDeviceIpadDown } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarRangeIcon } from "lucide-react";

const DueDateDropdown = ({date, setDate, trigger}:any) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="default"
          className="w-auto border-none outline-none bg-[#3e3b48] text-gray-200  h-7 mt-2 flex-center px-3 mx-0 gap-2 rounded-smm"
        >
         {trigger}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={1}
        className="w-[200px] bg-grey shadow-none border-2 border-[--gray-2300] ml-[10rem] mt-3"
      >
        <DropdownMenuGroup className="w-auto flex justify-between items-start flex-col">
          <Popover>
            <PopoverTrigger asChild className="p-0 m-0 text-sm">
              <Button
                variant={"default"}
                className={cn("m-0 p-3 py-2", !date && "text-muted-foreground")}
              >
                <LuCalendarPlus className="mr-2 h-4 w-4 text-sm" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span className="text-sm p-0 m-0">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 bg-darkgrey" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <DropdownMenuSeparator className="w-full h-[1px] mx-auto bg-lightgrey" />
          <DropdownMenuItem className="text-md flex gap-2">
            <GoLink />
            Link to url
          </DropdownMenuItem>
          <DropdownMenuItem className="text-md flex gap-2">
            <TbDeviceIpadDown />
            Add sub-issue
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DueDateDropdown;
