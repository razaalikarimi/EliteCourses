import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import axios from "axios";
import { serverUrl } from "../App";
<<<<<<< HEAD
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
=======
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { MdRemoveRedEye } from "react-icons/md";
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
<<<<<<< HEAD
import { motion } from "framer-motion";
=======
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
<<<<<<< HEAD

=======
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/");
<<<<<<< HEAD
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlesignup",
        { name, email, role: "student" },
=======
      setLoading(false);
      toast.success("Login Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      let role = "";

      const result = await axios.post(
        serverUrl + "/api/auth/googlesignup",
        { name, email, role },
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Login Successfully");
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
        <div className="md:w-1/2 w-full p-10 lg:p-16 flex flex-col justify-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight">
              Welcome back.
            </h1>
            <p className="text-slate-400 text-lg font-medium">Log in to your dashboard</p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] ml-1">Email Address</label>
              <input
                type="email"
                className="input-modern w-full h-14 text-base bg-slate-50 border-slate-200"
                placeholder="name@studio.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] ml-1">Password</label>
              <input
                type={show ? "text" : "password"}
                className="input-modern w-full h-14 text-base bg-slate-50 border-slate-200 pr-14"
                placeholder="••••••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div 
                className="absolute right-4 bottom-4 p-1 cursor-pointer text-slate-400 hover:text-indigo-600 transition-colors"
                onClick={() => setShow(!show)}
              >
                {show ? <MdRemoveRedEye size={22} /> : <MdOutlineRemoveRedEye size={22} />}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              className="w-full h-14 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Sign In"}
            </button>

            <button
              type="button"
              className="w-full text-xs text-slate-400 font-black uppercase tracking-widest hover:text-indigo-600 transition-colors text-center"
              onClick={() => navigate("/forgotpassword")}
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">OR</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <button
            type="button"
            className="w-full h-14 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all font-bold text-slate-700 group"
            onClick={googleLogin}
          >
            <img src={google} alt="" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Sign in with Google</span>
          </button>

          <p className="text-center text-slate-400 font-medium text-sm">
            No account?{" "}
            <button
              type="button"
              className="font-black text-indigo-600 hover:underline underline-offset-4"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>
          </p>
        </div>

        <div className="hidden md:flex md:w-1/2 bg-slate-900 items-center justify-center flex-col p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />
          
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={logo} 
            className="w-48 h-48 rounded-[2rem] shadow-2xl mb-10 relative z-10 border border-white/10" 
            alt="" 
          />
          <h2 className="text-5xl font-black mb-6 relative z-10 tracking-tighter text-white">Elite Courses</h2>
          <p className="text-xl text-center text-slate-400 max-w-sm relative z-10 font-medium leading-relaxed">
            The professional standard for collaborative learning.
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
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-4 ">
          <div>
            <h1 className="font-semibold text-[black] text-2xl">
              Welcome back
            </h1>
            <h2 className="text-[#999797] text-[18px]">
              Login to your account
            </h2>
          </div>
          <div className="flex flex-col gap-1 w-[85%] items-start justify-center px-3">
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
          <div className="flex flex-col gap-1 w-[85%] items-start justify-center px-3 relative">
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

          <button
            className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Login"}
          </button>
          <span
            className="text-[13px] cursor-pointer text-[#585757]"
            onClick={() => navigate("/forgotpassword")}
          >
            Forget your password?
          </span>

          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#999797] flex items-center justify-center ">
              Or continue with
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>

          <div
            className="w-[80%] h-[40px] border-1 border-[#d3d2d2] rounded-[5px] flex items-center justify-center "
            onClick={googleLogin}
          >
            <img src={google} alt="" className="w-[25px]" />
            <span className="text-[18px] text-gray-500">oogle</span>{" "}
          </div>
          <div className="text-[#6f6f6f]">
            Don't have an account?{" "}
            <span
              className="underline underline-offset-1 text-[black]"
              onClick={() => navigate("/signup")}
            >
              Sign up
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

export default Login;
<<<<<<< HEAD

=======
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
