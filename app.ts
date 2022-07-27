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

type Listener = (items: Project[]) => void;
//ProjectState Class
class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listerFunction: Listener) {
    console.log('listerFunction', listerFunction);
    console.log('this.listeners', this.listeners);

    this.listeners.push(listerFunction);
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

//ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

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
    this.attach();
    this.renderContent();
  }
  private renderProjects() {
    const listElement = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;
      listElement.innerHTML = ''
    for (const projectItem of this.assignedProjects) {
      const listItemElement = document.createElement('li');
      listItemElement.textContent = projectItem.title;
      listElement.appendChild(listItemElement);
    }
  }
  private renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + 'PROJECTS';
  }
  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

//ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;

    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.formElement = importedNode.firstElementChild as HTMLFormElement;

    this.formElement.id = 'user-input';

    this.titleInputElement = this.formElement.querySelector(
      '#title'
    ) as HTMLInputElement;

    this.descriptionInputElement = this.formElement.querySelector(
      '#description'
    ) as HTMLInputElement;

    this.peopleInputElement = this.formElement.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();

    this.attach();
  }

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

  private configure() {
    // this.formElement.addEventListener('submit', this.submitHandler.bind(this));
    this.formElement.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
