import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ thumbnail, title, category, price, id, reviews }) => {
  const navigate = useNavigate();

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAverageRating(reviews);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/viewcourse/${id}`)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-indigo-600 text-[10px] font-black uppercase tracking-widest shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[3.5rem] leading-snug group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1.5">
            <FaStar className="text-amber-400 w-4 h-4" />
            <span className="font-bold text-gray-700 text-sm">{avgRating || "New"}</span>
            <span className="text-gray-400 text-xs font-medium">({reviews?.length || 0} reviews)</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Price</span>
            <span className="text-2xl font-black text-gray-900 leading-tight">
              ₹{price}
            </span>
          </div>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;

