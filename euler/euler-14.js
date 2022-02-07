
/*

{topValue: 837799, topLength: 525, map: {…}}
map: {1: 1, 2: 2, 3: 8, 4: 3, 5: 6, 6: 9, 7: 17, 8: 4, 9: 20, 10: 7, 11: 15, 12: 10, 13: 10, 14: 18, 15: 18, 16: 5, 17: 13, 18: 21, 19: 21, 20: 8, 21: 8, 22: 16, 23: 16, 24: 11, 25: 24, 26: 11, 27: 112, 28: 19, 29: 19, 30: 19, 31: 107, 32: 6, 33: 27, 34: 14, 35: 14, 36: 22, 37: 22, 38: 22, 39: 35, 40: 9, 41: 110, 42: 9, 43: 30, 44: 17, 45: 17, 46: 17, 47: 105, 48: 12, 49: 25, 50: 25, 51: 25, 52: 12, 53: 12, 54: 113, 55: 113, 56: 20, 57: 33, 58: 20, 59: 33, 60: 20, 61: 20, 62: 108, 63: 108, 64: 7, 65: 28, 66: 28, 67: 28, 68: 15, 69: 15, 70: 15, 71: 103, 72: 23, 73: 116, 74: 23, 75: 15, 76: 23, 77: 23, 78: 36, 79: 36, 80: 10, 81: 23, 82: 111, 83: 111, 84: 10, 85: 10, 86: 31, 87: 31, 88: 18, 89: 31, 90: 18, 91: 93, 92: 18, 93: 18, 94: 106, 95: 106, 96: 13, 97: 119, 98: 26, 99: 26, 100: 26, …}
topLength: 525
topValue: 837799

Notes -

I went for a recursive approach initially (though I didn't know it) and quickly ran into a wall.

In the end, I still opted for an iterative approach with hashing.

*/


// n,n/2 (n is even)
// n,3n + 1 (n is odd)
// 13,40,20,10,5,16,8,4,2,1


/*

13 was 26


Chain is a map
[null,1,2,null,4,5,...8..10 13.16...20......40]

Which starting number, under one million, produces the longest chain?

v1.. 

// 0. make a hashmap data structure
// 1. onboard all existing known data points into hashmap
// 2. take the last number in the chain (lastNumInChain)
// 3. calculate both past possibilities with lastNumInChain (even and odd)
// 4. check even possibility in the existing data structure
//    a. if not yet found, add even possibility to data structure. update lastNumInChain to even.
//    b. else, add odd possibility to data structure.  update lastNumInChain to odd.
// 5. go back to step 3
// 6. terminate once a specific ceil value is calculated ..
*/

var emptyMap = {};
var startingValues = [1, 2, 4, 8, 16, 5, 10, 20, 40, 13];

// Be able to pass the results into the solver.
function solver(ceiling, map, knownValues) {
  
  // Get the last number from the known values.
  var lastNumInChain = knownValues[knownValues.length-1];

  var counter = 0;

  while (counter < ceiling) {
    var possibilityTuple = calculatePastPossibilityForTuple(lastNumInChain);

    // if the key doesn't exist in the map add it. 
    // note: assumption is that if it's not even, it's the odd typle

    // Ensure odd is a whole number
    if (Math.floor(possibilityTuple.odd) == possibilityTuple.odd && 
    map[possibilityTuple.odd] == undefined) {
      console.log("didn't find valid odd possibility, adding: ", possibilityTuple.odd)
      lastNumInChain = possibilityTuple.odd;
      map[lastNumInChain] = util_getMapSize(map);   // Set the value of the key to the length.
    } else if (map[possibilityTuple.even] == undefined) {
      console.log("didn't find even possibility, adding: ", possibilityTuple.even)
      lastNumInChain = possibilityTuple.even; 
      map[lastNumInChain] = util_getMapSize(map);   // Set the value of the key to the length.
    } 
    

    knownValues.push(lastNumInChain)
    counter++;
  }

  console.log("Hit ceiling of: ", ceiling);

  return knownValues;

}






