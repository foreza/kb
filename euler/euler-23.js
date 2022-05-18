
    /*
     Step 1: 
     Get all numbers up to 28123 (we can start lower) and 
     categorize them as deficient, perfect, or abundant

     28 is a perfect number
     1 + 2 + 4 + 7 + 14 = 28

     12 is the smallest abundant number
      1 + 2 + 3 + 4 + 6 = 16,

    the smallest number that can be written as the sum of two abundant numbers is 24

    12+12

    Proof: 
    It can be shown that all integers greater than 28123 
    can be written as the sum of two abundant numbers

    However upper limit cannot be reduced any further by analysis 
    even though it is known that the greatest number 
    that cannot be expressed as the sum of two abundant numbers 
    is less than this limit.

    This suggests that at some point, the space between abundant numbers 
    will increase until we hit the last abundant number


    Find the sum of all the positive integers which 
    cannot be written as the sum of two abundant numbers.


    - So we are looking for all abundant numbers? (categorize all numbers up to 14062? or larger)
    - We need to then sum them up all against each other (and themselves) to obtain a map of all abundant sums
    - We can then remove those / filter them out (with the upper limit of 28123)


    */ 

    /*
        0 - deficient
        1 - perfect
        2 - abundant
    */
    function getTypeOfNumber(number) {

        var dArr = util_getProperDivisors(number);
        var sum = dArr.reduce((a,b) => a+b);

        if (sum <  number) { return 0; }
        if (sum == number) { return 1; }
        if (sum >  number) { return 2; }

    }


    // Return an array of proper divisor for the given number
    function util_getProperDivisors(number) {

        if (number <= 1) {
            return [1];
        }

        var propDivisorArr = [];
        for (var i = 1; i < number; ++i) {
            var r = number % i;
            if (r == 0) {
                propDivisorArr.push(i);
            }
        }
        return propDivisorArr;
    }


    // Tests
    // console.log(`util_getProperDivisors(28) = 1, 2, 4, 7, 14 :  ${util_getProperDivisors(28)}`);
    // console.log(`util_getProperDivisors(12) = 1, 2, 3, 4, 6:  ${util_getProperDivisors(12)}`);
    // console.log(`util_getProperDivisors(14) = 1, 2, 7 :  ${util_getProperDivisors(14)}`);

    // console.log(`getTypeOfNumber(12) = Abundant (2): ${getTypeOfNumber(12)}`);
    // console.log(`getTypeOfNumber(28) = Perfect (1): ${getTypeOfNumber(28)}`);
    


    function sortAllNumbersTo(ceiling) {        
        var abundArr = [];
        var perfArr = [];
        var defiArr = [];

        for (var i = 1; i < ceiling; ++i) {

            var res = getTypeOfNumber(i);
            // console.log(`${i} is type ${res}`);
            switch (res) {
                case 0: 
                    defiArr.push(i);
                    break;
                case 1: 
                    perfArr.push(i);
                    break;
                case 2:
                    abundArr.push(i);
                    break;
            }

        }

        return {
            "abundantArr": abundArr, 
            "perfectArr": perfArr, 
            "deficientArr" :defiArr
        }
    }


    // Sums up all numbers against themselves and all other members of the array
    // Returns a single unique list of number sums
    function generateListOfSelfSumsFromArr(arr) {

        var uSet = new Set();

        // Nested for loop to make a set
        for (var i = 0; i < arr.length; ++i) {

            for (var j = i; j < arr.length; ++j) {
                var num = arr[j]+arr[i];
                // console.log(`${arr[j]}+${arr[i]}=${num}`);
                uSet.add(num);
            }

        }
        
        return Array.from(uSet);

    }

    

    // to help comparisons be quicker with the tradeoff being the space
    function convertArrToMap(arr) {

        var retMap = {};
        for (var i = 0; i < arr.length; ++i) {
            retMap[arr[i]] = "";
        }

        return retMap;
    }


    function generatePlaceholderArrOfAllNumbersTo(limit) {
        var retArr = [];
        for (var i = 1; i <= limit; i++) {
            retArr.push(i);
        }
        return retArr;
    }    


    // utility function that returns all elements in arr
    // that weren't found in the map
    function returnNonMatchesForMapToArr(map, arr) {

        var nonMatchArr = [];

        for (var i = 0; i < arr.length; ++i) {

            // If we can't find the element in the map, add it to our return list
            if (typeof map[arr[i]] == 'undefined') {
                nonMatchArr.push(arr[i]);
            }
        }

        return nonMatchArr;

    }

   // perfectArr: (5) [1, 6, 28, 496, 8128] interesting! very few perfect numbers
   // mostly deficient numbers (as expected) 10566 to be exact
   // rest are all abundant, 3490


  // var targetNum = 28123; // Set our cap
  var targetNum = 40000; // Set our cap - doesn't matter after 28123

   // Step 1: Get all the numbers up to X sorted so we know which ones are abundant
   var result = sortAllNumbersTo(targetNum); 

   // Step 2: (expensive) Sum up all of the numbers against each other and get the uniques
   var abundantSumList = generateListOfSelfSumsFromArr(result.abundantArr);
   var abundantSumMap = convertArrToMap(abundantSumList);

   
   console.log(`abundantSumList: ${abundantSumList}`)


   // Step 3: Find all the numbers that AREN'T in the set (part 1 of the solution)
   var allNumArr = generatePlaceholderArrOfAllNumbersTo(targetNum);
   var uniqueArr = returnNonMatchesForMapToArr(abundantSumMap, allNumArr);
   console.log(`uniqueArr: ${uniqueArr}`)

   // Step 4: Join the arrays, and get their sum
   var solution23 = uniqueArr.reduce((a,b) => a+b);

   console.log(`Solution 23: ${solution23}`)
