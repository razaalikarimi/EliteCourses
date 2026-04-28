import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import Nav from '../components/Nav';

function Profile() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-4xl mx-auto pt-32 pb-20 px-6">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm"
        >
          <FaArrowLeftLong /> Back
        </button>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-32 bg-blue-600"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6">
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  alt={userData.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
                  {userData.name?.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                  <p className="text-gray-500 font-medium capitalize">{userData.role}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {userData.role === "educator" && (
                    <button 
                      onClick={() => navigate("/dashboard")}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-sm"
                    >
                      Instructor Dashboard
                    </button>
                  )}
                  <button 
                    onClick={() => navigate("/editprofile")}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-sm"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                <p className="text-gray-900 font-bold break-all">{userData.email}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-1 md:col-span-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bio</p>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {userData.description || "No bio added yet."}
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Activity</p>
                <p className="text-blue-900 font-bold text-lg">Enrolled in {userData.enrolledCourses?.length || 0} courses</p>
              </div>
              <button 
                onClick={() => navigate("/enrolledcourses")}
                className="text-blue-600 font-bold hover:underline"
              >
                View Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
