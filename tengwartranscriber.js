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


function getJSON(filePath) {
	return JSON.parse(fetch(filePath).then((json) => return json)));
} //This willl probably fail.

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
