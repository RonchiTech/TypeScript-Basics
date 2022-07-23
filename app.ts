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
function Logger3(logString: string) {
  //Decorator
  console.log('Logger Factory');
  
  return function (constructor: Function) {
    console.log(logString);
    console.log('constructor', constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('Template Factory');
  return function (constructor: any) {
    const element = document.getElementById(hookId);
    console.log('Logging Template...');
    
    if (element) {
      const per = new constructor()
      element.innerHTML = template;
      document.querySelector('h1')!.textContent = per.name;
    }
  };
}
@Logger3('Logging 3....')
@WithTemplate('<h1>Hello World!</h1>', 'app')
class Person3 {
  name = 'Ronchi';
  constructor() {
    console.log('Creating Person Object....');
  }
}

const person3 = new Person3();

console.log(person3);
