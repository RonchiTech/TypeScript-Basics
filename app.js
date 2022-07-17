"use strict";
// const button = document.querySelector('button')! as HTMLButtonElement;
// function logger(message: string) {
//   console.log('Text is: ', message);
// }
// button.addEventListener('click', () => logger('hey'));
// const logger2: (m: string) => void = (message) => {
//   console.log(message);
// };
// logger2('testing');
// const multiplyBy = (a: number, b: number = 2) => {
//   console.log(a * b);
// };
// multiplyBy(2);
const printRest = (...restParams) => {
    console.log(restParams);
};
printRest('my', 'name', 'is', 'RFM');
const addRest = (...restParams) => {
    return restParams.reduce((prevValue, currValue) => {
        return prevValue + currValue;
    }, 0);
};
console.info(addRest(2, 5, 7, 15, 9.8));
const multiply = (...twoNumbers) => {
    return twoNumbers.reduce((prev, curr) => {
        return prev * curr;
    }, 1);
};
// multiply(2, 5, 8); //not allowed, expected only 2 arguments (based on the tuple)
multiply(2, 5);
