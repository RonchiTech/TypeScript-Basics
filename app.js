"use strict";
var _a;
let me;
me = {
    name: 'Ronchi',
    privileges: ['Update Server'],
    startDate: new Date(),
};
console.log(me);
//2. Type Guards
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        //this is the type guard
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInfo(employee) {
    console.log('Name: ', employee.name);
    if ('privileges' in employee) {
        //JS code that allows to check if 'privileges' exists as a property
        console.log('Privileges: ', employee.privileges);
    }
    if ('startDate' in employee) {
        //JS code that allows to check if 'startDate' exists as a property
        console.log('startDate: ', employee.startDate);
    }
}
printEmployeeInfo(me);
//2.2 type guards on classes
class Car {
    drive() {
        console.log('Driving...');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount) {
        console.log('Loading cargo: ', amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive(); //because this always exists!
    // if ('loadCargo' in vehicle) {
    //   vehicle.loadCargo(1500);
    // }
    //better way
    if (vehicle instanceof Truck) {
        //instanceof
        vehicle.loadCargo(1500);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
        default:
            speed = 'Not animal';
    }
    console.log('Moving at speed ' + speed);
}
let viceGanda;
viceGanda = { runningSpeed: 100, type: 'horse' };
moveAnimal(viceGanda);
//4 Type Casting
// const button = document.querySelector('button');
// const paragraph = document.getElementById('main-paragraph');
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!; // (!) tells TS it wont be null, type casting optional approach
const userInputElement = document.getElementById('user-input');
userInputElement.value = 'What is your name?';
//if you are not sure if it exists then....
const userInputElement2 = document.getElementById('user-input');
if (userInputElement2) {
    userInputElement2.value = 'Hello World!';
}
const errorBags = {
    email: 'Not a valid email',
    password: 'Incorrect Password!',
};
function combine(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        //this is the type guard
        return a.toString() + b.toString();
    }
    return a + b;
}
const interger = combine(3.33, 2.612);
interger.toFixed(2);
const letter = combine('Hello', 'World!');
letter.split('');
//7. Optional Chaining
const myself = {
    name: 'Ronchi',
    age: 24,
    job: {
        title: 'Full Stack Developer',
    },
};
console.log(myself.name);
console.log((_a = myself === null || myself === void 0 ? void 0 : myself.job) === null || _a === void 0 ? void 0 : _a.title);
const zero = 0;
const knull = null;
const myname = 'Ronchi';
console.log(myname !== null && myname !== void 0 ? myname : 'No Name');
console.log(knull !== null && knull !== void 0 ? knull : 'No Name');
console.log(zero !== null && zero !== void 0 ? zero : 'No Name');
