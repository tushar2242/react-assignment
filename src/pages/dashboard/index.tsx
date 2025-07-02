import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TaskBoard from '../../components/task/TaskBoard';
import type { Task } from '../../redux/taskSlice';
import type { Project } from '../../redux/projectSlice';
import Button from '@mui/material/Button';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
    const { id } = useParams() as any;
    const navigate = useNavigate();

    const project: Project | undefined = useSelector((state: any) =>
        state.projects.projects.find((p: Project) => p.id === id)
    );

    const allTasks: Task[] = useSelector((state: any) => state.tasks.tasks);

    const projectTasks: Task[] = project
        ? allTasks.filter((task) =>
            project.tasks.some((t: any) =>
                typeof t === 'string' ? t === task.id : t.id === task.id
            )
        )
        : [];

    const statusCount = projectTasks.reduce((acc: Record<string, number>, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(statusCount).map(([status, count]) => ({
        name: status,
        value: count,
    }));

    const COLORS = ['#007bff', '#ffc107', '#28a745', '#dc3545', '#6c757d'];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Button variant="outlined" onClick={() => navigate(-1)}>← Back</Button>
                <h3>{project?.name || 'Project'} Dashboard</h3>
            </div>

            {chartData.length > 0 && (
                <div style={{ width: '100%', height: 300, marginBottom: 32 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}

            <TaskBoard tasks={projectTasks} />
        </div>
    );
};

export default Dashboard;
