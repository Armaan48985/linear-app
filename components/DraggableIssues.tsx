"use client";
import { useDrag } from "react-dnd";

export const DraggableIssue = ({ element }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ISSUE_TYPE",
    item: { element },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="border-b-2 bgHover-darkgrey duration-75 border-gray-800 h-11 flex-between w-full px-6"
    >
      <p>{element.name}</p>
    </div>
  );
};
