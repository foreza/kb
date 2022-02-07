function sum_of_square(start, end) {
	var sum = 0;
	for (var i = start; i <= end; ++i) {
		sum += Math.pow(i,2);
	}
	return sum;
}


function square_of_natural_sum(start, end) {
	var sum = 0;
	for (var i = start; i <= end; ++i) {
		sum += i,2;
	}
	return Math.pow(sum,2);
}


square_of_natural_sum(0,100) - sum_of_square(0,100);