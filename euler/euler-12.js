// The sequence of triangle numbers is generated by adding the natural numbers. 
// So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. 

// The first ten terms would be:

// 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

// Let us list the factors of the first seven triangle numbers:

//  1: 1
//  3: 1,3
//  6: 1,2,3,6
// 10: 1,2,5,10
// 15: 1,3,5,15
// 21: 1,3,7,21
// 28: 1,2,4,7,14,28

// First, we need a function that can generate "triangle" numbers. (easy)

// psuedocode: 
/*
- can use a while loop and specify a "ceiling" number so we don't go infinite.
- raise the floor manually/put as a function param for the caller function
- main function takes in a "position" and returns the triangle number for that position
- essentially a for loop that adds everything up to that number
*/

function generateTriangleNumberForPosition(position) {
	var num = 0;

	for (var i = 1; i <= position; ++i) {
		num += i;
	}

	return num;
}

// test cases:
// generateTriangleNumberForPosition(7); // should be 28

function generateAllTriangleNumbersUpToPosition(position) {
	var collection = [];

	for (var i = 1; i <= position; ++i) {
		collection.push(generateTriangleNumberForPosition(i));
	}

	return collection;

}

// test cases:
generateAllTriangleNumbersUpToPosition(7);


// Next, we need to generate all the factors of the triangle number ( a bit harder)
/*

Aside - 
A brute force method would be to divide each number going down and store which ones divide evenly. 
But this could get expensive. Let's test it out anyway.

Psuedocode:
- for the current triangle number, do a for loop.
- divide the number by the current number until we reach a collision
- (use a hashmap to track which numbers we've seen)
- we are always guranteed to have 1 and itself, so that's cool
*/

function generateFactorsForTriangleNumber(number) {

	var factorArr = [];			// Store our factors here to be returned
	var factorMap = [];			// Check for collisions with this

	// we'll short terminate when we detect a collision.
	for (var i = 1; i < number; ++i) {

		var tResult = number / i;

		// Check to see if it evenly divides
		// if not, short terminate and go back into the loop
		if (tResult != Math.floor(tResult)) {
			continue;
		}

		// check the factorMap to see if the index exists already
		// if it does, terminate since we always add pairs.
		//  otherwise, add it to the hashmap.

		if (factorMap[i] != undefined) {
			console.log("collision found: ", factorMap[i]);
			break;
		}

		// If we've reached this far, add both numbers to the factorArr and the map. 
		factorArr.push(i);
		factorArr.push(tResult);

		// Add something to the map so we know it's defined.
		factorMap[i] = ""; 
		factorMap[tResult] = "";

	}

	return factorArr;		// do we want to sort this?

}

// unit tests
// generateFactorsForTriangleNumber(28);


// Now, let's combine all of these together!

/*

We can probably do this smart, or hard.
I'll be thorough.

generate a triangle number X.
generate factors of triangle number X, 
get the count of factors 
	if the count of factors is < 500, continue
	else, return the current triangle number

*/

function solver(goal) {

	var solution = 0;			
	var currPlacement = 1;		// Starting placement
	var factorGoal = goal;

	// oh boy
	while (true) {

		var triangleNum = generateTriangleNumberForPosition(currPlacement);
		var factors = generateFactorsForTriangleNumber(triangleNum);
		var count = factors.length;

		// Return if we've found the solution
		if (count >= factorGoal) {
			return {
				"currPlacement": currPlacement,
				"count": count,
				"triangleNum": triangleNum
			}
		}
		// increment and do over
		currPlacement++;
	}

}

solver(500);




// {currPlacement: 12375, count: 576, triangleNum: 76576500}





// {currPlacement: 32, count: 20, triangleNum: 528}
// count: 20
// currPlacement: 32


