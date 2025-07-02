import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Task } from './taskSlice';

export interface Project {
    id: string;
    name: string;
    description: string;
    tasks: [] | string[];
    assignedTo: string;
}

interface ProjectState {
    projects: Project[];
}

const initialState: ProjectState = {
    projects: [
        {
            id: 'P01',
            name: 'Interior Finishing',
            description: 'Handle interior walls, painting, and electrical fixtures',
            tasks: ['CO1-T19', 'CO1-T1'],
            assignedTo: 'Alice Johnson',
        },
        {
            id: 'P02',
            name: 'Structural Framing',
            description: 'Set up concrete pillars and load-bearing structures',
            tasks: ['CO1-T87'],
            assignedTo: 'Michael Smith',
        },
        {
            id: 'P03',
            name: 'Site Preparation',
            description: 'Clear land and install temporary fencing',
            tasks: ['CO1-T30', 'CO1-T95'],
            assignedTo: 'Ravi Patel',
        },
    ],
};


const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject(state, action: PayloadAction<Project>) {
            state.projects.push(action.payload);
        },
        removeProject(state, action: PayloadAction<string>) {
            state.projects = state.projects.filter(p => p.id !== action.payload);
        },
    },
});

export const { addProject, removeProject } = projectSlice.actions;
export default projectSlice.reducer;
