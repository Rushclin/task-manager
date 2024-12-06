"use client";
import React, { ReactNode, useReducer } from "react";
import { TaskContext } from "./TaskContext";
import { initialState, taskReducer } from "@/context/taskReducer";

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
