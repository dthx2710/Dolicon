//index.html
function index(){

}






//--------------------------------------------------------------------------------------------------------------------------------------
//battery.html
function battery(){
	var dormDDL = document.getElementById("dormCount");
	var dormCount = parseFloat(dormDDL.options[dormDDL.selectedIndex].text);
	var comfortInputs = document.getElementsByClassName("dorm");
	var calculateButton = document.getElementById("calculateBtn");
	var resultBox = document.getElementById("result");
	calculateButton.addEventListener("click", calculate);
	dormDDL.addEventListener("change", dormCountChanged);


	function dormCountChanged(){
			dormCount = parseFloat(dormDDL.options[dormDDL.selectedIndex].text);
			for (var i=2;i<comfortInputs.length;++i){
				comfortInputs[i].classList.add("optionaldorm");
			}
			for (var i=2;i<dormCount;++i){
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
		for (var i=0;i<dormCount;++i){
			var comfort = parseFloat(comfortInputs[i].value) || 0;
			totalComfort += comfort;
		}
		totalBatts = InitialBatts+((11*totalComfort)/10000)-((0.1*(Math.pow(totalComfort,2)))/100000000);
		resultBox.placeholder="You will receive " + (Math.round(totalBatts * 100) / 100) + "(±2) batteries per 24 hours!";
		resultBox.style.display="block";
	}
}
/*(2-10 dorms : 50, 85, 95, 99, 101, 102, 102.5, 103, 103.5) + 11(sum of comfort)/10000-(0.1(sum of comfort)^2)/100000000
batteries you can collect daily, maximum error range ±2*/

//--------------------------------------------------------------------------------------------------------------------------------------
//exp.html
function exp(){

}



//--------------------------------------------------------------------------------------------------------------------------------------
//data.html
function data(){
	var dollName = document.getElementById("dollName");
	var slBefore = document.getElementById("slBefore");
	var slAfter = document.getElementById("slAfter");
	var dollCount = document.getElementById("dollCount");
	var addBtn = document.getElementById("addBtn");
	var clearBtn = document.getElementById("clearBtn");
	var dataTable = document.getElementById("dataTable");
	var dataArray = [['basic',100,1],['basic',200,2],['basic',300,3],
	['int',120,4],['int',200,6],['int',300,9],['int',400,12],['adv',200,18],['adv',300,24]];
	var dataTableBody= dataTable.getElementsByTagName('tbody')[0];
	var dataTableFooter = dataTable.getElementsByTagName('tfoot')[0];

	slBefore.onchange=function(){
		//only display options smaller than after
	}

	slAfter.onchange=function(){
		//only display options larger than before
	}

	function addRow(dollname,basicdata,intdata,advdata,hours)
	{
		dataTableBody= dataTable.getElementsByTagName('tbody')[0];
		var row = dataTableBody.insertRow(dataTableBody.rows.length);
		var dollCell = row.insertCell(0);
		var basicCell = row.insertCell(1);		
		var intCell = row.insertCell(2);
		var advCell = row.insertCell(3);
		var hoursCell = row.insertCell(4);

		var dollNode = document.createTextNode(dollname);
		var basicNode = document.createTextNode(basicdata);
		var intNode = document.createTextNode(intdata);
		var advNode = document.createTextNode(advdata);
		var hoursNode = document.createTextNode(hours);

		dollCell.appendChild(dollNode);
		basicCell.appendChild(basicNode);
		intCell.appendChild(intNode);
		advCell.appendChild(advNode);
		hoursCell.appendChild(hoursNode);

	}

	clearBtn.onclick=function(){
		dataTableBody = dataTable.getElementsByTagName('tbody')[0];
		var new_tbody = document.createElement('tbody');
		new_tbody.className = "center";
		dataTableBody.parentNode.replaceChild(new_tbody, dataTableBody);
		dataTableFooter.rows[0].cells[1].innerHTML="–";
		dataTableFooter.rows[0].cells[2].innerHTML="–";
		dataTableFooter.rows[0].cells[3].innerHTML="–";
		dataTableFooter.rows[0].cells[4].innerHTML="–";
	}

	function calculate(){
		var totalBasic = 0;
		var totalInt = 0;
		var totalAdv = 0;
		var totalHours = 0;
		for (var i = 0, row; row = dataTableBody.rows[i]; ++i) {
		   for (var j = 0, col; col = row.cells[j]; j++) {
		   		if (j==0)
		   		{
		   			continue;
		   		}
		   		else if (j==1)
		   		{
		   			totalBasic += parseFloat(col.innerHTML);
		   		}
		   		else if (j==2)
		   		{
		   			totalInt += parseFloat(col.innerHTML);
		   		}
		   		else if (j==3)
		   		{
		   			totalAdv += parseFloat(col.innerHTML);
		   		}
		   		else if (j==4)
		   		{
		   			totalHours += parseFloat(col.innerHTML);
		   		}
		   }
		}
		dataTableFooter.rows[0].cells[1].innerHTML=totalBasic;
		dataTableFooter.rows[0].cells[2].innerHTML=totalInt;
		dataTableFooter.rows[0].cells[3].innerHTML=totalAdv;
		dataTableFooter.rows[0].cells[4].innerHTML=totalHours;
	}

	addBtn.onclick=function(){
		var before = slBefore.selectedIndex;
		var after = slAfter.selectedIndex;
		var name = dollName.value;
		var count = document.getElementById("dollCount").selectedIndex||1;
		var basic = 0;
		var int = 0;
		var adv = 0;
		var hours = 0;
		//separating data

		if (before<=after&&before>0&&count<11){
			var requiredDataArray = dataArray.slice(before-1,after);
			requiredDataArray.forEach(i=>{
				if (i[0]=='basic'){
					basic+=i[1];
				}
				else if(i[0]=='int'){
					int+=i[1];
				}
				else if(i[0]=='adv'){
					adv+=i[1];
				}
				hours+=i[2];
			})

			for (var i=0;i<count;++i){
				if (!name){
					name = "Doll "+ ((dataTable.rows.length)-1).toString();
				}
				addRow(name,basic,int,adv,hours);
				dollName.value = "";
				document.getElementById("dollCount").selectedIndex=0;
				name = ""
				calculate();
			}
		}
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------
//cores.html
function core(){
	var dollName = document.getElementById("dollName");
	var linkBefore = document.getElementById("linkBefore");
	var linkAfter = document.getElementById("linkAfter");
	var dollRarity = document.getElementById("dollRarity");
	var dollCount = document.getElementById("dollCount");
	var addBtn = document.getElementById("addBtn");
	var clearBtn = document.getElementById("clearBtn");
	var coreTable = document.getElementById("coreTable");
	var rarityArray = [1,3,9,15];
	var linkArray = [1,1,2,3];
	var coreTableBody= coreTable.getElementsByTagName('tbody')[0];
	var coreTableFooter = coreTable.getElementsByTagName('tfoot')[0];

	linkBefore.onchange=function(){
		//only display options smaller than after
	}

	linkAfter.onchange=function(){
		//only display options larger than before
	}

	function addRow(dollname,rarity,linkbefore,linkafter,core)
	{
		coreTableBody= coreTable.getElementsByTagName('tbody')[0];
		var row = coreTableBody.insertRow(coreTableBody.rows.length);
		var dollCell = row.insertCell(0);
		var rarityCell = row.insertCell(1);		
		var beforeCell = row.insertCell(2);
		var afterCell = row.insertCell(3);
		var coreCell = row.insertCell(4);

		var dollNode = document.createTextNode(dollname);
		var rarityNode = document.createTextNode(rarity);
		var beforeNode = document.createTextNode(linkbefore);
		var afterNode = document.createTextNode(linkafter);
		var coreNode = document.createTextNode(core);

		dollCell.appendChild(dollNode);
		rarityCell.appendChild(rarityNode);
		beforeCell.appendChild(beforeNode);
		afterCell.appendChild(afterNode);
		coreCell.appendChild(coreNode);

	}

	clearBtn.onclick=function(){
		coreTableBody = coreTable.getElementsByTagName('tbody')[0];
		var new_tbody = document.createElement('tbody');
		new_tbody.className = "center";
		coreTableBody.parentNode.replaceChild(new_tbody, coreTableBody);
		coreTableFooter.rows[0].cells[4].innerHTML="–";
	}

	function calculate(){
		var totalCores = 0;
		for (var i = 0, row; row = coreTableBody.rows[i]; ++i) {
		   totalCores += parseFloat(row.cells[4].innerHTML);
		}
		coreTableFooter.rows[0].cells[4].innerHTML=totalCores;
	}

	addBtn.onclick=function(){
		var before = linkBefore.selectedIndex;
		var after = linkAfter.selectedIndex;
		var name = dollName.value;
		var rarity = (document.getElementById("dollRarity").selectedIndex||1)+1;
		console.log(document.getElementById("dollRarity").selectedIndex);
		var count = document.getElementById("dollCount").selectedIndex||1;
		var cores = 0;
		//separating core

		if (before<=after&&before>0&&count<11){
			var requiredLinkArray = linkArray.slice(before-1,after);
			console.log(requiredLinkArray);
			requiredLinkArray.forEach(i=>{
				cores += i*rarityArray[rarity-2];
				console.log(cores);
			})
			for (var i=0;i<count;++i){
				if (!name){
					name = "Doll "+ ((coreTable.rows.length)-1).toString();
				}
				addRow(name,rarity+"*","x"+before,"x"+(after+1),cores);
				dollName.value = "";
				document.getElementById("dollCount").selectedIndex=0;
				name = ""
				calculate();
			}
		}
	}


}


//--------------------------------------------------------------------------------------------------------------------------------------
//craft.html
function craft(){

}

//--------------------------------------------------------------------------------------------------------------------------------------
//page railroad switch
switch (pageId){
	case 0:
		index();
		break;
	case 1:
		battery();
		break;
	case 2:
		exp();
		break;
	case 3:
		data();
		break;
	case 4:
		core();
		break;
	case 5:
		craft();
		break;
}