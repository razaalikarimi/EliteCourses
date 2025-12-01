
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";
import { serverUrl } from "../App";

const useCourseData = () => {
  const dispatch = useDispatch();

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
