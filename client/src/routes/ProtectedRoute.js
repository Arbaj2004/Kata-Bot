import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const user = useSelector((state) => state.user.user); // Fetch user state from Redux

    // If the user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // If a required role is specified, check if the user's role matches
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />; // Redirect to home if role doesn't match
    }

    // Render the child components if authentication and role check pass
    return children;
};

export default ProtectedRoute;
