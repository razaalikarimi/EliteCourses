import React from 'react';
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
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Hours Learned',
      value: '12h',
      change: '+2.4h this week',
      icon: HiClock,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Completion Rate',
      value: '45%',
      change: 'Improving',
      icon: HiChartBar,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Current Streak',
      value: '4 days',
      change: 'Keep it up!',
      icon: HiLightningBolt,
      color: 'bg-emerald-50 text-emerald-600',
    },
  ];

  const featuredCourse = courseData?.[0];
  const recentCourses = courseData?.slice(1, 4) || [];
  const recommendedCourses = courseData?.slice(4, 10) || [];
  const upcomingCourses = courseData?.slice(0, 2) || [];

  return (
    <AppShell>
      {/* Welcome Section */}
      <div className="mb-12 space-y-2">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Welcome back, {userData?.name?.split(' ')[0] || 'Learner'}! 👋
        </h1>
        <p className="text-slate-500 font-medium">
          Continue your learning journey and explore new skills today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-100 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-slate-900 tabular-nums">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Learning Section */}
      <section className="mb-16">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-50">
          <div>
            <h2 className="text-xl font-black text-slate-900">Continue Learning</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Pick up where you left off</p>
          </div>
          <button
            onClick={() => navigate('/enrolledcourses')}
            className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-blue-700 transition-colors"
          >
            All Courses →
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

      {/* Discover Section */}
      <section className="mb-16">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-50">
          <div>
            <h2 className="text-xl font-black text-slate-900">Discover New Skills</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Handpicked for your interests</p>
          </div>
          <button
            onClick={() => navigate('/allcourses')}
            className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-blue-700 transition-colors"
          >
            Explore All →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {featuredCourse && (
              <FeaturedCourseCard
                course={{
                  ...featuredCourse,
                  id: featuredCourse._id,
                }}
              />
            )}
          </div>
          <div className="space-y-6">
             <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-black leading-tight">Empower others.</h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">
                    Start sharing your expertise with thousands of students worldwide.
                  </p>
                  <button 
                    onClick={() => navigate('/createcourses')}
                    className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Launch Studio
                  </button>
                </div>
             </div>
             
             <div className="space-y-4">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recommended</p>
               {recommendedCourses.slice(0, 3).map((course) => (
                 <CompactCourseCard
                   key={course._id}
                   course={{
                     ...course,
                     id: course._id,
                   }}
                 />
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Upcoming Section */}
      <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm mb-20">
        <div className="mb-8 flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900">Upcoming Live Sessions</h2>
            <p className="text-xs text-slate-500 font-medium tracking-tight">Interactive learning events this week</p>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg">Live Soon</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingCourses.map((course, index) => (
            <TimelineCourseCard
              key={course._id}
              course={{
                ...course,
                id: course._id,
                startDate: index === 0 ? 'TOMORROW • 10:00 AM' : 'WED • 02:00 PM',
              }}
              index={index}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

export default NewDashboard;
