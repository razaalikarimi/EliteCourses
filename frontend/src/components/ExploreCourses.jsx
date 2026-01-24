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
<<<<<<< HEAD
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
=======
    <div className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]'>
        <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px]  flex flex-col items-start justify-center gap-1 md:px-[40px]  px-[20px]'>
          <span className='text-[35px] font-semibold'>Explore</span>
          <span className='text-[35px] font-semibold'>Our Courses</span>
          <p className='text-[17px]'>Explore industry-focused courses built to upgrade skills, boost careers, and unlock new opportunities. Learn from expert mentors and gain real-world experience.</p>
          <button className='px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px]' onClick={()=>navigate("/allcourses")}>Explore Courses <SiViaplay className='w-[30px] h-[30px] fill-white' /></button>

        </div>
        <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]'>
          <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center '>
            <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center '><TbDeviceDesktopAnalytics className='w-[60px] h-[60px] text-[#6d6c6c]' /></div>
            Web Devlopment
            </div>
            <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center '>
            <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center '><LiaUikit className='w-[60px] h-[60px] text-[#6d6c6c]' /></div>
            UI UX Designing
            </div>
            <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center '><MdAppShortcut className='w-[50px] h-[50px] text-[#6d6c6c]' /></div>
            App Devlopment
            </div>
            <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center '><FaHackerrank className='w-[55px] h-[55px] text-[#6d6c6c]' /></div>
            Ethical Hacking
            </div>
            <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center '><TbBrandOpenai className='w-[55px] h-[55px] text-[#6d6c6c]' /></div>
            AI/ML
            </div>
            <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center '><SiGoogledataproc className='w-[45px] h-[45px] text-[#6d6c6c]' /></div>
            Data Science
            </div>
            <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center '>
            <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center '><BsClipboardDataFill className='w-[50px] h-[50px] text-[#6d6c6c]' /></div>
            Data Analytics
            </div>
            <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center '><SiOpenaigym className='w-[50px] h-[50px] text-[#6d6c6c]' /></div>
            AI Tools
            </div>
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
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
