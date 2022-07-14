function combine(input1, input2) {
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        return input1 + input2;
    }
    return input1.toString() + input2.toString();
}
var combineNumbers = combine(2, 5);
var combineStrings = combine('Ronchi ', 'Floyd');
console.log(combineNumbers, combineStrings);
