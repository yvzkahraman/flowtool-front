import { action, makeObservable, observable } from 'mobx';
class ApplicationStore {

    projects = []
    selectedProject = {}

    constructor() {
        makeObservable(this, {
            projects: observable,
            selectedProject: observable,

            setSelectedProject: action,
            setProjects: action,
        })
    }

    setProjects(projects) {
        this.projects = projects;
    }

    setSelectedProject(project) {
        this.selectedProject = project;
    }


}


export const store = new ApplicationStore();