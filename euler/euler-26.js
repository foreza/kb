// Number of interest, key unique count: (10) 1/81 = 0.012345679012345678 X
// https://math.stackexchange.com/questions/994203/why-do-we-miss-8-in-the-decimal-expansion-of-1-81-and-98-in-the-decimal-expansi

// Number of interest, key unique count: (10) 1/891 = 0.001122334455667789  X


// 847 repeats 66 times? wtf? AND isn't enough

function detectForRepeatingDecimalCrude(decimalNum) {
  var string = decimalNum.toString();
  var numBody = string.split(".")[1];

  if (typeof (numBody) == 'undefined') {
    console.log("This was bad: ", string);
    return false;
  }

  if (numBody.length >= 16) {
    // crude approximation
    return true;
  }

  return false;
}


// Had to borrow this.
// Didn't know that we could abuse primes here
// to achieve the same effect.
// https://www.tutorialspoint.com/finding-length-of-repeating-decimal-part-in-javascript

function getRepeatingPartLen(originalDenom) {

  if (originalDenom % 2 === 0 || originalDenom % 5 === 0) {
    // Why do we exclude these?
    return -1;
  } else {
    var count = 1;
    var currRes = 10 % originalDenom;

    // while loop to increment the count
    // i guess there is no way around this?
    while (currRes != 1) {
      var tLogRes = currRes * 10; // for logging
      currRes = (currRes * 10) % originalDenom
      count++;
      // To see the process yourself (warning: computational heavy due to logging)
      // console.log(`Calculatin: ${tLogRes} % ${originalDenom} = ${currRes}`);
    }
    return count;
  }
}



function runToX(num) {

  var maxFoundLen = 1;

  for (var i = 1; i < num; ++i) {
    var tNum = 1 / i;
    if (detectForRepeatingDecimalCrude(tNum)) {
      var tLen = getRepeatingPartLen(i);
      if (tLen > maxFoundLen) {
        console.log(`found new top: ${tLen} from 1/${i}`)
        maxFoundLen = tLen;
      }

    }
  }
  return maxFoundLen;
}

// For solution run
console.log(runToX(1000));


/* 
Stuff that didn't work 
*/


// function generateNumMap(repeatingNum) {

//   var string = repeatingNum.toString();
//   var stringArr = string.split(".")[1].split("");

//   // console.log("stringArr:", stringArr)
//   var stringMap = {};

//   for (var i = 0; i < stringArr.length; ++i) {

//     // If it's the first time we're seeing this digit, add it
//     if (stringMap[stringArr[i]] == undefined) {
//       // console.log("setting: ", stringArr[i] )
//       stringMap[stringArr[i]] = 1;
//       continue;
//     } else {
//       // console.log("increment, ", stringArr[i]);
//       stringMap[stringArr[i]]++;
//     }

//   }

//   return stringMap;

// }

// // pass in the tNum as well.
// // this don't work.
// function analyzeMap(map, tNum, denominator) {

//   var retObj = {};
//   var uniqueKeyCount = Object.keys(map).length;


//   // Trying to see if we can base this off of key count
//   // Doesn't work. Stuff like this:
//   // .016129032258064516
//   // Gets flagged. 
//   if (uniqueKeyCount >= 10) {
//     console.log(`Number of interest, key unique count: (${uniqueKeyCount}) 1/${denominator} = ${tNum}`);
//   }

//   retObj.uniqueKeyCount = uniqueKeyCount;
//   return retObj;
// }