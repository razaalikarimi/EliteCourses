import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppShell from '../components/AppShell';
import {
  HiClock,
  HiLightningBolt,
  HiBookmark,
} from 'react-icons/hi';

function NewDashboard() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const enrolledCourses = userData?.enrolledCourses || [];

  const stats = [
    {
      label: 'Courses Enrolled',
      value: enrolledCourses.length,
      icon: HiBookmark,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      label: 'Hours Learned',
      value: '12 hours',
      icon: HiClock,
      color: 'bg-violet-50 text-violet-600 border-violet-100',
    },
    {
      label: 'Study Streak',
      value: '4 days',
      icon: HiLightningBolt,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
  ];

  return (
    <AppShell>
      {/* Welcome Banner */}
      <div className="mb-10 p-8 rounded-3xl bg-slate-50 border border-slate-200 text-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {userData?.name?.split(' ')[0] || 'Learner'}!
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Learn at your own pace. Ask your doubts 24/7 to our AI Tutor, and track your lectures.
          </p>
        </div>
        <div className="absolute right-6 bottom-0 opacity-5 pointer-events-none transform translate-y-4">
          <span className="text-[10rem]">🎓</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-5"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.color} border flex items-center justify-center`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Enrolled Courses list (Main Left column) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">My Enrolled Courses</h2>
            <button
              onClick={() => navigate('/allcourses')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Browse All Courses
            </button>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-10 text-center space-y-4">
              <span className="text-4xl block">📚</span>
              <p className="text-slate-500 font-medium text-sm">You haven't enrolled in any courses yet.</p>
              <button
                onClick={() => navigate('/allcourses')}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md transition-all"
              >
                Explore Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow"
                >
                  <div className="h-40 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-4xl">📘</span>
                    )}
                    <span className="absolute top-3 right-3 px-2 py-1 bg-slate-900/80 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm line-clamp-2">{course.title}</h3>
                      <p className="text-slate-400 text-xs mt-1">Level: {course.level || 'Beginner'}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/viewcourse/${course._id}`)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white hover:text-white rounded-xl font-bold text-xs transition-colors"
                    >
                      Start Study
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Tutor promo and quick settings card (Right column) */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/50 rounded-2xl p-6 shadow-sm space-y-4">
            <span className="text-3xl block">🤖</span>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base">Elite AI Doubt Solver</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Stuck on a code error or need clarification? Ask our AI Tutor directly and get responses instantly, 24/7.
              </p>
            </div>
            <button
              onClick={() => navigate('/mydoubts')}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition-all shadow-md shadow-indigo-100"
            >
              Ask AI Tutor ✨
            </button>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Quick Actions</h4>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/profile')}
                className="w-full text-left py-2 px-3 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-between"
              >
                <span>👤 View Profile</span>
                <span>→</span>
              </button>
              <button
                onClick={() => navigate('/editprofile')}
                className="w-full text-left py-2 px-3 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-between"
              >
                <span>⚙️ Account Settings</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default NewDashboard;
