namespace App {
  type Listener<T> = (items: T[]) => void;
  //ProjectState Class
  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listerFunction: Listener<T>) {
      console.log('listerFunction', listerFunction);
      console.log('this.listeners', this.listeners);

      this.listeners.push(listerFunction);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProjects(title: string, description: string, people: number) {
      const newProject = new Project(
        `${Math.random()}-${new Date().getMilliseconds()}`,
        title,
        description,
        people,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListeners();
    }
    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((project) => {
        return project.id === projectId;
      });
      if (project && project.status !== newStatus) {
        project.status = newStatus;
      }
      this.updateListeners();
    }
    private updateListeners() {
      for (const listenerFunction of this.listeners) {
        listenerFunction(this.projects.slice());
      }
    }
  }
  export const projectState = ProjectState.getInstance();
}
