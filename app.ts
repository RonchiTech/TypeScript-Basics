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
function merger<T, U>(obj1: T, obj2: U) {
  return { ...obj1, ...obj2 };
}
const mergedObj = merger({ name: 'Ronchi' }, { age: 24, male: true });
mergedObj.age;

// const mergedObj2 = merger< //just the same
//   { name: string; hobbies: string[] },
//   { age: number; male: boolean }
// >({ name: 'Ronchi', hobbies: ['sleeping'] }, { age: 24, male: true });
