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
var favoriteActivities;
favoriteActivities = ['playing', 'cooking'];
// let birthDate: (string | number)[]; //any[] type
// birthDate = ['April', 22, 1998];
//ENUMS
var Role;
(function (Role) {
    Role[Role["USER"] = 0] = "USER";
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["SUPERADMIN"] = 2] = "SUPERADMIN";
})(Role || (Role = {}));
var person = {
    name: 'Ronchi',
    age: 24,
    hobbies: ['sports', 'sleeping'],
    role: Role.SUPERADMIN //[Role.SUPERADMIN, Role.ADMIN]
};
console.log(person);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
