import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import NewDashboard from "./pages/NewDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AllCouses from "./pages/AllCouses";
import ViewCourse from "./pages/ViewCourse";
import EnrolledCourse from "./pages/EnrolledCourse";
import ViewLecture from "./pages/ViewLecture";
import SearchWithAi from "./pages/SearchWithAi";
import MyDoubts from "./pages/MyDoubts";

import Dashboard from "./pages/admin/Dashboard";
import Courses from "./pages/admin/Courses";
import AddCourses from "./pages/admin/AddCourses";
import CreateCourse from "./pages/admin/CreateCourse";
import CreateLecture from "./pages/admin/CreateLecture";
import EditLecture from "./pages/admin/EditLecture";
import EscalatedDoubts from "./pages/admin/EscalatedDoubts";
import Ingest from "./pages/admin/Ingest";
import FloatingChat from "./components/FloatingChat";

import ScrollToTop from "./components/ScrollToTop";

import getCurrentUser from "./customHooks/getCurrentUser";
import getCouseData from "./customHooks/getCouseData";
import getCreatorCourseData from "./customHooks/getCreatorCourseData";
import getAllReviews from "./customHooks/getAllReviews";

export const serverUrl = import.meta.env.MODE === "development" ? `http://${window.location.hostname}:8000` : "https://elitecoursesb.onrender.com";

function App() {
  const { userData, isAuthLoading } = useSelector((state) => state.user);

  // global data loaders
  getCurrentUser();
  getCouseData();
  getCreatorCourseData();
  getAllReviews();

  // Show loading screen while checking auth status
  if (isAuthLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0f0f1a" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid rgba(255,255,255,0.1)", borderTopColor: "#8b5cf6", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <ScrollToTop />

      <Routes>
        {/* Public / Home */}
        <Route
          path="/"
          element={
            userData ? (
              userData.role === "educator" ? (
                <Dashboard />
              ) : (
                <NewDashboard />
              )
            ) : (
              <Home />
            )
          }
        />
        {/* BUG 8 FIX: Redirect logged-in users away from /login */}
        <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* User Protected */}
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/signup" />}
        />
        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to="/signup" />}
        />
        <Route
          path="/allcourses"
          element={<AllCouses />}
        />
        <Route
          path="/viewcourse/:courseId"
          element={<ViewCourse />}
        />
        <Route
          path="/enrolledcourses"
          element={userData ? <EnrolledCourse /> : <Navigate to="/signup" />}
        />
        <Route
          path="/viewlecture/:courseId"
          element={userData ? <ViewLecture /> : <Navigate to="/signup" />}
        />
        <Route
          path="/searchwithai"
          element={<SearchWithAi />}
        />
        <Route
          path="/mydoubts"
          element={userData ? <MyDoubts /> : <Navigate to="/signup" />}
        />

        {/* Educator Protected */}
        {/* BUG 9 FIX: Redirect unauthorized users to / (home) instead of /signup to avoid confusing UX */}
        <Route
          path="/dashboard"
          element={
            userData?.role === "educator" ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/courses"
          element={
            userData?.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/addcourses/:courseId"
          element={
            userData?.role === "educator" ? (
              <AddCourses />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/createcourses"
          element={
            userData?.role === "educator" ? (
              <CreateCourse />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/createlecture/:courseId"
          element={
            userData?.role === "educator" ? (
              <CreateLecture />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/editlecture/:courseId/:lectureId"
          element={
            userData?.role === "educator" ? (
              <EditLecture />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/escalateddoubts"
          element={
            userData?.role === "educator" ? (
              <EscalatedDoubts />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/ingest"
          element={
            userData?.role === "educator" ? (
              <Ingest />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <FloatingChat />
    </>
  );
}

export default App;
