"use strict";
const me = {
    name: 'Ronchi',
    age: 24,
    greet(message) {
        console.log(`${message} ${this.name}`);
    },
};
me.greet('Happy Birthday');
class Human {
    constructor(name) {
        this.name = name;
        // name: string
        this.author = 'You';
    }
    greet(message) {
        console.log(`Message: ${message}, ${this.author}`);
    }
}
const human = new Human('Ronchi');
human.greet('Happy Birthday');
console.log(human.name);
let add;
add = (n1, n2) => {
    return n1 + n2;
};
let add2;
add2 = (num1, num2) => {
    return num1 + num2;
};