function prepareMap(map, knownValArr) {

  for (var i = 0; i < knownValArr.length; ++i) {
    // Create the index, and set it to the current length
    map[knownValArr[i]] = i;
  }

  return map;

}


function util_getMapSize(map){
  return Object.keys(map).length;
}


// For first run, prepare map object.
// emptyMap = prepareMap(emptyMap, startingValues);

// Start the solver.
// var result = solver(100, emptyMap, startingValues);


// checks an input array from back to front to ensure this was a valid chain
function calculateSequenceForNum(value) {

  var tArr = [value];
  
  while (value > 1) {
    if (value % 2 == 0) {
      value = value/2
      tArr.push(value);
      
    } else {
      value = (3*value)+1
      tArr.push(value);
    }

  }
  return tArr;
}


/*
  Given an initial value and a lookupMap ()
  Return an result object with:
  {
    valueArrLength: <The expected generated sequence length>
    updatedLookupMap: <The lookupMap>
  }
  We will short terminate this as soon as we detect a value that exists.
  Expect the first few runs to take longer, and subsequent calls (with a larger lookupMap) to resolve quicker!
*/

{topValue: 7532665, topLength: 616, map: {…}}


function calculateSequenceForNumWithMapLookup(value, lookupMap) {

  var tArr = [value]; // Create a temp array. 
  
  // Try to short terminate if possible if we've seen this number before.
  if (lookupMap[value] != undefined) {
    // console.log("This value exists already! Skip!", value)
    return {
      updatedLookupMap: lookupMap,
      valueArrLength: lookupMap[value]
    }
  }

  // We'll do this until 1 - this is relatively cheap? 
  while (value > 1) {

    // For an even number, we divide by 2.
    if (value % 2 == 0) {
      value = value/2;
    } else {
      value = (3*value)+1
    }
    tArr.push(value);
  }

  for (var i = 0; i < tArr.length; ++i) {
    if (lookupMap[tArr[i]] == undefined){
      // console.log("Number doesn't exist in lookupMap - adding it!", tArr[i])
      lookupMap[tArr[i]] = tArr.length - i;
    } else {
      // Do nothing here.
    }
  }

  return {
    updatedLookupMap: lookupMap,
    valueArrLength: tArr.length
  }
}


function solutionRunnerEuler14(initialValue, stoppingValue, seedMap){
  
  var lookupMap = seedMap; // The loop will update this map
  var topLength = 0;  // The loop will compare this constantly
  var topValue = 0;   // This will be set if a new top length is found.

  for (var i = initialValue; i > stoppingValue; --i) {

    var resultTuple = calculateSequenceForNumWithMapLookup(i, lookupMap);
    lookupMap = resultTuple.updatedLookupMap;

    if (resultTuple.valueArrLength > topLength) {
      console.log("Found new top length for: ", i);
      topLength = resultTuple.valueArrLength;
      topValue = i;
    }
  }


  return { 
    topValue: topValue,
    topLength: topLength,
    map: lookupMap
  }
}

solutionRunnerEuler14(1000000,999995, {});


