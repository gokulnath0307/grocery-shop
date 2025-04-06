import React from "react";
import { BrowserRouter } from "react-router-dom";
import PagesRoutes from "./pages/PagesRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 1000 }} />
      <BrowserRouter>
        <PagesRoutes />
      </BrowserRouter>
    </div>
  );
}
