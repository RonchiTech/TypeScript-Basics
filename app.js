"use strict";
const button = document.querySelector('button');
function logger(message) {
    console.log('Text is: ', message);
}
button.addEventListener('click', () => logger('hey'));
