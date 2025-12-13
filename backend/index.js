
import express from "express";
import dotenv from "dotenv";
import connectDb from "./configs/db.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import aiRouter from "./routes/aiRoute.js";
import reviewRouter from "./routes/reviewRoute.js";

dotenv.config();

let port = process.env.PORT || 8000;
let app = express();

const allowedOrigins = [
  "http://localhost:5173",               // local dev
  "https://elitecoursesf.onrender.com",  // deployed frontend
];

app.use(express.json());
app.use(cookieParser());

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // origin null ho sakta hai (Postman, health checks, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/ai", aiRouter);
app.use("/api/review", reviewRouter);

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.listen(port, () => {
  console.log("Server Started on port", port);
  connectDb();
});

