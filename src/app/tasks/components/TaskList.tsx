import React from 'react'
import { TaskDto } from '../types'
import TaskCard from './TaskCard';
import { Reorder } from 'framer-motion';
import { useTasks } from '@/hooks/useTask';

interface TaskListDto {
    list: TaskDto[];
}

const TaskList: React.FC<TaskListDto> = ({ list }) => {
    const { dispatch } = useTasks();

    const handleReorder = (newOrder: TaskDto[]) => {
        dispatch({ type: "REORDER_TASKS", payload: newOrder });
    };

    if (!list.length) {
        return (
            <div className='flex-col'>
                <div className="flex justify-center items-center">
                    <img className="w-64 h-64"
                        src="https://res.cloudinary.com/daqsjyrgg/image/upload/v1690257804/jjqw2hfv0t6karxdeq1s.svg"
                        alt="image empty task" />
                </div>
                <div className='flex justify-center items-center'>
                    <span
                        className="font-mono text-sm font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-600 text-gray-300">Empty Task</span>
                </div>
            </div>
        )
    }
    return (
        <Reorder.Group
            onReorder={handleReorder}
            values={list}
        >
            {
                list.map((task, index) => (
                    <TaskCard key={index} task={task} />
                ))
            }
        </Reorder.Group>
    )
}

export default TaskList