// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

const ProtectedRoute = ({ children, role }) => {
  const token = getToken();
  const userRole = getRole();

  // If no token or wrong role, redirect to login
  if (!token || userRole !== role) {
    return <Navigate to="/erp-login" />;
  }

  return children;
};

export default ProtectedRoute;
