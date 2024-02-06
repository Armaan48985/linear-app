import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { DeleteDataFromFireStore } from "@/app/db";
import {
  deleteFromBacklog,
  deleteFromDone,
  deleteFromProgress,
  deleteFromReview,
  deleteFromTodo,
} from "@/app/GlobalRedux/Slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/reducers";

export function IssueEdit({ clickEl, id, type }: any) {
  const dispatch = useDispatch()
  const backlogIssues = useSelector((state: RootState) => state.app.backlogIssues);
  const todoIssues = useSelector((state: RootState) => state.app.todoIssues);
  const reviewIssues = useSelector((state: RootState) => state.app.reviewIssues);
  const doneIssues = useSelector((state: RootState) => state.app.doneIssues);
  const progressIssues = useSelector((state: RootState) => state.app.progressIssues);
  const handleStatusClick = (status: string) => () => {};

  const handledelete = () => {
      switch (type) {
        case "done":
          DeleteDataFromFireStore('naruto', type, doneIssues[id].name);
          dispatch(deleteFromDone(id));
          break;
        case "backlog":
          DeleteDataFromFireStore('naruto', type, backlogIssues[id].name);
          dispatch(deleteFromBacklog(id));
          break;
        case "progress":
          console.log("sending command to delteDatafromFirestore", progressIssues[id].name)
          DeleteDataFromFireStore('naruto', type, progressIssues[id].name);
          dispatch(deleteFromProgress(id));
          break;
        case "review":
          DeleteDataFromFireStore('naruto', type, reviewIssues[id].name);
          dispatch(deleteFromReview(id));
          break;
        case "todo":
          DeleteDataFromFireStore('naruto', type, todoIssues[id].name);
          dispatch(deleteFromTodo(id));
          break;
        default:
          break;
      }
    };
    

  return (
    <ContextMenu>
      <ContextMenuTrigger className="border-b-2 bgHover-darkgrey duration-75 border-gray-800 h-11 flex-between w-full px-6">
        {clickEl}
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56 bg-grey border-2 border-gray-500 pl-0">
        <ContextMenuItem inset className="hover:bg-white py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0 m-0">
                Status
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem onClick={() => handleStatusClick("backlog")}>
                Backlog
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleStatusClick("todo")}>
                Todo
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleStatusClick("progess")}>
                In Progress
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleStatusClick("review")}>
                In Review
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleStatusClick("done")}>
                Done
              </ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>
        </ContextMenuItem>

        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild className="p-0 m-0">
              <Button variant="default" className="w-full p-0 m-0">
                Assignee
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>No asignee</ContextMenuItem>
              <ContextMenuItem>armaanthakur</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>

          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Priority
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>No priority</ContextMenuItem>
              <ContextMenuItem>Urget</ContextMenuItem>
              <ContextMenuItem>High</ContextMenuItem>
              <ContextMenuItem>Medium</ContextMenuItem>
              <ContextMenuItem>Low</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>

          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Labels
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Bug</ContextMenuItem>
              <ContextMenuItem>Feature</ContextMenuItem>
              <ContextMenuItem>Improvment</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>

          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Projects
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Backlog</ContextMenuItem>
              <ContextMenuItem>Todo</ContextMenuItem>
              <ContextMenuItem>In Progress</ContextMenuItem>
              <ContextMenuItem>In Review</ContextMenuItem>
              <ContextMenuItem>Done</ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>

          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Set Due Date
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Backlog</ContextMenuItem>
              <ContextMenuItem>Todo</ContextMenuItem>
              <ContextMenuItem>In Progress</ContextMenuItem>
              <ContextMenuItem>In Review</ContextMenuItem>
              <ContextMenuItem>Done</ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>

          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-gray-700 my-2 w-full mx-0" />
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Add Link
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Backlog</ContextMenuItem>
              <ContextMenuItem>Todo</ContextMenuItem>
              <ContextMenuItem>In Progress</ContextMenuItem>
              <ContextMenuItem>In Review</ContextMenuItem>
              <ContextMenuItem>Done</ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>

          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Add Subissue
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Backlog</ContextMenuItem>
              <ContextMenuItem>Todo</ContextMenuItem>
              <ContextMenuItem>In Progress</ContextMenuItem>
              <ContextMenuItem>In Review</ContextMenuItem>
              <ContextMenuItem>Done</ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>

          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Make a Copy
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Backlog</ContextMenuItem>
              <ContextMenuItem>Todo</ContextMenuItem>
              <ContextMenuItem>In Progress</ContextMenuItem>
              <ContextMenuItem>In Review</ContextMenuItem>
              <ContextMenuItem>Done</ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>

          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Relation
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Backlog</ContextMenuItem>
              <ContextMenuItem>Todo</ContextMenuItem>
              <ContextMenuItem>In Progress</ContextMenuItem>
              <ContextMenuItem>In Review</ContextMenuItem>
              <ContextMenuItem>Done</ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>

          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Rename
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-gray-700 my-2 w-full mx-0" />
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Move
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Backlog</ContextMenuItem>
              <ContextMenuItem>Todo</ContextMenuItem>
              <ContextMenuItem>In Progress</ContextMenuItem>
              <ContextMenuItem>In Review</ContextMenuItem>
              <ContextMenuItem>Done</ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-gray-700 my-2 w-full mx-0" />
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Unsubscribe
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Backlog</ContextMenuItem>
              <ContextMenuItem>Todo</ContextMenuItem>
              <ContextMenuItem>In Progress</ContextMenuItem>
              <ContextMenuItem>In Review</ContextMenuItem>
              <ContextMenuItem>Done</ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Favourite
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Backlog</ContextMenuItem>
              <ContextMenuItem>Todo</ContextMenuItem>
              <ContextMenuItem>In Progress</ContextMenuItem>
              <ContextMenuItem>In Review</ContextMenuItem>
              <ContextMenuItem>Done</ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Copy
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Backlog</ContextMenuItem>
              <ContextMenuItem>Todo</ContextMenuItem>
              <ContextMenuItem>In Progress</ContextMenuItem>
              <ContextMenuItem>In Review</ContextMenuItem>
              <ContextMenuItem>Done</ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset className="py-0 my-0">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="default" className="w-full p-0">
                Remind Me
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-44 ml-[24rem] mt-[-3rem] bg-grey border-2 border-gray-500">
              <ContextMenuItem>Backlog</ContextMenuItem>
              <ContextMenuItem>Todo</ContextMenuItem>
              <ContextMenuItem>In Progress</ContextMenuItem>
              <ContextMenuItem>In Review</ContextMenuItem>
              <ContextMenuItem>Done</ContextMenuItem>
              <ContextMenuItem>Cancelled</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </HoverCardContent>
          </HoverCard>
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-gray-700 my-2 w-full mx-0" />

        <ContextMenuItem inset className="py-2 my-0" onClick={handledelete}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
