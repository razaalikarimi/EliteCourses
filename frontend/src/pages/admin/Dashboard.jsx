import React from 'react'
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import img from "../../assets/empty.jpg";
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaGraduationCap, FaUsers, FaWallet } from "react-icons/fa";
import AppShell from '../../components/AppShell';
// BUG 1 FIX: Replaced old public Nav with AppShell for consistent sidebar layout

function Dashboard() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  const courseProgressData = creatorCourseData?.map(course => ({
    name: course.title.length > 15 ? course.title.slice(0, 15) + "..." : course.title,
    lectures: course.lectures.length || 0
  })) || [];

  const enrollData = creatorCourseData?.map(course => ({
    name: course.title.length > 15 ? course.title.slice(0, 15) + "..." : course.title,
    enrolled: course.enrolledStudents?.length || 0
  })) || [];

  const totalEarnings = creatorCourseData?.reduce((sum, course) => {
    const studentCount = course.enrolledStudents?.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0;
    return sum + courseRevenue;
  }, 0) || 0;

  const totalStudents = creatorCourseData?.reduce((sum, course) => sum + (course.enrolledStudents?.length || 0), 0) || 0;

  return (
    <AppShell>
      <main className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Educator Dashboard</h1>
            <p className="text-gray-500 font-medium">Monitor your performance and manage your content.</p>
          </div>
          <button 
            onClick={() => navigate("/createcourses")}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            <FaPlus /> Create New Course
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <FaWallet size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Earnings</p>
              <p className="text-2xl font-black text-gray-900">₹{totalEarnings.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
              <FaUsers size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Students</p>
              <p className="text-2xl font-black text-gray-900">{totalStudents}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <FaGraduationCap size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Courses</p>
              <p className="text-2xl font-black text-gray-900">{creatorCourseData?.length || 0}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate("/courses")}>
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600">
              <FaPlus size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Manage Content</p>
              <p className="text-sm font-bold text-blue-600">View All Courses →</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Lecture Distribution</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseProgressData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="lectures" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Student Enrollment</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="enrolled" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  )
}

export default Dashboard;
