import React, { useEffect } from 'react'
import { FaEdit, FaPlus, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { setCreatorCourseData } from '../../redux/courseSlice';
import img1 from "../../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";
import Nav from '../../components/Nav';

function Courses() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { creatorCourseData } = useSelector(state => state.course)

  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getcreatorcourses", { withCredentials: true })
        dispatch(setCreatorCourseData(result.data))
      } catch (error) {
        console.error(error)
        toast.error(error.response?.data?.message || "Failed to fetch courses")
      }
    }
    getCreatorData()
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      
      <main className="flex-1 max-w-7xl mx-auto w-full pt-32 pb-20 px-6 md:px-12 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <button 
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm mb-4"
            >
              <FaArrowLeftLong /> Back to dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Your Courses</h1>
            <p className="text-gray-500 font-medium">Manage and edit your educational content.</p>
          </div>
          <button 
            onClick={() => navigate("/createcourses")}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            <FaPlus /> Create New Course
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Course Detail</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Enrolled</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {creatorCourseData?.length > 0 ? (
                  creatorCourseData.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div className="w-24 aspect-video rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            <img 
                              src={course?.thumbnail || img1} 
                              className="w-full h-full object-cover" 
                              alt="" 
                            />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{course?.title}</h3>
                            <p className="text-sm text-blue-600 font-bold">₹{course?.price || '0'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="font-bold text-gray-700">{course.enrolledStudents?.length || 0}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          course?.isPublished 
                            ? "bg-green-100 text-green-700" 
                            : "bg-orange-100 text-orange-700"
                        }`}>
                          {course?.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => navigate(`/addcourses/${course?._id}`)}
                            className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                            title="Edit Course"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button 
                            onClick={() => navigate(`/viewcourse/${course?._id}`)}
                            className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                            title="View Public Page"
                          >
                            <FaEye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center">
                      <div className="space-y-4">
                        <p className="text-gray-500 font-medium">You haven't created any courses yet.</p>
                        <button 
                          onClick={() => navigate("/createcourses")}
                          className="text-blue-600 font-bold hover:underline"
                        >
                          Create your first course now
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Total {creatorCourseData?.length || 0} courses managed by you.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Courses;
