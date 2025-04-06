import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserRoutes from "./users/UserRoutes";
import MemberRoutes from "./member/MemberRoutes";
import { MemberLoginPage } from "./member/MemberAuth/MemberLoginPage";
import { MemberRegisterPage } from "./member/MemberAuth/MemberRegisterPage";
import ProtectedMemberRoute from "../common/ProtectedMemberRoute";

export default function PagesRoutes() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="member-login" element={<MemberLoginPage />} />
        <Route path="member-register" element={<MemberRegisterPage />} />
        <Route
          path="/member/*"
          index
          element={
            <ProtectedMemberRoute>
              <MemberRoutes />
            </ProtectedMemberRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
