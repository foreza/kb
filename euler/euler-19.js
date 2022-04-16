
var daysHashMap = {
    0: [], // Mon
    1: [], // Tue    (Note that 1901 starts on a tuesday)  -Tuesday January 1, 1901
    2: [], // Wed
    3: [], // Thur
    4: [], // Fri
    5: [], // Sat
    6: [] // Sun
}

var usualDaysInAYear = [
    31, // Jan
    28, // Feb
    31, // Mar
    30, // Apr
    31, // May
    30, // June
    31, // July
    31, // Aug
    30, // Sep
    31, // Oct
    30, // Nov
    31  // Dec
]

var usualDaysInALeapYear = [
    31, // Jan
    29, // Feb (our +1 use case)
    31, // Mar
    30, // Apr
    31, // May
    30, // June
    31, // July
    31, // Aug
    30, // Sep
    31, // Oct
    30, // Nov
    31  // Dec
]


// start year is 1/1 of that year, to end year is 12/31 of that year
// I solved a bigger problem and then found the dumb answer.
var populateDaysHashMapFromStartYearToEndYearWithStartIndex = 
(map, startYear, endYear, startIndex) => 
{
    console.log(`Populating map with ${startYear} to ${endYear} with index: ${startIndex}`);
    
    var caseHowManySundaysInFirstOfMonth = 0;
    var currDayIndex = startIndex;
    var checkSum = 0;

    for (var i = startYear; i <= endYear; ++i) {
        // console.log("Inserting into map for year: ", i);
        
        var yearArrToUse;

        if (isLeapYear(i)) {
            console.log("Handling leap year - febuary has extra day");
            yearArrToUse = usualDaysInALeapYear;
        } else {
            yearArrToUse = usualDaysInAYear;
        }

        // Loop through the entire year arr and make day strings and add them!
        for (var j = 0; j < yearArrToUse.length; ++j) {

            // For each month, get the amount of days and make strings
            for (var k = 1; k <= yearArrToUse[j]; ++k) {

                if (k == 1 && currDayIndex%7 == 6) {
                    console.log("We found one!") 
                    // Count if first sunday!
                    caseHowManySundaysInFirstOfMonth++;
                }

                // For checking everything and next steps...
                var tDateString = `${j}/${k}/${i}`
                map[currDayIndex%7].push(tDateString);
                currDayIndex++;
                checkSum++;
            }

        }

    }

    console.log("checksum:", checkSum);
    console.log("How many sundays fell on first of month: ", caseHowManySundaysInFirstOfMonth);
    return map;

}


// Utility function to tell me if this is a year or not
var isLeapYear = (year) => {
    // If they are a century, they must be divisible by 400!
    if (year % 100 == 0) {

        console.log("Found a century!", year)

        if (year % 400 == 0) {
            return true;
        } else {
            return false;
        }
    }

    // All (other) leap years are divisible by 4...
    if (year % 4 == 0) {
        return true;
    } else {
        return false;
    }
}


// Tests for isLeapYear

// TESTS SHOULD RETURN TRUE
console.log("1901 is NOT a leap year: ", !isLeapYear(1901));
console.log(`These are all leap years: ${isLeapYear(1936)}, ${isLeapYear(1940)}, ${isLeapYear(1944)}, ${isLeapYear(1948)}, ${isLeapYear(1952)}, ${isLeapYear(1956)}, ${isLeapYear(1960)}, ${isLeapYear(1972)}, ${isLeapYear(1968)}`)


// Solution
daysHashMap = populateDaysHashMapFromStartYearToEndYearWithStartIndex(
    daysHashMap, 1901, 2000, 1
);
