import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../Layout';

const RequireAuth: React.FC<{ role?: 'admin' | 'user' }> = ({ role }) => {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) return <Navigate to="/login" />;

    if (role && user.role !== role) {
        return <Navigate to="/unauthorized" />;
    }

    return <><Layout> <Outlet /></Layout></>

        ;
};

export default RequireAuth;
