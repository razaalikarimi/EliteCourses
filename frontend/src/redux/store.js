import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import courseSlice from "./courseSlice"
import lectureSlice from "./lectureSlice"
import reviewSlice from "./reviewSlice"
import doubtSlice from "./doubtSlice"

export const store = configureStore({
    reducer:{
        user:userSlice,
        course:courseSlice,
        lecture:lectureSlice,
        review:reviewSlice,
        doubt:doubtSlice,
    }
})