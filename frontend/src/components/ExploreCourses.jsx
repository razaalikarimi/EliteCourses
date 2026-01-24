import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HiChevronRight, 
  HiCode, 
  HiColorSwatch, 
  HiDeviceMobile, 
  HiTerminal, 
  HiLightningBolt, 
  HiDatabase, 
  HiChartBar, 
  HiAdjustments
} from 'react-icons/hi';

function ExploreCourses() {
  const navigate = useNavigate();

  const categories = [
    { title: 'Web Development', icon: HiCode, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'UI UX Design', icon: HiColorSwatch, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'App Development', icon: HiDeviceMobile, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Cyber Security', icon: HiTerminal, color: 'text-rose-500', bg: 'bg-rose-50' },
    { title: 'Machine Learning', icon: HiLightningBolt, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Data Science', icon: HiDatabase, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Data Analytics', icon: HiChartBar, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { title: 'Digital Marketing', icon: HiAdjustments, color: 'text-slate-500', bg: 'bg-slate-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text Content */}
        <div className="lg:w-1/3 text-center lg:text-left space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Explore Our <br />
              <span className="text-indigo-600">Top Categories.</span>
            </h2>
            <p className="text-gray-600 font-medium text-lg leading-relaxed">
              Find the perfect course to advance your career. Join over 20,000 students 
              learning from world-class industry professionals.
            </p>
          </div>
          <button 
            onClick={() => navigate("/allcourses")}
            className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest group hover:text-indigo-700 transition-all border-b-2 border-indigo-100 pb-1"
          >
            Browse All Categories
            <HiChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Grid */}
        <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate("/allcourses")}
              className="group cursor-pointer aspect-square bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-xl hover:shadow-indigo-500/5 transition-all active:scale-95"
            >
              <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center ${cat.color} mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon size={28} />
              </div>
              <h3 className="text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight leading-tight">
                {cat.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreCourses;
