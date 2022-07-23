"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//1. Decorators
function Logger(constructor) {
    //Decorator
    console.log('Logging...');
    console.log('constructor', constructor);
}
let Person = class Person {
    constructor() {
        this.name = 'Ronchi';
        console.log('Creating Person Object....');
    }
};
Person = __decorate([
    Logger
], Person);
const person = new Person();
console.log(person);
//2. Decorator Factories
function Logger2(logString) {
    //Decorator
    return function (constructor) {
        console.log(logString);
        console.log('constructor', constructor);
    };
}
let Person2 = class Person2 {
    constructor() {
        this.name = 'Ronchi';
        console.log('Creating Person Object....');
    }
};
Person2 = __decorate([
    Logger2('Logging decorator...')
], Person2);
const person2 = new Person2();
console.log(person2);
//3. Building more useful decorator
// function Logger3(logString: string) {
//   //Decorator
//   return function (constructor: Function) {
//     console.log(logString);
//     console.log('constructor', constructor);
//   };
// }
function WithTemplate(template, hookId) {
    return function (constructor) {
        const element = document.getElementById(hookId);
        if (element) {
            const per = new constructor();
            element.innerHTML = template;
            document.querySelector('h1').textContent = per.name;
        }
    };
}
let Person3 = class Person3 {
    constructor() {
        this.name = 'Ronchi';
        console.log('Creating Person Object....');
    }
};
Person3 = __decorate([
    WithTemplate('<h1>Hello World!</h1>', 'app')
], Person3);
const person3 = new Person2();
console.log(person3);
