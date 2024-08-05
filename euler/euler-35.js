
// Function to generate all primes in a map for easy elimintation.
function getAllPrimeNumbersToLimit(limit, mapRef) {

    mapRef = {};

    for (var x = 2; x < limit; ++x) {
        mapRef[x] = "";
    }

    for (var i = 2; i < limit; ++i) {
        for (var j = i * 2; j < limit; j += i) {
            delete mapRef[j];
        }
    }
    return mapRef;
}

// Step 2: for each prime, group them into permutation and dequeue them as we filter.

// mutate the primeArrMap list as input as we're going through it
function sortPrimesAsCircular(mapRef) {

    // For the input number, get all permutations.
    var mapKeys = Object.keys(mapRef);

    for (var i = 0; i < mapKeys.length; ++i) {
        var currPrime = mapKeys[i];

        var tPermArr = getAllCircularPermutationsForNumber(currPrime);
        let toRemove = false;

        // TODO: Optimize this since we're doing multiple deletions..
        for (var j = 0; j < tPermArr.length; ++j) {

            // If we detect even one of them doesn't exist, short terminate
            if (typeof mapRef[tPermArr[j]] == 'undefined') {
                toRemove = true;
                break;
            }
        }

        // Removal loop runs.
        // TODO: optimize this..
        if (toRemove) {
            for (var k = 0; k < tPermArr.length; ++k) {
                delete mapRef[tPermArr[k]]
            }
        } else {
            console.log("Circular prime, congrats: ", currPrime);
        }

    }

    return mapRef;
}


function getAllCircularPermutationsForNumber(number) {

    var numArr = number.toString().split("");
    console.log("Calling rotator with:", numArr);

    var permArr = rotator(numArr)
        .map((a) => parseInt(a.join("")))                  // Re-create numbers
        .filter((a) => (a + "").length == numArr.length);  // Remove the ones that aren't same # of digits

    // Insert into a set to remove duplicates
    var retArrSet = new Set();
    for (var i = 0; i < permArr.length; ++i) {
        retArrSet.add(permArr[i]);
    }

    return Array.from(retArrSet);
}


// Utility function to rotate a given array.
let rotator = (inputArr) => {

    console.log("inputArr: ", inputArr);

    // inputArr = inputArr.toString().split("").filter((a) => a != ",");
    inputArr = inputArr.toString().split("");
    console.log("inputArr: ", inputArr);

    let result = [];

    var copy = inputArr.slice();

    for (var i = 0; i < inputArr.length; ++i) {
        var top = copy.splice(0, 1);
        copy.push(top[0]);
        result.push(copy.slice());
    }

    return result;
}

// Actual solving
// let primeArrMap = {};

// primeArrMap = getAllPrimeNumbersToLimit(1000000, primeArrMap); // TODO: make this 1000000
// console.log(primeArrMap);

// primeArrMap = sortPrimesAsCircular(primeArrMap);
// console.log(Object.keys(primeArrMap).length);


getAllCircularPermutationsForNumber(145892);