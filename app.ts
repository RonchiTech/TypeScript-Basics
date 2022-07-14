type StringOrNumber = string | number;
type ResultType = 'text' | 'number'; //literal type + union type
function combine(
  input1: StringOrNumber,
  input2: StringOrNumber,
  resultType: ResultType //literal type + union type
) {
  let sum;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    sum = input1 + input2;
  } else {
    sum = input1.toString() + input2.toString();
  }

  if (resultType === 'text') {
    return sum.toString();
  }
  if (resultType === 'number') {
    return Number(sum);
  }
}

const combineNumbers = combine(2, 5, 'text');

const combineStrings = combine('Ronchi ', 'Floyd', 'text');

console.log(combineNumbers, combineStrings);
