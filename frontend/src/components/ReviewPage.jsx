import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";

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

  const actualReviews = latestReview.filter((item) => item && item.user);
  let displayReviews = [...actualReviews];

  if (displayReviews.length < 3) {
    const defaults = [
      {
        rating: 5,
        user: {
          name: "Saurabh Sharma",
          role: "Full Stack Developer",
          photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
        },
        comment: "Great structure! The AI answers questions in seconds."
      },
      {
        rating: 5,
        user: {
          name: "Anjali Gupta",
          role: "UI/UX Student",
          photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
        },
        comment: "Clean interface, easy progress tracking, and very good notes."
      },
      {
        rating: 5,
        user: {
          name: "Rohan Verma",
          role: "Data Science Student",
          photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
        },
        comment: "Good practical courses. The video player works smoothly."
      }
    ];

    // Pad with defaults until we have exactly 3 reviews displayed
    for (const d of defaults) {
      if (displayReviews.length >= 3) break;
      displayReviews.push(d);
    }
  }

  const fallbackImg = "/default-avatar.png";

  return (
    <div className="flex items-center justify-center flex-col py-12 px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center tracking-tight">
        Real Reviews from Real Learners
      </h1>
      <span className="text-gray-500 text-center mt-3 mb-10 max-w-xl text-sm md:text-base leading-relaxed">
        Read what our students say about their learning experience with Elite Courses.
      </span>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayReviews.map((item, index) => (
          <ReviewCard
            key={index}
            rating={item.rating ?? 5}
            image={item.user?.photoUrl || fallbackImg}
            text={item.comment || ""}
            name={item.user?.name || "Anonymous"}
            role={item.user?.role || "Learner"}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
