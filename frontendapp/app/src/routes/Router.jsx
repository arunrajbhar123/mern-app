import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./../pages/Login";
import Signup from "./../pages/Signup";
import Profile from "./../pages/Profile";
import ReqAuth from "./../HOF/ReqAuth";
import ForgotPassword from "./../pages/Forgat";
import DashboardAdmin from "./../pages/dashboard/admin/DashboardAdmin";
import Dashboard from "./../pages/dashboard/student/Dashboard";
import ListofPost from './../pages/dashboard/student/ListofPost';
import Edit from './../pages/dashboard/student/Edit';

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route
        path="/profile"
        element={
          <ReqAuth>
            <Profile />
          </ReqAuth>
        }
      />
      <Route
        path="/dashboardadmin"
        element={
          <ReqAuth>
            <DashboardAdmin />
          </ReqAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ReqAuth>
            <Dashboard />
          </ReqAuth>
        }
      />
      <Route path="/listofpost" element={<ListofPost/>}/>
      <Route path="/edit" element={<Edit/>}/>
    </Routes>
  );
};

export default Router;
