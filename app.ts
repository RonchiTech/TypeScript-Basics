// function add1(n1: number, n2: number): number {
//   return n1 + n2;
// }

//let ts do its job regarding type inference
function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(result: number) { //function return type void
  console.log('Result is: ', result);
}

printResult(add(5, 25));
