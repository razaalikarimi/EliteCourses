import React, { useEffect, useState } from 'react'
import Card from "./Card.jsx"
import { useSelector } from 'react-redux';
import { SiViaplay } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Cardspage() {
  const [popularCourses, setPopularCourses] = useState([]);
  const { courseData } = useSelector(state => state.course);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseData) {
      setPopularCourses(courseData.slice(0, 6));
    }
  }, [courseData]);

  return (
    <div className="px-6 md:px-12 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularCourses.map((item, index) => (
          <Card 
            key={item._id || index} 
            id={item._id} 
            thumbnail={item.thumbnail} 
            title={item.title} 
            price={item.price} 
            category={item.category} 
            reviews={item.reviews} 
          />
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <button 
          className="group inline-flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          onClick={() => navigate("/allcourses")}
        >
          View all Courses
          <SiViaplay className="text-blue-600 transition-transform group-hover:translate-x-1" size={20} />
        </button>
      </div>
    </div>
  );
}

export default Cardspage;
