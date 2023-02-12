//A lot of this is ideas copied from Tecendil...

var englishInput = document.getElementById("english")
var tengwarOutput = document.getElementById("output")

function updateOutput(e) {
	tengwarOutput.innerHTML = toCharStrings(e.target.value);
}

englishInput.addEventListener('input', updateOutput);

var fontDataMap = {
	"TengwarTelcontar": {
		"name": "Tengwar Telcontar",
		"font": "fonts/TengwarTelcontar.woff2",
		"fontData": "font-data/TengwarTelcontar.json"
	}
}

import fontData from fontDataMap["TengwarTelcontar"]["fontData"] assert {type: "JSON"};

function toCharStrings(inputString) {
	var splitString = splitCharStrings(inputString);
	console.log("splitString: " + splitString);
	return inputString;
}

function splitCharStrings(inputString) {
	return inputString.matchAll(/^[^\|\{\[]+?(?=[\|\{\[])|(?<=[\|\{\[])[^\|\}\]]+?$|\|.+?\||\{.+?\}|\[.+?\]|(?<=[\|\}\]]).+?(?=[\|\{\[])|^.+?$/g)
} //that regex took way too long...

function toTengwar(inputString) {
	
}
