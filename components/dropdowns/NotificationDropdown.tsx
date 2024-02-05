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
import { GoBellFill } from 'react-icons/go';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Checkbox } from '../ui/checkbox';

const NotificationDropdown = () => {
  return (
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
  )
}

export default NotificationDropdown