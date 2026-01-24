import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";

import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { serverUrl } from "../App";
import { auth, provider } from "../../utils/Firebase";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Normal signup
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password, role },
        { withCredentials: true }
      );

      dispatch(setUserData(res.data));
      toast.success("Signup successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Google signup
  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const res = await axios.post(
        `${serverUrl}/api/auth/googlesignup`,
        {
          name: user.displayName,
          email: user.email,
          role,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(res.data));
      toast.success("Signup successful");
      navigate("/");
    } catch (error) {
      toast.error("Google authentication failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <form
        className="w-full max-w-5xl bg-white shadow-2xl rounded-[2.5rem] flex overflow-hidden border border-slate-200"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Left */}
        <div className="md:w-1/2 w-full p-10 lg:p-16 flex flex-col gap-6 justify-center">
          <h1 className="text-4xl font-black">Create Account</h1>

          <input
            placeholder="Full Name"
            className="input-modern"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="input-modern"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="input-modern pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-4 top-3 cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <MdRemoveRedEye /> : <MdOutlineRemoveRedEye />}
            </div>
          </div>

          <div className="flex gap-3">
            {["student", "educator"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setRole(t)}
                className={`flex-1 h-12 rounded-xl font-bold ${
                  role === t
                    ? "bg-indigo-600 text-white"
                    : "border border-gray-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="h-14 bg-indigo-600 text-white rounded-xl font-bold"
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
          </button>

          <button
            type="button"
            onClick={googleSignUp}
            className="h-14 border rounded-xl flex items-center justify-center gap-2"
          >
            <img src={google} className="w-5" alt="" />
            Continue with Google
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>

        {/* Right */}
        <div className="hidden md:flex md:w-1/2 bg-indigo-600 text-white items-center justify-center flex-col">
          <motion.img
            src={logo}
            className="w-40 rounded-2xl mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
          <h2 className="text-4xl font-black">Elite Courses</h2>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
