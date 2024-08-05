// euler 32
// https://projecteuler.net/problem=32

/*

We have essentially a set of 9 numbers:
[1,2,3,4,5,6,7,8,9]

And we want to find combinations of these numbers where:

X.. * Y.. = Z..

Where "XYZ" 

*/


// console.log(isPandigitalProduct(186,39)) // True
// console.log(isPandigitalProduct(186,32)) // False

const PANDIGITAL = 123456789;

function isPandigitalProduct(largerNum, smallerNum){

    let stringVal = smallerNum + "" + largerNum + "" + (largerNum * smallerNum);

    if (stringVal.length != 9) {
        return false;
    }

    let newVal = parseInt(stringVal.split("").sort().join(""));

    return newVal == PANDIGITAL;
}


function getPandigitalProductArrFor(numAFloor, numACeil, numBFloor, numBCeil) {
    let resultSet = new Set();

    for (var i = numAFloor; i < numACeil; i++) {
        for (var j = numBFloor; j < numBCeil; j++) {
            if (isPandigitalProduct(i,j)) {
                resultSet.add(i*j);
            }
        }
    }
    return Array.from(resultSet);
}

var firstSet = getPandigitalProductArrFor(111,999,11,99)
var secondSet = getPandigitalProductArrFor(1111,9990,1,9)

var resultSet = firstSet.concat(secondSet);
var answer = resultSet.reduce((a,b)=>a+b);