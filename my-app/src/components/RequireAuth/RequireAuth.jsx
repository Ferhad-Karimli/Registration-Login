import React from "react";
import { getToken } from "../../helpers";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const token = getToken();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ path: location }} replace />;
  }
  return children;
};
