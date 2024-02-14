import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { LiaSignalSolid } from "react-icons/lia";
import {
  MdOutlineSignalCellularAlt2Bar,
  MdSignalCellularAlt1Bar,
} from "react-icons/md";

const PriorityDropDown = ({ handleSelectPriority, trigger }: any) => {
  return (
    <Select onValueChange={handleSelectPriority}>
      <SelectTrigger className="w-[100px] border-none outline-none bg-[#3e3b48] text-gray-200 h-7 mt-2 flex-center px-0 mx-0 gap-2 rounded-smm group">
        <SelectValue placeholder={trigger} />
      </SelectTrigger>
      <SelectContent className="w-[200px] bg-grey shadow-none border-2 border-[--gray-2300]">
        <SelectGroup className="flex flex-col justify-start items-start">
          <SelectItem value="no priority" className="pl-3 py-2">
            <div className="flex-center gap-2">
              <span>---</span> No priority
            </div>
          </SelectItem>
          <SelectItem value="urgent" className="pl-3 py-2">
            <div className="flex-center gap-2">
              <span>
                <BiSolidMessageSquareError />
              </span>{" "}
              Urgent
            </div>
          </SelectItem>
          <SelectItem value="high" className="pl-3 py-2">
            <div className="flex-center gap-2">
              <span>
                <LiaSignalSolid />
              </span>{" "}
              High
            </div>
          </SelectItem>
          <SelectItem value="medium" className="pl-3 py-2">
            <div className="flex-center gap-2">
              <span>
                <MdOutlineSignalCellularAlt2Bar />
              </span>{" "}
              Medium
            </div>
          </SelectItem>
          <SelectItem value="low" className="pl-3 py-2">
            <div className="flex-center gap-2">
              <span>
                <MdSignalCellularAlt1Bar />
              </span>{" "}
              Low
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PriorityDropDown;
