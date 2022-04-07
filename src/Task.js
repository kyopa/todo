import { setDoc, doc, onSnapshot } from "firebase/firestore"
import db from "./firebase.config";


const Task = (project, title, desc) => {
    initializeProject(project)

    setDoc(doc(db, `projects/${project}/tasks/${title}`), {
        title: title,
        id: crypto.randomUUID(),
        desc: desc
    })

    onSnapshot(doc(db, `projects/${project}/tasks/${title}`), () => {
        console.log("triggered in Task()")
    })
}


function initializeProject(project) {
    setDoc(doc(db, `projects/${project}`), {})
}

export default Task;