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
var combineValues;
combineValues = add;
// combineValues = 5; //error; not a func
combineValues = printResult;
console.log('hey', combineValues(12, 18));
printResult(add(5, 25));
