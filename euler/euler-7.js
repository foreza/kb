

function generatePrimesToX(num) {
	
	// generate the initial list we'll use for the sieve
	var list = [];

	// start from 0 for the sake of keeping things clean
	for (var i = 0; i < num; ++i) {	
		list.push(i);
	}

	// console.log("List generated: ", list);

	// ignore 0 and 1
	// we'll be mutating the list as we go
	for (var j = 2; j < list.length; ++j) {

		if (list[j] == -1) {
			continue;	// go to the next loop,skip
		}

		// Get the array of multiples
		var tArr = helper_GetArrOfMultiples(list[j], num);

		for (var m = 0; m < tArr.length; ++m) {
			// set to -1 so we can filter them out later
			list[tArr[m]] = -1;
		}
	}

	console.log("Filtered list", list);

	// Remove all the -1 values
	return list.filter(i => i > 0);

}


// This helper function will return an array of multiples for the provided number up to a specific length
function helper_GetArrOfMultiples(num, size) {

	// console.log("Generating an arr for: " + num + " up to " + size);

	var arr = [];

	// Don't return the number itself, so start from num*2
	for (var i = num*2; i < size; i += num){
		arr.push(i);
	}

	return arr;

}


// from here, trial and error. 
// I found that 200000 was good enough for me.
var s = generatePrimesToX(200000)

s[10001] = ??? // 104743
