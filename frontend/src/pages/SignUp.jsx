import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import axios from "axios";
import { serverUrl } from "../App";
<<<<<<< HEAD
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { motion } from "framer-motion";

=======
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();
  let [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, email, password, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
<<<<<<< HEAD
      navigate("/");
      toast.success("SignUp Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "SignUp failed");
    } finally {
      setLoading(false);
    }
  };

  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
=======

      navigate("/");
      toast.success("SignUp Successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      console.log(response);
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlesignup",
        { name, email, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("SignUp Successfully");
    } catch (error) {
<<<<<<< HEAD
      toast.error("Google authentication failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <form
        className="w-full max-w-5xl bg-white shadow-2xl rounded-[2.5rem] flex overflow-hidden border border-slate-200"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:w-1/2 w-full p-10 lg:p-16 flex flex-col justify-center gap-6">
          <div className="text-center md:text-left mb-2">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight">
              Join Us.
            </h1>
            <p className="text-slate-400 text-lg font-medium">Create your professional profile</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] ml-1">Full Name</label>
              <input
                type="text"
                className="input-modern w-full h-12 text-sm bg-slate-50 border-slate-200"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] ml-1">Email Address</label>
              <input
                type="email"
                className="input-modern w-full h-12 text-sm bg-slate-50 border-slate-200"
                placeholder="name@studio.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex flex-col gap-1.5 relative">
              <label className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] ml-1">Password</label>
              <input
                type={show ? "text" : "password"}
                className="input-modern w-full h-12 text-sm bg-slate-50 border-slate-200 pr-12"
                placeholder="••••••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div 
                className="absolute right-4 bottom-3 p-1 cursor-pointer text-slate-400 hover:text-indigo-600 transition-colors"
                onClick={() => setShow(!show)}
              >
                {show ? <MdRemoveRedEye size={20} /> : <MdOutlineRemoveRedEye size={20} />}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] ml-1">Account Type</label>
              <div className="flex gap-3">
                {['student', 'educator'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setRole(t)}
                    className={`flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      role === t 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'bg-white text-gray-500 border border-gray-100 hover:border-indigo-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-2">
            <button
              className="w-full h-14 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100"
              disabled={loading}
              onClick={handleSignUp}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Create Account"}
            </button>
          </div>

          <div className="flex items-center gap-4 py-1">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">OR</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <button
            type="button"
            className="w-full h-14 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all font-bold text-slate-700 group"
            onClick={googleSignUp}
          >
            <img src={google} alt="" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Join with Google</span>
          </button>

          <p className="text-center text-slate-400 font-medium text-sm">
            Already in?{" "}
            <button
              type="button"
              className="font-black text-indigo-600 hover:underline underline-offset-4"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </p>
        </div>

        <div className="hidden md:flex md:w-1/2 bg-indigo-600 items-center justify-center flex-col p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] -ml-32 -mb-32" />
          
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={logo} 
            className="w-48 h-48 rounded-[2rem] shadow-2xl mb-10 relative z-10 border border-white/20" 
            alt="" 
          />
          <h2 className="text-5xl font-black mb-6 relative z-10 tracking-tighter text-white">Elite Courses</h2>
          <p className="text-xl text-center text-indigo-100 max-w-sm relative z-10 font-medium leading-relaxed">
            Where elite skills meet professional opportunities.
          </p>
=======
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center flex-col gap-3">
      <form
        className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 ">
          <div>
            <h1 className="font-semibold text-[black] text-2xl">
              Let's get Started
            </h1>
            <h2 className="text-[#999797] text-[18px]">Create your account</h2>
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type={show ? "text" : "password"}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="***********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show && (
              <MdOutlineRemoveRedEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <MdRemoveRedEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>
          <div className="flex md:w-[50%] w-[70%] items-center justify-between">
            <span
              className={`px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-2xl  cursor-pointer ${
                role === "student" ? "border-black" : "border-[#646464]"
              }`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
            <span
              className={`px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-2xl  cursor-pointer ${
                role === "educator" ? "border-black" : "border-[#646464]"
              }`}
              onClick={() => setRole("educator")}
            >
              Educator
            </span>
          </div>
          <button
            className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
            disabled={loading}
            onClick={handleSignUp}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}
          </button>

          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center ">
              Or continue with
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div
            className="w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center  "
            onClick={googleSignUp}
          >
            <img src={google} alt="" className="w-[25px]" />
            <span className="text-[18px] text-gray-500">oogle</span>{" "}
          </div>
          <div className="text-[#6f6f6f]">
            Already have an account?{" "}
            <span
              className="underline underline-offset-1 text-[black]"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
        <div className="w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden">
          <img src={logo} className="w-30 shadow-2xl" alt="" />
          <span className="text-[white] text-2xl">Elite Courses</span>
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
        </div>
      </form>
    </div>
  );
}

export default SignUp;
<<<<<<< HEAD

=======
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
