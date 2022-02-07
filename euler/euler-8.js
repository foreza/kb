var s = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450"; // thousand digit number
// var s = "731671765313306249192251196744265747423553491";

function getAllValidCollectionsOf13(numString) {
	
	var collection = [];

	for (var i = 0; i < numString.length - 13; ++i) {

		var tString = numString.substring(i,i+13)

		// Check for addition step
		if (tString[12] != 0) {
			collection.push(tString);
			// console.log("added: ", tString);
			// Don't skip index
			continue;
		}

		// If there is a 0, fast forward. 
		// A 0 included will make the whole product worthless
		i+=12;

	}
	return collection;

}

function findMaxProductOfCollection(arr) {

	var highestProduct = 0;
	var digitArr = [];

	for (var i = 0; i < arr.length; ++i) {

		var tNumArr = util_mapStringToNumArr(arr[i]);
		var tProduct = util_getProductOfNumArr(tNumArr);

		if (tProduct > highestProduct){
			highestProduct = tProduct;
			digitArr = tNumArr;
			console.log("new highest product found: " + highestProduct + "from: " + digitArr);
		}

	}

	return {
		product: highestProduct,
		number: digitArr.reduce((a,b) => ""+a+b)
	}

}


// utility method to return an array of numbers
function util_mapStringToNumArr(numString) {
	return numString.split('').map(a => parseInt(a));
}

function util_getProductOfNumArr(numArr) {
	return numArr.reduce((a,b) => a*b);
}


findMaxProductOfCollection(getAllValidCollectionsOf13(s));

// Notes - I can't read. I don't need the number. That being said, it was nice to know.

