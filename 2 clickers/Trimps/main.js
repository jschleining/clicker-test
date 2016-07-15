//I wrote all of this code by hand with no libraries so I could learn stuff (except LZString for save import/export, string compression is out of my league. Credits in that file). This is my first javascript project, so be nice.
//Feel free to read through the code and use stuff if you want, I don't know how to properly comment code so I just wrote stuff where I felt like it
//I will be continually cleaning up and making this code more readable as my javascript skills improve
//Contact me via reddit, /u/brownprobe, or trimpsgame@gmail.com


function toggleSave(updateOnly) {
	var elem = document.getElementById("toggleBtn");
	if (updateOnly) game.global.autoSave = (game.global.autoSave) ? false : true;
	if (game.global.autoSave){
		game.global.autoSave = false;
		elem.innerHTML = "Not Saving";
		elem.className = "";
		elem.className = "btn btn-danger";
	}
	else{
		game.global.autoSave = true;
		elem.innerHTML = "Auto-Saving";
		elem.className = "";
		elem.className = "btn btn-info";
	}
}

function autoSave() {
	if (game.global.autoSave) save();
	setTimeout(autoSave, 60000);
}

function save(exportThis) {
	var saveString = JSON.stringify(game);
	var saveGame = JSON.parse(saveString);
	saveGame.worldUnlocks = null;
	saveGame.badGuys = null;
	saveGame.mapConfig = null;
	for (var item in saveGame.equipment){
		saveGame.equipment[item].tooltip = null;
	}
	for (var itemA in saveGame.structures){
		saveGame.structures[itemA].tooltip = null;
		saveGame.structures[itemA].cost = null;
	}
	for (var itemB in saveGame.upgrades){
		saveGame.upgrades[itemB].tooltip = null;
		saveGame.upgrades[itemB].cost = null;
	}
	for (var itemC in saveGame.jobs){
		saveGame.jobs[itemC].tooltip = null;
		saveGame.jobs[itemC].cost = null;
	}
	for (var itemD in saveGame.triggers){
		saveGame.triggers[itemD].message = null;
		saveGame.triggers[itemD].cost = null;
	}
	saveString = LZString.compressToBase64(JSON.stringify(saveGame));
	if (exportThis) return saveString;
	localStorage.setItem("trimpSave1",saveString);
	message("Game Saved!", "Notices");
}

function load(saveString, autoLoad) {

	var savegame;
	if (saveString) {
		savegame = JSON.parse(LZString.decompressFromBase64(document.getElementById("importBox").value));
		tooltip('hide');
	}
	else if (localStorage.getItem("trimpSave1") !== null){
		savegame = JSON.parse(LZString.decompressFromBase64(localStorage.getItem("trimpSave1")));
	}
	if (typeof savegame === 'undefined' || savegame === null || typeof savegame.global === 'undefined') return;
	resetGame();
	if (game.global.killSavesBelow > savegame.global.version) {
		message("I'm so terribly sorry, but your previous save game (version " + savegame.global.version + ") does not work in the new version. This game is still in early alpha, and a lot is still changing! Thank you for helping test!", "Notices");
		message("Since you already had a save, and since the game is still alpha, I unlocked a little cheat button for you. It will make you twice as efficient, allowing you to get through the beginning a little faster.", "Notices");
		document.getElementById("cheatTd").style.display = "block";
		return;
	}
	else savegame.global.version = game.global.version;
	if (typeof savegame.global !== 'undefined'){
		for (var item in game.global){
			if (item == "time" || item == "start" || item == "lastFightUpdate") continue;
			if (typeof savegame.global[item] !== 'undefined') game.global[item] = savegame.global[item];
			if (item == "structuresQueue"){
				for (var itemA in game.global.structuresQueue){
					addQueueItem(game.global.structuresQueue[itemA]);
					}
			}
		}
	}
	
	if (typeof savegame.global.messages.Notices === 'undefined') savegame.global.messages.Notices = true; //compatibility from 0.3 to 0.4, this line can be removed next time saves are wiped
	
	if (typeof savegame.resources !== 'undefined'){
		for (var itemB in game.resources){
			if (typeof savegame.resources[itemB] !== 'undefined') game.resources[itemB] = savegame.resources[itemB];
		}
	}
	for (var a in game){ //global, resources, jobs, structures, upgrades, triggers, equipment, settings
		if (a == "global") continue;
		if (a == "badGuys") continue;
		if (a == "worldUnlocks") continue;
		if (a == "mapConfig") continue;
		var topSave = savegame[a];
		if (typeof topSave === 'undefined' || topSave === null) continue;
		var topGame = game[a];
		for (var b in topGame){ //each item in main category (resource names, job names, etc)
			var midSave = topSave[b];
			if (typeof midSave === 'undefined' || midSave === null) continue;
			var midGame = topGame[b];
			if (typeof midSave !== 'object') midGame = midSave;
			else
			for (var c in midGame){ //purchased, cost, etc
				if (c == "cost" && a != 'equipment') continue;
				if (c == "tooltip") continue;
				var botSave = midSave[c];
				if (typeof botSave === 'undefined' || botSave === null) continue;
				midGame[c] = botSave;
			}
		}
	}

	if (game.structures.Gym.locked === 0) document.getElementById("blockDiv").style.visibility = "visible";
	if (game.global.gridArray.length > 0){
		document.getElementById("battleContainer").style.visibility = "visible";
		drawGrid();
		document.getElementById('metal').style.visibility = "visible";		
		for (var x = 0; x <= game.global.lastClearedCell; x++){
			document.getElementById("cell" + x).style.backgroundColor = "green";
		}
		if (game.global.battleClock > 0) document.getElementById("battleTimer").style.visibility = "visible";
	}
	if (game.global.mapGridArray.length > 0) {
		drawGrid(true);
		for (var y = 0; y <= game.global.lastClearedMapCell; y++){
			document.getElementById("mapCell" + y).style.backgroundColor = "green";
		}
	}
	else if (game.global.mapGridArray.length == 0 && game.global.mapsActive) game.global.mapsActive = false;
	if (game.resources.trimps.owned > 0) game.structures.Trap.first();
	if (game.global.autoBattle) {
		document.getElementById("pauseFight").style.visibility = "visible";
		pauseFight(true);
	}
	for (var itemC in game.global.mapsOwnedArray){
		unlockMap(itemC);
	}
	mapsSwitch(true);	
	checkTriggers(true);
	setGather(game.global.playerGathering);
	tab(game.global.tab);
	numTab(1);
	if (game.structures.Mansion.locked === 0) game.mapUnlocks.Mansion.canRunOnce = false;
	if (game.structures.Hotel.locked === 0) game.mapUnlocks.Hotel.canRunOnce = false;
	if (game.global.autoCraftModifier > 0)
	document.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 2) + " Foremen";
	document.getElementById("worldNumber").innerHTML = game.global.world;
	document.getElementById("mapFragments").innerHTML = game.global.mapFragments;
	if (game.global.fighting) startFight();	
	toggleSave(true);
}

