import React  from 'react'

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function EnrolledCourse() {
  const navigate = useNavigate()

  const { userData } = useSelector((state) => state.user);

     
   
 

  return (
    <div className="min-h-screen w-full px-4 py-9 bg-gray-50">
      

      <FaArrowLeftLong  className='absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-6  ">
        My Enrolled Courses
      </h1>

      {userData.enrolledCourses.length === 0 ? (
        <p className="text-gray-500 text-center w-full">You haven’t enrolled in any course yet.</p>
      ) : (
        <div className="flex items-center justify-center flex-wrap gap-[30px]">
          {userData.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{course.category}</p>
                <p className="text-sm text-gray-700">{course.level}</p>
                <button 
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-md active:scale-95 mt-4" 
                  onClick={() => navigate(`/viewlecture/${course._id}`)}
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnrolledCourse
