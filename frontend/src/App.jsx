// import React from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import NewDashboard from './pages/NewDashboard'
// import Login from './pages/Login'
// import SignUp from './pages/SignUp'
// import { ToastContainer} from 'react-toastify';
// import ForgotPassword from './pages/ForgotPassword'
// import getCurrentUser from './customHooks/getCurrentUser'
// import { useSelector } from 'react-redux'
// import Profile from './pages/Profile'
// import EditProfile from './pages/EditProfile'
// import Dashboard from './pages/admin/Dashboard'
// import Courses from './pages/admin/Courses'
// import AllCouses from './pages/AllCouses'
// import AddCourses from './pages/admin/AddCourses'
// import CreateCourse from './pages/admin/CreateCourse'
// import CreateLecture from './pages/admin/CreateLecture'
// import EditLecture from './pages/admin/EditLecture'

// import getCouseData from './customHooks/getCouseData'
// import ViewCourse from './pages/ViewCourse'
// import ScrollToTop from './components/ScrollToTop'
// import getCreatorCourseData from './customHooks/getCreatorCourseData'
// import EnrolledCourse from './pages/EnrolledCourse'
// import ViewLecture from './pages/ViewLecture'
// import SearchWithAi from './pages/SearchWithAi'
// import getAllReviews from './customHooks/getAllReviews'

// export const serverUrl = "https://elitecoursesb.onrender.com"

// function App() {
  
//   let {userData} = useSelector(state=>state.user)

//   getCurrentUser()
//   getCouseData()
//   getCreatorCourseData()
//   getAllReviews()
//   return (
//     <>
    
//       <ToastContainer />
//       <ScrollToTop/>
//       <Routes>
//         {/* Show NewDashboard for logged-in users, Home for visitors */}
//         <Route path='/' element={userData ? <NewDashboard/> : <Home/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
//         <Route path='/profile' element={userData?<Profile/>:<Navigate to={"/signup"}/>}/>
//         <Route path='/allcourses' element={userData?<AllCouses/>:<Navigate to={"/signup"}/>}/>
//         <Route path='/viewcourse/:courseId' element={userData?<ViewCourse/>:<Navigate to={"/signup"}/>}/>
//         <Route path='/editprofile' element={userData?<EditProfile/>:<Navigate to={"/signup"}/>}/>
//         <Route path='/enrolledcourses' element={userData?<EnrolledCourse/>:<Navigate to={"/signup"}/>}/>
//          <Route path='/viewlecture/:courseId' element={userData?<ViewLecture/>:<Navigate to={"/signup"}/>}/>
//          <Route path='/searchwithai' element={userData?<SearchWithAi/>:<Navigate to={"/signup"}/>}/>
        
        
//         <Route path='/dashboard' element={userData?.role === "educator"?<Dashboard/>:<Navigate to={"/signup"}/>}/>
//         <Route path='/courses' element={userData?.role === "educator"?<Courses/>:<Navigate to={"/signup"}/>}/>
//         <Route path='/addcourses/:courseId' element={userData?.role === "educator"?<AddCourses/>:<Navigate to={"/signup"}/>}/>
//         <Route path='/createcourses' element={userData?.role === "educator"?<CreateCourse/>:<Navigate to={"/signup"}/>}/>
//         <Route path='/createlecture/:courseId' element={userData?.role === "educator"?<CreateLecture/>:<Navigate to={"/signup"}/>}/>
//         <Route path='/editlecture/:courseId/:lectureId' element={userData?.role === "educator"?<EditLecture/>:<Navigate to={"/signup"}/>}/>
//         <Route path='/forgotpassword' element={<ForgotPassword/>}/>
//          </Routes>

//          </>
   
//   )
// }

// export default App

// <<<<<<< HEAD
// =======

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

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

import Dashboard from "./pages/admin/Dashboard";
import Courses from "./pages/admin/Courses";
import AddCourses from "./pages/admin/AddCourses";
import CreateCourse from "./pages/admin/CreateCourse";
import CreateLecture from "./pages/admin/CreateLecture";
import EditLecture from "./pages/admin/EditLecture";

import ScrollToTop from "./components/ScrollToTop";

import getCurrentUser from "./customHooks/getCurrentUser";
import getCouseData from "./customHooks/getCouseData";
import getCreatorCourseData from "./customHooks/getCreatorCourseData";
import getAllReviews from "./customHooks/getAllReviews";

export const serverUrl = "https://elitecoursesb.onrender.com";

function App() {
  const { userData } = useSelector((state) => state.user);

  // custom hooks (data preload)
  getCurrentUser();
  getCouseData();
  getCreatorCourseData();
  getAllReviews();

  return (
    <>
      <ToastContainer />
      <ScrollToTop />

      <Routes>
        {/* Public / Auth */}
        <Route path="/" element={userData ? <NewDashboard /> : <Home />} />
        <Route path="/login" element={<Login />} />
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
          element={userData ? <AllCouses /> : <Navigate to="/signup" />}
        />
        <Route
          path="/viewcourse/:courseId"
          element={userData ? <ViewCourse /> : <Navigate to="/signup" />}
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
          element={userData ? <SearchWithAi /> : <Navigate to="/signup" />}
        />

        {/* Educator Protected */}
        <Route
          path="/dashboard"
          element={
            userData?.role === "educator" ? (
              <Dashboard />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route
          path="/courses"
          element={
            userData?.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route
          path="/addcourses/:courseId"
          element={
            userData?.role === "educator" ? (
              <AddCourses />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route
          path="/createcourses"
          element={
            userData?.role === "educator" ? (
              <CreateCourse />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route
          path="/createlecture/:courseId"
          element={
            userData?.role === "educator" ? (
              <CreateLecture />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route
          path="/editlecture/:courseId/:lectureId"
          element={
            userData?.role === "educator" ? (
              <EditLecture />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;





// >>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
