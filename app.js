"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(input) {
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
//Autobinding
function AutoBinder(target, methodName, descriptor) {
    console.log(target);
    console.log(methodName);
    console.log(descriptor);
    const originalMethod = descriptor.value;
    // console.log(originalMethod);
    const newDescriptor = {
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
//ProjectState Class
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listerFunction) {
        console.log('listerFunction', listerFunction);
        console.log('this.listeners', this.listeners);
        this.listeners.push(listerFunction);
    }
    addProjects(title, description, people) {
        const newProject = {
            id: `${Math.random()}-${new Date().getMilliseconds()}`,
            title: title,
            description: description,
            people: people,
        };
        this.projects.push(newProject);
        for (const listenerFunction of this.listeners) {
            listenerFunction(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
//ProjectList Class
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        this.assignedProjects = [];
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            console.log('projects...', projects);
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listElement = document.getElementById(`${this.type}-project-list`);
        for (const projectItem of this.assignedProjects) {
            const listItemElement = document.createElement('li');
            listItemElement.textContent = projectItem.title;
            listElement.appendChild(listItemElement);
        }
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + 'PROJECTS';
    }
    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
//ProjectInput Class
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.formElement.id = 'user-input';
        this.titleInputElement = this.formElement.querySelector('#title');
        this.descriptionInputElement = this.formElement.querySelector('#description');
        this.peopleInputElement = this.formElement.querySelector('#people');
        this.configure();
        this.attach();
    }
    getUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = +this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 10,
        };
        //Could improve the validation, make it more scalable
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert('Invalid input, please try again later!');
            return;
        }
        return [
            this.titleInputElement.value,
            this.descriptionInputElement.value,
            +this.peopleInputElement.value,
        ];
    }
    submitHandler(event) {
        // console.log(event);
        event.preventDefault();
        const userInput = this.getUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
            projectState.addProjects(title, description, people);
            this.clearInput();
        }
        else {
            console.log('Invalid Input!');
        }
    }
    clearInput() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    configure() {
        // this.formElement.addEventListener('submit', this.submitHandler.bind(this));
        this.formElement.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
    }
}
__decorate([
    AutoBinder
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
