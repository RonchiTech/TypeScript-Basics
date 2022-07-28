import { Project, ProjectStatus } from '../models/project.js';
//ProjectState Class
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listerFunction) {
        console.log('listerFunction', listerFunction);
        console.log('this.listeners', this.listeners);
        this.listeners.push(listerFunction);
    }
}
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProjects(title, description, people) {
        const newProject = new Project(`${Math.random()}-${new Date().getMilliseconds()}`, title, description, people, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((project) => {
            return project.id === projectId;
        });
        if (project && project.status !== newStatus) {
            project.status = newStatus;
        }
        this.updateListeners();
    }
    updateListeners() {
        for (const listenerFunction of this.listeners) {
            listenerFunction(this.projects.slice());
        }
    }
}
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project.js.map