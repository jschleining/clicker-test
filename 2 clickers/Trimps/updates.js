//I made this, don't steal it and stuff.


function tooltip(what, isItIn, event) {
	var elem = document.getElementById("tooltipDiv");
	if (what == "hide"){
		elem.style.display = "none";
		return;
	}
	if (document.getElementById(what + "Alert") !== null)	document.getElementById(what + "Alert").innerHTML = "";
	if (document.getElementById(isItIn + "Alert") !== null)	document.getElementById(isItIn + "Alert").innerHTML = "";
	if (event != "update"){
		var cordx = 0;
		var cordy = 0;
		var e = event || window.event;
		if (e.pageX || e.pageY) {
			cordx = e.pageX + 25;
			cordy = e.pageY;
		} else if (e.clientX || e.clientY) {
			cordx = e.clientX + 25;
			cordy = e.clientY;
		}
		elem.style.left = cordx;
		elem.style.top = (cordy - 200);
	}
	var tooltipText;
	var costText = "";
	var toTip;
	var price;
	var canAfford;
	if (isItIn !== null && isItIn != "maps"){
		toTip = game[isItIn];
		toTip = toTip[what];
		tooltipText = toTip.tooltip;
		for (var cost in toTip.cost) {
			if (typeof toTip.cost[cost] === 'object' && typeof toTip.cost[cost][1] === 'undefined') {
				var costItem = toTip.cost[cost];
				for (var item in costItem) {
					price = costItem[item];
					if (typeof price === 'function') price = price();
					if (typeof price[1] !== 'undefined') price = resolvePow(price, toTip);
					var itemToCheck = game[cost];
					if (typeof itemToCheck[item] !== 'undefined'){
						canAfford = (itemToCheck[item].owned >= price) ? "green" : "red";
						costText += '<span class="' + canAfford + '">' + item + ':&nbsp;' + prettify(price) + '</span>, ';
					}
					else
					costText += item + ": " + prettify(price) + ", ";
				}
				continue;
			}
			price = (typeof toTip.cost[cost] === 'function') ? toTip.cost[cost]() : toTip.cost[cost];
			if (typeof price[1] !== 'undefined') price = resolvePow(price, toTip);
			if (typeof game.resources[cost] !== 'undefined'){
				canAfford = (game.resources[cost].owned >= price) ? "green" : "red";
				costText += '<span class="' + canAfford + '">' + cost + ':&nbsp;' + prettify(price) + '</span>, ';				
			}
			else
			costText += cost + ": " + prettify(price) + ", ";
		}
		costText = costText.slice(0, -2);
	}
	if (what == "Battle"){
		tooltipText = "Send your poor Trimps to certain doom in the battlefield. You'll get cool stuff though, they'll understand.";
		costText = (game.resources.trimps.maxSoldiers > 1) ? "s" : "";
		costText = game.resources.trimps.maxSoldiers + " Trimp" + costText;
	}
	if (what == "AutoFight"){
		tooltipText = "Allow the Trimps to start fighting on their own whenever their town gets overcrowded";
		costText = "";
	}
	if (what == "Queue"){
		tooltipText = "This is a structure in your queue, you'll need to click \"Build\" to build it. Clicking an item in the queue will cancel it for a full refund.";
		costText = "";
	}
	if (what == "Export"){
		tooltipText = "This is your save string. There are many like it but this one is yours. Save this save somewhere safe so you can save time next time. <br/><br/><textarea style='width: 100%' rows='10'>" + save(true) + "</textarea>";
		costText = "<div class='maxCenter'><div class='btn btn-info' onclick='tooltip(\"hide\")'>Got it</div></div>";
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	if (what == "Import"){
		tooltipText = "Import your save string! It'll be fun, I promise.<br/><br/><textarea id='importBox' style='width: 100%' rows='10'></textarea>";
		costText="<div class='maxCenter'><div class='btn btn-info' onclick='load(true)'>Import</div><div class='btn btn-info' onclick='tooltip(\"hide\")'>Cancel</div></div>";
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	if (what == "Fire Trimps"){
		if (!game.global.firing)
		tooltipText = "Activate firing mode, turning the job buttons red, and forcing them to fire trimps rather than hire them. You will not receive a refund on resources, be careful where you put your Trimps!";
		else
		tooltipText = "Disable firing mode";
		costText = "";
	}
	if (what == "Maps"){
		if (!game.global.mapsActive)
		tooltipText = "Leave your current world temporarily and enter the Map Chamber";
		else
		tooltipText = "Go back to to the World Map.";
		costText = "";
	}
	if (isItIn == "jobs"){
		if (game.global.firing){
			tooltipText = "Fire a " + what + ". Refunds no resources, but frees up some workspace for your Trimps.";
			costText = "";
		}
		else{
			costText = getTooltipJobText(what);
		}
		if (game.global.buyAmt > 1) what += " X" + game.global.buyAmt;
	}
	if (isItIn == "maps"){
		tooltipText = "This is a map. Click it to see its properties or to run it. Maps can be run as many times as you want.";
		costText = "";
	}
	var tipSplit = tooltipText.split('$');
	if (typeof tipSplit[1] !== 'undefined'){
		if (tipSplit[1] == 'incby'){
			tooltipText = tipSplit[0] + prettify(toTip.increase.by) + tipSplit[2];
		}
		else
		tooltipText = tipSplit[0] + prettify(toTip[tipSplit[1]]) + tipSplit[2];
	}
	document.getElementById("tipTitle").innerHTML = what;
	document.getElementById("tipText").innerHTML = tooltipText;
	document.getElementById("tipCost").innerHTML = costText;	
	elem.style.display = "block";
}

function prettify(number) {
	number = Math.round(number * 1000000) / 1000000;
	var base = 0;
	while (number >= 1000){
		number /= 1000;
		base++;
	}
	if (base === 0) return prettifySub(number);
	var suffix;
	switch (base) {
		case 1: 
			suffix = "K";
			break;
		case 2: 
			suffix = "M";
			break;
		case 3:
			suffix = "B";
			break;
		case 4:
			suffix = "T";
			break;
		case 5: 
			suffix = "Qa";
			break;
		case 6:
			suffix = "Qi";
			break;
		case 7:
			suffix = "Sx";
			break;
		case 8:
			suffix = "Sp";
			break;
		case 9:
			suffix = "Oc";
			break;
		case 10:
			suffix = "No";
			break;
		case 11:
			suffix = "Dc";
			break;
	}
	if (base > 11) suffix = "++";
	return prettifySub(number) + suffix;
}

function romanNumeral(number){
//This is only accurate up to 399, but that's more than plenty for this game. Probably not the cleanest converter ever, but I thought of it myself, it works, and I'm proud.
	var numeral = "";
	while (number >= 100){
		number -= 100;
		numeral += "C";
	}
	//77
	if (number >= 90){
		number -= 90;
		numeral += "XC";
	}
	if (number >= 50){
		number -= 50;
		numeral += "L";
	}
	if (number >= 40){
		number -= 40;
		numeral += "XL";
	}
	while (number >= 10){
		number -= 10;
		numeral += "X";
	}
	if (number >= 9){
		number -= 9;
		numeral += "IX";
	}
	if (number >= 5){
		number -= 5;
		numeral += "V";
	}
	if (number >= 4){
		number -= 4;
		numeral += "IV";
	}
	while (number >= 1){
		number -= 1;
		numeral += "I";
	}
	return numeral;
}

function prettifySub(number){
	number = number.toString();
	var hasDecimal = number.split('.');
	if (typeof hasDecimal[1] === 'undefined' || hasDecimal[0].length >= 3) return number.substring(0, 3);
	return number.substring(0, 4);	
}

function resetGame() {
	document.getElementById("wood").style.visibility = "hidden";
	document.getElementById("metal").style.visibility = "hidden";
	document.getElementById("trimps").style.visibility = "hidden";
	document.getElementById("gems").style.visibility = "hidden";
	document.getElementById("buyCol").style.visibility = "hidden";
	document.getElementById("unempHide").style.visibility = "hidden";
	document.getElementById("empHide").style.visibility = "hidden";
	document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades (research first)";
	document.getElementById("science").style.visibility = "hidden";
	document.getElementById("battleContainer").style.visibility = "hidden";
	document.getElementById("pauseFight").style.visibility = "hidden";
	document.getElementById("blockDiv").style.visibility = "hidden";
	document.getElementById("badGuyCol").style.visibility = "hidden";
	document.getElementById("jobsHere").innerHTML = "";
	document.getElementById("foremenCount").innerHTML = "";
	document.getElementById("tabJobs").style.visibility = "hidden";
	document.getElementById("tabUpgrades").style.visibility = "hidden";
	document.getElementById("upgradesHere").innerHTML = "";
	document.getElementById("mapsBtn").style.visibility = "hidden";
	document.getElementById("grid").style.display = "block";
	document.getElementById("preMaps").style.display = "none";
	document.getElementById("mapGrid").style.display = "none";
	document.getElementById("structuresHere").innerHTML = "";
	document.getElementById("grid").innerHTML = "";
	document.getElementById("equipmentHere").innerHTML = "";
	document.getElementById("structuresQueue").innerHTML = "<span id='noQueue'>Nothing in queue...</span>";
	document.getElementById("log").innerHTML = "";
	document.getElementById("worldNumber").innerHTML = "1";
	document.getElementById("mapsHere").innerHTML = "";
	document.getElementById("sciencePs").innerHTML = "+0/sec";
	game = null;
	game = newGame();
	tab("All");
	numTab(1);
}

function message(messageString, type) {
	var log = document.getElementById("log");
	var displayType = (game.global.messages[type]) ? "block" : "none";
	if (type == "Story") messageString = "<span class='glyphicon glyphicon-star'></span>" + messageString;
	if (type == "Combat") messageString = "<span class='glyphicon glyphicon-flag'></span>" + messageString;
	var addId;
	if (messageString == "Game Saved!") {
		addId = " id='saveGame'";
		if (document.getElementById('saveGame') !== null){
			log.removeChild(document.getElementById('saveGame'));
		}
	}
	if (type == "Notices") messageString = "<span class='glyphicon glyphicon-off'></span>" + messageString;
	log.innerHTML += "<span" + addId + " class='" + type + "Message message' style='display: " + displayType + "'>" + messageString + "</span>";
	log.scrollTop = log.scrollHeight;
}

function filterMessage(what, updateOnly){ //send true for updateOnly
	var displayed = game.global.messages[what];
	if (!updateOnly){
		displayed = (displayed) ? false : true;
		game.global.messages[what] = displayed;
	}
	var toChange = document.getElementsByClassName(what + "Message");
	var btnText = (displayed) ? what : what + " off";
	displayed = (displayed) ? "block" : "none";
	var elem = document.getElementById(what + "Filter");
	elem.innerHTML = btnText;
	for (var x = 0; x < toChange.length; x++){
		toChange[x].style.display = displayed;
	}
	var log = document.getElementById("log");
	log.scrollTop = log.scrollHeight;

}
//
//Menu Stuff
function tab (what) {
	if (what == null) what = game.global.tab;
	else
	game.global.tab = what;
	document.getElementById("structuresHere").style.display = (what == "All" || what == "Structures") ? "block" : "none";
	document.getElementById("jobsHere").style.display = (what == "All" || what == "Jobs") ? "block" : "none";
	document.getElementById("upgradesHere").style.display = (what == "All" || what == "Upgrades") ? "block" : "none";
	document.getElementById("tabAll").style.background = (what == "All") ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.25)";
	document.getElementById("tabStructures").style.background = (what == "Structures") ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.25)";
	document.getElementById("tabJobs").style.background = (what == "Jobs") ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.25)";
	document.getElementById("tabUpgrades").style.background = (what == "Upgrades") ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.25)";
	document.getElementById("structuresTitleDiv").style.display = (what == "All" || what == "Structures") ? "block" : "none";
	document.getElementById("jobsTitleDiv").style.display = ((what == "All" || what == "Jobs") && (game.triggers.jobs.done == 1)) ? "block" : "none";
	document.getElementById("upgradesTitleDiv").style.display = ((what == "All" || what == "Upgrades") && (game.triggers.upgrades.done == 1)) ? "block" : "none";	
}
	
