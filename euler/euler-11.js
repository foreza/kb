


// lets start by doing some analysis on the numbers
// im curious to know what the spread is.
// essentially, any 0 would nullify the product, so by skipping 
// whenever we see a 00, we can dramatically shear down the problem size


// var arr = [08,02,22,97,38,15,00,40,00,75,04,05,07,78,52,12,50,77,91,08,49,49,99,40,17,81,18,57,60,87,17,40,98,43,69,48,04,56,62,00,81,49,31,73,55,79,14,29,93,71,40,67,53,88,30,03,49,13,36,65,52,70,95,23,04,60,11,42,69,24,68,56,01,32,56,71,37,02,36,91,22,31,16,71,51,67,63,89,41,92,36,54,22,40,40,28,66,33,13,80,24,47,32,60,99,03,45,02,44,75,33,53,78,36,84,20,35,17,12,50,32,98,81,28,64,23,67,10,26,38,40,67,59,54,70,66,18,38,64,70,67,26,20,68,02,62,12,20,95,63,94,39,63,08,40,91,66,49,94,21,24,55,58,05,66,73,99,26,97,17,78,78,96,83,14,88,34,89,63,72,21,36,23,09,75,00,76,44,20,45,35,14,00,61,33,97,34,31,33,95,78,17,53,28,22,75,31,67,15,94,03,80,04,62,16,14,09,53,56,92,16,39,05,42,96,35,31,47,55,58,88,24,00,17,54,24,36,29,85,57,86,56,00,48,35,71,89,07,05,44,44,37,44,60,21,58,51,54,17,58,19,80,81,68,05,94,47,69,28,73,92,13,86,52,17,77,04,89,55,40,04,52,08,83,97,35,99,16,07,97,57,32,16,26,26,79,33,27,98,66,88,36,68,87,57,62,20,72,03,46,33,67,46,55,12,32,63,93,53,69,04,42,16,73,38,25,39,11,24,94,72,18,08,46,29,32,40,62,76,36,20,69,36,41,72,30,23,88,34,62,99,69,82,67,59,85,74,04,36,16,20,73,35,29,78,31,90,01,74,31,49,71,48,86,81,16,23,57,05,54,01,70,54,71,83,51,54,69,16,92,33,48,61,43,52,01,89,19,67,48];
// for (var i = 0; i < arr.length; ++i){
// 		if (arr[i] == 0) {
// 			console.log("found 0")
// 		}
// 	// setTest.add(arr[i]);
// }

// We have 7 0's. barely enough to be an impact, but it'll help some ..


// step 1 - get all UNIQUE combinations. 

// helper functions...

// get the right 4 digits and return them as an array
// assume we're going to use a 2D matrix


var matrix_test = 
[
[08,02,22,97,38,15,00,40,00,75,04,05,07,78,52,12,50,77,91,08],
[49,49,99,40,17,81,18,57,60,87,17,40,98,43,69,48,04,56,62,00],
[81,49,31,73,55,79,14,29,93,71,40,67,53,88,30,03,49,13,36,65],
[52,70,95,23,04,60,11,42,69,24,68,56,01,32,56,71,37,02,36,91],
[22,31,16,71,51,67,63,89,41,92,36,54,22,40,40,28,66,33,13,80],
[24,47,32,60,99,03,45,02,44,75,33,53,78,36,84,20,35,17,12,50],
[32,98,81,28,64,23,67,10,26,38,40,67,59,54,70,66,18,38,64,70],
];


var matrix_original = 
[
[08,02,22,97,38,15,00,40,00,75,04,05,07,78,52,12,50,77,91,08],
[49,49,99,40,17,81,18,57,60,87,17,40,98,43,69,48,04,56,62,00],
[81,49,31,73,55,79,14,29,93,71,40,67,53,88,30,03,49,13,36,65],
[52,70,95,23,04,60,11,42,69,24,68,56,01,32,56,71,37,02,36,91],
[22,31,16,71,51,67,63,89,41,92,36,54,22,40,40,28,66,33,13,80],
[24,47,32,60,99,03,45,02,44,75,33,53,78,36,84,20,35,17,12,50],
[32,98,81,28,64,23,67,10,26,38,40,67,59,54,70,66,18,38,64,70],
[67,26,20,68,02,62,12,20,95,63,94,39,63,08,40,91,66,49,94,21],
[24,55,58,05,66,73,99,26,97,17,78,78,96,83,14,88,34,89,63,72],
[21,36,23,09,75,00,76,44,20,45,35,14,00,61,33,97,34,31,33,95],
[78,17,53,28,22,75,31,67,15,94,03,80,04,62,16,14,09,53,56,92],
[16,39,05,42,96,35,31,47,55,58,88,24,00,17,54,24,36,29,85,57],
[86,56,00,48,35,71,89,07,05,44,44,37,44,60,21,58,51,54,17,58],
[19,80,81,68,05,94,47,69,28,73,92,13,86,52,17,77,04,89,55,40],
[04,52,08,83,97,35,99,16,07,97,57,32,16,26,26,79,33,27,98,66],
[88,36,68,87,57,62,20,72,03,46,33,67,46,55,12,32,63,93,53,69],
[04,42,16,73,38,25,39,11,24,94,72,18,08,46,29,32,40,62,76,36],
[20,69,36,41,72,30,23,88,34,62,99,69,82,67,59,85,74,04,36,16],
[20,73,35,29,78,31,90,01,74,31,49,71,48,86,81,16,23,57,05,54],
[01,70,54,71,83,51,54,69,16,92,33,48,61,43,52,01,89,19,67,48]
];




