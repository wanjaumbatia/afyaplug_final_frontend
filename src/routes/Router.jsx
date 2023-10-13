import React from "react";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Services from "../pages/Services";
import Personnel from "../pages/Personnel/Personnel";
import PersonnelDetails from "../pages/Personnel/PersonnelDetails";
import MyAccount from "../Dashboard/user-account/MyAccount";
import ProtectedRoutes from "./ProtectedRoutes";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import Dashboard from "../Dashboard/personnel-account/Dashboard";

function Router() {
  const token = useAuth();

  return (
    <Routes>
      {/* Public to everyone */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/personnel" element={<Personnel />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/personnel/:id" element={<PersonnelDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      <Route
        path="/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/nurse/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default Router;
