function add(n1, n2, showResult, phrase) {
    var sum = n1 + n2;
    if (showResult) {
        console.log(phrase + sum);
    }
    else {
        return sum;
    }
}
var number1 = 10;
var number2 = 2.5;
var printResult = true;
var phrase = 'The sum is: ';
add(Number(number1), Number(number2), printResult, phrase);
