import React from 'react';
import { useDrag } from 'react-dnd';
import type { Task } from '../../redux/taskSlice';

interface Props {
    task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'To do':
                return '#e3f2fd'; // Light blue
            case 'Pending':
                return '#fff8e1'; // Light amber
            case 'Done':
                return '#e8f5e9'; // Light green
            default:
                return '#f0f0f0'; // Light gray
        }
    };

    const getStatusBorder = (status: string) => {
        switch (status) {
            case 'To do':
                return '#2196f3';
            case 'Pending':
                return '#ffc107';
            case 'Done':
                return '#4caf50';
            default:
                return '#ccc';
        }
    };


    return (
        <div
            ref={drag as any}
            className="task-card"
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'grab',
                backgroundColor: getStatusColor(task.status),
                borderLeft: `4px solid ${getStatusBorder(task.status)}`,
            }}
        >
            <div className="task-header">
                <strong>{task.id}</strong>
            </div>
            <div className="task-title">{task.title}</div>
            <div className="task-category">{task.category}</div>
            <div className="task-date">{task.date}</div>
        </div>
    );
};

export default TaskCard;
