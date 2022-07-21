//1. Intersection Types
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type Promoted = Admin & Employee;

let me: Promoted;

me = {
  name: 'Ronchi',
  privileges: ['Update Server'],
  startDate: new Date(),
};

console.log(me);

type Result = string | number;
type Numeric = number | boolean;

type Intersected = Result & Numeric;

//2. Type Guards
function add(a: Result, b: Result) {
  if (typeof a === 'string' || typeof b === 'string') {
    //this is the type guard
    return a.toString() + b.toString();
  }
  return a + b;
}

//2.1 Type Guards
type UnknownEmployee = Admin | Employee;
function printEmployeeInfo(employee: UnknownEmployee) {
  console.log('Name: ', employee.name);
  if ('privileges' in employee) {
    //JS code that allows to check if 'privileges' exists as a property
    console.log('Privileges: ', employee.privileges);
  }
  if ('startDate' in employee) {
    //JS code that allows to check if 'startDate' exists as a property
    console.log('startDate: ', employee.startDate);
  }
}

printEmployeeInfo(me);

//2.2 type guards on classes
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }
  loadCargo(amount: number) {
    console.log('Loading cargo: ', amount);
  }
}

type Vehicle = Truck | Car;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive(); //because this always exists!

  // if ('loadCargo' in vehicle) {
  //   vehicle.loadCargo(1500);
  // }

  //better way
  if (vehicle instanceof Truck) {
    //instanceof
    vehicle.loadCargo(1500);
  }
}

useVehicle(v1);
useVehicle(v2);

//3. Discriminated Unions
interface Bird {
  //add a type
  type: 'bird'; //literal type
  flyingSpeed: number;
}

interface Horse {
  //add a type
  type: 'horse'; //literal type
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
    default:
      speed = 'Not animal';
  }
  console.log('Moving at speed ' + speed);
}
let viceGanda: Horse;
viceGanda = { runningSpeed: 100, type: 'horse' };
moveAnimal(viceGanda);

//4 Type Casting
// const button = document.querySelector('button');
// const paragraph = document.getElementById('main-paragraph');
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!; // (!) tells TS it wont be null, type casting optional approach
const userInputElement = document.getElementById(
  'user-input'
)! as HTMLInputElement;
userInputElement.value = 'What is your name?';

//if you are not sure if it exists then....
const userInputElement2 = document.getElementById('user-input');
if (userInputElement2) {
  (userInputElement2 as HTMLInputElement).value = 'Hello World!';
}

//5. Index Properties
interface ErrorContainer {
  //{ email: 'Not a valid email', username: 'Must start with a letter }
  [prop: string]: string;
}

const errorBags: ErrorContainer = {
  email: 'Not a valid email',
  password: 'Incorrect Password!',
};

//6 Function Overloads
function combine(q: string, b: string): string;
function combine(x: number, y: number): number;
function combine(a: Result, b: Result) {
  if (typeof a === 'string' || typeof b === 'string') {
    //this is the type guard
    return a.toString() + b.toString();
  }
  return a + b;
}

const interger = combine(3.33, 2.612);
interger.toFixed(2);

const letter = combine('Hello', 'World!');
letter.split('');
