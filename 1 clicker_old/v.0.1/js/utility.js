///////////////////////////////////
// Object Declarations           //
function GameData()
{
	this.interval = 1000;
	this.totalClicks = 0; // total 'clicks' earned
	this.currentClicks = 0; // current 'clicks' owned
	this.manualClicks = 0; // total number of times manually clicked
	this.clickValue = 1; // current click value
	this.income = 0;
	
	this.generators = [];
	for (var i = 0;i < generators.length;i++)
	{
		this.generators[i] = 0;
	}
	
	this.upgrades = [];
}

function Generator()
{
	this.ID = 0;
	this.Name = "Generator";
	this.Description = "Description";
	this.Owned = 0;
	this.BaseCost = 10;
	this.BasePerSec = 1;
	this.CurrentCost = this.BaseCost;
	this.CurrentPerSec = this.BasePerSec;
	this.Visible = true; // add another state for partial visible, like cookie clicker generator unlocks
}

function Upgrade()
{
	this.ID = 0;
	this.name = "Upgrade";
	this.Description = "Description";
	this.Owned = false;
	this.BaseCost = 100;
	this.CurrentCost = this.BaseCost; // Not Implemented: cost of upgrades may be modified by other upgrades or prestige
	this.GeneratorID = 999; // 999 means global upgrade, otherwise, this is the ID of the related generator
	this.Requirement = 1; // quantity of Generators required
	this.Effect = 1; // amount of bonus
	this.Type = 0; // 0 = add, 1 = multiply
	this.Visible = true;
}
// End Declarations              //
///////////////////////////////////


// Load a Generator into the generators array
function LoadGenerator(id, name, description, cost, persec)
{
	var cur = generators.length;
	
	generators[cur] = new Generator();
	generators[cur].ID = id;
	generators[cur].Name = name;
	generators[cur].Description = description;
	generators[cur].BaseCost = cost;
	generators[cur].BasePerSec = persec;
	generators[cur].CurrentCost = cost;
	generators[cur].CurrentPerSec = persec;
}


// Buy a Generator
$('.generator').click(function(){
	var str = $(this).attr("id");
	var res = str.split("_");
	var id = res[1];
	
	if (Game.currentClicks >= generators[id].CurrentCost)
	{
		Game.currentClicks -= generators[id].CurrentCost; // remove clicks
		Game.generators[id] = Game.generators[id] + 1; // add one owned
		generators[id].CurrentCost = Math.round(generators[id].CurrentCost * 1.1); // increase cost
		
		CalculateGeneratorIncome();
		
		UpdateGeneratorDisplay(id);
		UpdateClickDisplay();
		UpdateCPSDisplay();
	}
	
});


function CalculateGeneratorIncome()
{
	var income = 0;
	for (var i = 0;i < generators.length;i++) {
		income += Game.generators[i] * generators[i].CurrentPerSec;
	}
	Game.income = income;
}


// Load an Upgrade into the upgrades array
function LoadUpgrade(id, name, description, cost, genID, req, type, effect)
{
	var cur = upgrades.length;
	
	upgrades[cur] = new Upgrade();
	upgrades[cur].ID = id;
	upgrades[cur].Name = name;
	upgrades[cur].Description = description;
	upgrades[cur].BaseCost = cost;
	upgrades[cur].CurrentCost = cost;
	upgrades[cur].GeneratorID = genID;
	upgrades[cur].Requirement = req;
	upgrades[cur].Type = type;
	upgrades[cur].Effect = effect;
}

// Buy an Upgrade
$('.upgrade').click(function(){
	var str = $(this).attr("id");
	var res = str.split("_");
	var id = res[1];
	
	if (Game.currentClicks >= upgrades[id].CurrentCost && upgrades[id].Owned == false) // if it isnt owned and there is enough money
	{
		if(upgrades[id].GeneratorID != 999) // if it isnt a mouse upgrade
		{
			if(Game.generators[upgrades[id].GeneratorID] > upgrades[id].Requirement) // if enough generators are owned
			{
				Game.currentClicks -= upgrades[id].CurrentCost; // remove clicks
				upgrades[id].Owned = true; // mark as owned
				
				if(upgrades[id].Type == 0) // if add
				{
					generators[upgrades[id].GeneratorID].CurrentPerSec += upgrades[id].Effect;
				}
				else if(upgrades[id].Type == 1) // if multiply
				{
					generators[upgrades[id].GeneratorID].CurrentPerSec *= 1 + upgrades[id].Effect;
				}
			}
		}
		else
		{
			// do stuff to the mouse
		}
		
		
		
		CalculateGeneratorIncome();
		
		UpdateGeneratorDisplay(id);
		UpdateClickDisplay();
		UpdateCPSDisplay();
		
		document.getElementById("upg_" + id + "_desc").innerHTML = upgrades[id].Description;
	}
	
});










//Run this code once the page has loaded fully
window.onload = function()
{
	InitializeGenerators();
	InitializeUpgrades();
	window.Game = new GameData();
	TimerStart();
};
