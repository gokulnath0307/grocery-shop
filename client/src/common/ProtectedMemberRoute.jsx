import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedMemberRoute({ children }) {
  const isAuthenticated = !!localStorage.membertoken; // Example check

  return isAuthenticated ? children : <Navigate to="/member-login" replace />;
}
