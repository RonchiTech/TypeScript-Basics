// const button = document.querySelector('button')! as HTMLButtonElement;

// function logger(message: string) {
//   console.log('Text is: ', message);
// }
// button.addEventListener('click', () => logger('hey'));

// const logger2: (m: string) => void = (message) => {
//   console.log(message);
// };

// logger2('testing');

// const multiplyBy = (a: number, b: number = 2) => {
//   console.log(a * b);
// };
// multiplyBy(2);

const printRest = (...restParams: string[] | number[]) => {
  console.log(restParams);
};

printRest('my', 'name', 'is', 'RFM');
