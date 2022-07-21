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
}
interface Greetable extends Name {
  greet(message: string): void;
}

class Human implements Greetable {
  // name: string
  author: string = 'You';
  constructor(public name: string) {}

  greet(message: string) {
    console.log(`Message: ${message}, ${this.author}`);
  }
}

const human = new Human('Ronchi');
human.greet('Happy Birthday');
console.log(human.name);
