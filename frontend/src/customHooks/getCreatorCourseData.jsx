

import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCreatorCourseData } from "../redux/courseSlice";
import { serverUrl } from "../App";

const useCreatorCourseData = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
   
    if (!userData || !userData._id) return;

    const getCreatorData = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getcreatorcourses",
          { withCredentials: true }
        );

        console.log("creator courses:", result.data);
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log("creatorcourses error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });

        toast.error(
          error?.response?.data?.message || "Failed to load creator courses"
        );
      }
    };

    getCreatorData();
  }, [dispatch, userData]);
};

export default useCreatorCourseData;