function numTab (what) {
	if (what == null) what = game.global.numTab;
	else
	game.global.numTab = what;
	for (var x = 1; x <= 4; x++){
		document.getElementById("tab" + x).style.background = (what == x) ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.25)";
		var num;
		var halfTrimps = Math.ceil(game.resources.trimps.max / 2);
		halfTrimps = (Math.floor(halfTrimps / 100) + 1);
		switch (x){
			case 1:
				num = 1;
				break;
			case 2:
				num = 2 * halfTrimps;
				break;
			case 3:
				num = 3 * halfTrimps;
				break;
			case 4:
				num = 5 * halfTrimps;
				break;
		}
		num = Math.floor(num);
		document.getElementById("tab" + x + "Text").innerHTML = "+" +  prettify(num);
		if (x == what) game.global.buyAmt = num;
	}


}
/* function shrink(what) { //fired by player when clicking shrink on main menu item
	var toShrink = document.getElementById(what + "Here");
	var alreadyShown = game.global.menu[what];
	toShrink.style.display = (alreadyShown) ? "none" : "block";
	game.global.menu[what] = (alreadyShown) ? false : true;
	updateSideSize();
}

function updateSideSize() { //resizes main menu items
	var count = 0;
	for (var menuItem in game.global.menu) {
		if (game.global.menu[menuItem]) count++;
	}
	var percent = Math.floor(72 / count);
	for (menuItem in game.global.menu) {
		if (game.global.menu[menuItem]) {
			document.getElementById(menuItem + "Here").style.height = percent + "%";
		}
	}
} */

