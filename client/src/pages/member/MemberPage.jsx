import React from "react";
import { Outlet } from "react-router-dom";

export default function MemberPage() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
