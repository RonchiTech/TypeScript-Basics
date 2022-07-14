function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  const sum = n1 + n2;

  if (showResult) {
    console.log(phrase + sum);
  } else {
    return sum;
  }
}

let number1: number;
number1 = 25;
const number2 = 2.5;
const printResult = true;
let phrase = 'The sum is: ';
// phrase = 5
add(Number(number1), Number(number2), printResult, phrase);
