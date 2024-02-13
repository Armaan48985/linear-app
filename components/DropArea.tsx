"use client";
"use client";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableIssue } from "./DraggableIssues";
import CreateIssue from "./CreateIssue";
import { GoPlus } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/reducers";
import { useIssueUtils } from "@/app/team/allIssues/AddingIssues";

export const DropArea = ({ issue, title }: any) => {
  const [issues, setIssues] = useState<
    { id: string; name: string; type: string; time: Date }[]
  >([]);

  useEffect(() => setIssues(issue), []);
  const [, drop] = useDrop(() => ({
    accept: "ISSUE_TYPE",
    drop: (item: any) => {
      setIssues((prevIssues) => [...prevIssues, item.element]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const {
    addIssuetoBacklog,
    addIssuetoDone,
    addIssuetoProgress,
    addIssuetoReview,
    addIssuetoTodo,
  } = useIssueUtils();

  return (
    <div>
      {issues.length > 0 && (
        <div>
          <header
            className={`w-full h-11 flex-between px-6 ${
              horizontal ? "bg-body w-[450px]" : "bg-darkgrey"
            }`}
          >
            <p>{title}</p>
            <CreateIssue trigger={<GoPlus />} createIssue={addIssuetoDone} />
          </header>

          <main ref={drop} className="w-full flex flex-col items-center">
            {issues.slice(0, issues.length / 2).map((e, i) => (
              <DraggableIssue key={i} element={e} />
            ))}
          </main>
        </div>
      )}
    </div>
  );
};