{topValue: 837799, topLength: 525, map: {…}}
map: {1: 1, 2: 2, 3: 8, 4: 3, 5: 6, 6: 9, 7: 17, 8: 4, 9: 20, 10: 7, 11: 15, 12: 10, 13: 10, 14: 18, 15: 18, 16: 5, 17: 13, 18: 21, 19: 21, 20: 8, 21: 8, 22: 16, 23: 16, 24: 11, 25: 24, 26: 11, 27: 112, 28: 19, 29: 19, 30: 19, 31: 107, 32: 6, 33: 27, 34: 14, 35: 14, 36: 22, 37: 22, 38: 22, 39: 35, 40: 9, 41: 110, 42: 9, 43: 30, 44: 17, 45: 17, 46: 17, 47: 105, 48: 12, 49: 25, 50: 25, 51: 25, 52: 12, 53: 12, 54: 113, 55: 113, 56: 20, 57: 33, 58: 20, 59: 33, 60: 20, 61: 20, 62: 108, 63: 108, 64: 7, 65: 28, 66: 28, 67: 28, 68: 15, 69: 15, 70: 15, 71: 103, 72: 23, 73: 116, 74: 23, 75: 15, 76: 23, 77: 23, 78: 36, 79: 36, 80: 10, 81: 23, 82: 111, 83: 111, 84: 10, 85: 10, 86: 31, 87: 31, 88: 18, 89: 31, 90: 18, 91: 93, 92: 18, 93: 18, 94: 106, 95: 106, 96: 13, 97: 119, 98: 26, 99: 26, 100: 26, …}
topLength: 525
topValue: 837799



function calculatePastPossibilityForTuple(num) {
  evenPast = num * 2;
  oddPast = (num - 1) / 3
  return { even: evenPast, odd: oddPast }
}




function generateSetForLimit(limit) {

  var setObj = {
    1:1,  // The key is the current number, the value the length it would generate
    2:2
  }

  var queue = [2];  // While there are items in the dupes queue, we need to clear all of them.

  // Keep going until we hit the limit.
  for (var i = 0; i < limit; ++i) {

    if (queue.length == 0) {
      console.log("Queue is empty? Done with this iteration: ", i)
      continue;
    }
    // Always gurantee we have queue of some size here?

    console.log("Generating for: ", queue[0]);  // Always look at the index
    var t = calculatePastPossibilityForTuple(queue[0]);
    console.log("Results: ", t);

    // Case 1: If the possibility tuple for odd is not an integer
    // Go with the even choice as it's the only valid choice.
    if (Math.floor(t.odd) != t.odd) {
      queue.push(t.odd);
      queue.pop();  // remove the last value.
      continue; 
    }
    
    // Case 2: Now, both values could be equally likely. Handle them differently. 

    // Check if the even value exists.
    if (setObj[t.even] == undefined) {
      // It doesn't exist - add to queue for processing.
    }

    if (setObj[t.odd] == undefined) {
      // It doesn't exist - add to queue for processing.
    }

    // Otherwise, also check to make sure the odd tuple doesn't already exist (we'll optimize this later)
    if (
        set.indexOf(t.odd) == -1) {
      lastNum = t.odd;
    } else {
      lastNum = t.even;
    }


    console.log("Next step is: ", lastNum);
    set.push(lastNum);
  }
  return set;
}


// perform "calculate sequence for num" and populate some map
// facts: a given value will always give the same length.
// if another number is generated by that value (and already exists in the map) we don't need to solve more
// there will be no "duplicates?" in the map

/*
  1. perform calculate sequence for num for some given input X
  2. for each of those initial numbers, index them based off of their position
    - ex: calculateSequenceForNum(14)
    (18) [14, 7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]
    - the value '14' will always generate at the same index.
  // Question - why can't we generate it the other way if we know this?
  // So what generated 14? Either 28 (it is) or 14/3, which is not a valid number. 
*/


/*


calculateSequenceForNum(20)
(8) [20, 10, 5, 16, 8, 4, 2, 1]

calculateSequenceForNum(3)
(8) [3, 10, 5, 16, 8, 4, 2, 1]

Both return the same length. So... which one is accurate?
Do we take both branches? Good grief!
I think it makes sense to always take the smaller number first since the larger number is going to be encountered later?
Also - the odd number will almost always get us the longer chain...

Testing this theory seems to yield a really bad chain that grew too fast.
So... no.

[1, 2, 4, 8, 16, 5, 10, 3, 6, 12, 24, 48, 96, 192, 384, 768, 1536, 3072.. (way too fast!)

*/