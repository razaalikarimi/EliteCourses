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
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-[100] h-20 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 lg:px-12 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="Elite Courses"
          className="w-10 h-10 rounded-xl object-cover"
        />
        <span className="hidden lg:block text-xl font-black">
          Elite Courses
        </span>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex items-center gap-6">
        {!userData ? (
          <>
            <button onClick={() => navigate("/login")}>Sign In</button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl"
            >
              Get Started
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/allcourses")}>
              Explore Courses
            </button>
            <div
              onClick={() => setShowPro(!showPro)}
              className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer"
            >
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  className="w-full h-full rounded-full object-cover"
                  alt=""
                />
              ) : (
                <HiUserCircle size={26} />
              )}
            </div>
          </>
        )}
      </div>

      {/* Mobile menu icon */}
      <button className="lg:hidden" onClick={() => setShowHam(true)}>
        <HiMenuAlt3 size={28} />
      </button>

      {/* Profile dropdown */}
      <AnimatePresence>
        {showPro && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-24 right-10 bg-white shadow-lg rounded-xl p-4 w-56"
          >
            <button
              onClick={() => navigate("/profile")}
              className="flex justify-between w-full p-2 hover:bg-gray-100 rounded"
            >
              My Profile <HiChevronRight />
            </button>
            <button
              onClick={() => navigate("/enrolledcourses")}
              className="flex justify-between w-full p-2 hover:bg-gray-100 rounded"
            >
              My Learning <HiChevronRight />
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left p-2 text-red-600"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {showHam && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 bg-white z-[120] p-6"
          >
            <div className="flex justify-between mb-10">
              <span className="font-black text-xl">Elite Courses</span>
              <HiX size={28} onClick={() => setShowHam(false)} />
            </div>

            <div className="flex flex-col gap-6 text-3xl font-bold">
              <button onClick={() => navigate("/")}>Home</button>
              <button onClick={() => navigate("/allcourses")}>Courses</button>
              <button onClick={() => navigate("/profile")}>Profile</button>
              {!userData ? (
                <button
                  className="text-indigo-600"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              ) : (
                <button className="text-red-600" onClick={handleLogout}>
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Nav;
