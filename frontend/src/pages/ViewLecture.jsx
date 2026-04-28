import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlayCircle, FaCheckCircle } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
import Nav from '../components/Nav';

function ViewLecture() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  
  const selectedCourse = courseData?.find((course) => course._id === courseId);
  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      
      <main className="flex-1 max-w-7xl mx-auto w-full pt-32 pb-12 px-6 md:px-12 flex flex-col lg:flex-row gap-8">
        {/* Left - Video & Info */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm"
            >
              <FaArrowLeftLong /> Back to course
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {selectedCourse?.title}
            </h1>
            <div className="flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-wider">
              <span>{selectedCourse?.category}</span>
              <span>•</span>
              <span>{selectedCourse?.level || 'All Levels'}</span>
            </div>
          </div>

          <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl shadow-blue-100/50 border border-gray-100">
            {selectedLecture?.videoUrl ? (
              <video
                src={selectedLecture.videoUrl}
                controls
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 font-medium">
                Select a lecture to start watching
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedLecture?.lectureTitle || 'Selecting a lecture...'}
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              This lecture is part of the <span className="text-blue-600 font-bold">{selectedCourse?.category}</span> track. 
              {selectedLecture?.description || "In this session, we'll go through the core concepts of this topic."}
            </p>
          </div>
        </div>

        {/* Right - Curriculum */}
        <div className="lg:w-96 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-32">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <h2 className="font-bold text-gray-900">Course Curriculum</h2>
              <p className="text-sm text-gray-500 font-medium">{selectedCourse?.lectures?.length || 0} lessons</p>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto">
              {selectedCourse?.lectures?.map((lecture, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`w-full flex items-center justify-between p-5 border-b border-gray-50 last:border-0 transition-colors text-left group ${
                    selectedLecture?._id === lecture._id
                      ? 'bg-blue-50/50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectedLecture?._id === lecture._id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                    }`}>
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${
                        selectedLecture?._id === lecture._id ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {lecture.lectureTitle}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <FaPlayCircle size={10} className="text-gray-400" />
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Video</span>
                      </div>
                    </div>
                  </div>
                  {userData?.completedLectures?.includes(lecture._id) && (
                    <FaCheckCircle className="text-green-500" size={16} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewLecture;
