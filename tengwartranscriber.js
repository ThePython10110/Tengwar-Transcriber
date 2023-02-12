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
	return inputString.matchAll(/^[^\|\{\[]+?(?=[\|\{\[])|(?<=[\|\{\[])[^\|\}\]]+?$|\|.+?\||\{.+?\}|\[.+?\]|(?<=[\|\}\]]).+?(?=[\|\{\[])|^.+?$/g)
} //that regex took way too long...

function toTengwar(inputString) {
	
}
