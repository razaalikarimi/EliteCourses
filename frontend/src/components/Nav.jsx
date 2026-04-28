import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoMdPerson } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";

import { useNavigate, useLocation } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Nav() {
  let [showHam, setShowHam] = useState(false);
  let [showPro, setShowPro] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      await dispatch(setUserData(null));
      toast.success("LogOut Successfully");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  return (
    <nav className="w-full h-[72px] fixed top-0 left-0 flex items-center justify-between px-6 md:px-12 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/60 z-50">
      <div className="flex items-center gap-8">
        <img
          src={logo}
          className="w-[48px] h-[48px] rounded-lg border border-gray-200 cursor-pointer object-cover"
          onClick={() => navigate("/")}
          alt="LMS Logo"
        />
        <div className="hidden md:flex items-center gap-6">
          <span 
            className="text-gray-600 hover:text-blue-600 cursor-pointer font-medium"
            onClick={() => navigate("/allcourses")}
          >
            Courses
          </span>
          {userData?.role === "educator" && (
            <span 
              className="text-gray-600 hover:text-blue-600 cursor-pointer font-medium"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!userData ? (
          <div className="flex items-center gap-3">
            {!isLoginPage && (
              <button
                className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            )}
            {!isSignUpPage && (
              <button
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
            )}
          </div>
        ) : (
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden hover:ring-2 hover:ring-blue-100 transition-all"
              onClick={() => setShowPro((prev) => !prev)}
            >
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  className="w-full h-full object-cover"
                  alt={userData.name}
                />
              ) : (
                <span className="text-gray-600 font-semibold">
                  {userData?.name?.slice(0, 1).toUpperCase()}
                </span>
              )}
            </div>
            
            {showPro && (
              <div className="absolute top-[calc(100%+12px)] right-0 w-48 bg-white rounded-xl border border-gray-100 shadow-xl py-2 z-50">
                <div 
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium"
                  onClick={() => { navigate("/profile"); setShowPro(false); }}
                >
                  Profile
                </div>
                <div 
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium"
                  onClick={() => { navigate("/enrolledcourses"); setShowPro(false); }}
                >
                  My Courses
                </div>
                <div className="h-px bg-gray-100 my-1"></div>
                <div 
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-red-600 font-medium"
                  onClick={() => { handleLogout(); setShowPro(false); }}
                >
                  Log Out
                </div>
              </div>
            )}
          </div>
        )}
        
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setShowHam(true)}
        >
          <GiHamburgerMenu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {showHam && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col p-6">
          <div className="flex items-center justify-between mb-8">
            <img src={logo} className="w-10 h-10 rounded-lg" alt="" />
            <button onClick={() => setShowHam(false)} className="p-2 text-gray-600">
              <GiSplitCross size={24} />
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-xl font-semibold text-gray-900 py-2" onClick={() => { navigate("/allcourses"); setShowHam(false); }}>Courses</span>
            {userData?.role === "educator" && (
              <span className="text-xl font-semibold text-gray-900 py-2" onClick={() => { navigate("/dashboard"); setShowHam(false); }}>Dashboard</span>
            )}
            <div className="h-px bg-gray-100 my-2"></div>
            <span className="text-xl font-semibold text-gray-900 py-2" onClick={() => { navigate("/profile"); setShowHam(false); }}>Profile</span>
            <span className="text-xl font-semibold text-gray-900 py-2" onClick={() => { navigate("/enrolledcourses"); setShowHam(false); }}>My Courses</span>
            <div className="h-px bg-gray-100 my-2"></div>
            {!userData ? (
              <button 
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg"
                onClick={() => { navigate("/login"); setShowHam(false); }}
              >
                Log In
              </button>
            ) : (
              <button 
                className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-bold text-lg"
                onClick={() => { handleLogout(); setShowHam(false); }}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
