import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'

function ForgotPassword() {
    let navigate = useNavigate()
    const [step,setStep] = useState(1)
    const [email,setEmail] = useState("")
    const [otp,setOtp] = useState("")
    const [loading,setLoading]= useState(false)
    const [newpassword,setNewPassword]= useState("")
    const [conPassword,setConpassword]= useState("")

   const handleStep1 = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendotp` , {email} , {withCredentials:true})
      console.log(result)
      setStep(2)
      toast.success(result.data.message)
      setLoading(false)
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
    
   }
    const handleStep2 = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyotp` , {email,otp} , {withCredentials:true})
      console.log(result)
      
      toast.success(result.data.message)
      setLoading(false)
      setStep(3)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
    
   }
    const handleStep3 = async () => {
    setLoading(true)
    try {
      if(newpassword !== conPassword){
        return toast.error("password does not match")
      }
      const result = await axios.post(`${serverUrl}/api/auth/resetpassword` , {email,password:newpassword} , {withCredentials:true})
      console.log(result)
      toast.success(result.data.message)
      setLoading(false)
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
    
   }


  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
     { step==1 && <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full border border-gray-100">
        <h2 className="text-3xl font-black mb-2 text-center text-gray-900 tracking-tight">
          Forgot Password?
        </h2>
        <p className="text-gray-500 text-center mb-8 font-medium">No worries, we'll send you reset instructions.</p>

          <form  className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-300"
                placeholder="name@example.com"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl active:scale-95 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest text-xs" 
              disabled={loading} 
              onClick={handleStep1}
            >
              {loading?<ClipLoader size={20} color='white'/>:"Send Reset OTP"}
            </button>
          </form>
        

        <button 
          className="w-full text-xs text-center mt-6 font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors" 
          onClick={()=>navigate("/login")}
        >
          Back to Login
        </button>
      </div>}


      {step==2 && <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full border border-gray-100">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-2 tracking-tight">
          Verify OTP
        </h2>
        <p className="text-gray-500 text-center mb-8 font-medium">Check your email for the verification code.</p>
      
          <form  className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                4-Digit Code
              </label>
              <input
                type="text"
                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-center text-2xl font-black tracking-[0.5em] placeholder:text-gray-200"
                placeholder="0000"
                onChange={(e)=>setOtp(e.target.value)}
                value={otp}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl active:scale-95 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest text-xs" 
              disabled={loading} 
              onClick={handleStep2} 
            >
              {loading?<ClipLoader size={20} color='white'/>:"Verify Code"}
            </button>
          </form>
        

        <button 
          className="w-full text-xs text-center mt-6 font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors" 
          onClick={()=>navigate("/login")}
        >
          Back to Login
        </button>
      </div>}

      {step==3 && <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full border border-gray-100">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-2 tracking-tight">
          Reset Password
        </h2>
        <p className="text-gray-500 text-center mb-8 font-medium">
          Create a secure password for your account.
        </p>

        <form className="space-y-6" onSubmit={(e)=>e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1" >
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-300" 
              onChange={(e)=>setNewPassword(e.target.value)}
              value={newpassword}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-300" 
              onChange={(e)=>setConpassword(e.target.value)}
              value={conPassword}
            />
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-gray-900 hover:bg-black text-white font-black rounded-xl active:scale-95 transition-all shadow-lg uppercase tracking-widest text-xs mt-4" 
            onClick={handleStep3}
          >
            {loading?<ClipLoader size={20} color='white'/>:"Update Password"}
          </button>
        </form>

        <button 
          className="w-full text-xs text-center mt-6 font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors" 
          onClick={()=>navigate("/login")}
        >
          Back to Login
        </button>
      </div>}
    </div>
  )
}

export default ForgotPassword
