"use strict";
//1. Generics
const names = ['Ronchi'];
// console.log(names[0].split(''));
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hello World');
    }, 3000);
});
promise.then((result) => {
    console.log('Result: ', result);
});
