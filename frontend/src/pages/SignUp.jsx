import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import axios from "axios";
import { serverUrl } from "../App";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { motion } from "framer-motion";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, email, password, role },
        { withCredentials: true },
      );

      dispatch(setUserData(result.data));
      toast.success("Sign up successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        serverUrl + "/api/auth/googlesignup",
        {
          name: user.displayName,
          email: user.email,
          role,
        },
        { withCredentials: true },
      );

      dispatch(setUserData(result.data));
      toast.success("Sign up successful");
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
        <div className="md:w-1/2 w-full p-10 lg:p-16 flex flex-col justify-center gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2">
              Join Us.
            </h1>
            <p className="text-slate-400 text-lg font-medium">
              Create your professional profile
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em]">
                Full Name
              </label>
              <input
                type="text"
                className="h-12 w-full px-4 rounded-xl bg-slate-50 border border-slate-200"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em]">
                Email Address
              </label>
              <input
                type="email"
                className="h-12 w-full px-4 rounded-xl bg-slate-50 border border-slate-200"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em]">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                className="h-12 w-full px-4 pr-12 rounded-xl bg-slate-50 border border-slate-200"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-4 bottom-3 cursor-pointer text-slate-400"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <MdRemoveRedEye size={20} />
                ) : (
                  <MdOutlineRemoveRedEye size={20} />
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em]">
                Account Type
              </label>
              <div className="flex gap-3 mt-2">
                {["student", "educator"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setRole(t)}
                    className={`flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      role === t
                        ? "bg-indigo-600 text-white"
                        : "border border-gray-200 text-gray-500"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="h-14 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-700 flex items-center justify-center"
          >
            {loading ? (
              <ClipLoader size={20} color="white" />
            ) : (
              "Create Account"
            )}
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] font-black text-slate-300">OR</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <button
            type="button"
            onClick={googleSignUp}
            className="h-14 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 font-bold"
          >
            <img src={google} alt="" className="w-5 h-5" />
            Join with Google
          </button>

          <p className="text-center text-slate-400">
            Already have an account?{" "}
            <span
              className="font-black text-indigo-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign In
            </span>
          </p>
        </div>

        {/* Right */}
        <div className="hidden md:flex md:w-1/2 bg-indigo-600 items-center justify-center flex-col p-16 text-white relative">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={logo}
            alt=""
            className="w-48 h-48 rounded-[2rem] shadow-2xl mb-10 border border-white/20"
          />
          <h2 className="text-5xl font-black mb-6">Elite Courses</h2>
          <p className="text-xl text-center text-indigo-100 max-w-sm">
            Where elite skills meet professional opportunities.
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
