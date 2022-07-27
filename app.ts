//Drag and Drop Interface
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}
interface Droppable {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

//Validation
interface Validatable {
  value: string | number; //? = optional
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(input: Validatable) {
  let isValid = true;
  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }
  if (input.min != null && typeof input.value === 'number') {
    isValid = isValid && input.value >= input.min;
  }
  if (input.max != null && typeof input.value === 'number') {
    isValid = isValid && input.value <= input.max;
  }
  if (input.minLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.trim().length >= input.minLength;
  }
  if (input.maxLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.trim().length <= input.maxLength;
  }
  return isValid;
}

type TupleOrVoid = [string, string, number] | void;
// type Status = 'active' | 'finished';
enum ProjectStatus {
  Active,
  Finished,
}

//Autobinding
function AutoBinder(
  target: any,
  methodName: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log(methodName);
  console.log(descriptor);

  const originalMethod = descriptor.value;
  // console.log(originalMethod);

  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // console.log('This', this);
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return newDescriptor;
}

//Project Class
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

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
class ProjectState extends State<Project> {
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
    for (const listenerFunction of this.listeners) {
      listenerFunction(this.projects.slice());
    }
  }
}
const projectState = ProjectState.getInstance();

//Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  //abstact, should never direclty be instanciated. It should only be used for inheritance.
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(
    templateId: string,
    hostElementId: string,
    insertStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertStart);
  }
  private attach(insertStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertStart ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
  abstract configure(): void;
  abstract renderContent(): void;
}

//ProjectItem Class
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    return `${
      this.project.people === 1 ? ' 1 person' : `${this.project.people} persons`
    } `;
  }
  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  @AutoBinder
  dragStartHandler(event: DragEvent): void {
    console.log(event);
    
  }

  dragEndHandler(event: DragEvent): void {
    console.log('Drag End', event);
    
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';

    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

//ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);

    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  configure(): void {
    projectState.addListener((projects: Project[]) => {
      console.log('projects...', projects);
      const relevantProjects = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }
  renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + 'PROJECTS';
  }

  private renderProjects() {
    const listElement = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;
    listElement.innerHTML = '';
    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
    }
  }
}

//ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.configure();
  }

  configure() {
    // this.formElement.addEventListener('submit', this.submitHandler.bind(this));
    this.element.addEventListener('submit', this.submitHandler);
  }
  renderContent(): void {}

  private getUserInput(): TupleOrVoid {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = +this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 10,
    };

    //Could improve the validation, make it more scalable
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again later!');
      return;
    }
    return [
      this.titleInputElement.value,
      this.descriptionInputElement.value,
      +this.peopleInputElement.value,
    ];
  }

  @AutoBinder
  private submitHandler(event: Event) {
    // console.log(event);
    event.preventDefault();

    const userInput = this.getUserInput();

    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
      projectState.addProjects(title, description, people);
      this.clearInput();
    } else {
      console.log('Invalid Input!');
    }
  }

  private clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
