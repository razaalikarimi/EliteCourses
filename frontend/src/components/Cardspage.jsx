import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from "./Card.jsx";
import { HiArrowRight } from "react-icons/hi";

function Cardspage() {
  const [courses, setCourses] = useState([]);
  const { courseData } = useSelector(state => state.course);
  const navigate = useNavigate();

  useEffect(() => {
    setCourses(courseData.slice(0, 6));
  }, [courseData]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Our Most <br />
            <span className="text-indigo-600">Popular Courses.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 font-medium leading-relaxed">
             Join thousands of students and start learning today. These courses are 
             designed to give you the practical skills needed in the industry.
          </p>
        </div>
        
        <button 
          onClick={() => navigate("/allcourses")}
          className="px-8 py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2 group shadow-lg"
        >
          View All Courses
          <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              id={item._id} 
              thumbnail={item.thumbnail} 
              title={item.title} 
              price={item.price} 
              category={item.category} 
              reviews={item.reviews} 
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Cardspage;
