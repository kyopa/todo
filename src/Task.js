import { setDoc, doc, onSnapshot, collection, collectionGroup, updateDoc, getDocs, getDoc, documentId, deleteDoc } from "firebase/firestore"
import { useEffect, useState } from "react";
import db from "./firebase.config";
import Form from "./Form";



const Task = () => {

    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    


    const newProject = (title) => {
        const id = crypto.randomUUID();
        initProject(title, id)


        setProjects(projects => [...projects, {title: title, viewing: true, id}])
    }

    const newTask = (project, title, desc, dueDate) => {
        const id = crypto.randomUUID();

        const task = {
            title: title,
            id: id,
            desc: desc,
            dueDate: dueDate,
            project: project,
            editing: false,
            viewing: false
        }

        setDoc(doc(db, `projects/${project}/tasks/${id}`), 
            task
        )

        setTasks(tasks => [...tasks, task])
    }

    
    useEffect(() => {
        if (document.readyState === "complete") return

        newProject("Default")

        async function getProjects() {
            const projects = await getDocs(collection(db, "projects"))
            
            setProjects(projects.docs.map(project => project.data())) 
        }

        async function getTasks() {
            const projects = await getDocs(collection(db, "projects"))
            projects.docs.map(async project => {
                const tasks = await getDocs(collection(db, `projects/${project.id}/tasks`))
                tasks.docs.map(task => {
                    setTasks(tasks => [...tasks, task.data()])
                })
            })
        }

        getTasks();
        getProjects();
    }, [])

    const update = async (project, id, detail, changeTo) => {
        console.log(project, id, detail, changeTo)
        updateDoc(doc(db, `projects/${project}/tasks/${id}`), {
            [`${detail}`]: changeTo
        })
    }

    // updates tasks state when a task is edited
    updateTasks(tasks, setTasks)

    function Display(props) {

        const task = props.task
        
        return <div className="task" key={crypto.randomUUID()}>
            <h3 key={crypto.randomUUID()} className="task-details">{task.title}</h3>
            <div key={crypto.randomUUID()} className="desc">
                <h4 key={crypto.randomUUID()} className="task-details">description: </h4>
                <h4 key={crypto.randomUUID()} className="task-details">{task.desc}</h4>
            </div >
            <div key={crypto.randomUUID()} className="due-date">
            <h4 key={crypto.randomUUID()} className="task-details">due date:</h4>
            <h4 key={crypto.randomUUID()} className="task-details">{task.dueDate}</h4>
            </div>
            <div className="buttons">
                <button key={crypto.randomUUID()} onClick={(e) => switchIsClicked(setTasks, task, e)} className="task-details">edit</button>
                <Delete task={task} tasks={tasks} setTasks={setTasks}/>
            </div>
        </div>
    }

    function handleChange(target, task) {
        update(task.project, task.id, target.dataset.id, target.value)
    }

    function handleSubmit(task, title, desc, dueDate) {
        update(task.project, task.id, "title", title)
        update(task.project, task.id, "desc", desc)
        update(task.project, task.id, "dueDate", dueDate)
    }

    function Edit(props) {

        const task = props.task

        let title = task.title;
        let desc = task.desc;
        let dueDate = task.dueDate;

        useEffect(() => {
            return () => handleSubmit(task, title, desc, dueDate)
        }, [])

        return (
        <div className="task">
            
            <div className="title" key={crypto.randomUUID()}>
                <h4 key={crypto.randomUUID()} className="task-details">title: </h4>
                <input key={crypto.randomUUID()} id={task.id} data-id="title" defaultValue={title} className="task-details" onChange={(e) => title = e.target.value}></input>
            </div>
            
            <div className="desc" key={crypto.randomUUID()}>
                <h4 key={crypto.randomUUID()} className="task-details">description:</h4>
                <input key={crypto.randomUUID()} id={task.id} data-id="desc" defaultValue={task.desc} className="task-details" onChange={(e) => desc = e.target.value}></input>
            </div>
            <div className="due-date" key={crypto.randomUUID()}>
                <h4 key={crypto.randomUUID()} className="task-details">due date:</h4>
                <input key={crypto.randomUUID()} id={task.id} data-id="due-date" defaultValue={task.dueDate} className="task-details " onChange={(e) => dueDate = e.target.value}></input>
            </div>
            <div className="buttons">
                <button key={crypto.randomUUID()} type="button" onClick={(e) => switchIsClicked(setTasks, task, e)} className="task-details">save</button>
                <Delete />
            </div>

        </div>
        )
    }

    function displayTasks(project) {
        console.log(project)
        console.log(projects)
        setProjects(projects.map(el => {
            return el.id === project.id ? {...el, viewing: !project.viewing} : el
        }))
    }

    function displayTask(task) {
        setTasks(tasks.map(el => {
            return el.id === task.id ? {...el, viewing: !task.viewing} : el
        }))
    }

    return (
        <div key={crypto.randomUUID()}>
            
            {/* form for new tasks and projects */}
            <Form newTask={newTask} newProject={newProject}/>

            <div>
            {projects.map(project => {
                console.log(project)
                return (

                    <div key={crypto.randomUUID()}> 
                    
                        <button onClick={() => displayTasks(project)}>{project.title}</button>
                        {console.log(project.viewing)}
                    
                        { project.viewing ? tasks.map(task => {
                            console.log(task.project)
                            console.log(project.title)
                            if (task.project === project.title) {
                                
                                return (
                                    <div key={crypto.randomUUID()} className="buttons">
                                        <button className="display" onClick={() => displayTask(task)}>{task.title}</button>
                                        { task.viewing ? 
                                        (task.editing ? <Edit task={task}/> : <Display task={task}/>) : null}
                                        
                                        
                                    </div>
                                )
                            }
                        }) : null}
                    </div>
                )
            })}
            </div>
        </div>
    )
}

const Delete = (props) => {

    const task = props.task
    const setTasks = props.setTasks
    

    async function deleteTask() {
        await deleteDoc(doc(db, `projects/${task.project}/tasks/${task.id}`))
    
        console.log(props.tasks)
        const filtered = props.tasks.filter(el => el.id !== task.id)
        setTasks(filtered)
    }


    return (
        <div className="task-details">
        <button onClick={() => deleteTask()}>delete</button>
        </div>
    )
}

function switchIsClicked(setTasks, currentTask, e) {
    setTasks(tasks => tasks.map(task => {
        if (task.id === currentTask.id) {
            return {...task, editing: !task.editing}
        } else return task
    }))
}

function updateTasks(tasks, setTasks) {

    console.log("run updatetasks")
    
    
    getDocs(collection(db, "projects"))
    .then(projects => {
        
        projects.docs.map(project => {
            onSnapshot(collection(db, `projects/${project.id}/tasks`), snap => {

                if (tasks.length !== 0) {
                    snap.docChanges().forEach(change => {
                        if (change.type === "modified") {
                            const taskDetails = change.doc.data()
                            setTasks(tasks.map(task => {
                                if (task.id === taskDetails.id) {
                                    return {...taskDetails}
                                } else return task
                            }))
                        }
                    })
                }
            })
        })
    })
}

function initProject(project, id) {
    

    setDoc(doc(db, `projects/${project}`), {title: project, id})
}

export default Task;