import React from "react";
import { HiStar, HiCheckBadge } from "react-icons/hi2";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ text, name, image, rating, role }) => {
  return (
    <div className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <HiStar key={i} className={i < rating ? "w-4 h-4 text-amber-400" : "w-4 h-4 text-gray-200"} />
        ))}
      </div>

      <div className="relative flex-1">
        <FaQuoteLeft className="absolute -top-4 -left-2 text-indigo-50 w-10 h-10 -z-10" />
        <p className="text-gray-700 font-medium leading-relaxed italic line-clamp-4">
          "{text}"
        </p>
      </div>

      <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-50 uppercase tracking-tight">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-50 group-hover:ring-indigo-100 transition-all"
          />
          <HiCheckBadge className="absolute -bottom-1 -right-1 text-indigo-600 w-5 h-5 bg-white rounded-full p-0.5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">{name}</h4>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
