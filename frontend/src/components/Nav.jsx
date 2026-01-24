import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import logo from "../assets/logo.jpg";
import { IoMdPerson } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";

import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
function Nav() {
  let [showHam, setShowHam] = useState(false);
  let [showPro, setShowPro] = useState(false);
  let navigate = useNavigate();
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
  return (
    <div>
      <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000099]  z-10">
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px] ">
          <img
            src={logo}
            className=" w-[60px]  rounded-[5px] border-2 border-white cursor-pointer"
            onClick={() => navigate("/")}
            alt=""
          />
        </div>

        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
          {!userData ? (
            <IoMdPerson
              className="w-[50px] h-[50px] fill-white cursor-pointer border-[2px] border-[#fdfbfb] bg-[#000000d5] rounded-full p-[10px]"
              onClick={() => setShowPro((prev) => !prev)}
            />
          ) : (
            <div
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer"
              onClick={() => setShowPro((prev) => !prev)}
            >
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  className="w-[100%] h-[100%] rounded-full object-cover"
                  alt=""
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer">
                  {userData?.name.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
          )}
          {userData?.role == "educator" ? (
            <div
              className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white bg-[black] text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          ) : (
            ""
          )}
          {!userData && (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5] "
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          )}
          {userData && (
            <span
              className="px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer"
              onClick={handleLogout}
            >
              LogOut
            </span>
          )}
        </div>
        {showPro && (
          <div className=" absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px]  border-black hover:border-white hover:text-white cursor-pointer hover:bg-black  ">
            <span
              className="bg-[black] text-white  px-[30px] py-[10px] rounded-2xl hover:bg-gray-600"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </span>
            <span
              className="bg-[black] text-white hover:bg-gray-600  px-[25px] py-[10px] rounded-2xl"
              onClick={() => navigate("/enrolledcourses")}
            >
              My Courses
            </span>
          </div>
        )}
        <GiHamburgerMenu
          className="w-[30px] h-[30px] lg:hidden fill-white cursor-pointer "
          onClick={() => setShowHam((prev) => !prev)}
        />
      </div>
      <div
        className={`fixed  top-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 ${
          showHam
            ? "translate-x-[0%] transition duration-600  ease-in-out"
            : "translate-x-[-100%] transition duration-600  ease-in-out"
        }`}
      >
        <GiSplitCross
          className="w-[35px] h-[35px] fill-white absolute top-5 right-[4%]"
          onClick={() => setShowHam((prev) => !prev)}
        />
        {!userData ? (
          <IoMdPerson className="w-[50px] h-[50px] fill-white cursor-pointer border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-full p-[10px]" />
        ) : (
          <div
            className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer"
            onClick={() => setShowPro((prev) => !prev)}
          >
            {userData.photoUrl ? (
              <img
                src={userData.photoUrl}
                className="w-[100%] h-[100%] rounded-full object-cover "
                alt=""
              />
            ) : (
              <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer">
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
        )}

        <span
          className="flex items-center justify-center gap-2  text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg px-[65px] py-[20px] text-[18px] "
          onClick={() => navigate("/profile")}
        >
          My Profile{" "}
        </span>
        <span
          className="flex items-center justify-center gap-2  text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg px-[65px] py-[20px] text-[18px] "
          onClick={() => navigate("/enrolledcourses")}
        >
          My Courses{" "}
        </span>

        {userData?.role == "educator" ? (
          <div
            className="flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg px-[60px] py-[20px]"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </div>
        ) : (
          ""
        )}
        {!userData ? (
          <span
            className="flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg px-[80px] py-[20px]"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        ) : (
          <span
            className="flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg px-[75px] py-[20px]"
            onClick={handleLogout}
          >
            LogOut
          </span>
        )}
      </div>
    </div>
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
  );
}

export default Nav;
<<<<<<< HEAD


=======
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
