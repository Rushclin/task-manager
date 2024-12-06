"use client"
import React, { useState } from "react";
import TaskCard from "./tasks/components/TaskCard";
import { TabList, TabPanel } from "@/components/Tabs/Tabs";
import ComminSoon from "@/components/ComminSoon";
import TaskForm from "./tasks/components/TaskForm";
import Modal from "@/components/Modal";
import { Plus } from "lucide-react";
import { Button } from "@/shared/Button/Button";
import { useTasks } from "@/hooks/useTask";
import TaskList from "./tasks/components/TaskList";

export enum FilterType {
  ALL = "all",
  OPEN = "open",
  CLOSED = "closed",
  ARCHIVED = "archived",
}

const FilterTabs = () => {

  const { state, dispatch } = useTasks()

  const [activeFilter, setActiveFilter] = React.useState<FilterType>(FilterType.ALL);

  const filters = [
    { name: "All", count: state.tasks.length, key: FilterType.ALL },
    { name: "Open", count: state.tasks.filter(task => !task.closed).length, key: FilterType.OPEN },
    { name: "Closed", count: state.tasks.filter(task => task.closed).length, key: FilterType.CLOSED },
    { name: "Archived", count: state.tasks.filter(task => task.archived).length, key: FilterType.ARCHIVED },
  ];

  return (
    <div className="flex items-center space-x-4 overflow-auto my-5">
      {filters.map((filter) => (
        <button
          key={filter.name}
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${activeFilter === filter.key
            ? "text-blue-600"
            : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => {
            setActiveFilter(filter.key)
            dispatch({ type: "FILTER_TASKS", payload: { filterType: filter.key } })
          }

          }
        >
          <span>{filter.name}</span>
          <span
            className={`px-2 py-0.5 rounded-full ${activeFilter === filter.key ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
              }`}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};



const Page = () => {

  const { state, dispatch } = useTasks()

  console.log("la liste des tasks ", state)

  const [activeTab, setActiveTab] = React.useState<number>(1);

  const tabs: { title: string; key: number }[] = [
    { key: 0, title: "Messages" },
    { key: 1, title: "Today's Task" },
    { key: 2, title: "Last activity" }];


  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <>
      <TabList activeTab={activeTab} onTabClick={setActiveTab} tabs={tabs} />

      <TabPanel isActive={activeTab === 0}>
        <ComminSoon title="Page en cours de construction !" />
      </TabPanel>

      <TabPanel isActive={activeTab === 1}>
        <div className="flex justify-between items-center my-5">
          <div>
            <h1 className="text-xl font-bold text-black">Today's Task</h1>
            <p className="text-sm text-gray-500">Wednesday, 11 May</p>
          </div>

          <Button label="New Task" onClick={() => setIsModalOpen(true)} icon={<Plus size={16} color="#3d60eb" absoluteStrokeWidth />} />
        </div>

        <FilterTabs />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add a new task">
          <TaskForm onClose={() => setIsModalOpen(false)} />
        </Modal>

        <TaskList list={state.filteredTasks} />


      </TabPanel>

      <TabPanel isActive={activeTab === 2}>
        <ComminSoon title="Page en cours de construction !" />

      </TabPanel>


    </>
  )
}
export default Page;