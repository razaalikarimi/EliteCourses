import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/currentuser", {
          withCredentials: true,
        });

        // BUG 3 FIX: Backend now always returns { user }, read consistently
        dispatch(setUserData(result.data.user));
      } catch (error) {
        // 400/401 is expected when user is not logged in — not a real error
        const status = error.response?.status;
        if (status !== 400 && status !== 401) {
          console.log("getCurrentUser unexpected error:", error.message);
        }
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useCurrentUser;
