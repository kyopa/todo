// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9wJQk9-vbE6tHHgqJwn_W1wNb9lducL0",
  authDomain: "todo-e95bf.firebaseapp.com",
  projectId: "todo-e95bf",
  storageBucket: "todo-e95bf.appspot.com",
  messagingSenderId: "850143507802",
  appId: "1:850143507802:web:0b0601fae011d072956f63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db