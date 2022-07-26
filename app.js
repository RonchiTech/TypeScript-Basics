"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    submitHandler(event) {
        // console.log(event);
        event.preventDefault();
        console.log('Logging...', this.titleInputElement.value);
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
