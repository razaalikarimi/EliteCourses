import Course from "../models/courseModel.js";
import razorpay from 'razorpay'
import User from "../models/userModel.js";
import crypto from 'crypto'
import dotenv from "dotenv"
dotenv.config()

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
})

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // BUG-07 FIX: Validate price before creating order — 0 or undefined will crash Razorpay
    if (!course.price || course.price <= 0) {
      return res.status(400).json({ message: "Invalid course price. Please set a valid price before enrolling." });
    }

    const options = {
      amount: Math.round(course.price * 100), // in paisa, must be integer
      currency: 'INR',
      receipt: `order_${courseId}`, // BUG-13 FIX: was `${courseId}.toString()` — literal ".toString()" was appended
    };

    const order = await razorpayInstance.orders.create(options);
    return res.status(200).json(order);
  } catch (err) {
    console.error("Create order error:", err)
    return res.status(500).json({ message: `Order creation failed: ${err.message}` });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, userId } = req.body

    // BUG-08 FIX: Verify HMAC signature instead of just fetching order status.
    // Without this, any user can replay a paid order_id to get free enrollment.
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed: invalid signature" });
    }

    // Signature valid — enroll the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    return res.status(200).json({ message: "Payment verified and enrollment successful" });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ message: "Internal server error during payment verification" });
  }
};
