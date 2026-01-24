import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { HiStar, HiUserGroup } from "react-icons/hi";

function ReviewPage() {
  const [latestReview, setLatestReview] = useState([]);
  const { allReview } = useSelector((state) => state.review);

  useEffect(() => {
    if (Array.isArray(allReview)) {
      setLatestReview(allReview.slice(0, 6));
    } else {
      setLatestReview([]);
    }
  }, [allReview]);

  const fallbackImg =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80";

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Heading */}
      <div className="text-center space-y-4 mb-16">
        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
          Testimonials
        </span>

        <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
          What Our <br />
          <span className="text-indigo-600">Students Say.</span>
        </h2>

        <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
          Discover how Elite Courses is transforming learning experiences
          through real feedback from students and professionals worldwide.
        </p>
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestReview
          .filter((item) => item && item.user)
          .map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ReviewCard
                rating={item.rating ?? 5}
                image={item.user.photoUrl || fallbackImg}
                text={item.comment || ""}
                name={item.user.name || "Anonymous"}
                role={item.user.role || "Student"}
              />
            </motion.div>
          ))}
      </div>

      {/* Social Proof */}
      <div className="mt-20 pt-12 border-t border-gray-100 flex flex-wrap items-center justify-center gap-12 opacity-60">
        <div className="flex items-center gap-2">
          <HiUserGroup size={24} className="text-gray-400" />
          <span className="text-sm font-bold text-gray-900">
            20,000+ Students
          </span>
        </div>

        <div className="flex items-center gap-2">
          <HiStar size={24} className="text-amber-400" />
          <span className="text-sm font-bold text-gray-900">
            4.9 / 5 Rating
          </span>
        </div>

        <span className="text-sm font-bold text-gray-900">
          Voted #1 Education Platform
        </span>
      </div>
    </div>
  );
}

export default ReviewPage;
