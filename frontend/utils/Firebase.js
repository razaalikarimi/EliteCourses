import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,

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


