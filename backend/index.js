
// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./configs/db.js";
// import authRouter from "./routes/authRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import userRouter from "./routes/userRoute.js";
// import courseRouter from "./routes/courseRoute.js";
// import paymentRouter from "./routes/paymentRoute.js";
// import aiRouter from "./routes/aiRoute.js";
// import reviewRouter from "./routes/reviewRoute.js";
// import doubtRouter from "./routes/doubtRoute.js";
// import ingestRouter from "./routes/ingestRoute.js";

// dotenv.config();

// let port = process.env.PORT || 8000;
// let app = express();

// const allowedOrigins = [
//   "http://localhost:5173",               
//   "http://127.0.0.1:5173",               
//   "https://elitecoursesf.onrender.com",  
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
    
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         console.log("Blocked by CORS:", origin);
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(cookieParser());


// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/course", courseRouter);
// app.use("/api/payment", paymentRouter);
// app.use("/api/ai", aiRouter);
// app.use("/api/review", reviewRouter);
// app.use("/api/doubt", doubtRouter);
// app.use("/api/ingest", ingestRouter);

// app.get("/", (req, res) => {
//   res.send("Hello From Server");
// });

// app.listen(port, () => {
//   console.log("Server Started on port", port);
//   connectDb();
// });













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
import doubtRouter from "./routes/doubtRoute.js";
import ingestRouter from "./routes/ingestRoute.js";

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  // Old Render frontend
  "https://elitecoursesf.onrender.com",

  // New Vercel frontend
  "https://elitecourses.alirazakarimi.in",
  "https://elite-courses-ten.vercel.app",
];

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/ai", aiRouter);
app.use("/api/review", reviewRouter);
app.use("/api/doubt", doubtRouter);
app.use("/api/ingest", ingestRouter);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EliteCourses Backend is running!",
  });
});

// Start Server
const startServer = async () => {
  try {
    await connectDb();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
