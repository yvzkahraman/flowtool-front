import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { store } from "./store/ApplicationStore";
import { useState } from "react";


const CreateProject = observer(() => {

    const navigate = useNavigate();
    const [projectName, setProjectName] = useState("");

    return (<>

        <div className="w-75 mx-auto shadow p-4">
            <div className="mb-3">
                <label for="name">Project Name :</label>
                <input id="name" type='text' value={projectName} onChange={(e) => {
                    setProjectName(e.target.value);
                }} className="form-control" />
            </div>
            <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={() => {
                    axios.post("https://localhost:7170/api/FlowTools", {
                        Name: projectName
                    }).then(response => {
                        store.setProjects([...store.projects
                            , response.data])
                        navigate('/')
                    })
                }}>Add New Project</button>
            </div>
        </div>

    </>)
})

export default CreateProject;