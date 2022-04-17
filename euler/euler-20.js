var getFactorialStringForNum = (num) => {

    var tArr = [];

    // Populate array
    for (var i = 1; i <= num; ++i) {
        tArr.push(i);
    }

    // We'll likely have big numbers
    // My issue was not also considering that while reducing, the number is already very large. 
    // casting it after the fact is too late...
    let retValue = tArr.reduce((a,b) => BigInt(a)*BigInt(b))
    console.log("Value of factorial", retValue);
    return retValue.toString();
}


var getSumForNumString = (numString) => {

    var tArr = numString.split("");

    let sum = tArr.reduce((a,b) => parseInt(a)+parseInt(b));
    return sum;

}

// Tests
console.log(`10! should be 3628800: ${getFactorialStringForNum(10)}`)
console.log(`For 10!, this problem should be 27: ${getSumForNumString(getFactorialStringForNum(10))}`)
//console.log(`100! should be ...: ${getFactorialForNum(100)}`)

var solution = getSumForNumString(getFactorialStringForNum(100));
console.log(solution);
