// const person: {
//   name: string;
//   age: number;
// } = {
//   name: 'Ronchi',
//   age: 24,
// };
//better syntax
var person = {
    name: 'Ronchi',
    age: 24,
    hobbies: ['sports', 'sleeping'],
    role: [22, 'Setter']
};
var favoriteActivities;
favoriteActivities = ['playing', 'cooking'];
// let birthDate: (string | number)[]; //any[] type
// birthDate = ['April', 22, 1998];
console.log(person.age);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
