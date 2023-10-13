import React, { useContext } from "react";
import { authContext } from "../context/AuthContext";

import { Navigate, Outlet, Route, Routes } from "react-router-dom";

function ProtectedRoutes({ children, allowedRoles }) {
  const { token, role } = useContext(authContext);

  const isAllowed = allowedRoles.includes(role);
  const accessibleRoute =
    token && isAllowed ? children : <Navigate to="/login" replace={true} />;

  return accessibleRoute;
}

export default ProtectedRoutes;
