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

// 3. Building more useful decorator
// 4. Adding multiple decorator
// function Logger3(logString: string) {
//   //Decorator
//   console.log('Logger Factory');

//   return function (constructor: Function) {
//     console.log(logString);
//     console.log('constructor', constructor);
//   };
// }

// function WithTemplate(template: string, hookId: string) {
//   console.log('Template Factory');
//   return function <T extends { new (...args: any[]): { name: string } }>(
//     originalConstructor: T
//   ) {
//     return class extends originalConstructor {
//       constructor(...args: any[]) {
//         super();
//         const element = document.getElementById(hookId);
//         console.log('Logging Template...');

//         if (element) {
//           element.innerHTML = template;
//           document.querySelector('h1')!.textContent = this.name;
//         }
//       }
//     };
//   };
// }
// @Logger3('Logging 3....')
// @WithTemplate('<h1>Hello World!</h1>', 'app')
// class Person3 {
//   name = 'Ronchi';
//   constructor() {
//     console.log('Creating Person Object....');
//   }
// }

// const person3 = new Person3();

// console.log(person3);

// //5. Diving into Property Decorator

// function Log(target: any, propertyName: string | symbol) {
//   console.log('Property Decorator');
//   console.log('target', target);
//   console.log('propertyName', propertyName);
// }

// function Log2(
//   target: any,
//   name: string | symbol,
//   descriptor: PropertyDescriptor
// ) {
//   console.log('Accessor Decorator');
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// function Log3(
//   target: any,
//   name: string | symbol,
//   descriptor: PropertyDescriptor
// ) {
//   console.log('Method Decorator');
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// function Log4(target: any, name: string | symbol, position: number) {
//   console.log('Parameter Decorator');
//   console.log(target);
//   console.log(name);
//   console.log(position);
// }
// class Product {
//   @Log
//   title: string;
//   private _price: number;
//   constructor(t: string, p: number) {
//     this.title = t;
//     this._price = p;
//   }
//   @Log2
//   set price(value: number) {
//     if (value === 0) {
//       throw new Error('Invalid! Price must not be set to 0');
//     }
//     this._price = value;
//   }
//   @Log3
//   getPriceWithTax(@Log4 tax: number) {
//     return this._price * (1 + tax);
//   }
// }

//6. Other decorator return types, example: creating an autobind decorator
// function AutoBinder(
//   _: any,
//   _2: string | Symbol,
//   decorator: PropertyDescriptor
// ) {
//   const originalMethod = decorator.value;
//   const newDescriptor: PropertyDescriptor = {
//     configurable: true,
//     enumerable: false,
//     get() {
//       console.log('This', this);
//       const boundFn = originalMethod.bind(this);
//       return boundFn;
//     },
//   };
//   return newDescriptor;
// }
// class Printer {
//   message = 'This Works';
//   @AutoBinder
//   showMessage() {
//     console.log(this.message);
//   }
// }
// const p = new Printer();
// const button = document.querySelector('button')!;

// // button.addEventListener('click', p.showMessage.bind(p)); //One work around, by using bind. The other is by using a decorator

// //Autobinded
// button.addEventListener('click', p.showMessage)

//7. Validation with Decorator
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; //['required','positive']
  };
}
const registeredValidators: ValidatorConfig = {};

function Required(target: any, name: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [name]: [
      ...(registeredValidators[target.constructor.name]?.[name] ?? []),
      'required',
    ],
  };
}

function PositiveNumber(target: any, name: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [name]: [
      ...(registeredValidators[target.constructor.name]?.[name] ?? []),
      'required',
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}
class Course {
  @Required
  title: string;
  // @Required
  @PositiveNumber
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleElement = document.getElementById('title') as HTMLInputElement;
  const priceElement = document.getElementById('price') as HTMLInputElement;

  const title = titleElement.value;
  const price = Number(priceElement.value);
  const newCourse = new Course(title, price);
  if (!validate(newCourse)) {
    alert('Invalid input, please try again!');
  }
  console.log(newCourse);
});
