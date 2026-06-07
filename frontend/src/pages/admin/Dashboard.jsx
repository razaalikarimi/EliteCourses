import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaGraduationCap, FaUsers, FaWallet } from "react-icons/fa";
import AppShell from '../../components/AppShell';

function Dashboard() {
  const navigate = useNavigate()
  const { creatorCourseData } = useSelector((state) => state.course);

  const totalEarnings = creatorCourseData?.reduce((sum, course) => {
    const studentCount = course.enrolledStudents?.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0;
    return sum + courseRevenue;
  }, 0) || 0;

  const totalStudents = creatorCourseData?.reduce((sum, course) => sum + (course.enrolledStudents?.length || 0), 0) || 0;

  return (
    <AppShell>
      <main className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Educator Dashboard</h1>
            <p className="text-slate-500 text-xs mt-1">Manage your courses, track earnings, and review student enrollments.</p>
          </div>
          <button 
            onClick={() => navigate("/createcourses")}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-100 transition-all"
          >
            <FaPlus className="text-[10px]" /> Create New Course
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
              <FaWallet size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Earnings</p>
              <p className="text-xl font-black text-slate-800">₹{totalEarnings.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <FaUsers size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
              <p className="text-xl font-black text-slate-800">{totalStudents}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-violet-50 border border-violet-100 rounded-2xl flex items-center justify-center text-violet-600">
              <FaGraduationCap size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Courses</p>
              <p className="text-xl font-black text-slate-800">{creatorCourseData?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Action Panel Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => navigate("/escalateddoubts")}
            className="bg-amber-50/50 hover:bg-amber-50 border border-amber-100 rounded-2xl p-5 shadow-sm cursor-pointer transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <h3 className="font-bold text-amber-900 text-sm">⚡ Escalated Doubts</h3>
              <p className="text-amber-700 text-xs">Review and reply to doubts escalated by students directly to you.</p>
            </div>
            <span className="text-amber-600 font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>

          <div 
            onClick={() => navigate("/admin/ingest")}
            className="bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-2xl p-5 shadow-sm cursor-pointer transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">📚 Knowledge Base Ingestion (RAG)</h3>
              <p className="text-indigo-700 text-xs">Ingest PDFs, YouTube videos, and notes to train the AI Tutor.</p>
            </div>
            <span className="text-indigo-600 font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* Courses List Section */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-base">My Courses</h2>
            <button 
              onClick={() => navigate("/courses")} 
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Manage All Courses
            </button>
          </div>

          {!creatorCourseData || creatorCourseData.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs space-y-2">
              <p>You haven't created any courses yet.</p>
              <button 
                onClick={() => navigate("/createcourses")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider"
              >
                Create First Course
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Course Info</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-center">Lectures</th>
                    <th className="py-3 px-4 text-center">Students</th>
                    <th className="py-3 px-4 text-right">Price</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-700">
                  {creatorCourseData.map((course) => (
                    <tr key={course._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-800 max-w-[240px] truncate">
                        {course.title}
                      </td>
                      <td className="py-4 px-4 text-slate-500 capitalize">{course.category || 'General'}</td>
                      <td className="py-4 px-4 text-center font-bold">{course.lectures?.length || 0}</td>
                      <td className="py-4 px-4 text-center font-bold text-indigo-600">{course.enrolledStudents?.length || 0}</td>
                      <td className="py-4 px-4 text-right font-bold">
                        {course.price ? `₹${course.price.toLocaleString()}` : 'Free'}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => navigate(`/addcourses/${course._id}`)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-[10px] font-bold text-slate-600 transition-colors"
                          >
                            Manage Lectures
                          </button>
                          <button 
                            onClick={() => navigate(`/courses`)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-600 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </AppShell>
  )
}

export default Dashboard;