function getCurrentMapObject(){
	return game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)];
}

function scaleLootLevel (level, mapLevel) {
	var world = game.global.world;
	if (mapLevel > 0) world = mapLevel;
	level += ((world - 1) * 100);
	return level;
}

function rewardResource(what, baseAmt, level, checkMapLootScale){
	var map;
	if (checkMapLootScale){
		map = getCurrentMapObject();
		level = scaleLootLevel(level, map.level);
	}
	else{
		level = scaleLootLevel(level);
	}
	if (what == "gems") level -= 260;
	var amt = Math.round(baseAmt * (Math.pow(1.02, level)));
	var otherAmt = Math.round(baseAmt * level);
	if (otherAmt > amt) amt = otherAmt;
	if (checkMapLootScale) amt = Math.round(amt * map.loot);
	addResCheckMax(what, amt);
	return amt;
}
function addResCheckMax(what, number){
	var res = game.resources[what];
	if (res.owned + number <= res.max || res.max == -1) res.owned += number;
	else res.owned = res.max;
}

function fireMode(noChange) {
	if (!noChange) game.global.firing = !game.global.firing;
	var elem = document.getElementById("fireBtn");
	if (game.global.firing) {
		elem.style.background = "rgba(255,0,0,0.5)";
		elem.innerHTML = "Firing";
	}
	else{
		elem.style.background = "rgba(255,255,255,0.25)";
		elem.innerHTML = "Fire";
	}
	tooltip("Fire Trimps", null, "update");

}

function setGather(what) {
	var toGather = game.resources[what];
	var colorOn = "rgba(255,255,255,0.25)";
	var colorOff = "rgba(0,0,0,1)";
	if (typeof toGather === 'undefined' && what != "structures") return;
	if (game.global.playerGathering !== "") {
		document.getElementById(game.global.playerGathering + "CollectBtn").innerHTML = setGatherTextAs(game.global.playerGathering, false);
		document.getElementById(game.global.playerGathering + "CollectBtn").style.background = colorOff;
	}
	game.global.playerGathering = what;
	document.getElementById(what + "CollectBtn").innerHTML = setGatherTextAs(what, true);
	document.getElementById(what + "CollectBtn").style.background = colorOn;
}
function setGatherTextAs (what, on) {
var trimpTrapText = '(<span id="trimpTrapText">1</span>)';
		switch(what) {
			case "food":
				return (on) ? "Gathering" : "Gather";
			case "wood":
				return (on) ? "Chopping" : "Chop";
			case "metal":
				return (on) ? "Mining" : "Mine";
			case "science":
				return (on) ? "Researching" : "Research";
			case "structures":
				return (on) ? "Building" : "Build";
			case "trimps":
				return (on) ? ("Trapping "+ trimpTrapText) : ("Trap " + trimpTrapText);
		}
}
function gather() {
	var what = game.global.playerGathering;
	var whatPs = 0;
	var amount;
	for (var job in game.jobs) {
		if (game.jobs[job].owned < 1) continue;
		var perSec = (game.jobs[job].owned * game.jobs[job].modifier);
		var increase = game.jobs[job].increase;
		if (increase == "custom") continue;
		amount = perSec / game.settings.speed;
		if ((game.resources[increase].max != -1) && ((game.resources[increase].owned + amount) > game.resources[increase].max)) game.resources[increase].owned = game.resources[increase].max;
		else game.resources[increase].owned += amount;
		if (what == increase) {
			whatPs = perSec;
			perSec += game.global.playerModifier;
		}
	}
	if (what === "" || what == "structures") return;
	if (what == "trimps") {
		trapThings();
		return;
	}
	var toGather = game.resources[what];
	if (typeof toGather === 'undefined') return;
	amount = (game.global.playerModifier) / game.settings.speed;
	if ((toGather.max != -1) && ((toGather.owned + amount) > toGather.max)) toGather.owned = toGather.max;
	else toGather.owned += amount;
}

function checkTriggers(force) {
	for (var item in game.triggers) {
		var trigger = game.triggers[item];
		if (force){
			if ((trigger.done == 1) && (typeof trigger.once === 'undefined')) trigger.fire();
			else if (typeof trigger.once == 'function' && trigger.done == 1){
				trigger.once();
			}
			continue;		
		}
		if (trigger.done === 0 && canAffordTwoLevel(game.triggers[item])) {
			trigger.fire();
			trigger.done = 1;
			if (typeof trigger.message !== 'undefined') message(trigger.message, "Story");
		}
	}
}

