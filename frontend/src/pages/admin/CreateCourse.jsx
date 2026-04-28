import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Nav from "../../components/Nav";

const CreateCourse = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")

  const CreateCourseHandler = async (e) => {
    e.preventDefault();
    if (!title || !category) return toast.error("Please fill in all fields");
    
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/course/create", { title, category }, { withCredentials: true })
      toast.success("Course created successfully!")
      navigate("/courses")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-20">
        <div className="w-full max-w-xl bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-50/50 p-8 md:p-12 space-y-8">
          <div className="text-center space-y-4">
            <button 
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm mb-2"
            >
              <FaArrowLeftLong /> Back to dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Create a New Course</h1>
            <p className="text-gray-500 font-medium">Define your course title and category to get started.</p>
          </div>

          <form className="space-y-6" onSubmit={CreateCourseHandler}>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Course Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                placeholder="e.g. Master React in 30 Days"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
              <select
                required
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium appearance-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="UI UX Designing">UI UX Designing</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-100 flex items-center justify-center"
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Initialize Course"}
            </button>
          </form>
          
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-xs text-blue-700 font-medium leading-relaxed">
              <strong>Tip:</strong> After initializing, you'll be able to add curriculum, upload thumbnails, and set the price in the next step.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;
