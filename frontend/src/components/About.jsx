import React from 'react';
import { motion } from 'framer-motion';
import about from "../assets/about.jpg";
import VideoPlayer from './VideoPlayer';
import { HiLightningBolt, HiAcademicCap, HiGlobe, HiUsers } from 'react-icons/hi';

function About() {
  const pillars = [
    { 
      title: 'Expert Mentors', 
      icon: HiAcademicCap,
      desc: 'Learn from industry professionals with real world experience.'
    },
    { 
      title: 'Flexible Learning', 
      icon: HiLightningBolt,
      desc: 'Access your courses anytime, anywhere at your own pace.'
    },
    { 
      title: 'Global Community', 
      icon: HiGlobe,
      desc: 'Join a network of thousands of students from around the world.'
    },
    { 
      title: 'Interactive Content', 
      icon: HiUsers,
      desc: 'Engage with practical workshops and collaborative projects.'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Visual Engine Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-indigo-100 rounded-[3rem] translate-x-4 translate-y-4 -z-10" />
          <div className="relative rounded-[3rem] overflow-hidden aspect-[4/3] shadow-2xl group border-4 border-white">
            <img src={about} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="About" />
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
            
            {/* Video Placeholder or Trigger */}
            <div className="absolute inset-0 flex items-center justify-center">
               <VideoPlayer />
            </div>
          </div>
        </motion.div>

        {/* Narrative Flow */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600">About Our Platform</div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Why Choose <br />
              <span className="text-indigo-600">Elite Courses?</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-xl">
              We provide a comprehensive learning management system designed to help you 
              gain practical knowledge and advance your career with the latest industry skills.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {pillars.map((p, i) => (
              <div key={i} className="group space-y-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <p.icon size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-gray-900">{p.title}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="px-8 py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg active:scale-95">
            Learn More About Us
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
