/*

Assumption: inputfileAsString will contain the entire file like so:

"MARY","PATRICIA","LINDA","BARBARA","ELIZABETH","JENNIFER","MARIA","SUSAN","MARGARET","DOROTHY","LISA","NANCY","KAREN","BETTY","HELEN","SANDRA","DONN....

*/

// let inputfileAsString = '"MARY","PATRICIA","LINDA","BARBARA","ELIZABETH","JENNIFER","MARIA","SUSAN","MARGARET","DOROTHY","LISA","NANCY","KAREN","BETTY","HELEN","SANDRA"';

let convertStringToArr = (inputString) => {
    return inputString.replaceAll("\"", "") // Trim all the quotes
                      .split(",");          // Put them in an array
}


// Helper function that retrieves the value for this problem
let getAlphabeticalValueForName = (name) => {
    let tSum = 0;
    for (var i = 0; i < name.length; ++i) {
        let tVal = name[i].charCodeAt(0) - 64;
        tSum += tVal;
    }
    return tSum;
}


let solverFor22 = () => {
    let nameArr = convertStringToArr(inputfileAsString);

    nameArr = nameArr.sort();         // Default should sort in alphabetical order

    let valueArr = nameArr.map((a) => getAlphabeticalValueForName(a));

    let finalScore = 0;

    for (var i = 0; i < valueArr.length; ++i) {
        let tScore = valueArr[i] * (i+1);
        console.log(tScore);
        finalScore += tScore;
    }
    console.log("Solution:", finalScore)
    return finalScore;
}


console.log("Test: ", getAlphabeticalValueForName("COLIN") == 53); // 53

// 871198282
