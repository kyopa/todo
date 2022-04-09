// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrHqTPRky74aTzxFYtd4UI8FeDQpkKFeU",
  authDomain: "fuckyou-b4fbc.firebaseapp.com",
  projectId: "fuckyou-b4fbc",
  storageBucket: "fuckyou-b4fbc.appspot.com",
  messagingSenderId: "1061479407308",
  appId: "1:1061479407308:web:158f22fa7ea7667e926c69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db

