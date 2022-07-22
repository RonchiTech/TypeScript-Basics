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
//2. Creating a Generic Function
//& 3.with Constraints (<T extends object...>)
function merger(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
const mergedObj = merger({ name: 'Ronchi' }, { age: 24, male: true });
mergedObj.age;
// const mergedObj2 = merger< //just the same
//   { name: string; hobbies: string[] },
//   { age: number; male: boolean }
// >({ name: 'Ronchi', hobbies: ['sleeping'] }, { age: 24, male: true });
//3. Working with Constraints
//restrict the types of T and U
function merger2(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
const mergedObj2 = merger2({ name: 'Floyd' }, 24);
console.log('M2', mergedObj2);
mergedObj2.name;
//4. Another Generic Function
function countArrayLength(params) {
    return params.length;
}
const sports = ['basketball', 'volleyball', 'football', 'badminton'];
console.log(countArrayLength(sports));
function countAndDescribe(element) {
    let description = 'Got no element';
    if (element.length === 1) {
        description = 'Got 1 element';
    }
    else if (element.length > 1) {
        description = `Got ${element.length} elements`;
    }
    return [element, description];
}
console.log(countAndDescribe(sports));
function countAndDescribe2(element) {
    let description = 'Got no element';
    if (element.length === 1) {
        description = 'Got 1 element';
    }
    else if (element.length > 1) {
        description = `Got ${element.length} elements`;
    }
    return [element, description];
}
console.log(countAndDescribe2('Hello World!'));
//5. The keyof constraint
function extractAndConvert(obj, key) {
    return 'Result: ' + obj[key];
}
extractAndConvert({ name: 'Floyd', age: 24 }, 'name');
//6. Generic Classes
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return 'Item Not Found';
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Ronchi');
textStorage.addItem('Floyd');
textStorage.addItem('Quijano');
textStorage.addItem('Miong');
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(5);
numberStorage.addItem(25);
const anyStorage = new DataStorage();
anyStorage.addItem('Hello');
anyStorage.addItem(7);
//Partial utility type
function createCourseGoal(title, description, date) {
    // return { title, description, completeUntil: date };//this will work but maybe you need to do something / other things
    //example
    let courseGoal = {};
    //...validation
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
console.log(createCourseGoal('IT', 'Information Technology', new Date()));
//Readonly utility type
const myNames = ['Ronchi', 'Floyd'];
// myNames.push('RFM'); //error
// myNames.pop(); //error because its a readonly array
