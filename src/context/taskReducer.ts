import { FilterType } from "@/app/page";
import { TaskDto } from "@/app/tasks/types";

export interface TaskState {
  tasks: TaskDto[];
  filteredTasks: TaskDto[];
}

export type TaskAction =
  | { type: "ADD_TASK"; payload: TaskDto }
  | { type: "REMOVE_TASK"; payload: { id: string } }
  | { type: "UPDATE_TASK"; payload: TaskDto }
  | { type: "SET_TASKS"; payload: TaskDto[] }
  | { type: "FETCH_TASKS_SUCCESS"; payload: TaskDto[] }
  | { type: "FILTER_TASKS"; payload: { filterType: FilterType } };

export const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        filteredTasks: [...state.filteredTasks, action.payload],
      };

    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
        filteredTasks: state.filteredTasks.filter(
          (task) => task.id !== action.payload.id
        ),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
        filteredTasks: state.filteredTasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };

    case "FETCH_TASKS_SUCCESS":
      return { ...state, tasks: action.payload, filteredTasks: action.payload };

    case "FILTER_TASKS": {
      const { filterType } = action.payload;

      let filteredTasks =  state.tasks;

      console.log(`Hello`, state)

      if (filterType === FilterType.ALL) {
        filteredTasks = state.tasks;
      } else {
        filteredTasks = state.tasks.filter((task) => {
          if (filterType === FilterType.CLOSED) {
            console.log("Tache dans le filtre", task)
            return task.closed
          };
          if (filterType === FilterType.OPEN)
            return !task.closed && !task.archived;
          if (filterType === FilterType.ARCHIVED) return task.archived;
          return true;
        });
      }

      console.log("Filterd Task ", filterType, filteredTasks);

      return { ...state, filteredTasks: filteredTasks, tasks: state.tasks };
    }

    default:
      throw new Error(`Unhandled action type: ${(action as TaskAction).type}`);
  }
}
