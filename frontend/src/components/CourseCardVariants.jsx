import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiClock, HiStar, HiPlay } from 'react-icons/hi';

// Premium Course Card - Large, prominent display
export const FeaturedCourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { thumbnail, title, category, price, reviews } = course;
  const id = course._id || course.id;

  const avgRating =
    reviews?.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div
      onClick={() => navigate(`/viewcourse/${id}`)}
      className="col-span-1 lg:col-span-2 group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-500"
    >
      <div className="relative aspect-[21/9] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
              {category}
            </span>
            <div className="flex items-center gap-1.5 text-white text-xs font-bold">
              <HiStar className="w-4 h-4 text-amber-400" />
              <span>{avgRating}</span>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white line-clamp-2 leading-tight tracking-tight">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-8 flex items-center justify-between bg-white">
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enrollment Fee</span>
          <p className="text-2xl font-black text-slate-900">₹{price}</p>
        </div>
        <button className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-100">
          Start Learning
        </button>
      </div>
    </div>
  );
};

// Compact Course Card - Small, efficient display
export const CompactCourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { thumbnail, title, category, price, duration } = course;
  const id = course._id || course.id;

  return (
    <div
      onClick={() => navigate(`/viewcourse/${id}`)}
      className="group cursor-pointer bg-white rounded-2xl p-4 border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300"
    >
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-50">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1.5 block">
              {category}
            </span>
            <h4 className="font-bold text-slate-900 line-clamp-2 leading-tight text-sm group-hover:text-blue-600 transition-colors">
              {title}
            </h4>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-slate-900">₹{price}</span>
            <div className="flex items-center gap-1 text-slate-400 text-[9px] font-bold uppercase tracking-tight">
              <HiClock className="w-3.5 h-3.5" />
              <span>{duration || '4.5h'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Progress Course Card - For enrolled courses with progress
export const ProgressCourseCard = ({ course, progress = 0 }) => {
  const navigate = useNavigate();
  const { thumbnail, title, category, totalLectures = 12, completedLectures = 0 } = course;
  const id = course._id || course.id;

  const progressPercent = totalLectures
    ? Math.round((completedLectures / totalLectures) * 100)
    : progress;

  return (
    <div
      onClick={() => navigate(`/viewlecture/${id}`)}
      className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-500"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
           <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
              <HiPlay size={24} />
           </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <h4 className="font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors h-10 tracking-tight">
          {title}
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
            <span className="text-slate-400">Progress</span>
            <span className="text-blue-600 font-black">{progressPercent}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-blue-600 rounded-full transition-all duration-1000"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               {completedLectures} / {totalLectures} Lessons
            </p>
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">Resume →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Timeline Course Card - Horizontal layout
export const TimelineCourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  const { thumbnail, title, category, startDate } = course;
  const id = course._id || course.id;

  return (
    <div
      onClick={() => navigate(`/viewcourse/${id}`)}
      className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 transition-all cursor-pointer shadow-sm hover:shadow-lg hover:shadow-blue-50"
    >
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-100">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{category}</span>
          <span className="w-1 h-1 bg-slate-200 rounded-full" />
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{startDate || 'Upcoming Session'}</span>
        </div>
        <h5 className="font-bold text-slate-900 line-clamp-1 text-sm group-hover:text-blue-600 transition-colors">{title}</h5>
      </div>
    </div>
  );
};
