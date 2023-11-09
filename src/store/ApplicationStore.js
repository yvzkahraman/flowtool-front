import { action, makeObservable, observable } from 'mobx';
class ApplicationStore {

    nodes = [
        {
            id: '1',
            data: { label: 'Hello', value: 'test' },
            position: { x: 0, y: 0 },
            type: 'input',
        },
        {
            id: '2',
            data: { label: 'World' },
            position: { x: 100, y: 100 },
            type: 'default'
        },
    ];


    edges = [
        { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
    ];

    constructor() {
        makeObservable(this, {
            nodes: observable,
            edges: observable,
            setEdges: action,
            setNodes: action,
        })
    }

    setEdges(edges) {
        this.initialEdges = edges;
    }

    setNodes(nodes) {
        this.nodes = nodes;
    }
}


export const store = new ApplicationStore();