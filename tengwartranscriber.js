const englishInput = document.getElementById("english")
const tengwarOutput = document.getElementById("output")
const fontAvailable = document.fonts.check("16px Tengwar Telcontar");

const onChange = function(e) {
	tengwarOutput.innerHTML = e.target.value;
}

englishInput.addEventListener('input', onChange);