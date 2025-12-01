// src/hooks/getAllReviews.jsx

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllReview } from "../redux/reviewSlice";
import { serverUrl } from "../App";

const useAllReviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/review/allReview",
          { withCredentials: true }
        );

        console.log("all reviews:", result.data);
        dispatch(setAllReview(result.data));
      } catch (error) {
        console.log("all reviews error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }
    };

    fetchAllReviews();
  }, [dispatch]);
};

export default useAllReviews;
