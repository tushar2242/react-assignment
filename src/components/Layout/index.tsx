import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './layout.css'

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    const location = useLocation();

    return (
        <div className="layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>🧠 TaskManager</h2>
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Dashboard</Link>
                <Link to="/create" className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`}>Create Task</Link>
                <Link to="/report" className={`nav-link ${location.pathname === '/report' ? 'active' : ''}`}>Reports</Link>
            </aside>

            {/* Main Area */}
            <div className="main">
                {/* Topbar */}
                <header className="topbar">
                    <h1>Welcome Back 👋</h1>
                    <div className="user-info">User: John Doe</div>
                </header>

                {/* Page Content */}
                <main className="content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