// HELPER FUNCTIONs
function isWithinRightBounds(currRowPos) {
	// Check out of bounds on the right
	if (currRowPos > 16) {
		console.log("Out of bounds: right", currRowPos);
		return false;
	} 
	return true;
}

function isWithinDownBounds(currColumnPos) {
	if (currColumnPos > 16) {
		console.log("Out of bounds: down", currColumnPos);
		return false;
	} 
	return true;
}

function isWithinUpBounds(currColumnPos) {
	if (currColumnPos < 4) {
		console.log("Out of bounds: up", currColumnPos);
		return false;
	} return true;
}


function getCollectionForRow(matrix, currRowPos, currColumnPos) {

	var collection = [];

	// Check out of bounds on the right
	if (!isWithinRightBounds(currRowPos)) {
		return collection;
	}

	for (var i = 0; i < 4; ++i) {
		collection.push(matrix[currColumnPos][currRowPos+i])
	}

	return collection;

}

function getCollectionForColumn(matrix, currRowPos, currColumnPos) {

	var collection = [];

	// Check out of bounds on the right
	if (!isWithinDownBounds(currColumnPos)) {
		return collection;
	}

	for (var i = 0; i < 4; ++i) {
		collection.push(matrix[currColumnPos+i][currRowPos])
	}

	return collection;

}

function getCollectionForRightDiagDown(matrix, currRowPos, currColumnPos) {
	var collection = [];

	// Check out of bounds on the right
	if (!isWithinRightBounds(currRowPos) || !isWithinDownBounds(currColumnPos)) {
		return collection;
	}

	for (var i = 0; i < 4; ++i) {
		collection.push(matrix[currColumnPos+i][currRowPos+i])
	}

	return collection;

}

function getCollectionForRightDiagUp(matrix, currRowPos, currColumnPos) {
	var collection = [];

	// Check out of bounds on the right
	if (!isWithinRightBounds(currRowPos) || !isWithinUpBounds(currColumnPos)) {
		return collection;
	}

	for (var i = 0; i < 4; ++i) {
		collection.push(matrix[currColumnPos-i][currRowPos+i])
	}

	return collection;

}

function getAllValidCollections(matrix, currRowPos, currColumnPos) {

	// Calculate all the possibilities
	var rowC = getCollectionForRow(matrix, currRowPos, currColumnPos);
	var colC = getCollectionForColumn(matrix, currRowPos, currColumnPos);
	var diagUpC = getCollectionForRightDiagUp(matrix, currRowPos, currColumnPos);
	var diagDoC = getCollectionForRightDiagDown(matrix, currRowPos, currColumnPos);

	var tCollections = [rowC, colC, diagUpC, diagDoC];

	return tCollections.filter((a) => a.length > 0);
}



function calculateAllCombinations(matrix) {

	var combinations = [];		// store all possible combinations


	// i = y
	for (var i = 0; i < 20; ++i) {

		// j = x
		for (var j = 0; j < 20; ++j) {
			var collections = getAllValidCollections(matrix, j, i);

			for (var z = 0; z < collections.length; ++z) {
				combinations.push(collections[z]);
			}

			console.log("Pushed collections", collections.length);
		}

	}

	return combinations;


}



function getLargestProductOfCombinations(combArr) {

	var largestProduct = 0;
	var largestCollection = [];

	for (var i = 0; i < combArr.length; ++i) {

		var tProduct = combArr[i].reduce((a,b) => a*b);

		if (tProduct > largestProduct) {
			largestProduct = tProduct;
			largestCollection = combArr[i];
		}

	}

	return {
		largestProduct,
		largestCollection
	}

}

// One line to rule them all!

getLargestProductOfCombinations(
	calculateAllCombinations(matrix_original));







