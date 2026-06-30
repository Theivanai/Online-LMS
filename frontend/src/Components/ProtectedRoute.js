import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');  // check if user is logged in
    const userRole = localStorage.getItem('role');  // get user's saved role

    if (!token || userRole !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
