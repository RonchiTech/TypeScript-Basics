function combine(input1, input2, resultType //literal type + union type
) {
    var sum;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        sum = input1 + input2;
    }
    else {
        sum = input1.toString() + input2.toString();
    }
    if (resultType === 'text') {
        return sum.toString();
    }
    if (resultType === 'number') {
        return Number(sum);
    }
}
var combineNumbers = combine(2, 5, 'text');
var combineStrings = combine('Ronchi ', 'Floyd', 'text');
console.log(combineNumbers, combineStrings);
