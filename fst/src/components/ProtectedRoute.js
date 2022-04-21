import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from './use-auth.js';


const ProtectedRoute = ({ children }) => {
    const auth = useAuth();
    if (auth.loading) {
        return '';
    }
    if (!auth.user) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
};

export default ProtectedRoute;

