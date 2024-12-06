import React from "react";

interface TabListProps {
  tabs: { title: string; key: number }[];
  activeTab: number;
  onTabClick: (tab: number) => void;
}

const TabList: React.FC<TabListProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="flex justify-center border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabClick(tab.key)}
          className={`flex-1 text-lg py-2 transition-all ease-in-out text-center hover:text-black ${
            activeTab === tab.key
              ? "text-black border-b-2 border-black font-bold"
              : "text-gray-400 border-b-2 border-gray-400"
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

interface TabPanelPros {
  children: React.ReactNode;
  isActive: boolean;
}

const TabPanel: React.FC<TabPanelPros> = ({ children, isActive }) => {
  return (
    <div className={`${isActive ? "block" : "hidden"} mt-4`}>{children}</div>
  );
};

export { TabPanel, TabList };
