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
//ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
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
