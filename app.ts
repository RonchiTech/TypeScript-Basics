function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  const sum = n1 + n2;

  if (showResult) {
    console.log(phrase + sum);
  } else {
    return sum;
  }
}

const number1 = 10;
const number2 = 2.5;
const printResult = true;
const phrase = 'The sum is: ';

add(Number(number1), Number(number2), printResult, phrase);
