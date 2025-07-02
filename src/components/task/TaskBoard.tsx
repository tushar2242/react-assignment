import React from 'react';
import { useSelector } from 'react-redux';
import './TaskBoard.css'
import TaskColumn from './TaskColumn';

const statuses = ['To do', 'Pending', 'Done'];

const TaskBoard = ({ tasks }: any) => {


    return (
        <div className="task-board">
            {statuses.map((status: any) => (
                <TaskColumn
                    key={status}
                    status={status}
                    tasks={tasks.filter((task: any) => task.status === status)}
                />
            ))}
        </div>
    );
};

export default TaskBoard;
