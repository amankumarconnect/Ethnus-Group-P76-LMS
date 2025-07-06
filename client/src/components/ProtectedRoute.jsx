import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js'; // Ensure this points to .js

const ProtectedRoute = ({ allowedRoles }) => {
  const { userInfo, loading } = useAuth(); // <-- GET THE LOADING STATE

  // 1. While we are checking for the user, show a loading spinner
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // 2. After loading, if there's no user, redirect to login
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // 3. If there is a user, but their role is not allowed, redirect
  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/" replace />; // Or an unauthorized page
  }

  // 4. If everything is fine, show the page
  return <Outlet />;
};

export default ProtectedRoute;