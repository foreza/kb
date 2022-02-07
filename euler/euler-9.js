

// var target = 1000;	// The target to hit

// function generateAllCombinations(bFloor, bMax, cFloor, cMax) {

// 	// generate all possible combinations to try

// 	var combinationsBC = [];

// 	// Outerloop will be b
// 	for (var b = bFloor; b < bMax; ++b) {

// 		for (var c = cFloor; c < cMax; ++c) {

// 			// Valid combinations are only where C > B

// 			if (b == c || b > c) {
// 				continue;
// 			} else {
// 				var t = { "b":b, "c":c }
// 				combinationsBC.push(t);
// 				// console.log("added: ", t);
// 			}

// 		}
// 	}

// 	return combinationsBC;
// }

// function generateAllSmartCombinations(bStart, cMax) {

// 	// generate all possible SMARTER combinations to try

// 	var combinationsBC = [];

// 	var b,c;
// 	// Outerloop will be b
// 	for (b = bStart, c = cMax; b < c; ++b, --c) {

	
// 				var t = { "b":b, "c":c }
// 				combinationsBC.push(t);
// 				console.log("added: ", t);
		
// 	}

// 	return combinationsBC;
// }


// function trial(bFloor, cMax) {

// 	//function trial(bFloor, bMax, cFloor, cMax) {

// 	// var collection = generateAllCombinations(bFloor, bMax, cFloor, cMax);
//     var collection = generateAllSmartCombinations(bFloor, cMax);

// 	// Try them to see if any of them hit the target

// 	for (var i = 0; i < collection.length; ++i) {

// 		var tB = collection[i].b;
// 		var tC = collection[i].c;

// 		var bcTest = getBC(tB, tC);
// 		// if it hits the target, stop right away. otherwise, fail.
// 		if (bcTest == target){
// 			console.log("GOTCHA!" + tB + " " + tC);
// 			var a = getAFromBC(tB, tC);
// 			return {
// 				"A": a, 
// 				"B": tB, 
// 				"C": tC,
// 				"abc": a * tB * tC
// 			}
// 		} else {
// 			var statement = bcTest < target ? "under" : "over"
// 			console.log(statement);
// 		}

// 	}

// 	console.log("No luck out of: " + collection.length);

// }

// function getAFromBC(b,c){
// 	return Math.pow(Math.pow(c,2) - Math.pow(b,2), .5);
// }


// function getBC(b,c){
// 	return b + c + Math.pow(Math.pow(c,2) - Math.pow(b,2), .5);
// }


// getBCThous(2,499)
// 0.9999959919678714

// getBCThous(50,476)

// 200, 425

// function getBCThous(b,c){
// 	return (b + c + Math.pow(Math.pow(c,2) - Math.pow(b,2), .5))/1000;
// }


var eulerLabel = "EULERRUNNER";
var timerStart = () => console.time(eulerLabel);
var timerEnd = () => console.timeEnd(eulerLabel);

// Function that relates b and c.
function getCFromB(b) {
	return ((10000000) - (2000 * b) + (2 * Math.pow(b,2)))/(2000- (2 * b));
}

// Calls the function for start to end val, short terminating if a whole number is found for c given b
function properlySolveGivenB(startVal, endVal){

	timerStart();

	// We'll make use of the relation between B and C as computed above.
	// From initial experimentation, we know that the getBC function represents the curve

	// We'll try all the numbers from start/end val
	// Short terminate if we find a whole number (as we're only expecting one)
	for (var b = startVal; b < endVal; ++b) {

		var tC = getCFromB(b);

		// If no conversion was required
		if (tC == Math.floor(tC)) {
			// console.log("GOTCHA!");
			timerEnd();
			var a = getAFromBC(b, tC);

			return {
				"A": a, 
				"B": b, 
				"C": tC,
				"abc": a * b * tC
			}
		}


	}

	// console.log("womp, womp")
	timerEnd();


}

properlySolveGivenB(2,500); // If we incorrectly call 0,500 - that'll be successfull too...

// A: 375, B: 200, C: 425, abc: 31875000

