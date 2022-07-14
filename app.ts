// function add1(n1: number, n2: number): number {
//   return n1 + n2;
// }

//let ts do its job regarding type inference
function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(result: number) {
  //function return type void
  console.log('Result is: ', result);
}

//Functions as Types
// let combineValues: Function;
let combineValues: (param1: number, param2: number) => number; //to be more stricter and clearer

combineValues = add;
// combineValues = 5; //error; not a func
// combineValues = printResult; //error because printResult func returns void

console.log('hey', combineValues(12, 18));

printResult(add(5, 25));

//Function Types and Callbacks
function addAndHandle(n1: number, n2: number, cb: (result: number) => void) {
  const sum = n1 + n2;
  cb(sum);
}

addAndHandle(2, 5, (result) => {
  console.log('addAndHandle result :', result);
});

//TYPE unknown
let userInput: unknown;
let userName: string;

userInput = 'RFM';
// userName = userInput; //error, unknown types cannot be assigned to type strings; unlike type any

//check it first
if (typeof userInput === 'string') {
  userName = userInput;
}

//TYPE never
function createError(message: string, code: number): never {
  throw { message, code };
}

createError('Not Found!', 404); //does not return any result at all
//const error = createError('message here', 500) //error no value
