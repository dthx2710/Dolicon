var dormDDL = document.getElementById("dormCount");
var dormCount = parseFloat(dormDDL.options[dormDDL.selectedIndex].text);
var comfortInputs = document.getElementsByClassName("dorm");
var calculateButton = document.getElementById("calculateBtn");
var resultBox = document.getElementById("result");
calculateButton.addEventListener("click", calculate);
dormDDL.addEventListener("change", dormCountChanged);


function dormCountChanged(){
		dormCount = parseFloat(dormDDL.options[dormDDL.selectedIndex].text);
		for (var i=2;i<comfortInputs.length;i++){
			comfortInputs[i].classList.add("optionaldorm");
		}
		for (var i=2;i<dormCount;i++){
			comfortInputs[i].classList.remove("optionaldorm");
		}
		resultBox.style.display="none";
}

function calculate(){
	var totalComfort = 0;
	var totalBatts = 0;
	dormCount = parseFloat(dormDDL.options[dormDDL.selectedIndex].text);
	switch (dormCount){
		case 2:
			var InitialBatts=50;
			break;
		case 3:
			var InitialBatts=85;
			break;
		case 4:
			var InitialBatts=95;
			break;
		case 5:
			var InitialBatts=99;
			break;
		case 6:
			var InitialBatts=101;
			break;
		case 7:
			var InitialBatts=102;
			break;
		case 8:
			var InitialBatts=102.5;
			break;
		case 9:
			var InitialBatts=103
			break;
		case 10:
			var InitialBatts=103.5;
			break;
	}
	for (var i=0;i<dormCount;i++){
		var comfort = parseFloat(comfortInputs[i].value) || 0;
		totalComfort += comfort;
	}
	totalBatts = InitialBatts+((11*totalComfort)/10000)-((0.1*(Math.pow(totalComfort,2)))/100000000);
	resultBox.placeholder="You will receive " + (Math.round(totalBatts * 100) / 100) + "(±2) batteries per 24 hours!";
	resultBox.style.display="block";
}




/*(2-10 dorms : 50, 85, 95, 99, 101, 102, 102.5, 103, 103.5) + 11(sum of comfort)/10000-(0.1(sum of comfort)^2)/100000000
batteries you can collect daily, maximum error range ±2*/
