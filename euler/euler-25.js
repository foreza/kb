var knownNum = [BigInt(1),BigInt(1),BigInt(2),BigInt(3)];
var numDigitCountByIndex = [1,1,1,1]

function findFibToPosition(num) {

    // If it's something we discovered already
    if (num <= knownNum.length) {
        var printObj =  {
            "position": num,
            "numAtPosition" :knownNum[num-1],
            "digitCount": numDigitCountByIndex,
            "knownNums": knownNum
        }

        console.log("Already found", printObj);


        return knownNum;
    }

    // Otherwise, let's make more!
    for (var i = knownNum.length; i < num; ++i) {
        var newNum = BigInt(knownNum[i-1]) + BigInt(knownNum[i-2])
        knownNum.push(BigInt(newNum));
        var tLen = newNum.toString().length;
        numDigitCountByIndex.push(tLen);
        if (tLen == 1000) {
            console.log("FOUND!:", i+1);
            break;
        }
    }

}

// 4780 x
// 4781 x
// 4782 yes

findFibToPosition(10000, knownNum);
findFibToPosition(10000, knownNum);
