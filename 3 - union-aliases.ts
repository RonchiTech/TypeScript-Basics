type StringOrNumber = string | number; //union type
type ResultType = 'text' | 'number'; //literal type + union type
function combine(
  input1: StringOrNumber,
  input2: StringOrNumber,
  resultType: ResultType //literal type + union type
) {
  let sum;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    sum = input1 + input2;
  } else {
    sum = input1.toString() + input2.toString();
  }

  if (resultType === 'text') {
    return sum.toString();
  }
  if (resultType === 'number') {
    return Number(sum);
  }
}

const combineNumbers = combine(2, 5, 'text');

const combineStrings = combine('Ronchi ', 'Floyd', 'text');

console.log(combineNumbers, combineStrings);

// Type aliases can be used to "create" your own types. You're not limited to storing union types though - you can also provide an alias to a (possibly complex) object type.

// For example:

// type User1 = { name: string; age: number };
// const u1: User1 = { name: 'Max', age: 30 }; // this works!
// // This allows you to avoid unnecessary repetition and manage types centrally.

// // For example, you can simplify this code:

// function greet1(user: { name: string; age: number }) {
//   console.log('Hi, I am ' + user.name);
// }

// function isOlder1(user: { name: string; age: number }, checkAge: number) {
//   return checkAge > user.age;
// }
// // To:

// type User2 = { name: string; age: number };

// function greet2(user: User2) {
//   console.log('Hi, I am ' + user.name);
// }

// function isOlder2(user: User2, checkAge: number) {
//   return checkAge > user.age;
// }