"use strict";
const me = {
    name: 'Ronchi',
    age: 24,
    greet(message) {
        console.log(`${message} ${this.name}`);
    },
};
me.greet('Happy Birthday');
