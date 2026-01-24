import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import {
  HiArrowLeft,
  HiStar,
  HiCheckCircle,
  HiLockClosed,
  HiPlay,
} from "react-icons/hi2";
import img from "../assets/empty.jpg";
import Card from "../components/Card.jsx";
import { setSelectedCourseData } from "../redux/courseSlice";
import { toast } from "react-toastify";

function ViewCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseData, selectedCourseData } = useSelector(
    (state) => state.course,
  );
  const { userData } = useSelector((state) => state.user);

  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedCreatorCourse, setSelectedCreatorCourse] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  /* ------------------ Helpers ------------------ */
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAverageRating(selectedCourseData?.reviews);

  /* ------------------ Fetch course ------------------ */
  useEffect(() => {
    const course = courseData.find((c) => c._id === courseId);
    if (course) dispatch(setSelectedCourseData(course));
  }, [courseId, courseData, dispatch]);

  /* ------------------ Enrollment check ------------------ */
  useEffect(() => {
    const enrolled = userData?.enrolledCourses?.some((c) => {
      const id = typeof c === "string" ? c : c._id;
      return id?.toString() === courseId;
    });
    setIsEnrolled(Boolean(enrolled));
  }, [userData, courseId]);

  /* ------------------ Fetch creator ------------------ */
  useEffect(() => {
    const getCreator = async () => {
      if (!selectedCourseData?.creator) return;
      try {
        const res = await axios.post(
          `${serverUrl}/api/course/getcreator`,
          { userId: selectedCourseData.creator },
          { withCredentials: true },
        );
        setCreatorData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCreator();
  }, [selectedCourseData]);

  /* ------------------ Other courses by creator ------------------ */
  useEffect(() => {
    if (!creatorData?._id) return;
    const filtered = courseData.filter(
      (c) => c.creator === creatorData._id && c._id !== courseId,
    );
    setSelectedCreatorCourse(filtered);
  }, [creatorData, courseData, courseId]);

  /* ------------------ Review ------------------ */
  const handleReview = async () => {
    try {
      await axios.post(
        serverUrl + "/api/review/givereview",
        { rating, comment, courseId },
        { withCredentials: true },
      );
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Review failed");
    }
  };

  /* ------------------ Enroll ------------------ */
  const handleEnroll = async (courseId, userId) => {
    try {
      const order = await axios.post(
        serverUrl + "/api/payment/create-order",
        { courseId, userId },
        { withCredentials: true },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.data.amount,
        currency: "INR",
        name: "Elite Courses",
        description: "Course Enrollment",
        order_id: order.data.id,
        handler: async (response) => {
          try {
            const verify = await axios.post(
              serverUrl + "/api/payment/verify-payment",
              { ...response, courseId, userId },
              { withCredentials: true },
            );
            toast.success(verify.data.message);
            setIsEnrolled(true);
          } catch {
            toast.error("Payment verification failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Enrollment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border shadow-sm grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-xs font-black uppercase text-gray-500 hover:text-indigo-600"
            >
              <HiArrowLeft /> Back to Courses
            </button>

            <h1 className="text-4xl font-black">{selectedCourseData?.title}</h1>
            <p className="text-gray-600">{selectedCourseData?.subTitle}</p>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <HiStar className="text-amber-400" />
                <span className="font-black">{avgRating}</span>
              </div>
              <span className="text-2xl font-black">
                ₹{selectedCourseData?.price}
              </span>
            </div>

            {!isEnrolled ? (
              <button
                className="h-14 px-10 bg-indigo-600 text-white rounded-xl font-black"
                onClick={() => handleEnroll(courseId, userData._id)}
              >
                Enroll Now
              </button>
            ) : (
              <button
                className="h-14 px-10 bg-emerald-600 text-white rounded-xl font-black flex items-center gap-2"
                onClick={() => navigate(`/viewlecture/${courseId}`)}
              >
                Start Learning <HiPlay />
              </button>
            )}
          </div>

          <img
            src={selectedCourseData?.thumbnail || img}
            className="rounded-3xl aspect-video object-cover"
            alt=""
          />
        </div>

        {/* Course Content */}
        <div className="bg-white rounded-3xl p-10 border shadow-sm">
          <h2 className="font-bold mb-6">Course Content</h2>
          {selectedCourseData?.lectures?.map((lec, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-4 rounded-xl mb-3 ${
                lec.isPreviewFree ? "bg-gray-50 cursor-pointer" : "opacity-50"
              }`}
            >
              <div className="flex items-center gap-3">
                {lec.isPreviewFree ? <HiPlay /> : <HiLockClosed />}
                <span>{lec.lectureTitle}</span>
              </div>
              {lec.isPreviewFree && (
                <button
                  onClick={() => setSelectedLecture(lec)}
                  className="text-indigo-600 font-bold text-xs"
                >
                  Preview
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Review */}
        <div className="bg-white rounded-3xl p-10 border shadow-sm">
          <h2 className="font-bold mb-4">Student Feedback</h2>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <HiStar
                key={s}
                onClick={() => setRating(s)}
                className={`cursor-pointer ${
                  s <= rating ? "text-amber-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-xl p-4 mb-4"
            placeholder="Share your experience..."
          />
          <button
            onClick={handleReview}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl"
          >
            Submit Review
          </button>
        </div>

        {/* Instructor */}
        <div className="grid lg:grid-cols-3 gap-6">
          {selectedCreatorCourse.map((c) => (
            <Card key={c._id} {...c} />
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedLecture && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center">
          <div className="bg-white max-w-4xl w-full rounded-2xl overflow-hidden">
            <div className="flex justify-between p-4">
              <h3 className="font-bold">{selectedLecture.lectureTitle}</h3>
              <button onClick={() => setSelectedLecture(null)}>Close</button>
            </div>
            <video
              src={selectedLecture.videoUrl}
              controls
              autoPlay
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCourse;
