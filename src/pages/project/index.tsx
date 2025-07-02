import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import Button from '@mui/material/Button';
import ProjectFormModal from '../../components/projects/ProjectModal';
import type { Project } from '../../redux/projectSlice';
import type { Task } from '../../redux/taskSlice';
import { useNavigate } from 'react-router-dom';

const Projects: React.FC = () => {
    const projects: Project[] = useSelector((state: any) => state.projects.projects);
    const allTasks: Task[] = useSelector((state: any) => state.tasks.tasks);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    const visibleProjects = user.role === 'admin'
        ? projects
        : projects.filter((project) => project.assignedTo === user.name);

    const columns: MRT_ColumnDef<Project>[] = [
        { accessorKey: 'name', header: 'Project Name', size: 200 },
        { accessorKey: 'description', header: 'Description', size: 400 },
        {
            header: 'Tasks',
            accessorFn: (row) =>
                row.tasks?.map((taskId: any) => {
                    const task = allTasks.find((t) => t.id === taskId || t.id === taskId?.id);
                    return task ? task.title : taskId;
                }).join(', '),
            size: 200,
        },
        { accessorKey: 'assignedTo', header: 'Assigned To', size: 150 },
    ];

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, height: 34 }}>
                <h3>Projects</h3>
                {user.role === 'admin' && (
                    <Button variant="contained" sx={{ m: 0 }} onClick={() => setOpenModal(true)}>
                        Add Project
                    </Button>
                )}
            </div>

            <MaterialReactTable
                columns={columns}
                data={visibleProjects}
                enableColumnResizing
                enableRowNumbers
                initialState={{ density: 'compact' }}
                muiTableBodyRowProps={({ row }) => ({
                    onClick: () => navigate(`/project/${row.original.id}`),
                    style: { cursor: 'pointer' },
                })}
            />

            <ProjectFormModal open={openModal} onClose={() => setOpenModal(false)} />
        </>
    );
};

export default Projects;
