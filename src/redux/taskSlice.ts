import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TaskStatus = 'To do' | 'Pending' | 'Done';

export interface Task {
    id: string;
    title: string;
    category: string;
    status: TaskStatus;
    date: string;
    priority: 'low' | 'medium' | 'high';
}

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [
        { id: 'CO1-T1', title: 'Cleaning', category: 'Final review', status: 'To do', date: '2025-09-23', priority: 'medium' },
        { id: 'CO1-T19', title: 'Interior work', category: 'Electrical and Wiring', status: 'Pending', date: '2025-06-20', priority: 'medium' },
        { id: 'CO1-T30', title: 'Plumbing layout', category: 'Plumbing', status: 'Pending', date: '2025-05-25', priority: 'low' },
        { id: 'CO1-T87', title: 'Approve revised plans', category: 'Document Review and Revision', status: 'Done', date: '2024-12-11', priority: 'medium' },
        { id: 'CO1-T95', title: 'Supply contract plans', category: 'Contracts and Agreements', status: 'Done', date: '2024-11-20', priority: 'low' },
    ],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        moveTask: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
            const task = state.tasks.find(t => t.id === action.payload.id);
            if (task) task.status = action.payload.status;
        },
    },
});

export const { moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
