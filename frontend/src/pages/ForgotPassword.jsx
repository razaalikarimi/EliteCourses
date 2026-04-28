import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'
import { FaArrowLeftLong } from "react-icons/fa6";
import logo from "../assets/logo.jpg";

function ForgotPassword() {
  let navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [newpassword, setNewPassword] = useState("")
  const [conPassword, setConpassword] = useState("")

  const handleStep1 = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendotp`, { email }, { withCredentials: true })
      setStep(2)
      toast.success(result.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleStep2 = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter the OTP");
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyotp`, { email, otp }, { withCredentials: true })
      toast.success(result.data.message)
      setStep(3)
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleStep3 = async (e) => {
    e.preventDefault();
    if (!newpassword || !conPassword) return toast.error("Please fill all fields");
    if (newpassword.length < 8) return toast.error("Password must be at least 8 characters");
    if (newpassword !== conPassword) return toast.error("Passwords do not match");

    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/resetpassword`, { email, password: newpassword }, { withCredentials: true })
      toast.success(result.data.message)
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img src={logo} className="w-16 h-16 rounded-2xl shadow-lg border border-gray-100" alt="Logo" />
          </div>
          
          {step === 1 && (
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">Reset password</h1>
              <p className="text-gray-500 font-medium">Enter your email to receive an OTP</p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">Verify OTP</h1>
              <p className="text-gray-500 font-medium">Enter the 4-digit code sent to your email</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">New Password</h1>
              <p className="text-gray-500 font-medium">Set a secure password for your account</p>
            </div>
          )}
        </div>

        {step === 1 && (
          <form className="space-y-6" onSubmit={handleStep1}>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-100 flex items-center justify-center"
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-6" onSubmit={handleStep2}>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Verification Code</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-center text-2xl tracking-[1em]"
                placeholder="0000"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-100 flex items-center justify-center"
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="space-y-5" onSubmit={handleStep3}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">New Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  placeholder="••••••••"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  placeholder="••••••••"
                  value={conPassword}
                  onChange={(e) => setConpassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-100 flex items-center justify-center"
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Reset Password"}
            </button>
          </form>
        )}

        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors pt-2"
        >
          <FaArrowLeftLong /> Back to Log In
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword;
