
import { useCallback, useState } from 'react';
import { random } from 'lodash';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
import { observer } from 'mobx-react-lite';
import { store } from '../store/ApplicationStore';

import axios from 'axios';
import 'reactflow/dist/style.css';
import { CustomNode } from './Node';

/* 
 { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, type: 'input' },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },

    { id: 'e1-2', source: '1', target: '2' }

    
*/

const Flow = observer(() => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [multiTextEnabled, setMultiTextEnabled] = useState(false);
    const [multiTextValue, setMultiTextValue] = useState(0);

    const [greaterThanTextEnabled, setGreaterThanTextEnabled] = useState(false);
    const [greaterThenTextValue, setGreaterThanTextValue] = useState(0);

    const [id, setId] = useState(store.selectedProject.id);

    const [refreshFlag, setRefreshFlag] = useState(false);

    useState(() => {
        axios.get(`https://localhost:7170/api/FlowTools/${store.selectedProject.id}`).then(response => {
            console.log("gelen data", response.data)
            if (response.data.nodes != null | undefined && response.data.edges != null | undefined) {
                setNodes(response.data.nodes);
                setEdges(response.data.edges);
            }
        })
    }, [])




    const onConnect = useCallback((params) => {
        console.log("params ", params)

        let sourceNode = nodes.find(x => x.id == params.source);
        let targetNode = nodes.find(x => x.id == params.target);

        console.log("nodes", nodes)
        console.log("source node ", sourceNode);
        console.log("target node", targetNode);

        if (sourceNode.data.customType === "randomInteger" && targetNode.data.customType === "multiplier") {
            targetNode.data.outputValue = Number(targetNode.data.carpan) * Number(sourceNode.data.outputValue);
            targetNode.data.label = targetNode.data.outputValue
            setNodes(nodes);
            setRefreshFlag(state => !state)
        }

        else if (sourceNode.data.customType === "multiplier" && targetNode.data.customType === "randomInteger") {
            sourceNode.data.outputValue = Number(sourceNode.data.carpan) * Number(targetNode.data.outputValue);
            sourceNode.data.label = sourceNode.data.outputValue
            setNodes(nodes);
            setRefreshFlag(state => !state)
        }


        else if (sourceNode.data.customType === "multiplier" && targetNode.data.customType === "multiplier") {

            if (sourceNode.data.outputValue !== 0) {
                console.log("birinci")
                targetNode.data.outputValue = Number(targetNode.data.carpan) * Number(sourceNode.data.outputValue);
                targetNode.data.label = targetNode.data.outputValue
                setNodes(nodes);
                setRefreshFlag(state => !state)
            }
            else if (targetNode.data.outputValue !== 0) {
                console.log("ikinci")
                sourceNode.data.outputValue = Number(sourceNode.data.carpan) * Number(targetNode.data.outputValue);
                targetNode.data.label = sourceNode.data.outputValue
                setNodes(nodes);
                setRefreshFlag(state => !state)
            }


        }

        else if (sourceNode.data.customType == "greaterThan" && targetNode.data.customType == "randomInteger") {
            sourceNode.data.outputValue = (Number(sourceNode.data.carpan) > Number(targetNode.data.outputValue)) == true ? 'true' : 'false';
            sourceNode.data.label = sourceNode.data.outputValue
            setNodes(nodes);
            setRefreshFlag(state => !state)
        }

        else if (sourceNode.data.customType == "randomInteger" && targetNode.data.customType == "greaterThan") {

            targetNode.data.outputValue = (Number(targetNode.data.carpan) > Number(sourceNode.data.outputValue)) == true ? 'true' : 'false';
            targetNode.data.label = targetNode.data.outputValue
            setNodes(nodes);
            setRefreshFlag(state => !state)

        }

        else if (sourceNode.data.customType == "multiplier" && targetNode.data.customType == "greaterThan") {

            targetNode.data.outputValue = (Number(targetNode.data.carpan) > Number(sourceNode.data.outputValue)) == true ? 'true' : 'false';
            targetNode.data.label =
                targetNode.data.outputValue
            setNodes(nodes);
            setRefreshFlag(state => !state)

        }

        else if (sourceNode.data.customType == "greaterThan" && targetNode.data.customType == "multiplier") {

            sourceNode.data.outputValue = (Number(sourceNode.data.carpan) > Number(targetNode.data.outputValue)) == true ? 'true' : 'false';
            sourceNode.data.label = sourceNode.data.outputValue
            setNodes(nodes);
            setRefreshFlag(state => !state)
        }



        setEdges((eds) => addEdge(params, eds))
    }, [setEdges, refreshFlag]);


    const createRandomInteger = () => {
        setRefreshFlag(prevState => !prevState)
        let count = nodes.length;
        let randomNumber = random(1, 10);

        setNodes(prevState => ([...prevState, {
            id: (count + 1) + "", position: { x: 150, y: 150 }, data: { label: randomNumber + '', outputValue: randomNumber, customType: 'randomInteger' }, type: 'output'
        }]))

        onNodesChange(nodes);
    }

    const createMultiplier = () => {
        setRefreshFlag(prevState => !prevState)
        let count = nodes.length;
        let number = multiTextValue;

        setNodes(prevState => ([...prevState, {
            id: (count + 1) + "", position: { x: 150, y: 150 }, data: {
                label: number
                , outputValue: 0,
                carpan: number,
                customType: 'multiplier'
            }, type: 'default'
        }]))

        onNodesChange(nodes);
    }
    const createGreaterThan = () => {
        setRefreshFlag(prevState => !prevState)
        let count = nodes.length;
        let number = greaterThenTextValue;

        setNodes(prevState => ([...prevState, {
            id: (count + 1) + "", position: { x: 150, y: 150 }, data: {
                label: number
                , outputValue: 0,
                carpan: number,
                customType: 'greaterThan'
            }, type: 'default'
        }]))

        onNodesChange(nodes);
    }

    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <p className='text-center lead'>
                        {store.selectedProject.name} - Project
                    </p>
                </div>
                <div className='col-3'>
                    <button className='btn btn-primary w-100 mb-2' onClick={() => {
                        createRandomInteger();
                    }}>Create Random Integer</button>



                    <button className='btn btn-warning w-100 mb-2' onClick={() => {
                        setMultiTextEnabled(true);

                    }}>Create Multiplier component</button>
                    {
                        multiTextEnabled &&
                        <>
                            <input type='number' value={multiTextValue} className='form-control form-control-sm w-100 mb-1' onChange={(e) => {
                                setMultiTextValue(e.target.value);
                            }} ></input>


                            <button className='btn btn-sm btn-warning float-end mb-3' onClick={() => {

                                createMultiplier();
                                setMultiTextEnabled(false);

                            }}>Save</button>

                            <button className='btn btn-sm btn-secondary float-end mb-3 me-1' onClick={() => {

                                // createMultiplier();
                                setMultiTextEnabled(false);

                            }}>Cancel</button>
                        </>
                    }

                    <button className='btn btn-warning w-100 mb-2' onClick={() => {
                        setGreaterThanTextEnabled(true);

                    }}>Create Greater Than Component</button>
                    {
                        greaterThanTextEnabled &&
                        <>
                            <input type='number' value={greaterThenTextValue} className='form-control form-control-sm w-100 mb-1' onChange={(e) => {
                                setGreaterThanTextValue(e.target.value);
                            }} ></input>

                            <button className='btn btn-sm btn-warning float-end mb-3' onClick={() => {

                                createGreaterThan();

                                setGreaterThanTextEnabled(false);

                            }}>Save</button>
                            <button className='btn btn-sm btn-secondary float-end mb-3 me-1' onClick={() => {


                                setGreaterThanTextEnabled(false);

                            }}>Cancel</button>
                        </>
                    }


                    <button className='btn btn-outline-danger w-100' onClick={() => {
                        console.log("nodes", nodes);
                        console.log("edges", edges);
                        console.log("id", id);



                        axios.put('https://localhost:7170/api/FlowTools', {
                            Id: id,
                            Nodes: nodes,
                            Edges: edges,
                        }).then(response => {

                        })

                    }} >Save Project</button>
                </div>
                <div className='col-9'>

                    {refreshFlag !== undefined && edges !== undefined && <div className='' style={{ height: '90vh' }}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                        >
                            <MiniMap />
                            <Controls />
                            <Background />
                        </ReactFlow>
                    </div>}

                </div>
            </div>

        </>



    );
})

export default Flow;