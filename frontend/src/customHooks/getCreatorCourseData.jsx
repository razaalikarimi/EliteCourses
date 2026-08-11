import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";
import { serverUrl } from "../App";

const useCreatorCourseData = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
   
    if (!userData || !userData._id || userData.role !== 'educator') return;

    const getCreatorData = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getcreatorcourses",
          { withCredentials: true }
        );
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        // Silently ignore — non-educators will get 403, which is expected
        if (error?.response?.status !== 403 && error?.response?.status !== 401) {
          console.error("getCreatorCourseData error:", error.message);
        }
      }
    };

    getCreatorData();
  }, [dispatch, userData]);
};

export default useCreatorCourseData;
