import { FilterType, TaskDto } from "@/app/tasks/types";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "@/shared/functions";
import { toast } from "react-toastify";

export interface TaskState {
  tasks: TaskDto[];
  filteredTasks: TaskDto[];
}

export type TaskAction =
  | { type: "ADD_TASK"; payload: TaskDto }
  | { type: "UPDATE_TASK"; payload: TaskDto }
  | { type: "FILTER_TASKS"; payload: { filterType: FilterType } }
  | { type: "REORDER_TASKS"; payload: TaskDto[] };

export const initialState: TaskState = {
  tasks: loadTasksFromLocalStorage(),
  filteredTasks: loadTasksFromLocalStorage(),
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK": {
      const newState = {
        ...state,
        tasks: [...state.tasks, action.payload],
        filteredTasks: [...state.filteredTasks, action.payload],
      };
      saveTasksToLocalStorage(newState.tasks);
      toast.success("Task added successfully!");
      return newState;
    }

    case "UPDATE_TASK": {
      const newState = {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task,
        ),
        filteredTasks: state.filteredTasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task,
        ),
      };
      toast.success("Task updated successfully!");
      saveTasksToLocalStorage(newState.tasks);
      return newState;
    }

    case "FILTER_TASKS": {
      const { filterType } = action.payload;

      let filteredTasks = state.tasks;

      if (filterType === FilterType.ALL) {
        filteredTasks = state.tasks;
      } else {
        filteredTasks = state.tasks.filter((task) => {
          if (filterType === FilterType.CLOSED) {
            return task.closed;
          }
          if (filterType === FilterType.OPEN)
            return !task.closed && !task.archived;
          if (filterType === FilterType.ARCHIVED) return task.archived;
          return true;
        });
      }

      return { ...state, filteredTasks: filteredTasks, tasks: state.tasks };
    }
    case "REORDER_TASKS":
      return {
        ...state,
        tasks: action.payload,
        filteredTasks: action.payload, // Optionnel : mettre à jour les tâches filtrées si nécessaire
      };

    default:
      throw new Error(`Unhandled action type: ${(action as TaskAction).type}`);
  }
}
