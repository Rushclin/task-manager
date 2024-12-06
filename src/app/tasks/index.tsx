"use client"
import ComminSoon from '@/components/ComminSoon';
import Modal from '@/components/Modal';
import { TabList, TabPanel } from '@/components/Tabs/Tabs';
import { useTasks } from '@/hooks/useTask';
import { Button } from '@/components/Button';
import { getFormattedDate } from '@/shared/functions';
import { Plus } from 'lucide-react';
import React from 'react'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterTabs from './components/FilterTabs';

const Task = () => {
    const { state } = useTasks()

    const [activeTab, setActiveTab] = React.useState<number>(1);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const tabs: { title: string; key: number }[] = [
        { key: 0, title: "Messages" },
        { key: 1, title: "Today's Task" },
        { key: 2, title: "Last activity" }];

    return (
        <>
            <TabList activeTab={activeTab} onTabClick={setActiveTab} tabs={tabs} />
            <TabPanel isActive={activeTab === 0}>
                <ComminSoon title="Page en cours de construction !" />
            </TabPanel>
            <TabPanel isActive={activeTab === 1}>
                <div className="flex justify-between items-center my-5">
                    <div>
                        <h1 className="text-xl font-bold text-black">Today&apos;s Task</h1>
                        <p className="text-sm text-gray-500">{getFormattedDate()}</p>
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

export default Task