//
//Structures Specific
function removeQueueItem(what) { 
	var elem = document.getElementById("structuresQueue");
	elem.removeChild(document.getElementById(what  + "QueueItem"));
	if (game.global.structuresQueue.length === 0) document.getElementById("noQueue").style.display = "block";

}

function addQueueItem(what) {
	var elem = document.getElementById("structuresQueue");
	document.getElementById("noQueue").style.display = "none";
	name = what.split('.')[0];
	elem.innerHTML += '<div class="queueItem" id="' + what + 'QueueItem" onmouseover="tooltip(\'Queue\',null,event)" onmouseout="tooltip(\'hide\')" onClick="cancelQueueItem(\'' + what + '\')"><span class="queueItemName">' + name + '</span></div>';
}

//
//Number updates
function updateLabels() { //Tried just updating as something changes, but seems to be better to do all at once all the time
	var toUpdate;
	//Resources (food, wood, metal, trimps, science). All but science have max and a bar. Per second will be handled in separate function, and called from job loop.
	for (var item in game.resources){
		toUpdate = game.resources[item];
		document.getElementById(item + "Owned").innerHTML = prettify(Math.floor(toUpdate.owned), true);
		if (toUpdate.max == -1) continue;
		document.getElementById(item + "Max").innerHTML = prettify(toUpdate.max);
		var bar = document.getElementById(item + "Bar");
		var percentToMax = ((toUpdate.owned / toUpdate.max) * 100);
		bar.style.backgroundColor = getBarColor(100 - percentToMax);
		bar.style.width = percentToMax + "%";
	}
	updateSideTrimps();
	//Structures, trap is the only unique structure, needs to be displayed in trimp area as well
	for (var itemA in game.structures){
		toUpdate = game.structures[itemA];
		if (toUpdate.locked == 1) continue;
		var elem = document.getElementById(itemA + "Owned");
		if (elem === null){
			unlockStructure(itemA);
			elem = document.getElementById(itemA + "Owned");
		}
		elem.innerHTML = toUpdate.owned;
		if (itemA == "Trap") {
		document.getElementById("trimpTrapText").innerHTML = toUpdate.owned;
		document.getElementById("trimpTrapText2").innerHTML = toUpdate.owned;
		}
	}
	//Jobs, check PS here and stuff. Trimps per second is handled by breed() function
	for (var itemB in game.jobs){
		toUpdate = game.jobs[itemB];
		if (toUpdate.locked == 1 && toUpdate.increase == "custom") continue;
		if (toUpdate.locked == 1) {
			if (game.resources[toUpdate.increase].owned > 0)
			updatePs(toUpdate);
			continue;
		}
		if (document.getElementById(itemB) === null) unlockJob(itemB);
		document.getElementById(itemB + "Owned").innerHTML = toUpdate.owned;
		var perSec = (toUpdate.owned * toUpdate.modifier);
		updatePs(toUpdate);
	}
	//Upgrades, owned will only exist if 'allowed' exists on object
	for (var itemC in game.upgrades){
		toUpdate = game.upgrades[itemC];
		if (toUpdate.locked == 1) continue;
		if (document.getElementById(itemC) === null) unlockUpgrade(itemC, true);
	}
	//Equipment
	for (var itemD in game.equipment){
		toUpdate = game.equipment[itemD];
		if (toUpdate.locked == 1) continue;
		if (document.getElementById(itemD) === null) unlockEquipment(itemD);
		document.getElementById(itemD + "Owned").innerHTML = toUpdate.level;
	}
}

