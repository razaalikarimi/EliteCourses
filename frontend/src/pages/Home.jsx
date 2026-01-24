import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  HiBookOpen,
  HiCursorClick,
  HiChartBar,
  HiArrowRight,
} from "react-icons/hi";

import Nav from "../components/Nav";
import Logos from "../components/Logos";
import Cardspage from "../components/Cardspage";
import ExploreCourses from "../components/ExploreCourses";
import About from "../components/About";
import ReviewPage from "../components/ReviewPage";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-slate-50 selection:bg-indigo-600 selection:text-white">
      <Nav />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 px-6 lg:px-20 bg-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#4f46e5_1.5px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
              Explore your potential
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
              Master New Skills <br />
              <span className="text-indigo-600">Without Limits.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 font-medium max-w-xl mx-auto lg:mx-0">
              Join thousands of students learning world-class skills from
              industry experts. Build your career with confidence.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="h-14 px-8 bg-indigo-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 shadow-lg active:scale-95"
              >
                Join For Free <HiArrowRight />
              </button>

              <button
                onClick={() => navigate("/allcourses")}
                className="h-14 px-8 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:border-indigo-600 hover:text-indigo-600 active:scale-95"
              >
                Browse Courses
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-10 pt-8 border-t border-gray-100">
              <div>
                <div className="text-2xl font-black">20k+</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400">
                  Students
                </div>
              </div>
              <div>
                <div className="text-2xl font-black">500+</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400">
                  Courses
                </div>
              </div>
              <div>
                <div className="text-2xl font-black">4.9/5</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400">
                  Rating
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-square rounded-[3rem] bg-indigo-50 border-4 border-white shadow-2xl p-12">
              <div className="w-full h-full bg-white rounded-2xl shadow-inner flex flex-col items-center justify-center gap-6 relative">
                <HiBookOpen className="w-24 h-24 text-indigo-600" />
                <div className="text-center">
                  <div className="font-black text-lg">Start Learning Today</div>
                  <div className="text-xs text-gray-400">
                    Personalized dashboard access
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 h-2 bg-gray-100 rounded-full">
                  <div className="w-3/4 h-full bg-indigo-500 rounded-full" />
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl flex gap-2">
                <HiCursorClick className="text-amber-500" />
                <span className="text-xs font-bold">Expert Instruction</span>
              </div>

              <div className="absolute top-1/2 -left-8 bg-white p-4 rounded-2xl shadow-xl flex gap-2">
                <HiChartBar className="text-emerald-500" />
                <span className="text-xs font-bold">Track Progress</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-y bg-slate-50">
        <Logos />
      </section>

      <section className="py-24 bg-white">
        <ExploreCourses />
      </section>

      <section className="py-24 bg-slate-50">
        <Cardspage />
      </section>

      <section className="py-24 bg-white">
        <About />
      </section>

      <section className="py-24 bg-slate-50">
        <ReviewPage />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
