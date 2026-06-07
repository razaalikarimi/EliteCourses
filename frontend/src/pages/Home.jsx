import React from "react";
import home from "../assets/home1.jpg";
import Nav from "../components/Nav";
import { SiViaplay } from "react-icons/si";
import Logos from "../components/Logos";
import Cardspage from "../components/Cardspage";
import ExploreCourses from "../components/ExploreCourses";
import About from "../components/About";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import ReviewPage from "../components/ReviewPage";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white">
      <Nav />
      
      {/* Hero Section */}
      <header className="relative pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Learn new skills at <br /> 
            your own pace.
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
            This platform helps you watch video lectures, ask doubts to our AI Tutor 24/7, and track your study progress easily. No clutter, just learning.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
              onClick={() => navigate("/allcourses")}
            >
              Browse Courses
            </button>
            <button
              className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/searchwithai")}
            >
              Search with AI
              <img src={ai} className="w-5 h-5 rounded-full" alt="" />
            </button>
            <button
              className="px-6 py-3 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg font-semibold hover:bg-indigo-100 transition-colors flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/mydoubts")}
            >
              Ask AI Tutor 🤖
            </button>
          </div>
        </div>
        <div className="flex-1 w-full max-w-2xl">
          <img
            src={home}
            className="w-full h-auto rounded-2xl shadow-xl shadow-blue-50/50 object-cover"
            alt="Learning illustration"
          />
        </div>
      </header>

      <div className="bg-gray-50 border-y border-gray-100 py-8">
        <Logos />
      </div>

      <main className="max-w-7xl mx-auto">
        <section className="py-12">
          <ExploreCourses />
        </section>
        
        <section className="py-12 border-t border-gray-100">
          <div className="px-6 md:px-12 mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
            <p className="text-gray-600 mt-2">Check out our most popular courses this week.</p>
          </div>
          <Cardspage />
        </section>

        <section className="py-12 bg-blue-50/30">
          <About />
        </section>

        {/* AI Doubt Resolution Feature Section */}
        <section className="py-20 px-6 md:px-12 bg-white border border-gray-100 text-gray-900 rounded-[40px] my-16 mx-4 md:mx-12 shadow-xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-slate-50/50 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-gray-900">
                Never get stuck. <br />
                Meet your 24/7 AI Tutor.
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
                Ask any question and get quick answers directly from your course lectures, videos, and notes.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100/40 text-indigo-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Instant Answers</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Get answers directly from your course syllabus, lecture notes, and videos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100/40 text-indigo-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Video Timestamps</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Go to the exact minute in the video where your question is explained.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100/40 text-indigo-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Ask Your Teacher</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">If the AI cannot help, send your question directly to your teacher.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100/40 text-indigo-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Voice Search</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Speak your question directly using your microphone for easy searching.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 group cursor-pointer"
                  onClick={() => navigate("/mydoubts")}
                >
                  Ask AI Tutor
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md bg-slate-50 border border-slate-200/80 rounded-[32px] p-6 shadow-xl relative text-left">
              {/* Fake chatbot interface mockup */}
              <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="text-xs font-bold text-slate-400 ml-2 tracking-wider uppercase">Elite AI Tutor</div>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/60 max-w-[85%] text-xs text-gray-700 shadow-sm">
                  Hi! I am your AI Tutor. Ask me any question about your courses.
                </div>
                <div className="p-4 rounded-2xl bg-blue-600 ml-auto max-w-[85%] text-xs text-white shadow-md">
                  What is the difference between client-side and server-side state in React?
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/60 max-w-[85%] text-xs text-gray-700 space-y-2 shadow-sm">
                  <p>Client-side state is stored in your browser and is lost when you refresh. Server-side state is stored in the database and fetched from the server.</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-blue-600 font-bold">
                    <span>⏱️ Video Lecture: React State @ 4:15</span>
                    <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Play →</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3">
                <div className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-400 shadow-sm">
                  Ask AI Tutor...
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  →
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-gray-100">
          <ReviewPage />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