function updatePs(jobObj, trimps){ //trimps is true/false, send PS as first if trimps is true, like (32.4, true)
		if (jobObj.increase == "custom") return;
		var psText;
		var elem;
		if (trimps) {
			psText = jobObj.toFixed(3);
			elem = document.getElementById("trimpsPs");
		}
		else{
			var increase = jobObj.increase;
			psText = (jobObj.owned * jobObj.modifier);
			if (game.global.playerGathering == increase) psText += game.global.playerModifier;
			elem = document.getElementById(increase + "Ps");
			if (game.resources[increase].owned >= game.resources[increase].max && game.resources[increase].max != -1) psText = 0;
			psText = psText.toFixed(1);
		}
		psText = prettify(psText);
/*		var color = (psText < 0) ? "red" : "green";
		if (psText == 0) color = "black"; */
		var color = "white";
		psText = (psText < 0) ? "-" + psText : "+" + psText;
		psText += "/sec";
		elem.innerHTML = psText;
		elem.style.color = color;
}

function updateSideTrimps(){
	var trimps = game.resources.trimps;
	document.getElementById("trimpsEmployed").innerHTML = prettify(trimps.employed);
	var breedCount = (trimps.owned - trimps.employed > 2) ? prettify(Math.floor(trimps.owned - trimps.employed)) : 0;
	document.getElementById("trimpsUnemployed").innerHTML = breedCount;
	document.getElementById("maxEmployed").innerHTML = Math.ceil(trimps.max / 2);
	var free = (Math.ceil(trimps.max / 2) - trimps.employed);
	free = (free > Math.floor(trimps.owned))  ? Math.floor(trimps.owned - trimps.employed) : free;
	document.getElementById("jobsTitleUnemployed").innerHTML = prettify(free) + " free";
}

