<<<<<<< HEAD
import React from "react";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
=======
// import React from "react";
// import home from "../assets/home1.jpg";
// import Nav from "../components/Nav";
// import { SiViaplay } from "react-icons/si";
// import Logos from "../components/Logos";
// import Cardspage from "../components/Cardspage";
// import ExploreCourses from "../components/ExploreCourses";
// import About from "../components/About";
// import ai from "../assets/ai.png";
// import ai1 from "../assets/SearchAi.png";
// import ReviewPage from "../components/ReviewPage";
// import Footer from "../components/Footer";
// import { useNavigate } from "react-router-dom";
// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="w-[100%] overflow-hidden">
//       <div className="w-[100%] lg:h-[70vh] h-[70vh] relative">
//         <Nav />
//         <img
//           src={home}
//            className="object-cover md:object-fill   w-[100%] lg:h-[100%] h-[50vh]" 
        
//           alt=""
//         />
//         <span className="lg:text-[70px] absolute  md:text-[40px]  lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px] ">
//           Grow Your Skills to Advance
//         </span>
//         <span className="lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold">
//           Your Career path
//         </span>
//         <div className="absolute lg:top-[30%] top-[75%]  md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap">
//           <button
//             className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer"
//             onClick={() => navigate("/allcourses")}
//           >
//             View all Courses{" "}
//             <SiViaplay className="w-[30px] h-[30px] lg:fill-white fill-black" />
//           </button>
//           <button
//             className="px-[20px] py-[10px] lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center"
//             onClick={() => navigate("/searchwithai")}
//           >
//             Search with AI{" "}
//             <img
//               src={ai}
//               className="w-[30px] h-[30px] rounded-full hidden lg:block"
//               alt=""
//             />
//             <img
//               src={ai1}
//               className="w-[35px] h-[35px] rounded-full lg:hidden"
//               alt=""
//             />
//           </button>
//         </div>
//       </div>
//       <Logos />
//       <ExploreCourses />
//       <Cardspage />
//       <About />
//       <ReviewPage />
//       <Footer />
//     </div>
//   );
// }




import React from "react";
import home from "../assets/home1.jpg";
import Nav from "../components/Nav";
import { SiViaplay } from "react-icons/si";
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
import Logos from "../components/Logos";
import Cardspage from "../components/Cardspage";
import ExploreCourses from "../components/ExploreCourses";
import About from "../components/About";
<<<<<<< HEAD
import ReviewPage from "../components/ReviewPage";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { HiBookOpen, HiCursorClick, HiChartBar, HiArrowRight } from "react-icons/hi";
=======
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import ReviewPage from "../components/ReviewPage";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555

function Home() {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
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

=======
    <div className="w-[100%] overflow-hidden">
      <div className="w-[100%] lg:h-[70vh] h-[70vh] relative">
        <Nav />
        <img
          src={home}
          className="object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]"
          alt=""
        />

        <span className="lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px] ">
          Grow Your Skills to Advance
        </span>

        <span className="lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold">
          Your Career path
        </span>

        {/* ↓↓↓ BUTTONS POSITION UPDATED ↓↓↓ */}
        <div className="absolute lg:top-[38%] top-[82%] md:top-[85%] w-[100%] flex items-center justify-center gap-3 flex-wrap">
          <button
            className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer"
            onClick={() => navigate("/allcourses")}
          >
            View all Courses{" "}
            <SiViaplay className="w-[30px] h-[30px] lg:fill-white fill-black" />
          </button>

          <button
            className="px-[20px] py-[10px] lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center"
            onClick={() => navigate("/searchwithai")}
          >
            Search with AI{" "}
            <img
              src={ai}
              className="w-[30px] h-[30px] rounded-full hidden lg:block"
              alt=""
            />
            <img
              src={ai1}
              className="w-[35px] h-[35px] rounded-full lg:hidden"
              alt=""
            />
          </button>
        </div>
      </div>

      <Logos />
      <ExploreCourses />
      <Cardspage />
      <About />
      <ReviewPage />
>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
      <Footer />
    </div>
  );
}

export default Home;

<<<<<<< HEAD
=======

// export default Home;

>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
