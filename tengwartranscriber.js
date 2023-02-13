//A lot of this is ideas copied from Tecendil...

const englishInput = document.getElementById("english")
const tengwarOutput = document.getElementById("output")
const request = new XMLHttpRequest();

var fontDataMap = {
	"TengwarTelcontar": {
		"name": "Tengwar Telcontar",
		"font": "fonts/TengwarTelcontar.woff2",
		"fontData": "font-data/TengwarTelcontar.json"
	}
}


function getJSON(fileLocation) {
	/*I'm DONE with asynchronous. I know that synchronous requests may slow things down,
	BUT I JUST DON'T CARE. Loading the JSON asynchronously means making LITERALLY EVERYTHING
	THAT DEPENDS ON THIS asynchronous as well, meaning about 50000 "await"s or ".then"s, and I
	don't feel like doing that.*/
	request.open('GET', fileLocation, false);  // `false` makes the request synchronous
	request.send(null);

	if (request.status === 200) {
	  return JSON.parse(request.responseText);
	}	
}

var fontData = getJSON(fontDataMap["TengwarTelcontar"]["fontData"])

function updateOutput(e) {
	tengwarOutput.innerHTML = toTengwar(toCharStrings(englishInput.value));
	//console.log(englishInput.value);
}

englishInput.addEventListener('input', updateOutput);


function toCharStrings(inputString) {
	var charStrings = splitCharStrings(inputString);
	var resultString = ""
	//console.log("splitString: " + splitString);
	charStrings.forEach(function (charString) {
		if (/\|.+?\||\{.+?\}|\[.+?\]/.test(charString)) { // |something|, {something}, or [something]
			resultString += fontData["charStrings"][charString.substring(1,charString.length - 1)];
		}
		else if (!(/.*[\|\{\}\[\]].*/.test(charString))) { //make sure it doesn't include |, {, }, [, or }
			;			
		}
	})
	return resultString;
}

function splitCharStrings(inputString) {
	return [...[...inputString.toString().matchAll(/^[^\|\{\[]+?(?=[\|\{\[])|(?<=[\|\}\]])[^\|\}\]]+?$|\|.+?\||\{.+?\}|\[.+?\]|(?<=[\|\}\]]).+?(?=[\|\{\[])|^.+?$/g)][0]];
} //Separates "tengwar|ascii|{tinco}en[ungwe]war" into ["tengwar", "|ascii|", "{tinco}", "en", {ungwe}", "war"]

function toTengwar(inputString) {
	charStrings = splitCharStrings(inputString);
	var resultString = "";
	charStrings.forEach(function(charString) {
		if (/\|.+?\|/.test(charString)) {
			resultString += charString.substring(1,charString.length - 1);
		}
		else if (/\{.+?\}|\[.+?\]/.test(charString)) {
			resultString += fontData["charStrings"][charString.substring(1,charString.length - 1)];
		}
	})
	return resultString;
}