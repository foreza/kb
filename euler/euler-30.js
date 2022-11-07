let solverToLimit = (startingNum, upperBound, power) => {

  let solutionArr = [];

  for (let i = startingNum; i <= upperBound; ++i) {

    let tNumString = i.toString();
    let tNumStringArr = tNumString.split("");
    tNumStringArr = tNumStringArr.map((a) => Math.pow(parseInt(a), power))
    let tSum = tNumStringArr.reduce((a,b) => a+b);

    if (tSum == i) {
      console.log("found one: ", tSum);
      solutionArr.push(tSum);
    }
  }


  return solutionArr;
}


// solverToLimit(2,10000, 4); // 1634 + 8208 + 9474 = 19316.

solverToLimit(2,10000, 5); // [4150, 4151]
solverToLimit(2,999999, 5); // [4150, 4151, 54748, 92727, 93084, 194979]
solverToLimit(999999,1999999, 5); // [4150, 4151, 54748, 92727, 93084, 194979]

// Revised version

let revised_solverToLimit = (power) => {

  const UPPER_BOUND = Math.pow(9,power)*5; // Maximum possible number we can grab;
  let solutionArr = [];

  for (let i = 2; i <= UPPER_BOUND; ++i) {

    let tSum = i.toString()
                  .split("")
                  .map((a) => Math.pow(parseInt(a), power))
                  .reduce((a,b) => a+b);

    if (tSum == i) {
      console.log("found one: ", tSum);
      solutionArr.push(tSum);
    }

  }

  return solutionArr;
}
