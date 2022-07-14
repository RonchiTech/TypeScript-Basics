function combine(input1: string | number, input2: string | number) {
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    return input1 + input2;
  }
  return input1.toString() + input2.toString();
}

const combineNumbers = combine(2, 5);

const combineStrings = combine('Ronchi ', 'Floyd');

console.log(combineNumbers, combineStrings);
