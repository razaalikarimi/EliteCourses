import React from 'react'
import about from "../assets/about.jpg"
import { BiSolidBadgeCheck } from "react-icons/bi";

function About() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto px-6 md:px-12">
      <div className="lg:w-1/2 relative">
        <img 
          src={about} 
          className="w-full h-auto rounded-2xl shadow-xl object-cover" 
          alt="About our platform" 
        />
      </div>
      
      <div className="lg:w-1/2 space-y-8">
        <div className="space-y-4">
          <h3 className="text-blue-600 font-bold uppercase tracking-wider text-sm">Our Mission</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Helping you grow your skills with easy learning
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We help you learn in a simple and easy way. You can track your progress and talk to your teachers. Our goal is to make learning easy for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            "Easy to use",
            "Good courses",
            "Best teachers",
            "Lifetime access"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
              <BiSolidBadgeCheck className="text-blue-600" size={24} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
