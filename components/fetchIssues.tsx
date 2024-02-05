import {
    ArrayItem,
    addInBacklog,
    addInDone,
    addInProgress,
    addInReview,
    addInTodo,
    deleteFromDone,
  } from "@/app/GlobalRedux/Slice";
import { fetchDataFromFireStore } from "@/app/db";
import { useDispatch } from "react-redux";

const fetchIssues = () => {
    const dispatch = useDispatch();

    const fetchDataAndInitializeState = async (issueType: string) => {
    
        const data = await fetchDataFromFireStore("naruto", issueType);
    
        switch (issueType) {
          case "backlog":
            data.map((e, i) => dispatch(addInBacklog(e)));
            console.log("backlog data coming up")
            break;
          case "todo":
            data.map((e, i) => dispatch(addInTodo(e)));
            break;
          case "review":
            data.map((e, i) => dispatch(addInReview(e)));
            break;
          case "done":
            data.map((e, i) => dispatch(addInDone(e)));
            console.log("done data coming up")
            break;
          case "progress":
            data.map((e, i) => dispatch(addInProgress(e)));
            break;
          default:
            break;
        }
      };
      
  return (
    {fetchDataAndInitializeState}
  )
}

export default fetchIssues

