import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiClock, HiStar, HiPlay } from 'react-icons/hi';

// Premium Course Card - Large, prominent display
export const FeaturedCourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { thumbnail, title, category, price, id, reviews, instructor } = course;

  const avgRating =
    reviews?.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/viewcourse/${id}`)}
      className="col-span-2 group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative border border-gray-100"
    >
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
          Premium
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-white text-[10px] font-black uppercase tracking-wider">
              {category}
            </span>
            <div className="flex items-center gap-1 text-white text-xs font-bold">
              <HiStar className="w-4 h-4 text-amber-400" />
              <span>{avgRating}</span>
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white line-clamp-2 leading-tight">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-6 flex items-center justify-between">
        <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Price</span>
            <span className="text-2xl font-black text-gray-900 leading-tight">₹{price}</span>
        </div>
        <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-all">
          Enroll Now
        </button>
      </div>
    </motion.div>
  );
};

// Compact Course Card - Small, efficient display
export const CompactCourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { thumbnail, title, category, price, id, duration } = course;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/viewcourse/${id}`)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-400"
    >
      <div className="flex gap-4 p-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50 bg-gray-50">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[9px] font-black uppercase tracking-wider mb-1">
              {category}
            </span>
            <h4 className="font-bold text-gray-900 line-clamp-2 leading-tight text-sm group-hover:text-indigo-600 transition-colors">
              {title}
            </h4>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-base font-black text-gray-900">
              ₹{price}
            </span>
            <div className="flex items-center gap-1 text-gray-400 text-[9px] font-bold uppercase tracking-tight">
              <HiClock className="w-3 h-3" />
              <span>{duration || 'Self-Paced'}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Progress Course Card - For enrolled courses with progress
export const ProgressCourseCard = ({ course, progress = 0 }) => {
  const navigate = useNavigate();
  const { thumbnail, title, category, id, totalLectures, completedLectures = 0 } = course;

  const progressPercent = totalLectures
    ? Math.round((completedLectures / totalLectures) * 100)
    : progress;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/viewlecture/${id}`)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
           <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-indigo-600 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
              <HiPlay size={24} />
           </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[9px] font-black uppercase tracking-wider text-gray-900 shadow-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5 space-y-5">
        <h4 className="font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors h-10">
          {title}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
            <span className="text-gray-400">Completion</span>
            <span className="text-indigo-600">{progressPercent}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-indigo-600 rounded-full"
            />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight text-right">
             {completedLectures} of {totalLectures} lessons
          </p>
        </div>
        <button className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-md active:scale-95">
          Continue Learning
        </button>
      </div>
    </motion.div>
  );
};

// Timeline Course Card - Horizontal layout
export const TimelineCourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  const { thumbnail, title, category, id, startDate } = course;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/viewcourse/${id}`)}
      className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer shadow-sm hover:shadow-md"
    >
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{category}</span>
          <span className="w-1 h-1 bg-gray-200 rounded-full" />
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{startDate || 'Recently Viewed'}</span>
        </div>
        <h5 className="font-bold text-gray-900 line-clamp-1 text-sm">{title}</h5>
      </div>
    </motion.div>
  );
};