function canAffordTwoLevel(whatObj, takeEm) {
	for (var costGroup in whatObj.cost) {
		if (costGroup == "special") {
			var toReturn = whatObj.cost.special();
			return toReturn;
		}
		var group = game[costGroup];
		var whatObjCost = whatObj.cost[costGroup];
		for (var res in whatObjCost) {
			var realItem = group[res];
			var cost = whatObjCost[res];
			if (typeof cost === 'function') cost = cost();
			if (typeof cost[1] !== 'undefined') cost = resolvePow(cost, whatObj);
			if (group[res].owned < cost) return false;
			if (takeEm) group[res].owned -= cost;
		}
	}
	return true;
}

function resolvePow(cost, whatObj){
	var compare;
	if (typeof whatObj.done !== 'undefined') compare = 'done';
	if (typeof whatObj.level !== 'undefined') compare = 'level';
	if (typeof whatObj.owned !== 'undefined') compare = 'owned';
	return (Math.floor(cost[0] * Math.pow(cost[1], whatObj[compare])));
}

function buyStructure(what) {
	var toBuy = game.structures[what];
	var price;
	if (typeof toBuy === 'undefined') return;
	var canAfford = true;
	for (var costItem in toBuy.cost) {
		price = (typeof toBuy.cost[costItem] === 'function') ? toBuy.cost[costItem]() : toBuy.cost[costItem];
		if (game.resources[costItem].owned < price) {
			canAfford = false;
			break;
		}
	}
	if (canAfford === false) return;
	for (var costItemA in toBuy.cost) {
		price = (typeof toBuy.cost[costItemA] === 'function') ? toBuy.cost[costItemA]() : toBuy.cost[costItemA];
		game.resources[costItemA].owned -= price;
	}
	game.structures[what].purchased++;
	startQueue(what);
	tooltip(what, "structures", "update");
}

function cancelQueueItem(what){
	var queue = game.global.structuresQueue;
	var index = queue.indexOf(what);
	removeQueueItem(what);
	what = what.split('.')[0];
	game.structures[what].purchased--;
	refundQueueItem(what);
	queue.splice(index, 1);
	if (index === 0){
		game.global.crafting = "";
		game.global.timeLeftOnCraft = 0;
		document.getElementById("structuresBar").style.width = "0%";
	}
}
	
function refundQueueItem(what){
	struct = game.structures[what];
	for (var costItem in struct.cost){
		game.resources[costItem].owned += (typeof struct.cost[costItem] === 'function') ? struct.cost[costItem]() : struct.cost[costItem];
	}
}


function startQueue(what){
var alreadyIn = false;
	var count = 0;
	for (var queueItem in game.global.structuresQueue) {
		if (game.global.structuresQueue[queueItem].split('.')[0] == what) {
			count++;
			alreadyIn = true;
			break;
		}
	}
	if (!alreadyIn) count = 0;
	game.global.structuresQueue.push(what + "." + (count));
	addQueueItem(what + "." + count);
}


function craftStructures(makeUp) {
	var structuresBar = document.getElementById("structuresBar");
	var speedElem = document.getElementById("buildSpeed");
	if (game.global.crafting === "" && game.global.structuresQueue.length > 0) {
		setNewCraftItem();
	}
	if ((game.global.autoCraftModifier <= 0 && game.global.playerGathering != "structures") || game.global.crafting === "") {speedElem.innerHTML = ""; return;}
	var modifier = (game.global.autoCraftModifier > 0) ? game.global.autoCraftModifier : 0;
	if (game.global.playerGathering == "structures") modifier += game.global.playerModifier;
	if (!makeUp){
		speedElem.innerHTML = Math.floor(modifier * 100) + "%";
		game.global.timeLeftOnCraft -= ((1 / game.settings.speed) * modifier);
		structuresBar.style.width = (100 - ((game.global.timeLeftOnCraft / game.structures[game.global.crafting].craftTime) * 100)) + "%";
		structuresBar.innerHTML = (game.global.timeLeftOnCraft / modifier).toFixed(1) + " Seconds";
		if (game.global.timeLeftOnCraft > 0) return;
		structuresBar.innerHTML = "";
		structuresBar.style.width = "0%";
	}
	buildStructure(game.global.crafting);
	removeQueueItem(game.global.structuresQueue[0]);
	game.global.structuresQueue.splice(0, 1);	
	if (game.global.structuresQueue.length <= 0) {
		game.global.crafting = "";
		document.getElementById("noQueue").style.display = "block";
		return;
	}
	nextCraft = game.global.structuresQueue[0].split('.')[0];
	game.global.crafting = nextCraft;
	game.global.timeLeftOnCraft = game.structures[nextCraft].craftTime;
}

function buildStructure(what) {
	var structure = game.structures[what];
	var toIncrease;
	structure.owned++;
	if (structure.owned == 1 && typeof structure.first !== 'undefined') structure.first();
	if (document.getElementById(what + "Owned") === null) return;
	document.getElementById(what + "Owned").innerHTML = structure.owned;
	if (typeof structure.increase === 'undefined') return;
	var structureSplit = structure.increase.what.split('.');
	if (structureSplit[0] == "global") toIncrease = game.global;
	else
	toIncrease = game.resources[structureSplit[0]];
	if (structureSplit[2] == "mult") Math.floor(toIncrease[structureSplit[1]] *= structure.increase.by);
	else
	toIncrease[structureSplit[1]] += structure.increase.by;
	numTab();
}

function setNewCraftItem() {
	var queueItem = game.global.structuresQueue[0].split('.')[0];
	game.global.crafting = queueItem;
	game.global.timeLeftOnCraft = game.structures[queueItem].craftTime;
	document.getElementById("structuresBar").style.width = "0%";
}

