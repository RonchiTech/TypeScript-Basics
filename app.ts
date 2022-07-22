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

//4. Another Generic Function
function countArrayLength<T extends string[]>(params: T) {
  return params.length;
}
const sports = ['basketball', 'volleyball', 'football', 'badminton'];

console.log(countArrayLength(sports));

function countAndDescribe<T extends string[] | number[]>(element: T) {
  let description = 'Got no element';
  if (element.length === 1) {
    description = 'Got 1 element';
  } else if (element.length > 1) {
    description = `Got ${element.length} elements`;
  }
  return [element, description];
}

console.log(countAndDescribe(sports));

interface Lengthy {
  length: number;
}

function countAndDescribe2<T extends Lengthy>(element: T) {
  let description = 'Got no element';
  if (element.length === 1) {
    description = 'Got 1 element';
  } else if (element.length > 1) {
    description = `Got ${element.length} elements`;
  }
  return [element, description];
}

console.log(countAndDescribe2('Hello World!'));

//5. The keyof constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Result: ' + obj[key];
}
extractAndConvert({ name: 'Floyd', age: 24 }, 'name');
