import { useTasks } from "@/hooks/useTask";
import React from "react";
import { FilterType } from "../types";

const FilterTabs = () => {
  const { state, dispatch } = useTasks();

  const [activeFilter, setActiveFilter] = React.useState<FilterType>(
    FilterType.ALL,
  );

  const filters = [
    { name: "All", count: state.tasks.length, key: FilterType.ALL },
    {
      name: "Open",
      count: state.tasks.filter((task) => !task.closed).length,
      key: FilterType.OPEN,
    },
    {
      name: "Closed",
      count: state.tasks.filter((task) => task.closed).length,
      key: FilterType.CLOSED,
    },
    {
      name: "Archived",
      count: state.tasks.filter((task) => task.archived).length,
      key: FilterType.ARCHIVED,
    },
  ];

  return (
    <div className="flex items-center space-x-4 overflow-auto my-7">
      {filters.map((filter) => (
        <button
          key={filter.name}
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm transition ${
            activeFilter === filter.key
              ? "text-blue-600 font-bold"
              : "text-gray-500 hover:text-gray-700 font-medium"
          }`}
          onClick={() => {
            setActiveFilter(filter.key);
            dispatch({
              type: "FILTER_TASKS",
              payload: { filterType: filter.key },
            });
          }}
        >
          <span>{filter.name}</span>
          <span
            className={`px-2 py-0.5 rounded-full transition ${
              activeFilter === filter.key
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