function trapThings() {
	var trap = game.structures.Trap;
	var trimps = game.resources.trimps;
	if (game.global.timeLeftOnTrap == -1) {
		if (trimps.owned < trimps.max && trap.owned >= 1)
			game.global.timeLeftOnTrap = trimps.speed;
		else {
			document.getElementById("trappingBar").style.width = "0%";
			document.getElementById("TrapOwned").innerHTML = trap.owned;
			return;
		}
	}
	game.global.timeLeftOnTrap -= ((1 / game.settings.speed) * game.global.playerModifier);
	if (game.global.timeLeftOnTrap <= 0 && trimps.owned < trimps.max && trap.owned >= 1) {
		trap.owned--;
		trimps.owned++;
		game.global.timeLeftOnTrap = -1;
		document.getElementById("TrapOwned").innerHTML = trap.owned;
	}
	document.getElementById("trappingBar").style.width = (100 - ((game.global.timeLeftOnTrap / trimps.speed) * 100)) + "%";
}

function buyJob(what) {
	if (game.global.firing){
		if (game.jobs[what].owned < 1) return;
		game.jobs[what].owned -= game.global.buyAmt;
		if (game.jobs[what].owned < 0) game.jobs[what].owned = 0; 
		game.resources.trimps.employed -= game.global.buyAmt;
		if (game.resources.trimps.employed < 0) game.resources.trimps.employed = 0;
		return;
	}
	if (!canAffordJob(what)) return;
	canAffordJob(what, true);
	game.jobs[what].owned += game.global.buyAmt;
	game.resources.trimps.employed += game.global.buyAmt;
	tooltip(what, "jobs", "update");
}

function getTooltipJobText(what) {
	var job = game.jobs[what];
	var fullText = "";
	for (var item in job.cost){
		var color = (checkJobItem(what, false, item)) ? "green" : "red";
		fullText += '<span class="' + color + '">' + item + ':&nbsp;' + prettify(checkJobItem(what, false, item, true)) + '</span>, ';
	}
	fullText = fullText.slice(0, -2);
	return fullText;
}
function canAffordJob(what, take){
	var trimps = game.resources.trimps;
	if (Math.ceil(trimps.max / 2) < trimps.employed + game.global.buyAmt) return false;
	if (trimps.owned - trimps.employed - game.global.buyAmt < 0) return false;
	var job = game.jobs[what];
	for (var costItem in job.cost){
		if (!checkJobItem(what, take, costItem)) return false;
	}
	return true;
}

function checkJobItem(what, take, costItem, amtOnly){
	var job = game.jobs[what];
	var cost = job.cost[costItem];
	var price = 0;
	for (var x = 0; x < game.global.buyAmt; x++){
		price += Math.floor(cost[0] * Math.pow(cost[1], (job.owned + x)));
	}
	if (amtOnly) return price;
	if (take) {
		game.resources[costItem].owned -= price;
		return true;
	}
	if (game.resources[costItem].owned < price){
		return false;
	}
	return true;
}

function buyUpgrade(what) {
	if (what == "Coordination" && (Math.ceil(game.resources.trimps.max / 2) < (game.resources.trimps.maxSoldiers * 2))){
		message("You should probably expand your territory a bit first.", "Notices");
		return;
	}
	var upgrade = game.upgrades[what];
	var canAfford = canAffordTwoLevel(upgrade);
	if (!canAfford) return;
	canAfford = canAffordTwoLevel(upgrade, true);
	upgrade.fire();
	upgrade.locked = 1;
	upgrade.done++;
	var dif = upgrade.allowed - upgrade.done;
	if (dif > 1){
		document.getElementById(what + "Owned").innerHTML = upgrade.done + "( +" + dif + ")";
		return;
	}
	else if (dif == 1){
		document.getElementById(what + "Owned").innerHTML = upgrade.done;
		return;
	}
	document.getElementById("upgradesHere").removeChild(document.getElementById(what));
	tooltip("hide");
}

function breed() {
	var trimps = game.resources.trimps;
	var breeding = trimps.owned - trimps.employed;
	if (breeding < 2) {
		updatePs(0, true);
		return;
	}
	if (trimps.owned >= trimps.max) {
		trimps.owned = trimps.max;
		return;
	}
	breeding = breeding * trimps.potency;
	updatePs(breeding, true);
	trimps.owned += breeding / game.settings.speed;
}

function prestigeEquipment(what){
	var equipment = game.equipment[what];
	equipment.level = 0;
	equipment.prestige++;
	if (typeof equipment.cost.wood !== 'undefined'){
	equipment.cost.wood[0] *= game.global.prestigeCostMod;
	}
	else
	equipment.cost.metal[0] *= game.global.prestigeCostMod;
	if (typeof equipment.health !== 'undefined')
	equipment.health *= game.global.prestigeValueMod;
	else
	equipment.attack *= game.global.prestigeValueMod;
	document.getElementById(what + "Numeral").innerHTML = romanNumeral(equipment.prestige);
}
function createMap() {
	game.global.mapsOwned++;
	game.global.totalMapsEarned++;
	var world = game.global.world;
	var mapName = getRandomMapName();
	game.global.mapsOwnedArray.push({
		id: "map" + game.global.totalMapsEarned,
		name: mapName,
		clears: 0,
		level: world,
		difficulty: getRandomMapValue("difficulty"),
		size: getRandomMapValue("size"),
		loot: getRandomMapValue("loot")
	});
	message("You just found " + mapName + "!", "Notices");
	unlockMap(game.global.mapsOwnedArray.length - 1);
}

function getRandomMapValue(what) { //what can be size, difficulty, or loot for now
	var amt = game.mapConfig[what + "Base"];
	var range = game.mapConfig[what + "Range"];
	var min = amt - range;
	var x = ((Math.random() * ((amt + range) - min)) + min);
	x = x.toFixed(3);
	return x;
}

