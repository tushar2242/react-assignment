import React from 'react'
import TaskBoard from '../../components/task/TaskBoard'

const Dashboard = () => {
    return (
        <div>
            <h1>📊 Dashboard</h1>
            <p>Welcome to the dashboard! Here you can view your tasks, reports, and more.</p>
            <TaskBoard />
        </div>
    )
}

export default Dashboard