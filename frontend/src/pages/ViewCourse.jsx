import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { FaArrowLeftLong } from "react-icons/fa6";
import img from "../assets/empty.jpg";
import Card from "../components/Card.jsx";
import { setSelectedCourseData } from "../redux/courseSlice";
import { FaLock, FaPlayCircle, FaCheckCircle, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import Nav from "../components/Nav";

function ViewCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { courseData, selectedCourseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const { lectureData } = useSelector((state) => state.lecture);
  
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedCreatorCourse, setSelectedCreatorCourse] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleReview = async () => {
    if (rating === 0) return toast.warning("Please select a rating");
    try {
      await axios.post(
        serverUrl + "/api/review/givereview",
        { rating, comment, courseId },
        { withCredentials: true }
      );
      toast.success("Review submitted. Thank you!");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  const avgRating = (() => {
    const reviews = selectedCourseData?.reviews;
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  })();

  useEffect(() => {
    const course = courseData.find(item => item._id === courseId);
    if (course) {
      dispatch(setSelectedCourseData(course));
    }
    
    const verify = userData?.enrolledCourses?.some((c) => {
      const enrolledId = typeof c === "string" ? c : c._id;
      return enrolledId?.toString() === courseId?.toString();
    });
    setIsEnrolled(!!verify);
  }, [courseId, courseData, userData]);

  useEffect(() => {
    const getCreator = async () => {
      if (selectedCourseData?.creator) {
        try {
          const result = await axios.post(
            `${serverUrl}/api/course/getcreator`,
            { userId: selectedCourseData.creator },
            { withCredentials: true }
          );
          setCreatorData(result.data);
        } catch (error) {
          console.error("Error fetching creator:", error);
        }
      }
    };
    getCreator();
  }, [selectedCourseData]);

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourses = courseData.filter(
        (course) => course.creator === creatorData._id && course._id !== courseId
      );
      setSelectedCreatorCourse(creatorCourses);
    }
  }, [creatorData, courseData]);

  const handleEnroll = async () => {
    if (!userData) return navigate("/login");
    try {
      const orderData = await axios.post(
        serverUrl + "/api/payment/create-order",
        { courseId, userId: userData._id },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "Elite Courses",
        description: "Course Enrollment Payment",
        order_id: orderData.data.id,
        handler: async function (response) {
          try {
            await axios.post(
              serverUrl + "/api/payment/verify-payment",
              { ...response, courseId, userId: userData._id },
              { withCredentials: true }
            );
            setIsEnrolled(true);
            toast.success("Welcome to the course!");
          } catch (verifyError) {
            toast.error("Payment verification failed.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Failed to start enrollment process.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      {/* Header Section */}
      <div className="bg-gray-900 text-white pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaArrowLeftLong /> Back
            </button>
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-blue-600 text-xs font-bold rounded-full uppercase tracking-widest">
                {selectedCourseData?.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                {selectedCourseData?.title}
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl">
                {selectedCourseData?.subTitle || "Learn everything you need to know about " + selectedCourseData?.category + " in this comprehensive guide."}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span className="font-bold">{avgRating}</span>
                <span className="text-gray-400">({selectedCourseData?.reviews?.length || 0} reviews)</span>
              </div>
              <div className="text-gray-400">
                Created by <span className="text-blue-400 font-medium">{creatorData?.name || "Expert Instructor"}</span>
              </div>
            </div>
          </div>

          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 sticky top-32">
              <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-gray-100">
                <img 
                  src={selectedCourseData?.thumbnail || img} 
                  className="w-full h-full object-cover"
                  alt="Course Thumbnail" 
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-gray-900">₹{selectedCourseData?.price}</span>
                  <span className="text-gray-400 line-through">₹{Math.floor(selectedCourseData?.price * 1.5)}</span>
                </div>
                
                {isEnrolled ? (
                  <button 
                    onClick={() => navigate(`/viewlecture/${courseId}`)}
                    className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
                  >
                    Go to Course
                  </button>
                ) : (
                  <button 
                    onClick={handleEnroll}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                  >
                    Enroll Now
                  </button>
                )}
                
                <div className="space-y-3">
                  <p className="text-sm font-bold text-gray-900">This course includes:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                      <FaPlayCircle className="text-gray-400" /> {selectedCourseData?.lectures?.length || 0} video lectures
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                      <FaCheckCircle className="text-gray-400" /> Lifetime access
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                {selectedCourseData?.lectures?.map((lecture, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-5 border-b border-gray-50 last:border-0 ${lecture.isPreviewFree ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <div className="flex items-center gap-4">
                      {lecture.isPreviewFree ? (
                        <button 
                          onClick={() => setSelectedLecture(lecture)}
                          className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                          <FaPlayCircle size={18} />
                        </button>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <FaLock size={16} />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{lecture.lectureTitle}</p>
                        <p className="text-xs text-gray-500 font-medium">{lecture.isPreviewFree ? 'Preview available' : 'Locked'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {selectedLecture && (
              <section className="space-y-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-blue-600 text-[10px] text-white rounded uppercase tracking-widest">Preview</span>
                  {selectedLecture.lectureTitle}
                </h3>
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                  <video src={selectedLecture.videoUrl} controls className="w-full h-full" />
                </div>
              </section>
            )}

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">About the Instructor</h2>
              <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-2xl border border-gray-100">
                <img 
                  src={creatorData?.photoUrl || img} 
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg shadow-gray-200" 
                  alt="Instructor" 
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">{creatorData?.name || "Expert Instructor"}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">{creatorData?.description || "An experienced professional dedicated to teaching practical skills that matter."}</p>
                  <p className="text-sm text-blue-600 font-bold">{creatorData?.email}</p>
                </div>
              </div>
            </section>

            <section className="space-y-8 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 space-y-4 shadow-sm">
                  <p className="font-bold text-gray-900">Rate this course</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setRating(star)}>
                        <FaStar size={24} className={star <= rating ? "text-yellow-400" : "text-gray-200"} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you think about the course..."
                    className="w-full bg-gray-50 border-0 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-blue-100 min-h-[120px]"
                  />
                  <button
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
                    onClick={handleReview}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-12">More from this Instructor</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedCreatorCourse?.map((item, index) => (
            <Card key={index} {...item} id={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
