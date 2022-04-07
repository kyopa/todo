import { setDoc, doc, onSnapshot, collectionGroup, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "./firebase.config";
import Task from "./Task";


function App() {

  const [projects, setProjects] = useState([])

  Task("default", "first task ikn default", "descripn")
  Task("randomStuff", "first task in randomStuff", "descripn")



  useEffect(() => {
    onSnapshot(collectionGroup(db, "projects"), () => {
      console.log("triggered")
    })
    
  })

  const update = () => {
    updateDoc(doc(db, "projects/default/tasks/first task ikn default"), {
      title: "new title"
    })
  }

  return(
    <div>
      <button onClick={() => update()}>trigger snapshot</button>
    </div>
  )
}

export default App;
