<<<<<<< HEAD
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";
import { serverUrl } from "../App";

const useCourseData = () => {
  const dispatch = useDispatch();

=======

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";
import { serverUrl } from "../App";

const useCourseData = () => {
  const dispatch = useDispatch();

>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
  useEffect(() => {
    const getAllPublishedCourse = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getpublishedcoures",
          { withCredentials: true }
        );

        console.log("published courses:", result.data);
        dispatch(setCourseData(result.data));
      } catch (error) {
        console.log("published courses error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }
    };

    getAllPublishedCourse();
  }, [dispatch]);
};

export default useCourseData;
