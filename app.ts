const button = document.querySelector('button')! as HTMLButtonElement;

function logger(message: string) {
  console.log('Text is: ', message);
}

button.addEventListener('click', () => logger('hey'));
