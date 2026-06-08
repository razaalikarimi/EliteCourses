import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlayCircle, FaCheckCircle } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
import Nav from '../components/Nav';
import axios from 'axios';
import { serverUrl } from '../App';

function ViewLecture() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);

  // BUG-09 FIX: Support direct URL visit / hard refresh by falling back to API
  // Redux courseData may be empty on fresh page load
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First try to find in Redux (already loaded — instant)
    const fromRedux = courseData?.find((c) => c._id === courseId);
    if (fromRedux) {
      setCourse(fromRedux);
      setLoading(false);
      return;
    }

    // Fallback: fetch from API if Redux is empty (hard refresh / direct URL)
    const fetchCourse = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/course/getcourse/${courseId}`,
          { withCredentials: true }
        );
        // Also fetch lectures to populate them
        const lectureResult = await axios.get(
          `${serverUrl}/api/course/getcourselecture/${courseId}`,
          { withCredentials: true }
        );
        setCourse({ ...result.data, lectures: lectureResult.data.lectures });
      } catch (error) {
        console.error('Failed to load course:', error.message);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, courseData]);

  const [selectedLecture, setSelectedLecture] = useState(null);

  // Auto-select first lecture once course is loaded
  useEffect(() => {
    if (course?.lectures?.length > 0 && !selectedLecture) {
      setSelectedLecture(course.lectures[0]);
    }
  }, [course]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Nav />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-gray-400">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="font-medium text-sm">Loading course...</p>
          </div>
        </div>
      </div>
    );
  }

  // Course not found
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Nav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-2xl font-bold text-gray-900">Course not found</p>
            <p className="text-gray-500 font-medium">This course may not be available or you may not be enrolled.</p>
            <button
              onClick={() => navigate('/enrolledcourses')}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
            >
              ← My Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              {course?.title}
            </h1>
            <div className="flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-wider">
              <span>{course?.category}</span>
              <span>•</span>
              <span>{course?.level || 'All Levels'}</span>
            </div>
          </div>

          <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl shadow-blue-100/50 border border-gray-100">
            {selectedLecture?.videoUrl ? (
              <video
                key={selectedLecture._id}
                src={selectedLecture.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
                <FaPlayCircle size={48} className="opacity-30" />
                <span className="font-medium">Select a lecture to start watching</span>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedLecture?.lectureTitle || 'Choose a lecture from the curriculum →'}
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              This lecture is part of the <span className="text-blue-600 font-bold">{course?.category}</span> track.{' '}
              {selectedLecture?.description || "In this session, we'll go through the core concepts of this topic."}
            </p>
          </div>
        </div>

        {/* Right - Curriculum */}
        <div className="lg:w-96 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-32">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <h2 className="font-bold text-gray-900">Course Curriculum</h2>
              <p className="text-sm text-gray-500 font-medium">{course?.lectures?.length || 0} lessons</p>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto">
              {course?.lectures?.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm font-medium">
                  No lectures available yet.
                </div>
              ) : (
                course?.lectures?.map((lecture, index) => (
                  <button
                    key={lecture._id || index}
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
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewLecture;
