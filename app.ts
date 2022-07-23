//1. Decorators
function Logger(constructor: Function) {
  //Decorator
  console.log('Logging...');
  console.log('constructor', constructor);
  
}
@Logger
class Person {
  name = 'Ronchi';
  constructor() {
    console.log('Creating Person Object....');
  }
}

const person = new Person();

console.log(person);
