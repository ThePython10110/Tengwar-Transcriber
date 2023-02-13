//A lot of this is ideas copied from Tecendil...

var englishInput = document.getElementById("english")
var tengwarOutput = document.getElementById("output")

function updateOutput(e) {
	tengwarOutput.innerHTML = toTengwar(splitCharStrings(e));
}

englishInput.addEventListener('input', updateOutput);

var fontDataMap = {
	"TengwarTelcontar": {
		"name": "Tengwar Telcontar",
		"font": "fonts/TengwarTelcontar.woff2",
		"fontData": "font-data/TengwarTelcontar.json"
	}
}

const request = new XMLHttpRequest();

function getJSON(fileLocation) {
	/*I'm DONE with asynchronous. I know that synchronous requests may slow things down,
	BUT I JUST DON'T CARE. Loading the JSON asynchronously means making LITERALLY EVERYTHING
	THAT DEPENDS ON THIS asynchronous as well, meaning about 50000 "await"s or ".then"s, and I
	don't feel like doing that.*/
	request.open('GET', 'fileLocation', false);  // `false` makes the request synchronous
	request.send(null);

	if (request.status === 200) {
	  return JSON.parse(request.responseText);
	}	
}

fontData = getJSON(fontDataMap["TengwarTelcontar"]["fontData"])

function toCharStrings(inputString) {
	var splitString = splitCharStrings(inputString);
	console.log("splitString: " + splitString);
	return inputString;
}

function splitCharStrings(inputString) {
	return [...inputString.toString().matchAll(/^[^\|\{\[]+?(?=[\|\{\[])|(?<=[\|\}\]])[^\|\}\]]+?$|\|.+?\||\{.+?\}|\[.+?\]|(?<=[\|\}\]]).+?(?=[\|\{\[])|^.+?$/g)]
} //that regex took way too long...

function toTengwar(charStrings) {
	var resultString = "";
	charStrings.forEach(function(charString) {
		charString = charString[0].toString();
		if (charString.startsWith("|")) {
			resultString += charString.substring(1,charString.length - 1);
		}
		else if (charString.startsWith("{") || charString.startsWith("[")) {
			resultString += fontData["charStrings"][charString.substring(1,charString.length - 1)];
		}
	})
	return resultString;
}