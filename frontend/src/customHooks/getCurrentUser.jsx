<<<<<<< HEAD
// src/hooks/getCurrentUser.jsx  (ya jaha bhi file rakhi hai)

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

        console.log("currentuser result:", result.data);

        // Agar backend { user: {...} } bhej raha hai:
        dispatch(setUserData(result.data.user || result.data));
      } catch (error) {
        console.log("currentuser error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
};

=======


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
        const result = await axios.get(
          serverUrl + "/api/user/currentuser",
          { withCredentials: true }
        );

        console.log("currentuser result:", result.data);

   
        dispatch(setUserData(result.data.user || result.data));
      } catch (error) {
        console.log("currentuser error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
};

>>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
export default useCurrentUser;
