// const person: {
//   name: string;
//   age: number;
// } = {
//   name: 'Ronchi',
//   age: 24,
// };

//better syntax
const person = {
  name: 'Ronchi',
  age: 24,
  hobbies: ['sports', 'sleeping'],
};

let favoriteActivities: string[];
favoriteActivities = ['playing', 'cooking'];

// let birthDate: (string | number)[]; //any[] type
// birthDate = ['April', 22, 1998];

console.log(person.age);

for(const hobby of person.hobbies){
  console.log(hobby.toUpperCase());
  
}