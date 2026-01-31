import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import BookService from "./pages/BookService.jsx";
import BookingSuccess from "./pages/BookingSuccess.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ServiceCategories from "./pages/ServiceCategories.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="appShell">
      <Navbar />
      <main className="mainArea">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookService />} />
          <Route path="/success" element={<BookingSuccess />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          { <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          /> }
          { <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <ServiceCategories />
              </ProtectedRoute>
            }
          /> }

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
