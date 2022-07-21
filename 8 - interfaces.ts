interface Person {
  name: string;
  age: number;
  greet(message: string): void;
}

const me: Person = {
  name: 'Ronchi',
  age: 24,
  greet(message: string) {
    console.log(`${message} ${this.name}`);
  },
};

me.greet('Happy Birthday');

//Using Interface with Classes
interface Name {
  readonly name: string;
  optionalName?: string; //optional parameters and properties
  friends?: string[];
}
interface Greetable extends Name {
  greet(message: string): void;
  optionalGreet?(message: string): void;
}

class Human implements Greetable {
  // name: string
  friends?: string[];
  author: string = 'You';
  constructor(public name: string, friends?: string[]) {
    if (friends) {
      this.friends = friends;
    }
  }

  greet(message: string) {
    console.log(`Message: ${message}, ${this.author}`);
  }
}

const human = new Human('Ronchi');
human.greet('Happy Birthday');
console.log(human.name);

//
type AddFnType = (n1: number, n2: number) => number;

let add: AddFnType;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

//using interface as a function
interface AddFnInt {
  (num1: number, num2: number): number;
}

let add2: AddFnInt;
add2 = (num1: number, num2: number) => {
  return num1 + num2;
};
