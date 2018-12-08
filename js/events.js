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
		resultBox.placeholder="You will receive " + (Math.round(totalBatts * 100) / 100) + "(±8) batteries per 24 hours!";
		resultBox.style.display="block";
	}
}
/*(2-10 dorms : 50, 85, 95, 99, 101, 102, 102.5, 103, 103.5) + 11(sum of comfort)/10000-(0.1(sum of comfort)^2)/100000000
batteries you can collect daily, maximum error range ±2*/

//--------------------------------------------------------------------------------------------------------------------------------------
//exp.html
function exp(){
	var dollName = document.getElementById("dollName");
	var linkCount = document.getElementById("links");
	var dollCount = document.getElementById("dollCount");
	var currentLevel = document.getElementById("currentLvl");
	var currentXp = document.getElementById("currentXp");
	var goalLvl = document.getElementById("goalLvl");
	var mapName = document.getElementById("mapName");
	var switchLeader = document.getElementById("switchLeader");
	var switchMvp = document.getElementById("switchMvp");
	var switchEvent = document.getElementById("switchEvent");
	var addBtn = document.getElementById("addBtn");
	var clearBtn = document.getElementById("clearBtn");
	var dataTable = document.getElementById("dataTable");
	var dollReqExpArray = [100,200,300,400,500,600,700,800,900,
	1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,
	2000,2100,2200,2300,2400,2500,2600,2800,3100,3400,
	4200,4600,5000,5400,5800,6300,6700,7200,7700,8200,
	8800,9300,9900,10500,11100,11800,12500,13100,13900,14600,
	15400,16100,16900,17800,18600,19500,20400,21300,22300,23300,
	24300,25300,26300,27400,28500,29600,30800,32000,33200,34400,
	45100,46800,48600,50400,52200,54000,55900,57900,59800,61800,
	63900,66000,68100,70300,72600,74800,77100,79500,81900,84300,
	112600,116100,119500,123100,126700,130400,134100,137900,141800,145700,
	100000,120000,140000,160000,180000,200000,220000,240000,280000,360000,
	480000,640000,900000,1200000,1600000,2200000,3000000,4000000,5000000,6000000];
	var mapArray = [["0-1",480,100],["0-2",490,112],["0-3",500,100],["0-4",500,116],
	["1-2",160,15],["2-3",220,30],["2-1e",250,35],["3-5",290,50],["4-3e",370,75],["5-4",380,80], //3-5 bugged
	["5-6",400,85],["5-2e",410,88],["5-4e",430,93],["5-2n",480,100],["8-1e",480,100]]; //,["",,]
	var expTableBody= expTable.getElementsByTagName('tbody')[0];
	var expTableFooter = expTable.getElementsByTagName('tfoot')[0];

	function addRow(dollname,current,goal,map,basexp,penalty,reqbattles,reqreports)
	{
		expTableBody= expTable.getElementsByTagName('tbody')[0];
		var row = expTableBody.insertRow(expTableBody.rows.length);
		var dollCell = row.insertCell(0);
		var currentCell = row.insertCell(1);		
		var goalCell = row.insertCell(2);
		var mapCell = row.insertCell(3);
		var basexpCell = row.insertCell(4);
		var penaltyCell = row.insertCell(5);
		var reqbattlesCell = row.insertCell(6);
		var reqreportsCell = row.insertCell(7);

		var dollNode = document.createTextNode(dollname);
		var currentNode = document.createTextNode(current);
		var goalNode = document.createTextNode(goal);
		var mapNode = document.createTextNode(map);
		var basexpNode = document.createTextNode(basexp);
		var penaltyNode = document.createTextNode(penalty);
		var reqbattlesNode = document.createTextNode(reqbattles);
		var reqreportsNode = document.createTextNode(reqreports);

		dollCell.appendChild(dollNode);
		currentCell.appendChild(currentNode);
		goalCell.appendChild(goalNode);
		mapCell.appendChild(mapNode);
		basexpCell.appendChild(basexpNode);
		penaltyCell.appendChild(penaltyNode);
		reqbattlesCell.appendChild(reqbattlesNode);
		reqreportsCell.appendChild(reqreportsNode);

	}

	function baseXpAfterPenalty(currentlvl,baseexp,penaltylvl){
		var penaltymultiplier = 0.0;
		console.log('currentlvl: ',currentlvl)
		while(currentlvl>penaltylvl){
			penaltymultiplier += 0.2;
			currentlvl-=10;
		}

		console.log('penalty: ',penaltymultiplier)
		if (penaltymultiplier>=1)
		{
			return 5;
		}
		else{
			console.log('penalty xp: ',baseexp*(1-penaltymultiplier))
			return baseexp*(1-penaltymultiplier);
		}
	}

	clearBtn.onclick=function(){
		expTableBody = expTable.getElementsByTagName('tbody')[0];
		var new_tbody = document.createElement('tbody');
		new_tbody.className = "center";
		expTableBody.parentNode.replaceChild(new_tbody, expTableBody);
		expTableFooter.rows[0].cells[6].innerHTML="–";
		expTableFooter.rows[0].cells[7].innerHTML="–";
	}

	function calculate(){
		var totalBattles = 0;
		var totalReports = 0;
		for (var i = 0, row; row = expTableBody.rows[i]; ++i) {
		   for (var j = 0, col; col = row.cells[j]; j++) {
		   		if (j==6)
		   		{
		   			totalBattles += parseFloat(col.innerHTML);
		   		}
		   		else if (j==7)
		   		{
		   			totalReports += parseFloat(col.innerHTML);
		   		}
		   }
		}
		expTableFooter.rows[0].cells[6].innerHTML=totalBattles;
		expTableFooter.rows[0].cells[7].innerHTML=totalReports;
	}

	function totalRequiredXp(startlvl,endlvl,currentxp){
		console.log(startlvl, ' ',endlvl, ' ',currentxp)
		var totalrequiredxp = 0;
		var requiredXpArray = dollReqExpArray.slice(startlvl-1,endlvl-1);
		requiredXpArray.forEach(i=>{
				totalrequiredxp += i;
			})
		return totalrequiredxp-currentxp;
	}

	function noPenaltyBattles(currentlvl,goallvl,currentxp,links,ldr,mvp,event,baseexp){
		var battles = 0;
		var ldrmultiplier = 1;
		var mvpmultiplier = 1;
		var eventmultiplier = 1;
		var autolink = false;
		var linkmultiplier;
		if (ldr){
			ldrmultiplier = 1.2;
		}
		if (mvp){
			mvpmultiplier =1.3;
		}
		if (event){
			eventmultiplier =1.5;
		}
		switch (links){
			case 0:
				autolink = true;
				break;
			case 1:
				linkmultiplier = 1;
				break;
			case 2:
				linkmultiplier = 1.5;
				break;
			case 3:
				linkmultiplier = 2;
				break;
			case 4:
				linkmultiplier = 2.5;
				break;
			case 5:
				linkmultiplier = 3;
				break;
		}
		if (autolink){
			//10,30,70,90
			if (currentlvl>=1&&currentlvl<10){
				linkmultiplier = 1
				if (goallvl<=10){
					battles += totalRequiredXp(currentlvl,goallvl,currentxp)/((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
					currentxp=0;
					return battles;
				}
				else{
					battles += totalRequiredXp(currentlvl,10,currentxp)/((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
					currentxp=0;
					currentlvl = 10;
				}
			}
			if (currentlvl>=10&&currentlvl<30){
				linkmultiplier = 1.5
				if (goallvl<=30){
					battles += totalRequiredXp(currentlvl,goallvl,currentxp)/((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
					currentxp=0;
					return battles;					
				}
				else{
					battles += totalRequiredXp(currentlvl,30,currentxp)/((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
					currentxp=0;
					currentlvl = 30;
				}
			}
			if (currentlvl>=30&&currentlvl<70){
				linkmultiplier = 2
				if (goallvl<=70){
					battles += totalRequiredXp(currentlvl,goallvl,currentxp)/((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
					currentxp=0;
					return battles;
				}
				else{
					battles += totalRequiredXp(currentlvl,70,currentxp)/((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
					currentxp=0;
					currentlvl = 70;
				}
			}
			if (currentlvl>=70&&currentlvl<90){
				linkmultiplier = 2.5
				if (goallvl<=90){
					battles += totalRequiredXp(currentlvl,goallvl,currentxp)/((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
					currentxp=0;
					return battles;
				}
				else{
					battles += totalRequiredXp(currentlvl,90,currentxp)/((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
					currentxp=0;
					currentlvl = 90;
				}
			}
			if (currentlvl>=90){
				linkmultiplier = 3
				battles += totalRequiredXp(currentlvl,goallvl,currentxp)/((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
			}
		}
		else{
			battles = totalRequiredXp(currentlvl,goallvl,currentxp)/((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
		}
		return battles;
	}

	function penaltyBattles(currentlvl,goallvl,currentxp,links,ldr,mvp,event,baseexp,penaltylvl){
		var battles = 0;
		var ldrmultiplier = 1;
		var mvpmultiplier = 1;
		var eventmultiplier = 1;
		var autolink = false;
		var linkmultiplier;
		var penaltymultiplier;
		if (ldr){
			ldrmultiplier = 1.2;
		}
		if (mvp){
			mvpmultiplier =1.3;
		}
		if (event){
			eventmultiplier =1.5;
		}
		switch (links){
			case 0:
				autolink = true;
				break;
			case 1:
				linkmultiplier = 1;
				break;
			case 2:
				linkmultiplier = 1.5;
				break;
			case 3:
				linkmultiplier = 2;
				break;
			case 4:
				linkmultiplier = 2.5;
				break;
			case 5:
				linkmultiplier = 3;
				break;
		}
		if (autolink){
			//10,30,70,90
			if (currentlvl>=1&&currentlvl<10){
				linkmultiplier = 1
				if (goallvl<=10){
					var now = currentlvl;
					var end = goallvl;
					while (now<end){
						battles += totalRequiredXp(now,++now,currentxp)/((baseXpAfterPenalty(now,baseexp,penaltylvl)*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
						currentxp=0;
					}
					return battles;
				}
				else{
					var now = currentlvl;
					var end = 10;
					while (now<end){
						battles += totalRequiredXp(now,++now,currentxp)/((baseXpAfterPenalty(now,baseexp,penaltylvl)*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
						currentxp=0;
					}
					currentlvl = 10;

				}
			}
			if (currentlvl>=10&&currentlvl<30){
				linkmultiplier = 1.5
				if (goallvl<=30){
					var now = currentlvl;
					var end = goallvl;
					while (now<end){
						battles += totalRequiredXp(now,++now,currentxp)/((baseXpAfterPenalty(now,baseexp,penaltylvl)*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
						currentxp=0;
					}
					return battles;					
				}
				else{
					var now = currentlvl;
					var end = 30;
					while (now<end){
						battles += totalRequiredXp(now,++now,currentxp)/((baseXpAfterPenalty(now,baseexp,penaltylvl)*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
						currentxp=0;
					}
					currentlvl = 30;
				}
			}
			if (currentlvl>=30&&currentlvl<70){
				linkmultiplier = 2
				if (goallvl<=70){
					var now = currentlvl;
					var end = goallvl;
					while (now<end){
						battles += totalRequiredXp(now,++now,currentxp)/((baseXpAfterPenalty(now,baseexp,penaltylvl)*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
						currentxp=0;
					}
					return battles;
				}
				else{
					var now = currentlvl;
					var end = 70;
					while (now<end){
						battles += totalRequiredXp(now,++now,currentxp)/((baseXpAfterPenalty(now,baseexp,penaltylvl)*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
						currentxp=0;
					}
					currentlvl = 70;
				}
			}
			if (currentlvl>=70&&currentlvl<90){
				linkmultiplier = 2.5
				if (goallvl<=90){
					var now = currentlvl;
					var end = goallvl;
					while (now<end){
						battles += totalRequiredXp(now,++now,currentxp)/((baseXpAfterPenalty(now,baseexp,penaltylvl)*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
						currentxp=0;
					}
					return battles;
				}
				else{
					var now = currentlvl;
					var end = 90;
					while (now<end){
						battles += totalRequiredXp(now,++now,currentxp)/((baseXpAfterPenalty(now,baseexp,penaltylvl)*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
						currentxp=0;
					}
					currentlvl = 90;
				}
			}
			if (currentlvl>=90){
				linkmultiplier = 3
				var now = currentlvl
				var end = goallvl
				while (now<end){
					battles += totalRequiredXp(now,++now,currentxp)/((baseXpAfterPenalty(now,baseexp,penaltylvl)*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
					currentxp=0;
				}
			}
		}

		else{
				var now = currentlvl
				var end = goallvl
				while (now<end){
					battles += totalRequiredXp(now,++now,currentxp)/((baseXpAfterPenalty(now,baseexp,penaltylvl)*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier);
					currentxp=0;
				}
			}
			/*
			penaltymultiplier = 0;
			penaltyovershot = penaltylvl;
			do{
				penaltymultiplier += 0.2;
				if (penaltymultiplier==1)
				{
					battles+= totalRequiredXp(penaltyovershot,goallvl,currentxp)/3; //when 100% penalty, lowest is 5xp
				}
				else{
					if (goallvl>penaltyovershot+10){
						battles+= totalRequiredXp(penaltyovershot,penaltyovershot+10,currentxp)/(((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier)*(1-penaltymultiplier));
					}
					else{
						battles+= totalRequiredXp(penaltyovershot,goallvl,currentxp)/(((baseexp*ldrmultiplier*mvpmultiplier*eventmultiplier)*linkmultiplier)*(1-penaltymultiplier));
					}
				}
				currentxp=0;
				penaltyovershot+=10;
			}while (goallvl>penaltyovershot); //cross penalty lvl = -20% xp, every 10 lvls after -20% more xp
		}*/
		return battles;
	}


	addBtn.onclick=function(){
		var name = dollName.value;
		var links=linkCount.selectedIndex; //0=auto
		var count = document.getElementById("dollCount").selectedIndex+1;
		var currentlvl = parseFloat(currentLevel.value)||0;
		var currentxp = parseFloat(currentXp.value)||0;
		var goallvl = parseFloat(goalLvl.value)||0;
		var mapnumber = mapName.selectedIndex-1;
		var boolldr = switchLeader.checked;
		var boolmvp = switchMvp.checked;
		var boolevent = switchEvent.checked;
		if (mapnumber<0||currentlvl<1||currentxp<0||goallvl<=currentlvl||goallvl>120||currentxp>(dollReqExpArray[currentlvl-1])-1){
			alert("Please verify input fields");
			return;
		}
		//xp calculation
		var mapname = mapArray[mapnumber][0];
		var basexp = mapArray[mapnumber][1];
		var penaltylvl = mapArray[mapnumber][2];
		var reqbattles = 0;
		console.log('mapname: ',mapname)
		console.log('basexp: ',basexp)
		console.log('penaltylvl: ',penaltylvl)
		console.log()
		if (goallvl > penaltylvl && currentlvl<penaltylvl){
			//battles with mixed penalty
			console.log("mixpen")
			reqbattles = Math.ceil(noPenaltyBattles(currentlvl,penaltylvl,currentxp,links,boolldr,boolmvp,boolevent,basexp)+
			penaltyBattles(penaltylvl,goallvl,currentxp,links,boolldr,boolmvp,boolevent,basexp,penaltylvl));
		}
		else if(goallvl>penaltylvl && currentlvl>=penaltylvl){
			//battles with all penalty
			console.log("allpen")

			reqbattles = Math.ceil(penaltyBattles(currentlvl,goallvl,currentxp,links,boolldr,boolmvp,boolevent,basexp,penaltylvl));
		}
		else{
			//battles with no penalty
			console.log("nopen")
			reqbattles = Math.ceil(noPenaltyBattles(currentlvl,goallvl,currentxp,links,boolldr,boolmvp,boolevent,basexp));
		}

		var reqreports = Math.ceil(totalRequiredXp(currentlvl,goallvl,currentxp)/3000);

		var bonus = "";
		if (boolldr||boolmvp||boolevent){
			bonus = "[";
			if (boolldr){
				bonus+="LDR"
				if (boolmvp||boolevent){
					bonus+="+"
				}
			}
			if (boolmvp){
				bonus+="MVP";
				if (boolevent){
					bonus+="+";
				}
			}
			if (boolevent){
				bonus+="1.5x";
			}
			bonus+="]";
		}



		for (var i=0;i<count;++i){
			if (!name){
				name = "Doll "+ ((expTable.rows.length)-1).toString();
			}
			addRow(bonus+name,currentlvl,goallvl,mapname,basexp,penaltylvl,reqbattles,reqreports);
			dollName.value = "";
			document.getElementById("dollCount").selectedIndex=0;
			name = ""
			calculate();
		}
	}
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

	function addRow(dollname,basicdata,intdata,advdata,hours,energy)
	{
		dataTableBody= dataTable.getElementsByTagName('tbody')[0];
		var row = dataTableBody.insertRow(dataTableBody.rows.length);
		var dollCell = row.insertCell(0);
		var basicCell = row.insertCell(1);		
		var intCell = row.insertCell(2);
		var advCell = row.insertCell(3);
		var hoursCell = row.insertCell(4);
		var energyCell = row.insertCell(5);

		var dollNode = document.createTextNode(dollname);
		var basicNode = document.createTextNode(basicdata);
		var intNode = document.createTextNode(intdata);
		var advNode = document.createTextNode(advdata);
		var hoursNode = document.createTextNode(hours);
		var energyNode = document.createTextNode(energy);

		dollCell.appendChild(dollNode);
		basicCell.appendChild(basicNode);
		intCell.appendChild(intNode);
		advCell.appendChild(advNode);
		hoursCell.appendChild(hoursNode);
		energyCell.appendChild(energyNode);

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
		dataTableFooter.rows[0].cells[5].innerHTML="–";
	}

	function calculate(){
		var totalBasic = 0;
		var totalInt = 0;
		var totalAdv = 0;
		var totalHours = 0;
		var totalEnergy = 0;
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
		   		else if (j==5){
		   			totalEnergy += parseFloat(col.innerHTML);
		   		}
		   }
		}
		totalEnergy = (Math.round(totalEnergy * 100) / 100);
		dataTableFooter.rows[0].cells[1].innerHTML=totalBasic;
		dataTableFooter.rows[0].cells[2].innerHTML=totalInt;
		dataTableFooter.rows[0].cells[3].innerHTML=totalAdv;
		dataTableFooter.rows[0].cells[4].innerHTML=totalHours;
		dataTableFooter.rows[0].cells[5].innerHTML=totalEnergy;
	}

	addBtn.onclick=function(){
		var before = slBefore.selectedIndex;
		var after = slAfter.selectedIndex;
		var name = dollName.value;
		var count = document.getElementById("dollCount").selectedIndex+1;
		var basic = 0;
		var int = 0;
		var adv = 0;
		var hours = 0;
		var energy = 0;
		//separating data

		if (before<=after&&before>0){
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
				energy += (basic/(215/1));
		   		energy += (int/(98/2));
		   		energy += (adv/(53/3));
		   		energy = (Math.round(energy * 100) / 100);
				addRow(name,basic,int,adv,hours,energy);
				dollName.value = "";
				document.getElementById("dollCount").selectedIndex=0;
				name = ""
				calculate();
			}
		}
		else{
			alert("Please select correct skill levels");
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
		var rarity = document.getElementById("dollRarity").selectedIndex+2;
		var count = document.getElementById("dollCount").selectedIndex+1;
		var cores = 0;
		//separating core

		if (before<=after&&before>0){
			var requiredLinkArray = linkArray.slice(before-1,after);
			requiredLinkArray.forEach(i=>{
				cores += i*rarityArray[rarity-2];
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
		else{
			alert("Please select correct doll links");
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