function unlockStructure(what) {
	document.getElementById("structuresHere").innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'structures\',event)" onmouseout="tooltip(\'hide\')" class="thing noselect pointer structureThing" id="' + what + '" onclick="buyStructure(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">0</span></div>';
	if (game.structures[what].locked == 1){
		document.getElementById("structuresAlert").innerHTML = "!";
		document.getElementById(what + "Alert").innerHTML = "!";
	}
	game.structures[what].locked = 0;
}

function unlockJob(what) {
	document.getElementById("jobsHere").innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'jobs\',event)" onmouseout="tooltip(\'hide\')" class="thing noselect pointer jobThing" id="' + what + '" onclick="buyJob(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">0</span></div>';
	if (game.jobs[what].locked == 1){
		document.getElementById("jobsAlert").innerHTML = "!";
		document.getElementById(what + "Alert").innerHTML = "!";
	}
	game.jobs[what].locked = 0;
}

function unlockMap(what) { //what here is the array index
	var item = game.global.mapsOwnedArray[what];
	var elem = document.getElementById("mapsHere");
	elem.innerHTML = '<div class="thing noselect pointer mapThing" id="' + item.id + '" onclick="selectMap(\'' + item.id + '\')"><span class="thingName">' + item.name + '</span><br/><span class="thingOwned mapLevel">Level ' + item.level + '</span></div>' + elem.innerHTML;
	//onmouseover="tooltip(\'' + item.id + '\',\'maps\',event)" onmouseout="tooltip(\'hide\')"
}

