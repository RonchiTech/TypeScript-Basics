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
