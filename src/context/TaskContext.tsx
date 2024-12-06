import { createContext } from "react";
import { initialState, TaskAction, TaskState } from "@/context/taskReducer";

export const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});
