// / <reference path="./interfaces/drag-and-drop.ts"/>
// / <reference path="./models/project.ts"/>
// / <reference path="./state/project.ts"/>
// / <reference path="./utils/validation.ts"/>
// / <reference path="./decorators/autobind.ts"/>
// / <reference path="./components/base-component.ts"/>
// / <reference path="./components/project-input.ts"/>
// / <reference path="./components/project-item.ts"/>
// / <reference path="./components/project-list.ts"/>
// / <reference path="./types/tuple-void.ts"/>
import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');

