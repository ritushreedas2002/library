// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGTAEqfNsjXruVsecuoLf1v5MZRmE_TK8",
  authDomain: "library-a1fa9.firebaseapp.com",
  projectId: "library-a1fa9",
  storageBucket: "library-a1fa9.appspot.com",
  messagingSenderId: "603968663542",
  appId: "1:603968663542:web:e96502bd07cbd29732a1d7",
  measurementId: "G-3RX5D9C4XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();