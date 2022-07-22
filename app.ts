//1. Generics
const names: Array<string> = ['Ronchi'];
// console.log(names[0].split(''));
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello World');
  }, 3000);
});

promise.then((result) => {
  console.log('Result: ', result);
});

//2. Creating a Generic Function
//& 3.with Constraints (<T extends object...>)
function merger<T extends object, U extends object>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2);
}
const mergedObj = merger({ name: 'Ronchi' }, { age: 24, male: true });
mergedObj.age;

// const mergedObj2 = merger< //just the same
//   { name: string; hobbies: string[] },
//   { age: number; male: boolean }
// >({ name: 'Ronchi', hobbies: ['sleeping'] }, { age: 24, male: true });

//3. Working with Constraints
//restrict the types of T and U
function merger2<T extends object, U extends number>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2);
}
const mergedObj2 = merger2({ name: 'Floyd' }, 24);
console.log('M2', mergedObj2);

mergedObj2.name;
