import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppShell from '../components/AppShell';
import {
  FeaturedCourseCard,
  CompactCourseCard,
  ProgressCourseCard,
  TimelineCourseCard,
} from '../components/CourseCardVariants';
import {
  HiTrendingUp,
  HiClock,
  HiLightningBolt,
  HiBookmark,
  HiChartBar,
} from 'react-icons/hi';

function NewDashboard() {
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);

  const stats = [
    {
      label: 'Courses Enrolled',
      value: userData?.enrolledCourses?.length || '0',
      change: '+2 this month',
      icon: HiBookmark,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      label: 'Hours Learned',
      value: '12h',
      change: '+2.4h this week',
      icon: HiClock,
      color: 'from-purple-500 to-pink-600',
    },
    {
      label: 'Completion Rate',
      value: '45%',
      change: 'Improving',
      icon: HiChartBar,
      color: 'from-amber-500 to-orange-600',
    },
    {
      label: 'Current Streak',
      value: '4 days',
      change: 'Keep it up!',
      icon: HiLightningBolt,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  const featuredCourse = courseData?.[0];
  const recentCourses = courseData?.slice(1, 4) || [];
  const recommendedCourses = courseData?.slice(4, 10) || [];
  const upcomingCourses = courseData?.slice(0, 2) || [];

  return (
    <AppShell>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight">
          Welcome back, {userData?.name?.split(' ')[0] || 'Learner'}! 👋
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-2xl">
          Everything you need to master your craft, right at your fingertips.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl p-7 shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-indigo-500/50 transition-all group relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-5 relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <HiTrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-4xl font-black text-slate-900 mb-1 tabular-nums relative z-10">
              {stat.value}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 relative z-10">
              {stat.label}
            </div>
            <div className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg inline-block relative z-10">
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Learning Section */}
      <section className="mb-16">
        <div className="flex items-end justify-between mb-10 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              Continue Learning
            </h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Pick up where you left off</p>
          </div>
          <button
            onClick={() => navigate('/enrolledcourses')}
            className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:text-indigo-700 transition-colors flex items-center gap-2 group p-2 hover:bg-indigo-50 rounded-lg"
          >
            View Schedule
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentCourses.map((course) => (
            <ProgressCourseCard
              key={course._id}
              course={course}
              progress={Math.floor(Math.random() * 60) + 20}
            />
          ))}
        </div>
      </section>

      {/* Discover Section - Masonry-style Grid */}
      <section className="mb-16">
        <div className="flex items-end justify-between mb-10 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              Discover Skills
            </h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Handpicked for you</p>
          </div>
          <button
            onClick={() => navigate('/allcourses')}
            className="text-purple-600 font-black text-xs uppercase tracking-widest hover:text-purple-700 transition-colors flex items-center gap-2 group p-2 hover:bg-purple-50 rounded-lg"
          >
            Browse Catalog
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
          {featuredCourse && (
            <FeaturedCourseCard
              course={{
                ...featuredCourse,
                id: featuredCourse._id,
                instructor: 'Studio Pro',
              }}
            />
          )}

          {recommendedCourses.map((course) => (
            <CompactCourseCard
              key={course._id}
              course={{
                ...course,
                id: course._id,
                duration: '4h 30m',
              }}
            />
          ))}
        </div>
      </section>

      {/* Upcoming Section */}
      <section className="mb-16 bg-slate-100/50 p-10 rounded-[3rem] border border-slate-200/50 shadow-inner">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-900 mb-1">
            Upcoming Lab Sessions
          </h2>
          <p className="text-slate-500 font-medium">Don't miss the live events this week</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {upcomingCourses.map((course, index) => (
            <TimelineCourseCard
              key={course._id}
              course={{
                ...course,
                id: course._id,
                startDate: 'TOMORROW • 10:00 AM',
              }}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Educator CTA */}
      {userData?.role === 'educator' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-indigo-500/30 transition-colors" />
          <div className="relative z-10 flex items-center justify-between flex-wrap gap-8">
            <div className="max-w-xl">
              <h3 className="text-4xl font-black mb-4 tracking-tight">
                Empower others with your knowledge.
              </h3>
              <p className="text-slate-400 font-medium text-lg mb-8">
                The studio is ready. Create a world-class course in minutes with our AI-assisted tools.
              </p>
              <button
                onClick={() => navigate('/createcourses')}
                className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-slate-100 transition-all active:scale-95"
              >
                Launch Studio
              </button>
            </div>
            <div className="hidden lg:block w-40 h-40 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <HiLightningBolt className="w-20 h-20 text-indigo-400 animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </AppShell>
  );
}

export default NewDashboard;
