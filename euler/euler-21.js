/*

Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

Evaluate the sum of all the amicable numbers under 10000.

*/

// High level approach:
/*
  - Start with the highest possible number (10000-1, which is 9999)
  - For that largest number, call getProperDivisorsArrForNum
  - See what we get / what we could potentially re-use rather than having to iterate through everything (On^2) [bad!]

*/


// Function to be invoked for each number to find the proper divisors
// Note: This would be inefficient without some way to shortcut needless checks.
// We can cut executing time in half by not going beyond num/2
let getProperDivisorsArrForNum = (num) => {
  let retArr = [1]; // 1 is always divisible :/  
  for (var i = 2; i <= num/2; ++i) {

    var t = num%i;

    if (t == 0) {
      retArr.push(i);
    }
  }
  return retArr;
}


let getSumForArr = (arr) => {
  return arr.reduce((a,b) => a+b);
}



let findAmicableNumbersUpTo = (limit) => {

  let skipMap = [];
  
  let resArr = [];
  let resArrSet = new Set();

  let skipCount = 0; // for debugging

  for (var i = 1; i <= limit; ++i) {

    // Check to see if this is a number we can skip (using O(1) check)
    if (typeof (skipMap[i]) != 'undefined') {
      // console.log(`found ${i}, skipping`);
      skipCount++;
      continue;
    }
    
    // Check the current relation
    let num1 = getSumForArr(getProperDivisorsArrForNum(i));
    // console.log(`${i} generates proper divisor sum of ${num1} - check 1`);

    // Check to see if the opposite holds true
    let num2 = getSumForArr(getProperDivisorsArrForNum(num1));
    // console.log(`${num1} generates proper divisor sum of ${num2} - check 2`);

    // If we have a match
    if (num2 == i) {
      // console.log(`ermagerd, tuple! {${i}, ${num1}}`);

      // If we're not allowing for n(a) = n(a)..

      if (i == num1) {
        // console.log("Disallowing n(a) == n(a)")
        continue;
      }

      resArrSet.add(i);
      resArrSet.add(num1);      
    }

    // console.log(`Adding 2 to skip: ${num1}, ${num2}`)
    skipMap[num1] = 1;
    skipMap[num2] = 1;    
 }

 console.log(`skipped ${skipCount} out of ${limit} potential`);
 return Array.from(resArrSet.values());
}


var result = findAmicableNumbersUpTo(9999).reduce((a,b) => a+b);
console.log(result);

// Just checking... 40285 doesn't work (I allowed for f(28) == f(28)) - where a ≠ b

// [220, 284, 1210, 1184, 2620, 2924, 5020, 5564, 6232, 6368]
// 31626 :) 



// Tests

// var TestCaseRes220 = [1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110];
// var TestCaseRes284 = [1, 2, 4, 71, 142];

// console.log(`220: ${getProperDivisorsArrForNum(220)} = ${TestCaseRes220}`);
// console.log(`284: ${getProperDivisorsArrForNum(284)} = ${TestCaseRes284}`);

// // Test the sums
// console.log(`${getSumForArr(getProperDivisorsArrForNum(220))} == ${284}`);
// console.log(`${getSumForArr(getProperDivisorsArrForNum(284))} == ${220}`);