function getRandomMapName() {
	var namesObj = game.mapConfig.names;
	var roll = Math.floor(Math.random() * (namesObj.prefix.length - 1));
	var name = namesObj.prefix[roll];
	roll = Math.floor(Math.random() * (namesObj.suffix.length - 1));
	return name + " " + namesObj.suffix[roll];
}

function buildMapGrid(mapId) {
	var map = game.global.mapsOwnedArray[getMapIndex(mapId)];
	var array = [];
	for (var i = 0; i < map.size; i++) {
		array.push({
			level: i + 1,
			maxHealth: -1,
			health: -1,
			attack: -1,
			special: "",
			text: "",
			name: getRandomBadGuy(map.name.split(' ')[1])
		});
	}
	game.global.mapGridArray = array;
	addSpecials(true);
}

function getMapIndex(mapId) {
	for (var x = 0; x < game.global.mapsOwnedArray.length; x++){
		if (game.global.mapsOwnedArray[x].id == mapId) return x;
	}
}
//build grid
function buildGrid() {
	var world = game.global.world;
	var array = [];
	for (var i = 0; i < 100; i++) {
		array.push({
			level: i + 1,
			maxHealth: -1,
			health: -1,
			attack: -1,
			special: "",
			text: "",
			name: getRandomBadGuy()
		});
	}
	game.global.gridArray = array;
	addSpecials();
}

function getRandomBadGuy(mapSuffix) {
	var badGuysArray = [];
	for (var item in game.badGuys){
		if (game.badGuys[item].location == "all") badGuysArray.push(item);
	}
	if (mapSuffix == "Creek" || mapSuffix == "Beach" || mapSuffix == "Coast"){
		for (var itemSea in game.badGuys){
			if (game.badGuys[itemSea].location == "sea") badGuysArray.push(itemSea);
		}
	}
	return badGuysArray[Math.floor(Math.random() * badGuysArray.length)];
}
function addSpecialToLast(special, array, item){
		array[array.length - 1].text = '<span class="glyphicon glyphicon-' + special.icon + '"></span>';
		array[array.length - 1].special = item;
		return array;
}

function addSpecials(maps) { //this function is ghetto but works well for some reason
	var array;
	var unlocksObj;
	var map;
	var world;
	var max;
	if (maps){
		array = game.global.mapGridArray;
		unlocksObj = game.mapUnlocks;
		map = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)];
		world = map.level;
		max = map.size;
	}
	else{
		array = game.global.gridArray;
		unlocksObj = game.worldUnlocks;
		world = game.global.world;
		max = 100;
	}
	var canLast = true;
	for (var item in unlocksObj) {
		var special = unlocksObj[item];
		if ((special.level == "last" && canLast && special.world <= world && special.canRunOnce)){
			array = addSpecialToLast(special, array, item);
			canLast = false;
			continue;
		}
		if (typeof special.canRunOnce !== 'undefined' && !special.canRunOnce) continue;
		if ((special.world != world && special.world > 0)) continue;
		if ((special.world == -2) && ((world % 2) !== 0)) continue;
		if ((special.world == -3) && ((world % 2) != 1)) continue;
		if ((special.world == -5) && ((world % 5) !== 0)) continue;
		if ((typeof special.startAt !== 'undefined') && (special.startAt > world)) continue;
		if (typeof special.canRunOnce === 'undefined' && (special.level == "last") && canLast && (special.last <= (world - 5))) {
			array = addSpecialToLast(special, array, item);
			canLast = false;
			continue;
		}
		var level;
		var repeat = (typeof special.repeat !== 'undefined');
		var repeatFreq = (repeat) ? special.repeat : 0;
		var x = 0;
		var done = false;
		while (done === false) {
			if (typeof special.level === 'object') level = ((Math.floor(Math.random() * (special.level[1] - special.level[0])) + special.level[0]) + (x * repeatFreq));
			else level = special.level + (x * repeatFreq);
			if (level >= max) break;
			//Resolve resource conflicts. Try +5, reverse, -5, then bail out.
			var hax = 5;
			while (array[level].special !== "") {
				if (hax >= 5) {
					hax++;
					level++;
				}
				if (hax <= 4) {
					hax--;
					level--;
				}
				if (hax == 10 || level >= max) {
					hax = 4;
					level -= 6;
				}
				if (hax === 0 || level <= 0) {
					break;
				}

			}
			if (hax !== 0) {
				array[level].text = '<span class="glyphicon glyphicon-' + special.icon + '"></span>';
				array[level].special = item;
			}
			if (!repeat) done = true;
			x++;
			if (x == max) {
				done = true;
				break;
			}
		}

	}
}

function drawGrid(maps) { //maps t or f. This function overwrites the current grid, be carefulz
	var grid = (maps) ? document.getElementById("mapGrid") : document.getElementById("grid");
	grid.innerHTML = "";
	var cols = (maps) ? (game.global.mapGridArray.length / 9) : 10;
	var counter = 0;
	var idText = (maps) ? "mapCell" : "cell";
	var size = 0;
	if (maps) size = game.global.mapGridArray.length;
	for (var i = 0; i < 10; i++) {
		if (maps && counter >= size) return;
		var row = grid.insertRow(0);
		row.id = "row" + i;
		for (var x = 0; x < cols; x++) {
			if (maps && counter >= size) return;
			var cell = row.insertCell(x);
			cell.id = idText + counter;
			cell.className = "battleCell";
			cell.innerHTML = (maps) ? game.global.mapGridArray[counter].text : game.global.gridArray[counter].text;
			counter++;
		}
	}
}

function fightManual(){
	battle(true);
}

