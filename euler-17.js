
/*
https://projecteuler.net/problem=17

If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?


NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.


simpleArr = "one, two, three, four, five, six, seven, eight, nine, ten
"eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen"

tensArr = "twenty, thirty, fourty, fifty, sixty, seventy, eighty, ninety"



- if number is less than 100 -
    if (number < 20 )
        get the simpleArr value for corresponding index
    if (number > 20 < 100)
        get simple Arr value length, and add the tens array for the corresponding number
        twenty two

- if number is > 100
    append the simpleArr + "hundred" length, then run the above routine + "and"
    one hundred and twenty two
*/

// brute force approach
let lenSimpleArr, lenTensArr, lenHundreds

function solverSetup () {
    let simpleArrTo20 = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    let tensArr = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    let hundreds = "hundred";

    lenSimpleArr = simpleArrTo20.map((a) => a.length);
    lenTensArr = tensArr.map((a) => a.length);
    lenHundreds = hundreds.length;
}


function getLengthForWordLessThan1000(number) {
    var retLen = 0;

    if (number < 100) {
        retLen = getLengthForWordLessThan100(number);
    } else if (number >= 100) {
        let leadingDigit = Math.floor(number/100); // get the index
        let trailingDigit = number%100; // get trailing value
        retLen = lenSimpleArr[leadingDigit]    // get the leading digit index from simple array, ie: "three" hundred
            + lenHundreds  // add the length of "hundred"
            + (trailingDigit > 0 ? 3 + getLengthForWordLessThan100(trailingDigit) : 0)
    }

    return retLen;

}


function getLengthForWordLessThan100(number) {
    var retLen = 0;
    if (number < 20) {
        retLen = getLengthForWordLessThan20(number);
    } else if (number >= 20) {
        let leadingDigit = Math.floor(number/10); // get the index
        let trailingDigit = number%10; // get trailing value
        // console.log("getting len from tens arr for: ", leadingDigit);
        retLen = lenTensArr[leadingDigit] + 
            (trailingDigit > 0 ? getLengthForWordLessThan20(trailingDigit) : 0);
    } else {
        // shouldn't be here
    }
    return retLen;

}


function getLengthForWordLessThan20(number) {
    return lenSimpleArr[number];
}

function runSolverUpTo(value){

    // set up the input arr
    var allNumsArr = [];
    for (var i = 1; i <= value; ++i) {
        allNumsArr.push(i);
    }

    var retSum = allNumsArr.map((a) => getLengthForWordLessThan1000(a)).reduce((a,b) => a + b);
    return retSum;
}


function runTests(){
    doTestCaseForValue(getLengthForWordLessThan20,0,4);
    doTestCaseForValue(getLengthForWordLessThan20,10,3);
    doTestCaseForValue(getLengthForWordLessThan20,15,7);
    doTestCaseForValue(getLengthForWordLessThan20,19,8);
    doTestCaseForValue(getLengthForWordLessThan100, 53, 10)
    doTestCaseForValue(getLengthForWordLessThan100, 69, 9)
    doTestCaseForValue(getLengthForWordLessThan100, 99, 10)
    doTestCaseForValue(getLengthForWordLessThan1000, 19, 8)
    doTestCaseForValue(getLengthForWordLessThan1000, 53, 10)
    doTestCaseForValue(getLengthForWordLessThan1000, 342, 23)
    doTestCaseForValue(getLengthForWordLessThan1000, 115, 20)
    doTestCaseForValue(getLengthForWordLessThan1000, 777, 27)  // sevenhundredandseventyseven
    doTestCaseForValue(getLengthForWordLessThan1000, 888, 26)  // eighthundredandeightyeight
    doTestCaseForValue(getLengthForWordLessThan1000, 999, 24); // ninehundredandninetynine
    doTestCaseForValue(getLengthForWordLessThan1000, 50, 5)  // fifty
    doTestCaseForValue(getLengthForWordLessThan1000, 700, 12)  // sevenhundred
}

function doTestCaseForValue(testFunction, value, expected) {
    var testStatusText = `Test ${testFunction.name} with value: ${value} - expected ${expected}`;
    var testValue = testFunction(value);
    testValue === expected ? console.log("Success: " + testStatusText) : console.error("Failure: " + testStatusText + " || Actual: " + testValue);
}

solverSetup();
runTests();
getEuler17Solution();


function getEuler17Solution() {
    var solution = runSolverUpTo(999) + 11;
    console.log("Solution:" ,solution);
}
