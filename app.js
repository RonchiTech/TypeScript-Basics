"use strict";
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
        console.log(event);
        event.preventDefault();
        console.log('Logging...', this.titleInputElement.value);
    }
    configure() {
        this.formElement.addEventListener('submit', this.submitHandler.bind(this));
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
    }
}
const projectInput = new ProjectInput();