function pauseFight(setup){
	if (setup) game.global.pauseFight = (game.global.pauseFight) ? false : true;
	if (game.global.pauseFight){
		game.global.pauseFight = false;
		document.getElementById("pauseFight").innerHTML = "Pause";
	}
	else{
		game.global.pauseFight = true;
		document.getElementById("pauseFight").innerHTML = "AutoBattle";
	}
}

function recycleMap() {
	if (game.global.lookingAtMap === "") return;
	var map = getMapIndex(game.global.lookingAtMap);
	if (map === null) return;
	game.global.mapsOwnedArray.splice(map, 1);
	document.getElementById("mapsHere").removeChild(document.getElementById(game.global.lookingAtMap));
	game.global.lookingAtMap = "";
	game.global.currentMapId = "";
	game.global.mapsOwned--;
	game.global.lastClearedMapCell = -1;
	game.global.mapFragments++;
	document.getElementById("selectedMapName").innerHTML = "Select a map";
	document.getElementById("selectedMapStats").innerHTML = "";
	document.getElementById("selectMapBtn").style.visibility = "hidden";
	document.getElementById("recycleMapBtn").style.visibility = "hidden";
	if (game.global.mapFragments >= 3){
		game.global.mapFragments -= 3;
		createMap();
	}
	document.getElementById("mapFragments").innerHTML = game.global.mapFragments;

}

function mapsClicked(){
	if (game.global.fighting && !game.global.preMapsActive) message("Waiting to travel until your soldiers are finished.", "Notices");
	if (game.global.preMapsActive){
		mapsSwitch();
		return;
	}
	if (game.global.switchToMaps || game.global.switchToWorld){
		message("Already waiting to switch.", "Notices");
		return;
	}
	if (game.global.mapsActive) game.global.switchToWorld = true;
	else game.global.switchToMaps = true;
}

function mapsSwitch(updateOnly){
	if (!updateOnly){
		game.global.switchToMaps = false;
		game.global.switchToWorld = false;
		if (game.global.mapsActive || game.global.preMapsActive){
			game.global.mapsActive = false;
			game.global.preMapsActive = false;
		}
		else game.global.preMapsActive = true;
	}
	if (game.global.preMapsActive){
		document.getElementById("grid").style.display = "none";
		document.getElementById("preMaps").style.display = "block";
		document.getElementById("mapGrid").style.display = "none";
		document.getElementById("mapsBtn").innerHTML = "World";
		if (game.global.currentMapId == ""){
		document.getElementById("selectMapBtn").style.visibility = "hidden";
		document.getElementById("recycleMapBtn").style.visibility = "hidden";
		document.getElementById("selectedMapName").innerHTML = "Select A Map!";
		document.getElementById("selectedMapStats").innerHTML = "";
		}
		else{
			selectMap(game.global.currentMapId, true);
			document.getElementById("selectMapBtn").innerHTML = "Continue";
			document.getElementById("selectMapBtn").style.visibility = "visible";
			document.getElementById("recycleMapBtn").style.visibility = "visible";
		}
	}
	else if (game.global.mapsActive){
		var currentMapObj = getCurrentMapObject();
		document.getElementById("grid").style.display = "none";
		document.getElementById("preMaps").style.display = "none";
		document.getElementById("mapGrid").style.display = "block";
		document.getElementById("mapsBtn").innerHTML = "World";
		document.getElementById("worldNumber").innerHTML = currentMapObj.level;
		document.getElementById("worldName").innerHTML = currentMapObj.name;
	}
	else{
		document.getElementById("grid").style.display = "block";
		document.getElementById("preMaps").style.display = "none";
		document.getElementById("mapGrid").style.display = "none";	
		document.getElementById("mapsBtn").innerHTML = "Maps";
		document.getElementById("worldNumber").innerHTML = game.global.world;
		document.getElementById("worldName").innerHTML = "World"
	}
}

function selectMap(mapId, force) {
	if (!force && game.global.currentMapId !== "") {message("You must finish or recycle your current map before moving on.", "Notices"); return;}
	var map = getMapIndex(mapId);
	map = game.global.mapsOwnedArray[map];
	document.getElementById("selectedMapName").innerHTML = map.name;
	document.getElementById("selectedMapStats").innerHTML = "Size: " + Math.floor(map.size) + ". Difficulty: " + Math.floor(map.difficulty * 100) + "%. Loot Bonus: " + Math.floor(map.loot * 100) + "%.";
	if (typeof game.global.mapsOwnedArray[getMapIndex(game.global.lookingAtMap)] !== 'undefined') document.getElementById(game.global.lookingAtMap).style.border = "1px solid white";
	document.getElementById(mapId).style.border = "1px solid red";
	game.global.lookingAtMap = mapId;
	document.getElementById("selectMapBtn").innerHTML = "Run Map";
	document.getElementById("selectMapBtn").style.visibility = "visible";
	document.getElementById("recycleMapBtn").style.visibility = "visible";
}

function runMap() {
	if (game.global.lookingAtMap === "") return;
	var mapId = game.global.lookingAtMap;
	game.global.preMapsActive = false;
	game.global.mapsActive = true;
	game.global.currentMapId = mapId;
	mapsSwitch(true);
	if (game.global.lastClearedMapCell == -1){
		buildMapGrid(mapId);
		drawGrid(true);
	}
}

function battleCoordinator(makeUp){

	if (!game.global.fighting) {
		battle(null, makeUp);
		return;
	}
	game.global.battleCounter += (1000 / game.settings.speed);
	if (game.global.battleCounter >= 1000){
		game.global.battleCounter = 0;
		fight(makeUp);
	}
}

