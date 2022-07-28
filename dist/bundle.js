"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
var App;
(function (App) {
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
    class ProjectState extends State {
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
            const newProject = new App.Project(`${Math.random()}-${new Date().getMilliseconds()}`, title, description, people, App.ProjectStatus.Active);
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
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
var App;
(function (App) {
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
    App.validate = validate;
})(App || (App = {}));
var App;
(function (App) {
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
    App.AutoBinder = AutoBinder;
})(App || (App = {}));
var App;
(function (App) {
    //Component Base Class
    class Component {
        constructor(templateId, hostElementId, insertStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertStart);
        }
        attach(insertStart) {
            this.hostElement.insertAdjacentElement(insertStart ? 'afterbegin' : 'beforeend', this.element);
        }
    }
    App.Component = Component;
})(App || (App = {}));
/// <reference path="base-component.ts" />
var App;
(function (App) {
    //ProjectInput Class
    class ProjectInput extends App.Component {
        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.titleInputElement = this.element.querySelector('#title');
            this.descriptionInputElement = this.element.querySelector('#description');
            this.peopleInputElement = this.element.querySelector('#people');
            this.configure();
        }
        configure() {
            // this.formElement.addEventListener('submit', this.submitHandler.bind(this));
            this.element.addEventListener('submit', this.submitHandler);
        }
        renderContent() { }
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
            if (!App.validate(titleValidatable) ||
                !App.validate(descriptionValidatable) ||
                !App.validate(peopleValidatable)) {
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
                App.projectState.addProjects(title, description, people);
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
    }
    __decorate([
        App.AutoBinder
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
/// <reference path="base-component.ts" />
var App;
(function (App) {
    //ProjectItem Class
    class ProjectItem extends App.Component {
        constructor(hostId, project) {
            super('single-project', hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            return `${this.project.people === 1
                ? ' 1 person'
                : `${this.project.people} persons`} `;
        }
        dragStartHandler(event) {
            console.log(event);
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(event) {
            console.log('Drag End', event);
        }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent =
                this.persons + ' assigned';
            this.element.querySelector('p').textContent = this.project.description;
        }
    }
    __decorate([
        App.AutoBinder
    ], ProjectItem.prototype, "dragStartHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
/// <reference path="base-component.ts" />
var App;
(function (App) {
    //ProjectList Class
    class ProjectList extends App.Component {
        constructor(type) {
            super('project-list', 'app', false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            var _a;
            if (((_a = event === null || event === void 0 ? void 0 : event.dataTransfer) === null || _a === void 0 ? void 0 : _a.types[0]) === 'text/plain') {
                event.preventDefault();
                const listElement = this.element.querySelector('ul');
                listElement.classList.add('droppable');
            }
        }
        dropHandler(event) {
            const projectId = event.dataTransfer.getData('text/plain');
            App.projectState.moveProject(projectId, this.type === 'active' ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        dragLeaveHandler(event) {
            const listElement = this.element.querySelector('ul');
            listElement.classList.remove('droppable');
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
            App.projectState.addListener((projects) => {
                console.log('projects...', projects);
                const relevantProjects = projects.filter((prj) => {
                    if (this.type === 'active') {
                        return prj.status === App.ProjectStatus.Active;
                    }
                    return prj.status === App.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-project-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent =
                this.type.toUpperCase() + 'PROJECTS';
        }
        renderProjects() {
            const listElement = document.getElementById(`${this.type}-project-list`);
            listElement.innerHTML = '';
            for (const projectItem of this.assignedProjects) {
                new App.ProjectItem(this.element.querySelector('ul').id, projectItem);
            }
        }
    }
    __decorate([
        App.AutoBinder
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.AutoBinder
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.AutoBinder
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
/// <reference path="./interfaces/drag-and-drop.ts"/>
/// <reference path="./models/project.ts"/>
/// <reference path="./state/project.ts"/>
/// <reference path="./utils/validation.ts"/>
/// <reference path="./decorators/autobind.ts"/>
// <reference path="./components/base-component.ts"/>
/// <reference path="./components/project-input.ts"/>
/// <reference path="./components/project-item.ts"/>
/// <reference path="./components/project-list.ts"/>
/// <reference path="./types/tuple-void.ts"/>
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList('active');
    new App.ProjectList('finished');
})(App || (App = {}));
//# sourceMappingURL=bundle.js.map