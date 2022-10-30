

function generatePrimesToX(num) {
	
	let list = [];

	for (let i = 0; i < num; ++i) {	 list.push(i); }

	for (let j = 2; j < list.length; ++j) {

		if (list[j] == -1) {
			continue;	// go to the next loop,skip
		}

		let tArr = helper_GetArrOfMultiples(list[j], num);

		for (let m = 0; m < tArr.length; ++m) {
			// set to -1 so we can filter them out later
			list[tArr[m]] = -1;
		}
	}

	return list.filter(i => i > 0);
}


function helper_GetArrOfMultiples(num, size) {
	let arr = [];
	for (let i = num*2; i < size; i += num){
		arr.push(i);
	}
	return arr;
}



function helper_countNumberOfConsecutivePrimesForCoeff(a,b, primeMapRef, ceiling) {

  let counter = 0;
  let tVal;

  // We should never get to the ceil...(or will we?)
  for (let n = 0; n <= ceiling; ++n) {
    tVal = Math.pow(n,2) + (a*n) + b; 

    // If it doesn't exist, time to end the party
    if (typeof (primeMapRef[tVal]) == 'undefined') {
        // console.log(`${tVal} was not found in the map of primes`);
        break;
    }
    counter++;
  }

  return counter;
}



// helper_countNumberOfConsecutivePrimesForCoeff(1,41);      // 40
// helper_countNumberOfConsecutivePrimesForCoeff(-79,1601);  // 80

// We know that a < 1000 and b < 1000
// We could do this a fun way and just do random numbers, or just iterate through all combinations of a... and b... (sigh)


let solver = (aStart, aEnd, bStart, bEnd) => {

  let CEIL = 10000;
  let primeArr = generatePrimesToX(2000); // arbitrary number, but i'm basing this off of the second example which had the maximum prime generated as < 1763
  
  let primeMap = {}
  // First generate a hashmap of all primes. We'll use this to perform a O(1) lookup to validate the # of primes a particular combo of A and B get us
  for (let i = 0; i < primeArr.length; ++i) {
    primeMap[primeArr[i]] = 0; // set it to some value
  }

  let MAX_NUM_PRIMES_FOUND = 0;
  let MAX_A = 0;
  let MAX_B = 0;
  

  for (let a = aStart; a <= aEnd; ++a) {

    for (let b = bStart; b <= bEnd; ++b) {
      let tAmt = helper_countNumberOfConsecutivePrimesForCoeff(a,b, primeMap, CEIL);  
      if (tAmt > MAX_NUM_PRIMES_FOUND) {
        MAX_A = a;
        MAX_B = b;
        MAX_NUM_PRIMES_FOUND = tAmt;
      }
    }

  }


  return {
    num_prime_found : MAX_NUM_PRIMES_FOUND,
    a: MAX_A,
    b: MAX_B
  }
}

solver(-999,999,-1000,1000);