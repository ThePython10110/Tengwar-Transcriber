//A lot of this is ideas copied from Tecendil...

var englishInput = document.getElementById("english")
var tengwarOutput = document.getElementById("output")

function updateOutput(e) {
	tengwarOutput.innerHTML = toTengwar(toCharStrings(e));
}

englishInput.addEventListener('input', updateOutput);

var fontDataMap = {
	"TengwarTelcontar": {
		"name": "Tengwar Telcontar",
		"font": "fonts/TengwarTelcontar.woff2",
		"fontData": "font-data/TengwarTelcontar.json"
	}
}

var JSONResult;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		JSONResult = JSON.parse(this.responseText);
	}
};

function getJSON(filePath) {
	xmlhttp.open("GET", fontDataMap["TengwarTelcontar"]["fontData"], true);
	xmlhttp.send();
	return JSONResult;
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
