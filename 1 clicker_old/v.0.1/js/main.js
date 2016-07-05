// Game Timer Variables
var timer;
var elapsedTime = 0;

// initialize the arrays
var generators = [];
var upgrades = [];


//jquery function to update clicks
$('#clicker').click(function(){
    Game.manualClicks++; // add one manual click
	Game.totalClicks += Game.clickValue; // add click value to total clicks earned
	Game.currentClicks += Game.clickValue; // add click value to current clicks owned
	// need to prettify the number due to decimals.
	UpdateClickDisplay();
});


// Initialize Generators
function InitializeGenerators()
{
	// LoadGenerator(id, name, description, cost, persec)
	LoadGenerator(0, "Lemonade Stand", "When life hands you lemons...", 15, .1);
	LoadGenerator(1, "Popsicle Stand", "Let's blow this popsicle stand!", 100, 1);
	LoadGenerator(2, "Hot Dog Stand", "Now with more anchovies!", 500, 4);
	
	for(var i = 0; i < generators.length; i++)
	{
		InitializeGeneratorDisplay(i)
	}
}

// Initialise Upgrades
function InitializeUpgrades()
{
	// LoadUpgrade(id, name, description, cost, genID, req, type, effect)
	LoadUpgrade(0, "Ice Cubes", "Add Ice Cubes to your Lemonade", 100, 0, 5, 0, .1)
	LoadUpgrade(1, "Dreamsicles", "The most awesome popsicle ever!", 250, 1, 5, 0, 1)
	LoadUpgrade(2, "Chicago Style", "Now That is a good hot dog.", 500, 2, 5, 0, 4)
	
	for(var i = 0; i < upgrades.length; i++)
	{
		InitializeUpgradeDisplay(i)
	}
}

function AddGeneratorIncome()
{
	Game.currentClicks += Game.income;
	UpdateClickDisplay();
}


// Game Loop /////////////////////////////////////////////////////////
// Start the Game Timer
function TimerStart()
{
	timer = window.setInterval(TimerTick, Game.interval);
}
// Stop the Game Timer
function TimerStop()
{
	window.clearInterval(timer);
}
// Run every Game Tick
function TimerTick()
{
	elapsedTime++;
	UpdateTimerDisplay(elapsedTime)
	AddGeneratorIncome();
}
//////////////////////////////////////////////////////////////////////
