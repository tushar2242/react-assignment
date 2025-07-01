import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import TaskCard from './TaskCard';
import { type TaskStatus, type Task, moveTask } from '../../redux/taskSlice';

interface Props {
    status: TaskStatus;
    tasks: Task[];
}

const TaskColumn: React.FC<Props> = ({ status, tasks }) => {
    const dispatch = useDispatch();

    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item: { id: string }) => {
            dispatch(moveTask({ id: item.id, status }));
        },
    });

    return (
        <div className="task-column" ref={drop as any}>
            <h3 className="column-title">{status}</h3>
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskColumn;
