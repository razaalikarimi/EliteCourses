import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpg";
import { HiMenuAlt3, HiX, HiChevronRight, HiUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Nav() {
  const [showHam, setShowHam] = useState(false);
  const [showPro, setShowPro] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-[100] h-20 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 lg:px-12 flex items-center justify-between shadow-sm">
      {/* Brand */}
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          className="w-10 h-10 rounded-xl object-cover ring-1 ring-gray-200"
          alt="Elite Courses"
        />
        <div className="hidden lg:block">
          <div className="text-gray-900 text-xl font-black tracking-tight">Elite Courses</div>
          <div className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest -mt-1">Online Learning Platform</div>
        </div>
      </div>

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center gap-8">
        {!userData ? (
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate("/login")}
              className="text-gray-600 font-bold text-sm hover:text-indigo-600 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate("/signup")}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            <button 
              onClick={() => navigate("/allcourses")}
              className="text-gray-600 font-bold text-sm hover:text-indigo-600 transition-colors"
            >
              Explore Courses
            </button>
            <div 
              className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden transform active:scale-90 transition-all hover:border-indigo-300"
              onClick={() => setShowPro(!showPro)}
            >
              {userData.photoUrl ? (
                <img src={userData.photoUrl} className="w-full h-full object-cover" alt="" />
              ) : (
                <HiUserCircle size={28} className="text-gray-400" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Trigger */}
      <button 
        className="lg:hidden text-gray-900 p-2 hover:bg-gray-50 rounded-xl transition-colors"
        onClick={() => setShowHam(true)}
      >
        <HiMenuAlt3 size={28} />
      </button>

      {/* Profile Dropdown */}
      <AnimatePresence>
        {showPro && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-24 right-12 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 z-[110]"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
              <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                {userData.photoUrl && <img src={userData.photoUrl} className="w-full h-full object-cover" alt="" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-gray-900 font-bold text-sm truncate">{userData.name}</div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase truncate">{userData.role}</div>
              </div>
            </div>
            <div className="space-y-1">
              <button 
                onClick={() => { navigate("/profile"); setShowPro(false); }}
                className="w-full text-left p-2.5 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-50 font-semibold text-sm transition-all flex items-center justify-between group"
              >
                My Profile <HiChevronRight className="opacity-0 group-hover:opacity-100 transition-all" />
              </button>
              <button 
                onClick={() => { navigate("/enrolledcourses"); setShowPro(false); }}
                className="w-full text-left p-2.5 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-50 font-semibold text-sm transition-all flex items-center justify-between group"
              >
                My Learning <HiChevronRight className="opacity-0 group-hover:opacity-100 transition-all" />
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left p-2.5 rounded-lg text-red-600 hover:bg-red-50 font-bold text-sm transition-all mt-2"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showHam && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[120] flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="text-gray-900 text-xl font-black tracking-tight">Elite Courses</div>
              <button 
                className="text-gray-600 p-2 hover:bg-gray-50 rounded-xl"
                onClick={() => setShowHam(false)}
              >
                <HiX size={28} />
              </button>
            </div>
            <div className="space-y-6 flex flex-col">
               <button onClick={() => { navigate("/"); setShowHam(false); }} className="text-4xl font-black text-gray-900 text-left">Home</button>
               <button onClick={() => { navigate("/allcourses"); setShowHam(false); }} className="text-4xl font-black text-gray-900 text-left">Courses</button>
               <button onClick={() => { navigate("/profile"); setShowHam(false); }} className="text-4xl font-black text-gray-900 text-left">Profile</button>
               {!userData ? (
                 <button onClick={() => { navigate("/login"); setShowHam(false); }} className="text-4xl font-black text-indigo-600 text-left">Sign In</button>
               ) : (
                 <button onClick={() => { handleLogout(); setShowHam(false); }} className="text-4xl font-black text-red-600 text-left">Sign Out</button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Nav;


