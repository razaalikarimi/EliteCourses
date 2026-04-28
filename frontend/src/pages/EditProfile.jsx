import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import Nav from '../components/Nav';

function EditProfile() {
  const { userData } = useSelector(state => state.user)
  const [name, setName] = useState(userData?.name || "")
  const [description, setDescription] = useState(userData?.description || "")
  const [photoUrl, setPhotoUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!userData) return null;

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    if (photoUrl) formData.append("photoUrl", photoUrl)

    try {
      const result = await axios.post(serverUrl + "/api/user/updateprofile", formData, { withCredentials: true })
      dispatch(setUserData(result.data))
      toast.success("Profile updated successfully")
      navigate("/profile")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <main className="flex-1 max-w-2xl mx-auto w-full pt-32 pb-20 px-6">
        <button 
          onClick={() => navigate("/profile")}
          className="mb-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm"
        >
          <FaArrowLeftLong /> Back to profile
        </button>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8 md:p-12 space-y-10">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-gray-500 font-medium">Update your personal information and avatar</p>
          </div>

          <form className="space-y-8" onSubmit={updateProfile}>
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                {userData.photoUrl ? (
                  <img
                    src={userData.photoUrl}
                    alt={userData.name}
                    className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-3xl bg-gray-900 text-white flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
                    {userData.name?.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-sm font-bold">
                  Change
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setPhotoUrl(e.target.files[0])}
                  />
                </label>
              </div>
              {photoUrl && <p className="text-xs text-blue-600 font-bold">Selected: {photoUrl.name}</p>}
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                <input
                  type="email"
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-400 font-medium cursor-not-allowed"
                  value={userData.email}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">About Me</label>
                <textarea
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium min-h-[120px] resize-none"
                  value={description}
                  placeholder="Tell us about yourself..."
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-100 flex items-center justify-center"
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Save Changes"}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default EditProfile;
