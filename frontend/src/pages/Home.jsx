import React from "react";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Logos from "../components/Logos";
import Cardspage from "../components/Cardspage";
import ExploreCourses from "../components/ExploreCourses";
import About from "../components/About";
import ReviewPage from "../components/ReviewPage";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { HiBookOpen, HiCursorClick, HiChartBar, HiArrowRight } from "react-icons/hi";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-slate-50 selection:bg-indigo-600 selection:text-white">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 px-6 lg:px-20 overflow-hidden bg-white">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4f46e5_1.5px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Explore your potential</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                Master New Skills <br />
                <span className="text-indigo-600">Without Limits.</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-600 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Join thousands of students learning world-class skills from industry experts. 
              Our platform provides the tools you need to succeed in your career.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={() => navigate("/signup")}
                className="h-14 px-8 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 flex items-center gap-2"
              >
                Join For Free
                <HiArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigate("/allcourses")}
                className="h-14 px-8 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-sm hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
              >
                Browse Courses
              </button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-10 pt-8 border-t border-gray-100">
              <div className="space-y-1">
                <div className="text-2xl font-black text-gray-900">20k+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Students</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-gray-900">500+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Online Courses</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-gray-900">4.9/5</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Average Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 w-full aspect-square rounded-[3rem] bg-indigo-50 border-4 border-white shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden overflow-hidden">
               <div className="w-full h-full rounded-2xl bg-white shadow-inner flex flex-col items-center justify-center gap-6 relative p-8">
                  <HiBookOpen className="w-24 h-24 text-indigo-600" />
                  <div className="text-center space-y-2">
                    <div className="text-lg font-black text-gray-900">Start Learning Today</div>
                    <div className="text-xs text-gray-400 font-medium">Access your personalized dashboard</div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-indigo-500" />
                  </div>
               </div>
               {/* Decorative floating elements */}
               <div className="absolute -top-4 -right-4 p-4 bg-white rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
                  <HiCursorClick className="text-amber-500 w-5 h-5" />
                  <span className="text-xs font-bold text-gray-900">Expert Instruction</span>
               </div>
               <div className="absolute top-1/2 -left-8 p-4 bg-white rounded-2xl shadow-xl flex items-center gap-2 animate-pulse">
                  <HiChartBar className="text-emerald-500 w-5 h-5" />
                  <span className="text-xs font-bold text-gray-900">Track Progress</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges / Features */}
      <section className="py-20 bg-slate-50 border-y border-gray-100">
        <Logos />
      </section>

      {/* Category Discovery */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <ExploreCourses />
      </section>

      {/* Course Listing */}
      <section className="py-24 px-6 lg:px-20 bg-slate-50 relative">
        <Cardspage />
      </section>

      {/* About Section */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <About />
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 lg:px-20 bg-slate-50">
        <ReviewPage />
      </section>

      <Footer />
    </div>
  );
}

export default Home;