function battle(force) {
	if (game.global.fighting) return;
	if ((game.global.switchToMaps || game.global.switchToWorld) && game.resources.trimps.soldiers === 0) {
		mapsSwitch();
		return;
	}
	if (game.global.preMapsActive) return;
	var pause = (force) ? false : game.global.pauseFight;
	if (!game.global.autoBattle && !force) return;
	if (pause) return;
	var trimps = game.resources.trimps;
	if (trimps.soldiers >= trimps.maxSoldiers) {startFight(); return;}
	var breeding = (trimps.owned - trimps.employed);
	if (breeding < trimps.maxSoldiers) return;
	if (force){
		trimps.soldiers = trimps.maxSoldiers;
		trimps.owned -= trimps.maxSoldiers;
	}
	else{
		var max = Math.ceil((trimps.max - trimps.employed) * 0.05);
		if ((trimps.owned) >= (trimps.max - max)){
			trimps.soldiers = trimps.maxSoldiers;
			trimps.owned -= trimps.maxSoldiers;
		}
	}
	if (game.resources.trimps.soldiers < trimps.maxSoldiers) {
		return;
	}
	startFight();
}

function startFight() {
	game.global.battleCounter = 0;
	document.getElementById("badGuyCol").style.visibility = "visible";
	var cellNum;
	var cell;
	var cellElem;
	if (game.global.mapsActive){
		cellNum = game.global.lastClearedMapCell + 1;
		cell = game.global.mapGridArray[cellNum];
		cellElem = document.getElementById("mapCell" + cellNum);
	}
	else {
		cellNum = game.global.lastClearedCell + 1;
		cell = game.global.gridArray[cellNum];
		cellElem = document.getElementById("cell" + cellNum);
	}
	cellElem.style.backgroundColor = "yellow";
	if (cell.maxHealth == -1){
		cell.attack = game.global.getEnemyAttack(cell.level, cell.name);
		cell.health = game.global.getEnemyHealth(cell.level, cell.name);
		if (game.global.mapsActive){
			var difficulty = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)].difficulty;
			cell.attack *= difficulty;
			cell.health *= difficulty;
		}
		cell.maxHealth = cell.health;
			document.getElementById("badGuyBar").style.width = "100%";
			document.getElementById("badGuyName").innerHTML = cell.name;
			document.getElementById("badGuyBar").style.backgroundColor = "blue";
			document.getElementById("badGuyAttack").innerHTML = calculateDamage(cell.attack, true);
	}
	if (game.global.soldierHealth === 0){
		var trimpsFighting = game.resources.trimps.maxSoldiers;
		game.global.soldierHealthMax = (game.global.health * trimpsFighting);
		game.global.soldierHealth = game.global.soldierHealthMax;
		game.global.soldierCurrentAttack = (game.global.attack * trimpsFighting);
		game.global.soldierCurrentBlock = Math.floor((game.global.block * (game.jobs.Trainer.owned * (game.jobs.Trainer.modifier / 100)) + game.global.block) * trimpsFighting);
		document.getElementById("trimpsFighting").innerHTML = prettify(trimpsFighting, 0);
		document.getElementById("goodGuyBar").style.width = "100%";
		document.getElementById("goodGuyBlock").innerHTML = prettify(game.global.soldierCurrentBlock);
		document.getElementById("goodGuyAttack").innerHTML = calculateDamage(game.global.soldierCurrentAttack, true);
	}	
	game.global.fighting = true;
	game.global.lastFightUpdate = new Date();
	document.getElementById("goodGuyHealth").innerHTML = prettify(game.global.soldierHealth, 0);
	document.getElementById("goodGuyHealthMax").innerHTML = prettify(game.global.soldierHealthMax, 0);
	document.getElementById("goodGuyBar").style.backgroundColor = "blue";
	document.getElementById("badGuyHealth").innerHTML = prettify(cell.health, 0);
	document.getElementById("badGuyHealthMax").innerHTML = prettify(cell.maxHealth, 0);

}

function calculateDamage(number, buildString){ //number = base attack
	var fluctuation = 20; //%fluctuation
	var multiplier = (fluctuation / 100);
	var min = Math.floor(number * (1 - multiplier));
	var max = Math.ceil(number + (number * multiplier));
	if (buildString) return prettify(min, 0) + "-" + prettify(max, 0);
	number = Math.floor(Math.random() * ((max + 1) - min)) + min;
	return number;
}

function nextWorld() {
	game.global.world++;
	ga('send', 'event', 'Next World', 'World: ' + game.global.world);
	document.getElementById("worldNumber").innerHTML = game.global.world;
	game.global.lastClearedCell = -1;
	game.global.gridArray = [];
	document.getElementById("grid").innerHTML = "";
	buildGrid();
	drawGrid();
}

