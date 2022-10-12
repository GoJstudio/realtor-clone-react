// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRuVlPbQp3zW6h5hbe9Cl9psJgRrGgzUM",
  authDomain: "realtor-clone-react-ca1d7.firebaseapp.com",
  projectId: "realtor-clone-react-ca1d7",
  storageBucket: "realtor-clone-react-ca1d7.appspot.com",
  messagingSenderId: "1023250937423",
  appId: "1:1023250937423:web:e5de839674871c8bb09c3a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();