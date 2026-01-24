import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <img
                src={logo}
                alt="Elite Courses"
                className="h-12 w-12 rounded-xl border border-gray-800"
              />
              <span className="text-2xl font-black text-white tracking-tight">Elite Courses</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
               We are dedicated to providing the best online learning experience. 
               Join our community and start your journey towards success today.
            </p>
            <div className="flex items-center gap-4">
               {[FaFacebook, FaTwitter, FaLinkedin, FaYoutube].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-white hover:bg-indigo-600 transition-all">
                    <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Top Courses</h4>
            <ul className="space-y-4 text-sm">
              {['Web Development', 'Data Science', 'UI/UX Design', 'Digital Marketing'].map((link) => (
                <li key={link}>
                  <button onClick={() => navigate("/allcourses")} className="hover:text-indigo-400 transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              {['About Us', 'Contact Us', 'Terms & Conditions', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <button className="hover:text-indigo-400 transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-bold mb-6">Get In Touch</h4>
            <div className="space-y-4 text-sm">
               <div className="flex items-start gap-3">
                  <HiLocationMarker className="text-indigo-500 w-5 h-5 flex-shrink-0" />
                  <span>New Delhi</span>
               </div>
               <div className="flex items-center gap-3">
                  <HiPhone className="text-indigo-500 w-5 h-5 flex-shrink-0" />
                  <span>+91 8521199957</span>
               </div>
               <div className="flex items-center gap-3">
                  <HiMail className="text-indigo-500 w-5 h-5 flex-shrink-0" />
                  <span>aliraza85211@gmail.com</span>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
           <p>© {new Date().getFullYear()} Elite Courses. All rights reserved.</p>
           <div className="flex items-center gap-8">
              <button className="hover:text-white transition-colors">Cookie Policy</button>
              <button className="hover:text-white transition-colors">Sitemap</button>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

