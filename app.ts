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
  
  @AutoBinder
  private submitHandler(event: Event) {
    // console.log(event);
    event.preventDefault();
    console.log('Logging...', this.titleInputElement.value);
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
