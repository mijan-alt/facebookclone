
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfuRbJ8Rt4__1ZD-R5dHlXcG4xU9-GWug",
  authDomain: "face-394615.firebaseapp.com",
  projectId: "face-394615",
  storageBucket: "face-394615.appspot.com",
  messagingSenderId: "925680761519",
  appId: "1:925680761519:web:932b289f94c45a5ca1725a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db= getFirestore(app)





