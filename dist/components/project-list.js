var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// / <reference path="base-component.ts" />
import { Component } from './base-component.js';
import { ProjectItem } from './project-item.js';
import { AutoBinder } from '../decorators/autobind.js';
import { projectState } from '../state/project.js';
import { ProjectStatus } from '../models/project.js';
//ProjectList Class
export class ProjectList extends Component {
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
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(event) {
        const listElement = this.element.querySelector('ul');
        listElement.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects) => {
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
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + 'PROJECTS';
    }
    renderProjects() {
        const listElement = document.getElementById(`${this.type}-project-list`);
        listElement.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul').id, projectItem);
        }
    }
}
__decorate([
    AutoBinder
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    AutoBinder
], ProjectList.prototype, "dropHandler", null);
__decorate([
    AutoBinder
], ProjectList.prototype, "dragLeaveHandler", null);
//# sourceMappingURL=project-list.js.map