// function add1(n1: number, n2: number): number {
//   return n1 + n2;
// }
//let ts do its job regarding type inference
function add(n1, n2) {
    return n1 + n2;
}
function printResult(result) {
    //function return type void
    console.log('Result is: ', result);
}
//Functions as Types
// let combineValues: Function;
var combineValues; //to be more stricter and clearer
combineValues = add;
// combineValues = 5; //error; not a func
// combineValues = printResult; //error because printResult func returns void
console.log('hey', combineValues(12, 18));
printResult(add(5, 25));
//Function Types and Callbacks
function addAndHandle(n1, n2, cb) {
    var sum = n1 + n2;
    cb(sum);
}
addAndHandle(2, 5, function (result) {
    console.log('addAndHandle result :', result);
});
//TYPE unknown
var userInput;
var userName;
userInput = 'RFM';
// userName = userInput; //error, unknown types cannot be assigned to type strings; unlike type any
//check it first
if (typeof userInput === 'string') {
    userName = userInput;
}
//TYPE never
function createError(message, code) {
    throw { message: message, code: code };
}
createError('Not Found!', 404);
