import React, { useEffect, useState } from "react";
import axios from 'axios'
import { createBrowserRouter, RouterProvider, Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { store } from "./store/ApplicationStore";

const ProjectList = observer(() => {

    const navigate = useNavigate();
    useEffect(() => {
        axios.get("https://localhost:7170/api/FlowTools").then(response => {
            console.log("Response data :", response.data);
            // setList(response.data);
            store.setProjects(response.data);
        })
    }, [])

    return (<>
        <div className="container-fluid">
            <Link className="" to={'/projects/create'}>Create New Project</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>

                    {store.projects &&
                        store.projects.map(item => {
                            return <tr key={item.id}>

                                <td>{item.name}</td>
                                <td>
                                    <button className="btn btn-link" onClick={() => {
                                        store.setSelectedProject(item);
                                        navigate("/projects/flow");
                                    }}>Go Flow</button>

                                </td>

                            </tr>
                        })

                    }
                </tbody>
            </table>



        </div>

    </>)
});

export default ProjectList;