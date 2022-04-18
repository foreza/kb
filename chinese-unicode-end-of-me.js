var theirString = "您需要接髮或是編髮的服務嗎"
var myString = "您需要接髮或是編髪的服務嗎"

var mapTheirString = theirString.split("").map(a => a.charCodeAt(0));
var mapMyString = myString.split("").map(b => b.charCodeAt(0));

for (var i = 0; i < mapMyString.length; ++i) {
    if (mapMyString[i] != mapTheirString[i]) {
        console.log(`This character was different. Theirs: ${theirString[i]}, Yours: ${myString[i]}`);
    }
}
