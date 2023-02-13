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


async function getJSON(filePath) {
	var response = await fetch(filePath);
	var json = await response.json();
	json = JSON.stringify(json);
	json = JSON.parse(json);
	return json;
} //This will probably fail.

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
			fontData.then((json) => {resultString += json["charStrings"][charString.substring(1,charString.length - 1)];})
		} //Might work... I hate this whole asynchronous web request thing...
	})
	return resultString;
}
