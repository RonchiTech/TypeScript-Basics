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
