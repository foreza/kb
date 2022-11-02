/*
 Did some whiteboarding
 After listing out the diags nums:

 1, 3, 5, 7, 9, 13, 17, 21, 25, 31, 37, 43, 49

 I realized we have a pretty basic increment going on

  1, 3, 5, 7, 9 (2)
  9, 13, 17, 21, 25 (4)
  25, 31, 37, 43, 49 (6) ..

  If we collect all these numbers in a set up until 1001, I think we got it!

 */


  let generateDiagNum = (spiralSize) => {

    let finalSet = [1]
    let incrementAmt = 2;

    for (let i = 1, tCounter = 4; i < spiralSize; i+=incrementAmt, tCounter--) {

      if (tCounter == 0) {
        incrementAmt+=2;
        tCounter = 4;
      }

      finalSet.push(i+incrementAmt);
    }

    console.log("Result:", finalSet)

    return finalSet.reduce((a,b)=>a+b);

  }

  console.log(generateDiagNum(1001*1001));


  /* 
    Did I think about drawing the spiral? Absolutely.
    Would that have solved the problem? Probably not easily.
    I needed to just.. write out the numbers...
  */