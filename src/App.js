import { setDoc, doc, onSnapshot, collectionGroup, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "./firebase.config";
import Task from "./Task";
import "./styles.css";


function App() {

  


  return(
    <div className="main">

      <div className="header">
        <h1>TODO LIST APP</h1>
        </div>
      
      <Task />
    </div>
  )
}

export default App;
