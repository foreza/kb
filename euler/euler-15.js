

// https://projecteuler.net/problem=15

/*

- I can only move down, or right (no backtracking)
- i have a 20x20 grid.
- for a 2x2 grid, there are 6 possible combinations
    - RRDD
    - RDRD
    - RDDR
    - DRDR
    - DDRR

    2x2 = 4, we can imagine this as 4 coins?

    2^4 = 16. 16 total possible combinations, and 6 valid ones.

    It's sort of like... flipping 4 coins? All permutations?
    But RRRR is not valid.
    DDDD is also not valid.

    If we have D and R as -1 and 1 respectively, we could eliminate all the bad combinations!
    A valid combination must equal 0
    How do I generate all possible (valid) permutations of R and D for 20x20?


    > https://www.stat.berkeley.edu/~stark/SticiGui/Text/counting.htm

    2n different subsets can be formed from a collection of n elements
    So we have here ... 2^20 to start.

    Can we get all combinations and then trim the ones that are invalid?

    Math.pow(2,20) = 1048576

    That's... at least 1 million combinations. Booo. 
    Can we just assume half of them are going to be invalid? :/


    How about a 3x3 grid?

    2^9 = 512
    How many of these are valid?

    RRRDDD
    RRDRDD


    DDDRRR


    The pattern is... every time I make a move..
    I have to take back that move at some point...

   2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.

  ---- 

   After much sweat and tears and agony (and writing stuff out on paper)
   I came to the conclusion that this is a n choose k problem.
   https://www.calculatorsoup.com/calculators/discretemathematics/combinations.php

   I worked out the 2x2, 3x3, 4x4, and 5x5 grids. 

   From there, I figured out that you could bisect each combination set.
   For example, in the 3x3 grid, there were 6 "slots" we have to fill
   (3 choose 3) * 2 gives us the RRR DDD, DDD RRR combination.
   (3 choose 2) * (3 choose 2) * 2 gives us the RDD XXX and DRR combinations.

   From there, I figured out that the n choose k would stop at n/2 (and wouldn't need to *2)
   If n is even (like 20), we'd go to 10. 20,19,18....10
   If n is odd (like 5), we'd go to 3 Math.ceil(n/2). 5,4,3,3,4,5
*/


// Solves for the value of n choose x
function util_NChooseX(n,x) {

  var topCoefArr = [];    // n
  var botCoefArr1 = [];   // x
  var botCoefArr2 = [];   // n-x

  for (var i = n; i > 0; i--) {
    topCoefArr.push(i);
  }

  for (var i = x; i > 0; i--) {
    botCoefArr1.push(i);
  }

  for (var i = n-x; i > 0; i--) {
    botCoefArr2.push(i);
  }

  var top = topCoefArr.reduce((a,b) => a*b);
  var bot1 = botCoefArr1.reduce((a,b) => a*b);
  var bot2 = botCoefArr2.reduce((a,b) => a*b);

  console.log(`calculate ${n}! / (${x}! * ${n-x}!)`)
  console.log(`calculate ${top} / (${bot1} * ${bot2})`)

  return top / (bot1 * bot2);

}


function solveFor20x20Grid(){
  var solArr = [
    1,
    1,
    2 * Math.pow(util_NChooseX(20,19),2),
    2 * Math.pow(util_NChooseX(20,18),2),
    2 * Math.pow(util_NChooseX(20,17),2),
    2 * Math.pow(util_NChooseX(20,16),2),
    2 * Math.pow(util_NChooseX(20,15),2),
    2 * Math.pow(util_NChooseX(20,14),2),
    2 * Math.pow(util_NChooseX(20,13),2),
    2 * Math.pow(util_NChooseX(20,12),2),
    2 * Math.pow(util_NChooseX(20,11),2),
    1 * Math.pow(util_NChooseX(20,10),2)
  ];
  console.log(solArr);

  return solArr.reduce((a,b) => a+b);
}