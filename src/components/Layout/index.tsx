import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './layout.css';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const role = user?.role;

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    return (
        <div className="layout">
            <aside className="sidebar">
                <h2>TaskManager</h2>
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Projects</Link>
                {role === 'admin' && (
                    <Link to="/users" className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}>Users</Link>
                )}
                <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>Settings</Link>
            </aside>

            <div className="main">
                <header className="topbar">
                    <h1>Welcome Back</h1>
                    <div className="user-info">
                        User: {user?.name || 'Guest'} ({role || 'N/A'})
                        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
                            Logout
                        </button>
                    </div>
                </header>

                <main className="content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
