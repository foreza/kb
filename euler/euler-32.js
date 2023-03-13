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
