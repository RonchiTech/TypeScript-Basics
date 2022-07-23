"use strict";
// //1. Decorators
// function Logger(constructor: Function) {
//   //Decorator
//   console.log('Logging...');
//   console.log('constructor', constructor);
// }
// @Logger
// class Person {
//   name = 'Ronchi';
//   constructor() {
//     console.log('Creating Person Object....');
//   }
// }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// const person = new Person();
// console.log(person);
// //2. Decorator Factories
// function Logger2(logString: string) {
//   //Decorator
//   return function (constructor: Function) {
//     console.log(logString);
//     console.log('constructor', constructor);
//   };
// }
// @Logger2('Logging decorator...')
// class Person2 {
//   name = 'Ronchi';
//   constructor() {
//     console.log('Creating Person Object....');
//   }
// }
// const person2 = new Person2();
// // console.log(person2);
//3. Building more useful decorator
//4. Adding multiple decorator
function Logger3(logString) {
    //Decorator
    console.log('Logger Factory');
    return function (constructor) {
        console.log(logString);
        console.log('constructor', constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log('Template Factory');
    return function (constructor) {
        const element = document.getElementById(hookId);
        console.log('Logging Template...');
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
    Logger3('Logging 3....'),
    WithTemplate('<h1>Hello World!</h1>', 'app')
], Person3);
const person3 = new Person3();
console.log(person3);
