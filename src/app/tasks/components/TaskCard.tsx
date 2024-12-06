import { UserAvatars } from "@/components/UserAvatars";
import React from "react";
import { TaskDto } from "../types";
import { formatDateRange } from "@/shared/functions";
import { useTasks } from "@/hooks/useTask";
import { Reorder } from "framer-motion";

interface TaskCardprops {
  task: TaskDto;
}

const TaskCard: React.FC<TaskCardprops> = ({ task }) => {
  const { dispatch } = useTasks();

  const handlerCloseTask = (task: TaskDto) => {
    const updatedTask = { ...task, closed: !task.closed };
    dispatch({ type: "UPDATE_TASK", payload: updatedTask });
  };

  return (
    <Reorder.Item value={task} key={task.id}>
      <div className="p-4 my-4 bg-white rounded-xl shadow-sm w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className={`text-lg font-medium ${
                task.closed ? "line-through text-gray-500" : "text-black"
              } decoration-slate-800`}
            >
              {task.title}
            </h1>

            <p className="text-sm text-gray-500">{task.description}</p>
          </div>
          <div>
            <div className="inline-flex items-center">
              <label className="flex items-center cursor-pointer relative">
                <input
                  defaultChecked={task.closed}
                  onClick={() => handlerCloseTask(task)}
                  type="checkbox"
                  className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-slate-100 shadow hover:shadow-md border border-slate-300 checked:bg-blue-500 checked:border-blue-500"
                  id="check-custom-style"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            <p>
              <span className="font-medium">
                {formatDateRange(task.startDate, task.endDate).day}
              </span>
              <span className="ml-2">
                {formatDateRange(task.startDate, task.endDate).dateRange}
              </span>
            </p>
          </div>
          <UserAvatars users={task.users} max={3} />
        </div>
      </div>
    </Reorder.Item>
  );
};

export default TaskCard;
