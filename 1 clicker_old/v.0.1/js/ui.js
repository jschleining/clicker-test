function UpdateClickDisplay()
{
	document.getElementById("current_clicks").innerHTML = Game.currentClicks.toFixed(2);
}

function UpdateCPSDisplay()
{
	document.getElementById("cps").innerHTML = Game.income.toFixed(2);
}

function InitializeGeneratorDisplay(id)
{
	document.getElementById("gen_" + id + "_btn").innerHTML = generators[id].Name;
	document.getElementById("gen_" + id + "_cost").innerHTML = generators[id].CurrentCost;
	document.getElementById("gen_" + id + "_persec").innerHTML = generators[id].CurrentPerSec;
}

function UpdateGeneratorDisplay(id)
{
	document.getElementById("gen_" + id + "_owned").innerHTML = Game.generators[id];
	document.getElementById("gen_" + id + "_cost").innerHTML = generators[id].CurrentCost;
	document.getElementById("gen_" + id + "_persec").innerHTML = generators[id].CurrentPerSec;
}

function InitializeUpgradeDisplay(id)
{
	document.getElementById("upg_" + id + "_btn").innerHTML = upgrades[id].Name;
	document.getElementById("upg_" + id + "_desc").innerHTML = upgrades[id].Description;
	document.getElementById("upg_" + id + "_cost").innerHTML = upgrades[id].CurrentCost;
}

function UpdateTimerDisplay(elapsedTime)
{
	document.getElementById("elapsed_time").innerHTML = elapsedTime;
}