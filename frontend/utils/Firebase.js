import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  // authDomain: "loginlms-a7ea1.firebaseapp.com",
  // projectId: "loginlms-a7ea1",
  // storageBucket: "loginlms-a7ea1.firebasestorage.app",
  // messagingSenderId: "665916718747",
  // appId: "1:665916718747:web:16dbe0bfe5aeeface0903e",

  authDomain: "loginvirtualcourses-7e1b0.firebaseapp.com",
  projectId: "loginvirtualcourses-7e1b0",
  storageBucket: "loginvirtualcourses-7e1b0.firebasestorage.app",
  messagingSenderId: "192362481982",
  appId: "1:192362481982:web:23cd9c58c11ead88c7446f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBjRbpFKcMQlaSMF-yORyi3wL9XPq8CI7k",
//   authDomain: "loginvirtualcourses-7e1b0.firebaseapp.com",
//   projectId: "loginvirtualcourses-7e1b0",
//   storageBucket: "loginvirtualcourses-7e1b0.firebasestorage.app",
//   messagingSenderId: "192362481982",
//   appId: "1:192362481982:web:23cd9c58c11ead88c7446f"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
