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

//6. Generic Classes

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return 'Item Not Found';
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}
const textStorage = new DataStorage<string>();
textStorage.addItem('Ronchi');
textStorage.addItem('Floyd');
textStorage.addItem('Quijano');
textStorage.addItem('Miong');

console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(5);
numberStorage.addItem(25);

const anyStorage = new DataStorage<number | string>();
anyStorage.addItem('Hello');
anyStorage.addItem(7);

// const objStorage = new DataStorage<object>(); //dont allow object
// objStorage.addItem({ name: 'RFM' });
// objStorage.addItem({ name: 'NKW' });
// //...Some calculation
// objStorage.removeItem({ name: 'RFM' });
// console.log(objStorage.getItems());

//7. Generic Utility Types
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

//Partial utility type
function createCourseGoal(title: string, description: string, date: Date) {
  // return { title, description, completeUntil: date };//this will work but maybe you need to do something / other things
  //example
  let courseGoal: Partial<CourseGoal> = {};
  //...validation
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
}

console.log(createCourseGoal('IT', 'Information Technology', new Date()));

//Readonly utility type
const myNames: Readonly<string[]> = ['Ronchi', 'Floyd'];
// myNames.push('RFM'); //error
// myNames.pop(); //error because its a readonly array
