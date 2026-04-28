import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 px-6 md:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-lg object-cover brightness-90" />
            <span className="text-xl font-bold text-white">Elite Courses</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            A simple platform built to help students learn and track their progress in high-demand fields.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-6">Quick Links</h3>
          <ul className="space-y-4">
            <li><button onClick={() => navigate("/")} className="hover:text-blue-400 transition-colors">Home</button></li>
            <li><button onClick={() => navigate("/allcourses")} className="hover:text-blue-400 transition-colors">Courses</button></li>
            <li><button onClick={() => navigate("/login")} className="hover:text-blue-400 transition-colors">Log In</button></li>
            <li><button onClick={() => navigate("/profile")} className="hover:text-blue-400 transition-colors">My Profile</button></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-6">Top Categories</h3>
          <ul className="space-y-4">
            <li className="hover:text-blue-400 cursor-pointer transition-colors">Web Development</li>
            <li className="hover:text-blue-400 cursor-pointer transition-colors">Data Science</li>
            <li className="hover:text-blue-400 cursor-pointer transition-colors">UI/UX Design</li>
            <li className="hover:text-blue-400 cursor-pointer transition-colors">AI & Machine Learning</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-6">Contact</h3>
          <ul className="space-y-4">
            <li>Email: hello@elitecourses.com</li>
            <li>Support: support@elitecourses.com</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-medium">
        <p>© {currentYear} Elite Courses. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
