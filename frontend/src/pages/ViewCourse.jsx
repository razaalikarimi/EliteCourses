import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { HiArrowLeft, HiStar, HiCheckCircle, HiLockClosed, HiPlay } from "react-icons/hi2";
import img from "../assets/empty.jpg";
import Card from "../components/Card.jsx";
import { setSelectedCourseData } from "../redux/courseSlice";
import { toast } from "react-toastify";

function ViewCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const [creatorData, setCreatorData] = useState(null);
  const dispatch = useDispatch();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const { selectedCourseData } = useSelector((state) => state.course);
  const [selectedCreatorCourse, setSelectedCreatorCourse] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleReview = async () => {
    try {
      await axios.post(
        serverUrl + "/api/review/givereview",
        { rating, comment, courseId },
        { withCredentials: true }
      );
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAverageRating(selectedCourseData?.reviews);

  const fetchCourseData = () => {
    const course = courseData.find(item => item._id === courseId);
    if (course) {
      dispatch(setSelectedCourseData(course));
    }
  };

  const checkEnrollment = () => {
    const verify = userData?.enrolledCourses?.some((c) => {
      const enrolledId = typeof c === "string" ? c : c._id;
      return enrolledId?.toString() === courseId?.toString();
    });
    if (verify) {
      setIsEnrolled(true);
    }
  };

  useEffect(() => {
    fetchCourseData();
    checkEnrollment();
  }, [courseId, courseData]);

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

  const handleEnroll = async (courseId, userId) => {
    try {
      const orderData = await axios.post(
        serverUrl + "/api/payment/create-order",
        { courseId, userId },
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
            const verifyRes = await axios.post(
              serverUrl + "/api/payment/verify-payment",
              { ...response, courseId, userId },
              { withCredentials: true }
            );
            setIsEnrolled(true);
            toast.success(verifyRes.data.message);
          } catch (verifyError) {
            toast.error("Payment verification failed.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Something went wrong while enrolling.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Course Header */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm grid lg:grid-cols-2 gap-12 items-start">
           <div className="space-y-6">
              <button 
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-colors mb-4"
              >
                <HiArrowLeft /> Back to Courses
              </button>
              
              <div className="space-y-4">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {selectedCourseData?.category}
                </span>
                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                  {selectedCourseData?.title}
                </h1>
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  {selectedCourseData?.subTitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-gray-50">
                 <div className="flex items-center gap-2">
                    <HiStar className="text-amber-400 w-5 h-5" />
                    <span className="text-lg font-black text-gray-900">{avgRating}</span>
                    <span className="text-gray-400 text-sm font-medium">(1,200 reviews)</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-gray-900 font-black text-2xl">
                    ₹{selectedCourseData?.price}
                 </div>
              </div>

              <div className="pt-8">
                {!isEnrolled ? (
                  <button
                    className="h-14 px-10 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 w-full sm:w-auto"
                    onClick={() => handleEnroll(courseId, userData._id)}
                  >
                    Enroll Now
                  </button>
                ) : (
                  <button
                    className="h-14 px-10 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95 w-full sm:w-auto flex items-center justify-center gap-3"
                    onClick={() => navigate(`/viewlecture/${courseId}`)}
                  >
                    Start Learning <HiPlay />
                  </button>
                )}
              </div>
           </div>

           <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={selectedCourseData?.thumbnail || img}
                className="w-full aspect-video object-cover"
                alt="Course Thumbnail"
              />
           </div>
        </div>

        {/* Content Tabs / Info */}
        <div className="grid lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 space-y-12">
              {/* Learning Outcomes */}
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm space-y-6">
                 <h2 className="text-xl font-bold text-gray-900">What you'll learn</h2>
                 <div className="grid sm:grid-cols-2 gap-4">
                    {['Understand core concepts', 'Build real-world projects', 'Master industry tools', 'Get certified'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                        <HiCheckCircle className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Curriculum Area */}
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm space-y-8">
                 <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
                    <span className="text-sm text-gray-400 font-bold">{selectedCourseData?.lectures?.length} Lessons</span>
                 </div>
                 
                 <div className="space-y-3">
                   {selectedCourseData?.lectures?.map((lecture, index) => (
                     <div 
                        key={index}
                        className={`group flex items-center justify-between p-4 rounded-xl border transition-all
                          ${lecture.isPreviewFree ? 'border-gray-100 bg-white hover:border-indigo-200' : 'bg-gray-50 border-transparent opacity-60 cursor-not-allowed'}`}
                     >
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${lecture.isPreviewFree ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-200 text-gray-400'}`}>
                             {lecture.isPreviewFree ? <HiPlay size={20} /> : <HiLockClosed size={20} />}
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-gray-900">{lecture.lectureTitle}</h4>
                             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Section {index + 1}</p>
                          </div>
                       </div>
                       {lecture.isPreviewFree && (
                         <button 
                            onClick={() => setSelectedLecture(lecture)}
                            className="px-4 py-2 text-xs font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                         >
                            Preview
                         </button>
                       )}
                     </div>
                   ))}
                 </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm space-y-10">
                 <h2 className="text-xl font-bold text-gray-900">Student Feedback</h2>
                 <div className="space-y-6">
                    <div className="flex gap-2 mb-4">
                       {[1, 2, 3, 4, 5].map((star) => (
                         <HiStar
                           key={star}
                           onClick={() => setRating(star)}
                           size={32}
                           className={`cursor-pointer transition-colors ${star <= rating ? "text-amber-400" : "text-gray-200"}`}
                         />
                       ))}
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience with this course..."
                      className="w-full bg-gray-50 border border-transparent rounded-2xl p-6 text-gray-700 text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none min-h-[150px]"
                    />
                    <button
                      className="px-8 py-3.5 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95"
                      onClick={handleReview}
                    >
                      Submit Review
                    </button>
                 </div>
              </div>
           </div>

           {/* Instructor Sidebar */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Lead Instructor</h4>
                 <div className="flex items-center gap-4">
                    <img
                      src={creatorData?.photoUrl || img}
                      className="w-16 h-16 rounded-2xl object-cover ring-4 ring-gray-50"
                      alt="Instructor"
                    />
                    <div>
                       <h3 className="text-base font-bold text-gray-900">{creatorData?.name}</h3>
                       <p className="text-xs text-indigo-600 font-bold">Expert Educator</p>
                    </div>
                 </div>
                 <p className="text-xs text-gray-500 font-medium leading-relaxed">
                   {creatorData?.description}
                 </p>
                 <div className="pt-6 border-t border-gray-50 uppercase tracking-widest text-[10px] font-bold text-gray-400">
                    Contact: {creatorData?.email}
                 </div>
              </div>

              {/* Related/Other Material */}
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Other Courses by {creatorData?.name}</h4>
                 <div className="space-y-4">
                   {selectedCreatorCourse?.slice(0, 2).map((item, index) => (
                     <Card
                       key={index}
                       thumbnail={item.thumbnail}
                       title={item.title}
                       id={item._id}
                       price={item.price}
                       category={item.category}
                     />
                   ))}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Preview Modal placeholder - If a lecture is selected */}
      {selectedLecture && (
        <div className="fixed inset-0 z-[200] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                 <h3 className="font-bold text-gray-900 uppercase tracking-tight">{selectedLecture.lectureTitle}</h3>
                 <button onClick={() => setSelectedLecture(null)} className="text-gray-400 hover:text-gray-900 transition-colors">Close</button>
              </div>
              <div className="aspect-video bg-black">
                 <video src={selectedLecture.videoUrl} controls className="w-full h-full" autoPlay />
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default ViewCourse;
