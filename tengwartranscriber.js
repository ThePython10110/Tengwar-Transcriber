//A lot of this is ideas copied from Tecendil...

var englishInput = document.getElementById("english")
var tengwarOutput = document.getElementById("output")

function updateOutput(e) {
	tengwarOutput.innerHTML = parse(e.target.value);
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