// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlTDAymDZOjRa0dq2fYOD85pdyu2NQ3Hc",
  authDomain: "wanderly-c0d52.firebaseapp.com",
  projectId: "wanderly-c0d52",
  storageBucket: "wanderly-c0d52.firebasestorage.app",
  messagingSenderId: "445198120682",
  appId: "1:445198120682:web:c1aa49f8b852ddf1b3c993",
  measurementId: "G-9W2DWL5F8L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);