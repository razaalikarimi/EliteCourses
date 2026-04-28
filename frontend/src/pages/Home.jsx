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
            This platform helps you track your lectures, assignments, and progress in a simple way. No clutter, just learning.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              onClick={() => navigate("/allcourses")}
            >
              Browse Courses
            </button>
            <button
              className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
              onClick={() => navigate("/searchwithai")}
            >
              Search with AI
              <img src={ai} className="w-5 h-5 rounded-full" alt="" />
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

        <section className="py-12 border-t border-gray-100">
          <ReviewPage />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
