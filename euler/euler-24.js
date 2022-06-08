// euler 24

/*

// had help since i wandered off: https://www.mathblog.dk/project-euler-24-millionth-lexicographic-permutation/


We know, based off of writing this out
- We have 0123456789, which is 10 digits.
- 10! gives us 3,628,800
- We're trying to find the number at position 1000000
- Abusing one quality, which is that all numbers, at some point, will be in the 0 index (1st position)


// Solver
- We know that in the 10! set, 9! = 362,880 - for positions 0 -> 362880, we know 0 is at the first position. 
- Following that logic, 9! * 2 = 725760, so for position 362880 -> 725760, we know 1 is at the first position
- 9! * 3 is 1088640 - this is slightly over our target of 1000000. So we can safely 100% deduce that 2 is the leading character of position 1000000
- We can now remove 2 from the character set. [0,1,3,4,5,6,7,8,9]
- Repeat this process again and again.
// 2783915460

*/



// Quick helper function
function genFactorialsUpTo(num) {

    var factArr = [1];
    for (var i = 1; i < num; ++i) {
        factArr.push(i * factArr[i - 1]);
    }
    return factArr;

}


// I'm an idiot and didn't want to spent too much time trying to loop this
// Ironically, I should have...
function findIndexGivenCharacterSet(factorialSet, charSet, currentIndex, targetIndex) {

    // Determine which factorial to use
    var currTargetAmt = targetIndex - currentIndex;

    // If the first index of the factorial set is too large
    if (currTargetAmt / factorialSet[0] < 0) {
        // throw an err - ideally, we'll want to recursively call again
        // shouldn't reach here
        console.log("whoa, something happened (factorial too large, trim the leadingone)")

    }

    var index = Math.floor(currTargetAmt / factorialSet[0])
    var progress = (factorialSet[0] * index);
    return {
        "nextVal": charSet[index],
        "progress": progress,
        "newCurrIndex": currentIndex + progress,
        "remainder": targetIndex - (currentIndex + progress)
    };
}



// {nextVal: 2, progress: 725760, newCurrIndex: 725760, remainder: 274240}
findIndexGivenCharacterSet(
    [362880, 40320, 5040, 720, 120, 24, 6, 2, 1, 1],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    0,
    1000000);

// {nextVal: 7, progress: 241920, newCurrIndex: 967680, remainder: 32320}
findIndexGivenCharacterSet(
    [40320, 5040, 720, 120, 24, 6, 2, 1, 1],
    [0, 1, 3, 4, 5, 6, 7, 8, 9],
    725760,
    1000000);

// {nextVal: 8, progress: 30240, newCurrIndex: 997920, remainder: 2080}
findIndexGivenCharacterSet(
    [5040, 720, 120, 24, 6, 2, 1, 1],
    [0, 1, 3, 4, 5, 6, 8, 9],
    967680,
    1000000);

// {nextVal: 3, progress: 1440, newCurrIndex: 999360, remainder: 640}
findIndexGivenCharacterSet(
    [720, 120, 24, 6, 2, 1, 1],
    [0, 1, 3, 4, 5, 6, 9],
    997920,
    1000000);

// {nextVal: 9, progress: 600, newCurrIndex: 999960, remainder: 40}
findIndexGivenCharacterSet(
    [120, 24, 6, 2, 1, 1],
    [0, 1, 4, 5, 6, 9],
    999360,
    1000000);

// {nextVal: 1, progress: 24, newCurrIndex: 999984, remainder: 16}
findIndexGivenCharacterSet(
    [24, 6, 2, 1, 1],
    [0, 1, 4, 5, 6],
    999960,
    1000000);

    // {nextVal: 5, progress: 12, newCurrIndex: 999996, remainder: 4}
    findIndexGivenCharacterSet(
    [6, 2, 1, 1],
    [0, 4, 5, 6],
    999984,
    1000000);

// {nextVal: 5, progress: 3, newCurrIndex: 999998, remainder: 2}
findIndexGivenCharacterSet(
    [2, 1, 1],
    [0, 4, 6],
    999996,
    1000000);

// {nextVal: 6, progress: 4, newCurrIndex: 1000000, remainder: 0}
findIndexGivenCharacterSet(
    [2, 1, 1],
    [0, 4],
    999998,
    1000000);










