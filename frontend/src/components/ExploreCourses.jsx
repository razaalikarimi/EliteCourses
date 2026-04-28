import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { TbBrandOpenai } from "react-icons/tb";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function ExploreCourses() {
  const navigate = useNavigate();
  
  const categories = [
    { name: "Web Development", icon: TbDeviceDesktopAnalytics, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "UI/UX Design", icon: LiaUikit, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "App Development", icon: MdAppShortcut, color: "text-green-600", bg: "bg-green-50" },
    { name: "Ethical Hacking", icon: FaHackerrank, color: "text-red-600", bg: "bg-red-50" },
    { name: "AI/ML", icon: TbBrandOpenai, color: "text-orange-600", bg: "bg-orange-50" },
    { name: "Data Science", icon: SiGoogledataproc, color: "text-cyan-600", bg: "bg-cyan-50" },
    { name: "Data Analytics", icon: BsClipboardDataFill, color: "text-indigo-600", bg: "bg-indigo-50" },
    { name: "AI Tools", icon: SiOpenaigym, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 px-6 md:px-12 py-4">
      <div className="lg:w-1/3 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 leading-tight">
          Explore by <br /> Category
        </h2>
        <p className="text-gray-600 text-lg">
          We offer practical courses in high-demand fields. Choose what you want to learn today.
        </p>
        <button 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          onClick={() => navigate("/allcourses")}
        >
          View all categories
          <SiViaplay size={20} />
        </button>
      </div>

      <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div 
            key={i}
            className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all cursor-pointer bg-white group"
            onClick={() => navigate("/allcourses")}
          >
            <div className={`w-14 h-14 ${cat.bg} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
              <cat.icon size={28} className={cat.color} />
            </div>
            <span className="text-sm font-semibold text-gray-700 text-center">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreCourses;
