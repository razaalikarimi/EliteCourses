<div align="center">

# ⚡ EliteCourses

### An AI-Powered Learning Management System built with the MERN Stack

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)

<br/>

> **EliteCourses** is a production-ready LMS platform where students can discover, purchase, and learn from courses — while educators can create, manage, and monetize their content. Powered by Gemini AI for smart search, Razorpay for seamless payments, and Firebase for Google OAuth.

<br/>

**[🌐 Live Demo](https://elitecoursesf.onrender.com)** · **[🐛 Report Bug](https://github.com/razaalikarimi/EliteCourses/issues)** · **[💡 Request Feature](https://github.com/razaalikarimi/EliteCourses/issues)**

</div>

---

## 📸 Screenshots

> The platform is fully responsive and supports both student and educator workflows.

| Landing Page | Student Dashboard |
|:---:|:---:|
| ![Home](https://elitecoursesf.onrender.com/og-home.png) | ![Dashboard](https://elitecoursesf.onrender.com/og-dash.png) |

| Course View | AI Search |
|:---:|:---:|
| ![Course](https://elitecoursesf.onrender.com/og-course.png) | ![AI](https://elitecoursesf.onrender.com/og-ai.png) |

> 📹 **Demo Video** — watch the full walkthrough:
>
> [![Demo Video](https://img.shields.io/badge/▶_Watch_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://elitecoursesf.onrender.com)

---

## 🗺️ System Architecture

The platform follows a standard **client-server architecture** with a REST API backend, a React SPA frontend, and third-party service integrations.

![Architecture Diagram](https://raw.githubusercontent.com/razaalikarimi/EliteCourses/main/docs/architecture.png)

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Vite + React)                   │
│  Redux Toolkit  │  React Router v7  │  TailwindCSS v4  │  Axios  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP / REST
┌────────────────────────────▼────────────────────────────────────┐
│                    BACKEND (Node.js + Express v5)                │
│                                                                  │
│  /api/auth    /api/course    /api/payment                        │
│  /api/user    /api/ai        /api/review                         │
│                                                                  │
│  Middlewares: JWT Auth  │  Multer (file upload)  │  CORS         │
└───┬────────────┬──────────────┬──────────────┬───────────────────┘
    │            │              │              │
    ▼            ▼              ▼              ▼
 MongoDB     Cloudinary     Razorpay       Gemini AI
 (Data)    (Media Storage)  (Payments)   (Smart Search)
```

---

## 🧭 User Flow

```
                         ┌──────────────┐
                         │  Visit Site  │
                         └──────┬───────┘
                                │
               ┌────────────────┴──────────────────┐
               ▼                                   ▼
        [ Student ]                          [ Educator ]
               │                                   │
   ┌───────────▼──────────┐          ┌─────────────▼──────────┐
   │  Sign Up / Google    │          │  Sign Up → Role Select  │
   │  Login via Firebase  │          │  (educator)             │
   └───────────┬──────────┘          └─────────────┬──────────┘
               │                                   │
   ┌───────────▼──────────┐          ┌─────────────▼──────────┐
   │  Browse / AI Search  │          │  Create Course          │
   │  All Courses         │          │  Upload Thumbnail       │
   └───────────┬──────────┘          └─────────────┬──────────┘
               │                                   │
   ┌───────────▼──────────┐          ┌─────────────▼──────────┐
   │  View Course Details │          │  Add Lectures           │
   │  Read Reviews        │          │  Upload Videos          │
   └───────────┬──────────┘          └─────────────┬──────────┘
               │                                   │
   ┌───────────▼──────────┐          ┌─────────────▼──────────┐
   │  Purchase via        │          │  Publish Course         │
   │  Razorpay            │          │  View Analytics         │
   └───────────┬──────────┘          └────────────────────────┘
               │
   ┌───────────▼──────────┐
   │  Watch Lectures      │
   │  Track Progress      │
   └───────────┬──────────┘
               │
   ┌───────────▼──────────┐
   │  Submit Review       │
   │  Rate the Course     │
   └──────────────────────┘
```

---

## ✨ Features

### 🎓 For Students
- **Smart Course Discovery** — Browse by category, level, or price
- **🤖 AI-Powered Search** — Describe what you want to learn in plain English; Gemini 2.5 Flash maps it to the right course category
- **🤖 AI Tutor & Doubt Solver** — Ask questions 24/7. Powered by Gemini, retrieving study context from course lectures and ingested videos/documents
- **Custom AI Keys** — Set up a personal Gemini API key in your Profile settings to bypass platform rate limits and query constraints
- **Google OAuth** — One-click sign up with Google via Firebase
- **Secure Payments** — Buy courses with Razorpay (UPI, cards, net banking)
- **Video Learning** — Smooth in-browser video player for lectures
- **Progress Tracking** — Know exactly where you left off
- **Reviews & Ratings** — Leave feedback and star ratings for courses

### 🧑‍🏫 For Educators
- **Course Builder** — Create multi-lecture courses with thumbnails
- **Video Upload** — Upload lecture videos directly (stored on Cloudinary)
- **Knowledge Ingestion (RAG)** — Ingest YouTube videos, notes, and documents to populate the AI Tutor's knowledge base
- **Publish Control** — Draft → Ready → Published workflow
- **Instructor Dashboard** — Clean dashboard listing course price, earnings, student counts, and lecture metrics (No heavy charts)
- **Edit Anytime** — Update course details, edit or delete lectures

### 🔐 Authentication & Security
- **JWT-based sessions** with HttpOnly cookies
- **Google OAuth 2.0** via Firebase
- **Forgot Password** — OTP sent via Gmail, 5-minute expiry
- **Role-based access control** — `student` vs `educator` routes

---

## 🗄️ Database Schema

The application uses **MongoDB** with **Mongoose** ODM. Here's the core schema structure:

```
┌──────────────────────────────────────────────────────────┐
│                         User                              │
│  _id │ name │ email │ password │ role │ photoUrl          │
│  enrolledCourses[] → Course                               │
│  resetOtp │ otpExpires │ isOtpVerified                    │
└─────────────────────┬────────────────────────────────────┘
                      │ creator (1:N)
┌─────────────────────▼────────────────────────────────────┐
│                        Course                             │
│  _id │ title │ subTitle │ description │ category │ level  │
│  price │ thumbnail │ isPublished                          │
│  enrolledStudents[] → User                                │
│  lectures[] → Lecture                                     │
│  reviews[] → Review                                       │
└──────────┬──────────────────────────┬────────────────────┘
           │ (1:N)                    │ (1:N)
┌──────────▼──────────┐   ┌──────────▼──────────────────┐
│       Lecture        │   │           Review             │
│  title │ description │   │  userId → User               │
│  videoUrl │ duration │   │  courseId → Course           │
│  isPublished         │   │  rating │ comment            │
└──────────────────────┘   └─────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                         Order                             │
│  userId → User │ courseId → Course                        │
│  amount │ status │ razorpayOrderId │ razorpayPaymentId    │
└──────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19 + Vite 6 | SPA framework |
| Styling | TailwindCSS v4 | Utility-first styling |
| State | Redux Toolkit | Global state management |
| Animations | Framer Motion | Smooth UI transitions |
| Charts | Recharts | Educator analytics |
| Backend | Node.js + Express v5 | REST API server |
| Database | MongoDB + Mongoose | Data persistence |
| Auth | JWT + Firebase | Session & OAuth |
| File Storage | Cloudinary | Images & videos |
| Payments | Razorpay | Course purchases |
| AI | Google Gemini 2.5 Flash | Smart course search |
| Email | Nodemailer + Gmail | OTP delivery |
| Dev | Nodemon | Hot reload |

---

## 📁 Project Structure

```
EliteCourses/
├── backend/
│   ├── configs/
│   │   ├── db.js            # MongoDB connection
│   │   ├── cloudinary.js    # Cloudinary upload helper
│   │   ├── Mail.js          # Nodemailer transport
│   │   └── token.js         # JWT generator
│   ├── controllers/
│   │   ├── authController.js      # signup, login, OTP, Google
│   │   ├── courseController.js    # CRUD for courses & lectures
│   │   ├── orderController.js     # Razorpay order creation
│   │   ├── reviewController.js    # Course reviews
│   │   ├── userController.js      # Profile management
│   │   └── aiController.js        # Gemini AI search
│   ├── middlewares/
│   │   ├── isAuth.js        # JWT verification middleware
│   │   └── multer.js        # File upload middleware
│   ├── models/
│   │   ├── userModel.js
│   │   ├── courseModel.js
│   │   ├── lectureModel.js
│   │   ├── orderModel.js
│   │   └── reviewModel.js
│   ├── routes/
│   │   ├── authRoute.js
│   │   ├── courseRoute.js
│   │   ├── paymentRoute.js
│   │   ├── reviewRoute.js
│   │   ├── userRoute.js
│   │   └── aiRoute.js
│   └── index.js             # App entry point
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx              # Landing page
    │   │   ├── Login.jsx             # Auth
    │   │   ├── SignUp.jsx            # Auth
    │   │   ├── ForgotPassword.jsx    # OTP flow
    │   │   ├── NewDashboard.jsx      # Student home
    │   │   ├── AllCouses.jsx         # Course listing
    │   │   ├── ViewCourse.jsx        # Course details + payment
    │   │   ├── EnrolledCourse.jsx    # My courses
    │   │   ├── ViewLecture.jsx       # Video player
    │   │   ├── SearchWithAi.jsx      # Gemini AI search
    │   │   ├── Profile.jsx
    │   │   ├── EditProfile.jsx
    │   │   └── admin/
    │   │       ├── Dashboard.jsx     # Educator analytics
    │   │       ├── Courses.jsx       # Manage courses
    │   │       ├── CreateCourse.jsx
    │   │       ├── AddCourses.jsx    # Edit course details
    │   │       ├── CreateLecture.jsx
    │   │       └── EditLecture.jsx
    │   ├── components/
    │   │   ├── Nav.jsx, Footer.jsx
    │   │   ├── Card.jsx
    │   │   └── AppShell.jsx          # Layout wrapper
    │   ├── redux/                    # Redux slices & store
    │   ├── customHooks/              # Data fetching hooks
    │   └── App.jsx                   # Routes
    └── utils/
        └── Firebase.js               # Firebase config
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- **Node.js** v18 or higher
- **npm** v9+
- A **MongoDB** database (MongoDB Atlas recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/razaalikarimi/EliteCourses.git
cd EliteCourses
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=8000
MONGODB_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net/elitecourses

JWT_SECRET=your_super_secret_jwt_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password

RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_SECRET=your_razorpay_secret

GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_FIREBASE_APIKEY=your_firebase_web_api_key
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

### 4. Run the App

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Server starts on http://localhost:8000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# App opens at http://localhost:5173
```

---

## 🔌 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/signup` | Register new user | ❌ |
| POST | `/login` | Login with email/password | ❌ |
| POST | `/googlesignup` | Login with Google token | ❌ |
| GET | `/logout` | Logout & clear cookie | ✅ |
| POST | `/sendotp` | Send OTP to email | ❌ |
| POST | `/verifyotp` | Verify OTP | ❌ |
| POST | `/resetpassword` | Set new password | ❌ |

### Course Routes — `/api/course`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/getpublishedcoures` | Get all published courses | ❌ |
| POST | `/create` | Create a new course | ✅ Educator |
| POST | `/editcourse/:courseId` | Update course details + thumbnail | ✅ Educator |
| DELETE | `/removecourse/:courseId` | Delete a course | ✅ Educator |
| POST | `/createlecture/:courseId` | Add lecture to course | ✅ Educator |
| POST | `/editlecture/:lectureId` | Update lecture + video | ✅ Educator |
| DELETE | `/removelecture/:lectureId` | Delete a lecture | ✅ Educator |
| GET | `/getcourse/:courseId` | Get course by ID | ✅ |

### Payment Routes — `/api/payment`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/createorder` | Create Razorpay order | ✅ |
| POST | `/verify` | Verify payment signature | ✅ |

### AI Search — `/api/ai`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/search` | Gemini-powered course search | ❌ |

---

## 🧠 How the AI Search Works

The AI search uses **Google Gemini 2.5 Flash** to understand natural language queries and map them to course categories.

```
User types: "I want to learn machine learning for beginners"
                          │
                          ▼
             Gemini 2.5 Flash processes intent
                          │
                          ▼
              Returns keyword: "AI/ML" or "Beginner"
                          │
                          ▼
         MongoDB query on title, category, level, description
                          │
                          ▼
                 Relevant courses returned
```

If a direct text match is found first, it's returned immediately. The AI fallback kicks in when the raw search yields no results.

---

## 🔐 Environment Variables Reference

### Backend

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 8000) |
| `MONGODB_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `EMAIL` | Gmail address for OTP emails |
| `EMAIL_PASS` | Gmail App Password (not your login password) |
| `RAZORPAY_KEY_ID` | Razorpay API key ID |
| `RAZORPAY_SECRET` | Razorpay API secret |
| `GOOGLE_GENAI_API_KEY` | Google AI Studio API key |

### Frontend

| Variable | Description |
|---|---|
| `VITE_FIREBASE_APIKEY` | Firebase project web API key |
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key ID (same as backend) |

---

## 🚢 Deployment

The project is currently deployed on **Render**:

| Service | URL |
|---|---|
| Frontend | https://elitecoursesf.onrender.com |
| Backend | https://elitecoursesb.onrender.com |

**Tips for deployment:**
- Set all environment variables in Render's dashboard (not in `.env` files)
- Enable **Auto-Deploy** from GitHub on the main branch
- For the backend, set the **Start Command** to `node index.js`
- For the frontend, set **Build Command** to `npm run build` and **Publish Directory** to `dist`

---

## 🤝 Contributing

Contributions are what make open source great. Any contributions you make are **genuinely appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Raza Ali Karimi**

[![GitHub](https://img.shields.io/badge/GitHub-razaalikarimi-181717?style=for-the-badge&logo=github)](https://github.com/razaalikarimi)

---

<div align="center">

Made with ❤️ and a lot of ☕

⭐ **Star this repo if you found it useful!** ⭐

</div>