function fight(makeUp) {
	if (game.global.soldierHealth <= 0) {
		var s = (game.resources.trimps.maxSoldiers > 1) ? "s" : "";
		message(game.resources.trimps.maxSoldiers + " Trimp" + s + " just bit the dust.", "Combat");
		game.global.fighting = false;
		game.resources.trimps.soldiers = 0;
		return;
	}
	var cellNum;
	var cell;
	var cellElem;
	if (game.global.mapsActive){
		cellNum = game.global.lastClearedMapCell + 1;
		cell = game.global.mapGridArray[cellNum];
		cellElem = document.getElementById("mapCell" + cellNum);
	}
	else {
		cellNum = game.global.lastClearedCell + 1;
		cell = game.global.gridArray[cellNum];
		cellElem = document.getElementById("cell" + cellNum);
	}
	if (cell.health <= 0) {
		message("You killed a " + cell.name + "!", "Combat");
		if (cell.level % 2 == 0) ga('send', 'event', 'Killed Bad Guy', 'W: ' + game.global.world + ' L:' + cell.level);
		cellElem.style.backgroundColor = "green";
		if (game.global.mapsActive) game.global.lastClearedMapCell = cellNum;
		else game.global.lastClearedCell = cellNum;
		game.global.fighting = false;
		document.getElementById("badGuyCol").style.visibility = "hidden";
		var unlock;
		if (game.global.mapsActive) unlock = game.mapUnlocks[cell.special];
		else unlock = game.worldUnlocks[cell.special];
		if (typeof unlock !== 'undefined' && typeof unlock.message !== 'undefined') message(cell.text + unlock.message, "Unlocks");
		if (typeof unlock !== 'undefined' && typeof unlock.fire !== 'undefined') {
			unlock.fire(cell.level);
			if (game.global.mapsActive){
				if (typeof game.mapUnlocks[cell.special].last !== 'undefined') game.mapUnlocks[cell.special].last += 5;
				if (typeof game.mapUnlocks[cell.special].canRunOnce !== 'undefined') game.mapUnlocks[cell.special].canRunOnce = false;
			}
		} else if (cell.special !== "") {
			unlockEquipment(cell.special);
		}
		if (game.global.mapsActive && cellNum == (game.global.mapGridArray.length - 1)){
			game.global.preMapsActive = true;
			game.global.mapsActive = false;
			game.global.lastClearedMapCell = -1;
			game.global.currentMapId = "";
			game.global.mapGridArray = [];
			game.global.fighting = false;
			mapsSwitch(true);
			return;
		}
		if (cellNum == 99) nextWorld();
		battle(true);
		return;
	}
	var attackAndBlock = (calculateDamage(cell.attack) - game.global.soldierCurrentBlock);
	if (game.badGuys[cell.name].fast){
		game.global.soldierHealth -= (attackAndBlock > 0) ? attackAndBlock : 0;
		if (game.global.soldierHealth > 0) cell.health -= calculateDamage(game.global.soldierCurrentAttack);
		else
		game.global.soldierHealth = 0;
		if (cell.health < 0) cell.health = 0;
	}
	else{
		cell.health -= calculateDamage(game.global.soldierCurrentAttack);
		if (cell.health > 0) game.global.soldierHealth -= (attackAndBlock > 0) ? attackAndBlock : 0;
		else
		cell.health = 0;
		if (game.global.soldierHealth < 0) game.global.soldierHealth = 0;
	}
	game.global.lastFightUpdate = new Date();
	if (makeUp) return;
	document.getElementById("badGuyHealth").innerHTML = prettify(cell.health, 0);
	updateGoodBar();
	percent = ((cell.health / cell.maxHealth) * 100);
	document.getElementById("badGuyBar").style.width = percent + "%";
	document.getElementById("badGuyBar").style.backgroundColor = getBarColor(percent);
/*	if (game.jobs.Medic.owned >= 1) setTimeout(heal, 500); */
}

/* function heal() {
	var medics = game.jobs.Medic;
	if (game.global.soldierHealth > 0)
	game.global.soldierHealth += (medics.owned * medics.modifier);
	if (game.global.soldierHealth > game.global.soldierHealthMax) game.global.soldierHealth = game.global.soldierHealthMax;
	updateGoodBar();
} */

function updateGoodBar() {
	document.getElementById("goodGuyHealth").innerHTML = prettify(game.global.soldierHealth, 0);
	var percent = ((game.global.soldierHealth / game.global.soldierHealthMax) * 100);
	document.getElementById("goodGuyBar").style.width = percent + "%";
	document.getElementById("goodGuyBar").style.backgroundColor = getBarColor(percent);
}

function buyEquipment(what) {
	var canAfford = affordOneTier(what, "resources");
	if (!canAfford) return;
	if (canAfford) affordOneTier(what, "resources", true);
	var obj = game.equipment[what];
	if (typeof obj.attack !== 'undefined') game.global.attack += obj.attack;
	if (typeof obj.health !== 'undefined') game.global.health += obj.health;
	obj.level++;
	document.getElementById(what + "Owned").innerHTML = obj.level;
	tooltip(what, "equipment", "update");
}

function affordOneTier(what, whereFrom, take) {
	//take, true/false to take resources or not or something like that probably
	//don't send shit in here to take without checking first though
	var buyFrom = game[whereFrom];
	var toBuy = game.equipment[what];
	for (var item in toBuy.cost) {
		var cost;
		if (typeof toBuy.cost[item] === 'function') cost = toBuy.cost[item]();
		if (typeof toBuy.cost[item][1] !== 'undefined') cost = resolvePow(toBuy.cost[item], toBuy);
		if (cost > buyFrom[item].owned) return false;
		if (take) buyFrom[item].owned -= cost;
	}
	return true;
}

function cheatALittle(){
	if (game.global.playerModifier <= 2){
		game.global.playerModifier = 2;
		document.getElementById("cheatTd").style.display = "none";
		message("Your player modifier has been boosted to 200%!", "Notices");
		return;
	}
	message("You already cheated, save some for the other kids.", "Notices");
}
setTimeout(autoSave, 60000);

function gameLoop(makeUp){
	gather(makeUp);
	craftStructures();
	breed(makeUp);
	battleCoordinator(makeUp);
}

function gameTimeout()
{
	var tick = 1000 / game.settings.speed;
    game.global.time += tick;
    var dif = (new Date().getTime() - game.global.start) - game.global.time;
	while (dif >= tick) {
		gameLoop(true);
		dif -= tick;
		game.global.time += tick;

	}
	gameLoop();
	updateLabels();
	checkButtons("structures");
	checkButtons("jobs");
	checkButtons("equipment");
	checkButtons("upgrades");
	checkTriggers();
    window.setTimeout(gameTimeout, (tick - dif));
}
window.setTimeout(gameTimeout(), (1000 / game.settings.speed));

load();
document.getElementById("versionNumber").innerHTML = game.global.version;
