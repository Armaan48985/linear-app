import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { LiaSignalSolid } from "react-icons/lia";
import { MdOutlineSignalCellularAlt2Bar } from "react-icons/md";
import { MdSignalCellularAlt1Bar } from "react-icons/md";
import { BiSolidMessageSquareError } from "react-icons/bi";

const PriorityCheck = ({ priority }: any) => {
  let icon;
  if (priority === "high") {
    icon = (
      <span className="opacity-60 hover:opacity-100">
        <LiaSignalSolid />
      </span>
    );
  } else if (priority === "low") {
    icon = (
      <span className="opacity-60 hover:opacity-100">
          <MdSignalCellularAlt1Bar />
      </span>
    );
} else if (priority === "medium") {
    icon = (
        <span className="opacity-60 hover:opacity-100">
          <MdOutlineSignalCellularAlt2Bar />
      </span>
    );
  } else if (priority === "urgent") {
    icon = (
      <span className="text-[--orange-100] opacity-100">
        <BiSolidMessageSquareError />
      </span>
    );
  } else {
    icon = (
      <span className="opacity-60 hover:opacity-100">
        <BsThreeDots />
      </span>
    );
  }

  return <span>{icon}</span>;
};

export default PriorityCheck;
