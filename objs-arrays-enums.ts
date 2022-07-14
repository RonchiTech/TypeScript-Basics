// const person: {
//   name: string;
//   age: number;
// } = {
//   name: 'Ronchi',
//   age: 24,
// };

//better syntax

//TUPLES
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string]; //TUPLE
// } = {
//   name: 'Ronchi',
//   age: 24,
//   hobbies: ['sports', 'sleeping'],
//   role: [22, 'Setter'],
// };

// person.role.push(55) //push is allowed in tuple
// person.role[1] = 1; //cannot assign number to string
// person.role = [1, 'test', 55] //only allows 2 elements

let favoriteActivities: string[];
favoriteActivities = ['playing', 'cooking'];

// let birthDate: (string | number)[]; //any[] type
// birthDate = ['April', 22, 1998];

//ENUMS
enum Role {
  USER = 5,
  ADMIN = 15,
  SUPERADMIN,
}

const person = {
  name: 'Ronchi',
  age: 24,
  hobbies: ['sports', 'sleeping'],
  role: Role.SUPERADMIN, //[Role.SUPERADMIN, Role.ADMIN]
};

console.log(person);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
