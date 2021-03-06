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

//rest params
// const printRest = (...restParams: string[] | number[]) => {
//   console.log(restParams);
// };

// printRest('my', 'name', 'is', 'RFM');

// const addRest = (...restParams: number[]) => {
//   return restParams.reduce((prevValue, currValue) => {
//     return prevValue + currValue;
//   }, 0);
// };
// console.info(addRest(2, 5, 7, 15, 9.8));

// const multiply = (...twoNumbers: [number, number]) => {
//   return twoNumbers.reduce((prev, curr) => {
//     return prev * curr;
//   }, 1);
// };

// // multiply(2, 5, 8); //not allowed, expected only 2 arguments (based on the tuple)
// multiply(2, 5);

//array and object destructuring;

//array
const Hobbies = ['Eating', 'Dancing', 'Cooking'];
const [hobby1, hobby2, hobby3] = Hobbies;
const [firstHobby, ...restHobby] = Hobbies;
console.log(hobby1, hobby2, hobby3);
console.log(firstHobby, ...restHobby); //console.log(firstHobby, restHobby) ---> restHobby will be in array

//object
const person = {
  name: 'Floyd',
  age: 24,
  gender: 'Male',
};

const { name: myName, age, gender } = person; //myname is alias
console.log(myName, age, gender);
