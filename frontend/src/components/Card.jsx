import React from "react";
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
    <div 
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/viewcourse/${id}`)}
    >
      <div className="aspect-video overflow-hidden bg-gray-100 relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-xs font-bold text-gray-900 rounded-lg shadow-sm uppercase tracking-wider">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug mb-4 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
            <FaStar className="text-yellow-400" size={14} />
            <span className="text-sm font-bold text-gray-700">{avgRating}</span>
            <span className="text-xs text-gray-400 font-medium">({reviews?.length || 0})</span>
          </div>
          <div className="text-xl font-black text-gray-900">
            ₹{price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