function unlockUpgrade(what, displayOnly) {
	var upgrade = game.upgrades[what];
	upgrade.locked = 0;
	var done = upgrade.done;
	var dif = upgrade.allowed - upgrade.done;
	if (!displayOnly) {
		upgrade.allowed++;
	}
	if (document.getElementById(what + "Owned") === null)
	document.getElementById("upgradesHere").innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'upgrades\',event)" onmouseout="tooltip(\'hide\')" class="thing noselect pointer upgradeThing" id="' + what + '" onclick="buyUpgrade(\'' + what + '\')"><span id="' + what + 'Alert" class="alert badge"></span><span class="thingName">' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">' + done + '</span></div>';
	if (dif > 1) document.getElementById(what + "Owned").innerHTML = upgrade.done + "(+" + dif + ")";
	if (!displayOnly){
		document.getElementById("upgradesAlert").innerHTML = "!";
		document.getElementById(what + "Alert").innerHTML = "!";
	}
}

function checkButtons(what) {
	var where = game[what];
	if (what == "jobs") {
		for (var item in game.jobs){
			if (game.jobs[item].locked == 1) continue;
			updateButtonColor(item,canAffordJob(item),true);
		}
		return;
	}
	if (what == "upgrades"){
		for (var itemA in game.upgrades){
			if (game.upgrades[itemA].locked == 1) continue;
			updateButtonColor(itemA, canAffordTwoLevel(game.upgrades[itemA]));
		}
		return;
	}
	for (var itemB in where) {
		if (where[itemB].locked == 1) continue;
		var canAfford = true;
		for (var cost in where[itemB].cost) {
			var costItem = where[itemB].cost[cost];
			var numCost = (typeof costItem === 'function') ? costItem() : costItem;
			if (typeof costItem[1] !== 'undefined') numCost = resolvePow(costItem, where[itemB]);
			if (game.resources[cost].owned < numCost) {
				canAfford = false;
				break;
			}
		}
		if (canAfford === false) {
			updateButtonColor(itemB, false);
			continue;
		}
		updateButtonColor(itemB, true);
	}
}

function updateButtonColor(what, canAfford, isJob) {
	var color = (canAfford) ? "black" : "grey";
	if (isJob && game.global.firing === true) color = (game.jobs[what].owned >= 1) ? "red" : "grey";
	document.getElementById(what).style.backgroundColor = color;
}

function unlockEquipment(what) {
	var equipment = game.equipment[what];
	var elem = document.getElementById("equipmentHere");
	equipment.locked = 0;
	var numeral = "";
	if (equipment.prestige > 1){
		numeral = romanNumeral(equipment.prestige);
	}
	elem.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'equipment\',event)" onmouseout="tooltip(\'hide\')" class="noselect pointer equipmentThing" id="' + what + '" onclick="buyEquipment(\'' + what + '\')"><span class="thingName">' + what + ' <span id=' + what + 'Numeral>' + numeral + '</span></span><br/><span class="thingOwned">Level: <span id="' + what + 'Owned">0</span></span></div><br/>';
	elem.scrollTop = elem.scrollHeight;
}

function getBarColor(percent) {
	var color = "";
	if (percent > 50) color = "blue";
	else if (percent > 25) color = "yellow";
	else if (percent > 10) color = "orange";
	else color = "red";
	return color;
}