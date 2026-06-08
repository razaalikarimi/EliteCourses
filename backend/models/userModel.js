import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
      
    },
    description: {
      type: String
    },
    role: {
      type: String,
      enum: ["educator", "student"],
      required: true
    },
    photoUrl: {
      type: String,
      default: ""
    },
    enrolledCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    customGeminiApiKey: {
      type: String,
      default: ""
    },
    resetOtp:{
      type:String
    },
    otpExpires:{
      type:Date
    },
    isOtpVerified:{
      type:Boolean,
      default:false
    }
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
