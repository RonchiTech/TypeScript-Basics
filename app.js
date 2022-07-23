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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
// function Logger3(logString: string) {
//   //Decorator
//   console.log('Logger Factory');
//   return function (constructor: Function) {
//     console.log(logString);
//     console.log('constructor', constructor);
//   };
// }
// function WithTemplate(template: string, hookId: string) {
//   console.log('Template Factory');
//   return function (constructor: any) {
//     const element = document.getElementById(hookId);
//     console.log('Logging Template...');
//     if (element) {
//       const per = new constructor()
//       element.innerHTML = template;
//       document.querySelector('h1')!.textContent = per.name;
//     }
//   };
// }
// @Logger3('Logging 3....')
// @WithTemplate('<h1>Hello World!</h1>', 'app')
// class Person3 {
//   name = 'Ronchi';
//   constructor() {
//     console.log('Creating Person Object....');
//   }
// }
// const person3 = new Person3();
// console.log(person3);
//5. Diving into Property Decorator
function Log(target, propertyName) {
    console.log('Property Decorator');
    console.log('target', target);
    console.log('propertyName', propertyName);
}
function Log2(target, name, descriptor) {
    console.log('Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('Method Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('Parameter Decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(value) {
        if (value === 0) {
            throw new Error('Invalid! Price must not be set to 0');
        }
        this._price = value;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
