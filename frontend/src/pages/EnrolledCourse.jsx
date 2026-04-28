import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import Nav from '../components/Nav';

function EnrolledCourse() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user);

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      
      <div className="max-w-7xl mx-auto pt-32 pb-20 px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm mb-4"
            >
              <FaArrowLeftLong /> Back to home
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Enrolled Courses
            </h1>
            <p className="text-gray-500 font-medium">Continue your learning journey where you left off.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
            <span className="text-blue-600 font-bold">{userData.enrolledCourses?.length || 0}</span>
            <span className="text-blue-400 font-medium text-sm uppercase tracking-wider">Courses Active</span>
          </div>
        </div>

        {userData.enrolledCourses?.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaPlayCircle size={32} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No courses found</h2>
            <p className="text-gray-500 font-medium mb-8">You haven't enrolled in any courses yet. Explore our catalog to get started.</p>
            <button 
              onClick={() => navigate("/allcourses")}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-100"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {userData.enrolledCourses.map((course) => (
              <div
                key={course._id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all cursor-pointer"
                onClick={() => navigate(`/viewlecture/${course._id}`)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-xl">
                      <FaPlayCircle size={24} />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{course.category}</span>
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h2>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{course.level || 'Beginner'}</span>
                    <span className="text-sm font-bold text-blue-600">Resume Class</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EnrolledCourse;
