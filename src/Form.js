import { useState, useEffect } from "react";



const Form = (props) => {

    const newTask = props.newTask;
    const newProject = props.newProject;

    const [isClicked, setIsClicked] = useState(false)
    const [isClicked2, setIsClicked2] = useState(false)
    
    return(
        <div className="new">
            <button onClick={() => setIsClicked(!isClicked)}>new task</button>
            {isClicked ? <TaskForm setIsClicked={setIsClicked} newTask={newTask}/> : null}
            {isClicked2 ? <ProjectForm setIsClicked2={setIsClicked2} newProject={newProject}/> : null}
            <button onClick={() => setIsClicked2(!isClicked2)}>new project</button>
        </div>
    )
}

const ProjectForm = (props) => {

    let title;
    useEffect(() => {
        return () => props.newProject(title)
    })

    return (
        <div>
            <label>Title</label>
            <input onChange={(e) => title = e.target.value}></input>
            <button onClick={() => props.setIsClicked2(isClicked2 => !isClicked2)}>confirm</button>
        </div>
    )
}

const TaskForm = (props) => {

    let project = "Default";
    let title;
    let desc;
    let dueDate;

    useEffect(() => {
        return () => props.newTask(project, title, desc, dueDate)
    }, [])

    return (
        <div className="task-form">

            <label>In Which Project?</label>
            <input defaultValue={project} onChange={(e) => project = e.target.value}></input>
            <label>Title</label>
            <input onChange={(e) => title = e.target.value}></input>
            <label>Description</label>
            <input onChange={(e) => desc = e.target.value}></input>
            <label>Due date</label>
            <input onChange={(e) => dueDate = e.target.value}></input>

            <button onClick={() => props.setIsClicked(isClicked => !isClicked)}>Confirm</button>
            
        </div>
    )
}

export default Form;