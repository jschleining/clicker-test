//==========================
// XP and Leveling Section  |                                                                                   
//==========================

var xp = 0;
var level = 1;
var xpNeeded = 20;

function getXP(amount){
    xp+=amount;
	document.getElementById('xp').innerHTML = xp; 
	if(xp>=xpNeeded){
	    level=level+=1;
		xp-=xpNeeded;
		xpNeeded=Math.round(xpNeeded*1.2);
		document.getElementById('xpNeeded').innerHTML = xpNeeded; 
		document.getElementById('level').innerHTML = level; 
		document.getElementById('xp').innerHTML = xp; 
	}
}

//==========================
// Floating Click Actions   |                                                                                   
//==========================




function Float() { //The basic structure for our floating text display
    this.id = 0;
    this.timer = FloatTimer;
    this.opacity = 100;
}

//Timer Related Variables
var FloatTimer = 3; //The time floats will stay on screen in seconds
var RefreshSpeed = 10; //The number of milliseconds between refreshes
var FloatIncrement = (1000 / RefreshSpeed) * FloatTimer; //The number of resfreshes per float
var FadeSpeed = 250 / FloatIncrement; //The percentage at which floats fade per refresh

//Float Related Variables
var FloatText = "Pizza!"; //The text for floats
var Floats = []; //This array will hold all our floating text information

//Timers
var Timer = window.setInterval(function(){Tick()}, 1000); //A per second timer
var Timer2 = window.setInterval(function(){Refresh()},RefreshSpeed); //A faster timer for display updates

function CreateFloat() { //Create a new floating text div
    //Find the lowest float ID. We start with 0 to keep with array standards. Since we will splice in later, we can simply look for
    //a location that has a higher ID than its array location.
    for (var i=0;i<Floats.length;i++) {
        if (Floats[i].id > i) {break;}
    }
    
    //Note that if the array has a length of 0, i will return as 0
    
    //Create the new float class structure and assign the ID
    var NewFloat = new Float();
    NewFloat.id = i;
    Floats.splice(i,0,NewFloat); //Add the new element into its appropriate place in the array

    //Create the new div
    var NewDiv = document.createElement("div");
    NewDiv.innerHTML = FloatText;
    NewDiv.className = "floaty-text";
    NewDiv.id = "Float" + i;
    
    //Get the max left and top as the width and height of the Clickables container
    //Note the 50 and 20 are the width and height of the floating divs as set in the CSS file
    var MaxLeft = document.getElementById("floaty-text-wrapper").offsetWidth - 50;
    var MaxHeight = document.getElementById("floaty-text-wrapper").offsetHeight - 20;
    
    //Randomly create a left and top value for the new div
    var Left = Math.round(Math.random() * MaxLeft);
    var Top = Math.round(Math.random() * MaxHeight);
    
    //Readjust for the maximum left and top positions
    if (Left > MaxLeft) {Left = MaxLeft;}
    if (Top > MaxHeight) {Top = MaxHeight;}
    
    //Apply the left and top figures
    NewDiv.style.left = Left + "px";
    NewDiv.style.top = Top + "px";
    
    document.getElementById("floaty-text-wrapper").appendChild(NewDiv);
}

function Tick() {
    for (var i=0;i<Floats.length;i++) {
        Floats[i].timer--;
        
        //Get the element and store it in a variable for ease of use later
        var element = document.getElementById("Float" + Floats[i].id);

        if (Floats[i].timer <= 0) {
            //Remove the element from the display
            element.parentNode.removeChild(element);
            
            //Remove the item from the array. Since we're shifting a number down, we need to decrement i to cycle this particular number again.
            Floats.splice(i,1);
            i--;
        }
    }
}

function Refresh() {
    for (var i=0;i<Floats.length;i++) {
        //Get the element and store it in a variable for ease of use later
        var element = document.getElementById("Float" + Floats[i].id);

        //Modify the display of the float by lifting it up slightly
        element.style.top = (element.offsetTop - 1) + "px";
        
        //Calculate the new opacity value
        Floats[i].opacity -= FadeSpeed;
        
        //Apply the new opacity
        element.style.opacity = Math.floor(Floats[i].opacity) / 100;
        element.style.filter = "alpha(opacity=" + Math.floor(Floats[i].opacity) + ")";
    }
}

//==================================================
// Making Pizza and Selling Pizza for Money Section |                                                                                   
//==================================================


document.getElementById("button1").disabled=true;

var pizza = 0;
var totalPizza = 0;

function pizzaClick(number){
    pizza = pizza + number;
    totalPizza = totalPizza + number;
    if (pizza >= 1){
    document.getElementById("button1").disabled=false;
    };

    if (upgradeBodyBought >= 1){
        pizza = pizza + (number * 8);
        totalPizza = totalPizza + (number * 8);
        document.getElementById("pizza").innerHTML = addCommas(pizza);
        document.getElementById("totalPizza").innerHTML = addCommas(totalPizza);
    }
    if (upgradeCloneBought >= 1){
        pizza = pizza + (number * 4);
        totalPizza = totalPizza + (number * 4);
        document.getElementById("pizza").innerHTML = addCommas(pizza);
        document.getElementById("totalPizza").innerHTML = addCommas(totalPizza);
    }
    if (upgradeThirdBought >= 1){
        pizza = pizza + (number * 2) ;
        totalPizza = totalPizza + (number * 2);
        document.getElementById("pizza").innerHTML = addCommas(pizza);
        document.getElementById("totalPizza").innerHTML = addCommas(totalPizza);
    }
    if (clickUpgradeBought >= 1){
        pizza = pizza + (number * 1);
        totalPizza = totalPizza + (number * 1);
        document.getElementById("pizza").innerHTML = addCommas(pizza);
        document.getElementById("totalPizza").innerHTML = addCommas(totalPizza);
    }
    document.getElementById("pizza").innerHTML = addCommas(pizza);
    document.getElementById("totalPizza").innerHTML = addCommas(totalPizza);
    updateColours();
    questChecker();
};

var money = 0;

function sellClick(number){
    money = money + pizza; 
    if (upgradeSausageBought >= 1){
         money = money + (pizza * 4);
         pizza = 0;
         document.getElementById("money").innerHTML = addCommas(money);
         document.getElementById("pizza").innerHTML = addCommas(pizza);
    }
    if (upgradeBeefBought >= 1){
         money = money + (pizza * 3);
         pizza = 0;
         document.getElementById("money").innerHTML = addCommas(money);
         document.getElementById("pizza").innerHTML = addCommas(pizza);
    }
    if (upgradeChickenBought >= 1){
         money = money + (pizza * 2);
         pizza = 0;
         document.getElementById("money").innerHTML = addCommas(money);
         document.getElementById("pizza").innerHTML = addCommas(pizza);
    }
    if (upgradePepperoniBought >= 1){
         money = money + (pizza);
         pizza = 0;
         document.getElementById("money").innerHTML = addCommas(money);
         document.getElementById("pizza").innerHTML = addCommas(pizza);
    }
    pizza = 0;
    document.getElementById("money").innerHTML = addCommas(money);
    document.getElementById("pizza").innerHTML = addCommas(pizza);
    document.getElementById("button1").disabled=true;
    updateColours();
};

var second = 0;

function pizzaPerSecond() {

    var second = (worker * 0.5)+(pizzaCart * 2)+(pizzaVan * 6)+(pizzaParlour * 20)+(pizzaRestaurant * 60)+(pizzaPalace * 180)+(pizzaFactory * 400)+(pizzaConverter * 10000)+(pizzaWeatherMachine * 30000)+(pizzaSuperDrill * 75000)+(pizzaMoonBase * 200000);

    if (clickUpgradeBought >= 1 || upgradeBodyBought >= 1 || upgradeCloneBought >= 1 || upgradeThirdBought >= 1) {
    var second = 2 *((worker * 0.5)+(pizzaCart * 2)+(pizzaVan * 6)+(pizzaParlour * 20)+(pizzaRestaurant * 60)+(pizzaPalace * 180)+(pizzaFactory * 400)+(pizzaConverter * 10000)+(pizzaWeatherMachine * 30000)+(pizzaSuperDrill * 75000)+(pizzaMoonBase * 200000));
    document.getElementById("second").innerHTML = addCommas(second);
    }
    if (upgradeThirdBought >= 1 && clickUpgradeBought >= 1) {
    var second = 4 *((worker * 0.5)+(pizzaCart * 2)+(pizzaVan * 6)+(pizzaParlour * 20)+(pizzaRestaurant * 60)+(pizzaPalace * 180)+(pizzaFactory * 400)+(pizzaConverter * 10000)+(pizzaWeatherMachine * 30000)+(pizzaSuperDrill * 75000)+(pizzaMoonBase * 200000));
    document.getElementById("second").innerHTML = addCommas(second);
    }
    if (upgradeCloneBought >= 1 && upgradeThirdBought >= 1 && clickUpgradeBought >= 1) {
    var second = 8 *((worker * 0.5)+(pizzaCart * 2)+(pizzaVan * 6)+(pizzaParlour * 20)+(pizzaRestaurant * 60)+(pizzaPalace * 180)+(pizzaFactory * 400)+(pizzaConverter * 10000)+(pizzaWeatherMachine * 30000)+(pizzaSuperDrill * 75000)+(pizzaMoonBase * 200000));
    document.getElementById("second").innerHTML = addCommas(second);
    }
    if (upgradeBodyBought >= 1 && upgradeCloneBought >= 1 && upgradeThirdBought >= 1 && clickUpgradeBought >= 1) {
    var second = 16 *((worker * 0.5)+(pizzaCart * 2)+(pizzaVan * 6)+(pizzaParlour * 20)+(pizzaRestaurant * 60)+(pizzaPalace * 180)+(pizzaFactory * 400)+(pizzaConverter * 10000)+(pizzaWeatherMachine * 30000)+(pizzaSuperDrill * 75000)+(pizzaMoonBase * 200000));
    document.getElementById("second").innerHTML = addCommas(second);
    }

    document.getElementById("second").innerHTML = addCommas(second);
};


function updateColours() {

    // Pizza Makers //
    var workerCost = Math.floor(50 * Math.pow(1.05, worker));
    var pizzaCartCost = Math.floor(200 * Math.pow(1.05, pizzaCart));
    var pizzaVanCost = Math.floor(500 * Math.pow(1.05, pizzaVan)); 
    var pizzaParlourCost = Math.floor(2000 * Math.pow(1.05, pizzaParlour)); 
    var pizzaRestaurantCost = Math.floor(10000 * Math.pow(1.05, pizzaRestaurant)); 
    var pizzaPalaceCost = Math.floor(50000 * Math.pow(1.05, pizzaPalace)); 
    var pizzaFactoryCost = Math.floor(200000 * Math.pow(1.05, pizzaFactory));
    var pizzaConverterCost = Math.floor(1000000 * Math.pow(1.05, pizzaConverter));
    var pizzaWeatherMachineCost = Math.floor(25000000 * Math.pow(1.05, pizzaWeatherMachine)); 
    var pizzaSuperDrillCost = Math.floor(500000000 * Math.pow(1.05, pizzaSuperDrill)); 
    var pizzaMoonBaseCost = Math.floor(1000000000 * Math.pow(1.05, pizzaMoonBase));
    document.getElementById("money").innerHTML = addCommas(money);

    // Worker
    if (money >= workerCost){
         document.getElementById("workerCost").style.color = "#4DBD33"; 
    }
    if (money < workerCost){
        document.getElementById("workerCost").style.color = "#DB2929"; 
    }
    // Pizza Cart
    if (money >= pizzaCartCost){
         document.getElementById("pizzaCartCost").style.color = "#4DBD33"; 
    }
    if (money < pizzaCartCost){
         document.getElementById("pizzaCartCost").style.color = "#DB2929"; 
    }
    if (slave >= pizzaCartCostSlave){
         document.getElementById("pizzaCartCostSlave").style.color = "#4DBD33"; 
    }
    if (slave < pizzaCartCostSlave){
         document.getElementById("pizzaCartCostSlave").style.color = "#DB2929"; 
    }
    if (cart >= pizzaCartCostCart){
         document.getElementById("pizzaCartCostCart").style.color = "#4DBD33"; 
    }
    if (cart < pizzaCartCostCart){
         document.getElementById("pizzaCartCostCart").style.color = "#DB2929"; 
    }
    // Pizza Van
    if (money >= pizzaVanCost){
         document.getElementById("pizzaVanCost").style.color = "#4DBD33"; 
    }
    if (money < pizzaVanCost){
         document.getElementById("pizzaVanCost").style.color = "#DB2929"; 
    }
    if (slave >= pizzaVanCostSlave){
         document.getElementById("pizzaVanCostSlave").style.color = "#4DBD33"; 
    }
    if (slave < pizzaVanCostSlave){
         document.getElementById("pizzaVanCostSlave").style.color = "#DB2929"; 
    }
    if (van >= pizzaVanCostVan){
         document.getElementById("pizzaVanCostVan").style.color = "#4DBD33"; 
    }
    if (van < pizzaVanCostVan){
         document.getElementById("pizzaVanCostVan").style.color = "#DB2929"; 
    }
    // Pizza Parlour
    if (money >= pizzaParlourCost){
         document.getElementById("pizzaParlourCost").style.color = "#4DBD33"; 
    }
    if (money < pizzaParlourCost){
         document.getElementById("pizzaParlourCost").style.color = "#DB2929"; 
    }
    if (slave >= pizzaParlourCostSlave){
         document.getElementById("pizzaParlourCostSlave").style.color = "#4DBD33"; 
    }
    if (slave < pizzaParlourCostSlave){
         document.getElementById("pizzaParlourCostSlave").style.color = "#DB2929"; 
    }
    if (cleaner >= pizzaParlourCostCleaner){
         document.getElementById("pizzaParlourCostCleaner").style.color = "#4DBD33"; 
    }
    if (cleaner < pizzaParlourCostCleaner){
         document.getElementById("pizzaParlourCostCleaner").style.color = "#DB2929"; 
    }
    if (manager >= pizzaParlourCostManager){
         document.getElementById("pizzaParlourCostManager").style.color = "#4DBD33"; 
    }
    if (manager < pizzaParlourCostManager){
         document.getElementById("pizzaParlourCostManager").style.color = "#DB2929"; 
    }
    if (parlour >= pizzaParlourCostParlour){
         document.getElementById("pizzaParlourCostParlour").style.color = "#4DBD33"; 
    }
    if (parlour < pizzaParlourCostParlour){
         document.getElementById("pizzaParlourCostParlour").style.color = "#DB2929"; 
    }
    // Pizza Restaurant
    if (money >= pizzaRestaurantCost){
         document.getElementById("pizzaRestaurantCost").style.color = "#4DBD33"; 
    }
    if (money < pizzaRestaurantCost){
         document.getElementById("pizzaRestaurantCost").style.color = "#DB2929"; 
    }
    if (slave >= pizzaRestaurantCostSlave){
         document.getElementById("pizzaRestaurantCostSlave").style.color = "#4DBD33"; 
    }
    if (slave < pizzaRestaurantCostSlave){
         document.getElementById("pizzaRestaurantCostSlave").style.color = "#DB2929"; 
    }
    if (cleaner >= pizzaRestaurantCostCleaner){
         document.getElementById("pizzaRestaurantCostCleaner").style.color = "#4DBD33"; 
    }
    if (cleaner < pizzaRestaurantCostCleaner){
         document.getElementById("pizzaRestaurantCostCleaner").style.color = "#DB2929"; 
    }
    if (manager >= pizzaRestaurantCostManager){
         document.getElementById("pizzaRestaurantCostManager").style.color = "#4DBD33"; 
    }
    if (manager < pizzaRestaurantCostManager){
         document.getElementById("pizzaRestaurantCostManager").style.color = "#DB2929"; 
    }
    if (restaurant >= pizzaRestaurantCostRestaurant){
         document.getElementById("pizzaRestaurantCostRestaurant").style.color = "#4DBD33"; 
    }
    if (restaurant < pizzaRestaurantCostRestaurant){
         document.getElementById("pizzaRestaurantCostRestaurant").style.color = "#DB2929"; 
    }
    // Pizza Palace
    if (money >= pizzaPalaceCost){
         document.getElementById("pizzaPalaceCost").style.color = "#4DBD33"; 
    }
    if (money < pizzaPalaceCost){
         document.getElementById("pizzaPalaceCost").style.color = "#DB2929"; 
    }
    if (slave >= pizzaPalaceCostSlave){
         document.getElementById("pizzaPalaceCostSlave").style.color = "#4DBD33"; 
    }
    if (slave < pizzaPalaceCostSlave){
         document.getElementById("pizzaPalaceCostSlave").style.color = "#DB2929"; 
    }
    if (cleaner >= pizzaPalaceCostCleaner){
         document.getElementById("pizzaPalaceCostCleaner").style.color = "#4DBD33"; 
    }
    if (cleaner < pizzaPalaceCostCleaner){
         document.getElementById("pizzaPalaceCostCleaner").style.color = "#DB2929"; 
    }
    if (manager >= pizzaPalaceCostManager){
         document.getElementById("pizzaPalaceCostManager").style.color = "#4DBD33"; 
    }
    if (manager < pizzaPalaceCostManager){
         document.getElementById("pizzaPalaceCostManager").style.color = "#DB2929"; 
    }
    if (palace >= pizzaPalaceCostPalace){
         document.getElementById("pizzaPalaceCostPalace").style.color = "#4DBD33"; 
    }
    if (palace < pizzaPalaceCostPalace){
         document.getElementById("pizzaPalaceCostPalace").style.color = "#DB2929"; 
    }
    // Pizza Factory
    if (money >= pizzaFactoryCost){
         document.getElementById("pizzaFactoryCost").style.color = "#4DBD33"; 
    }
    if (money < pizzaFactoryCost){
         document.getElementById("pizzaFactoryCost").style.color = "#DB2929"; 
    }
    if (slave >= pizzaFactoryCostSlave){
         document.getElementById("pizzaFactoryCostSlave").style.color = "#4DBD33"; 
    }
    if (slave < pizzaFactoryCostSlave){
         document.getElementById("pizzaFactoryCostSlave").style.color = "#DB2929"; 
    }
    if (cleaner >= pizzaFactoryCostCleaner){
         document.getElementById("pizzaFactoryCostCleaner").style.color = "#4DBD33"; 
    }
    if (cleaner < pizzaFactoryCostCleaner){
         document.getElementById("pizzaFactoryCostCleaner").style.color = "#DB2929"; 
    }
    if (manager >= pizzaFactoryCostManager){
         document.getElementById("pizzaFactoryCostManager").style.color = "#4DBD33"; 
    }
    if (manager < pizzaFactoryCostManager){
         document.getElementById("pizzaFactoryCostManager").style.color = "#DB2929"; 
    }
    if (factory >= pizzaFactoryCostFactory){
         document.getElementById("pizzaFactoryCostFactory").style.color = "#4DBD33"; 
    }
    if (factory < pizzaFactoryCostFactory){
         document.getElementById("pizzaFactoryCostFactory").style.color = "#DB2929"; 
    }
    // Pizza Converter
    if (money >= pizzaConverterCost){
         document.getElementById("pizzaConverterCost").style.color = "#4DBD33"; 
    }
    if (money < pizzaConverterCost){
         document.getElementById("pizzaConverterCost").style.color = "#DB2929"; 
    }
    if (slave >= pizzaConverterCostSlave){
         document.getElementById("pizzaConverterCostSlave").style.color = "#4DBD33"; 
    }
    if (slave < pizzaConverterCostSlave){
         document.getElementById("pizzaConverterCostSlave").style.color = "#DB2929"; 
    }
    if (cleaner >= pizzaConverterCostCleaner){
         document.getElementById("pizzaConverterCostCleaner").style.color = "#4DBD33"; 
    }
    if (cleaner < pizzaConverterCostCleaner){
         document.getElementById("pizzaConverterCostCleaner").style.color = "#DB2929"; 
    }
    if (operator >= pizzaConverterCostOperator){
         document.getElementById("pizzaConverterCostOperator").style.color = "#4DBD33"; 
    }
    if (operator < pizzaConverterCostOperator){
         document.getElementById("pizzaConverterCostOperator").style.color = "#DB2929"; 
    }
    if (scientist >= pizzaConverterCostScientist){
         document.getElementById("pizzaConverterCostScientist").style.color = "#4DBD33"; 
    }
    if (scientist < pizzaConverterCostScientist){
         document.getElementById("pizzaConverterCostScientist").style.color = "#DB2929"; 
    }
    if (scrapMetal >= pizzaConverterCostScrapMetal){
         document.getElementById("pizzaConverterCostScrapMetal").style.color = "#4DBD33"; 
    }
    if (scrapMetal < pizzaConverterCostScrapMetal){
         document.getElementById("pizzaConverterCostScrapMetal").style.color = "#DB2929"; 
    }
    if (converter >= pizzaConverterCostConverter){
         document.getElementById("pizzaConverterCostConverter").style.color = "#4DBD33"; 
    }
    if (converter < pizzaConverterCostConverter){
         document.getElementById("pizzaConverterCostConverter").style.color = "#DB2929"; 
    }
    // Pizza Weather Machine
    if (money >= pizzaWeatherMachineCost){
         document.getElementById("pizzaWeatherMachineCost").style.color = "#4DBD33"; 
    }
    if (money < pizzaWeatherMachineCost){
         document.getElementById("pizzaWeatherMachineCost").style.color = "#DB2929"; 
    }
    if (slave >= pizzaWeatherMachineCostSlave){
         document.getElementById("pizzaWeatherMachineCostSlave").style.color = "#4DBD33"; 
    }
    if (slave < pizzaWeatherMachineCostSlave){
         document.getElementById("pizzaWeatherMachineCostSlave").style.color = "#DB2929"; 
    }
    if (cleaner >= pizzaWeatherMachineCostCleaner){
         document.getElementById("pizzaWeatherMachineCostCleaner").style.color = "#4DBD33"; 
    }
    if (cleaner < pizzaWeatherMachineCostCleaner){
         document.getElementById("pizzaWeatherMachineCostCleaner").style.color = "#DB2929"; 
    }
    if (operator >= pizzaWeatherMachineCostOperator){
         document.getElementById("pizzaWeatherMachineCostOperator").style.color = "#4DBD33"; 
    }
    if (operator < pizzaWeatherMachineCostOperator){
         document.getElementById("pizzaWeatherMachineCostOperator").style.color = "#DB2929"; 
    }
    if (scientist >= pizzaWeatherMachineCostScientist){
         document.getElementById("pizzaWeatherMachineCostScientist").style.color = "#4DBD33"; 
    }
    if (scientist < pizzaWeatherMachineCostScientist){
         document.getElementById("pizzaWeatherMachineCostScientist").style.color = "#DB2929"; 
    }
    if (scrapMetal >= pizzaWeatherMachineCostScrapMetal){
         document.getElementById("pizzaWeatherMachineCostScrapMetal").style.color = "#4DBD33"; 
    }
    if (scrapMetal < pizzaWeatherMachineCostScrapMetal){
         document.getElementById("pizzaWeatherMachineCostScrapMetal").style.color = "#DB2929"; 
    }
    if (weatherMachine >= pizzaWeatherMachineCostWeatherMachine){
         document.getElementById("pizzaWeatherMachineCostWeatherMachine").style.color = "#4DBD33"; 
    }
    if (weatherMachine < pizzaWeatherMachineCostWeatherMachine){
         document.getElementById("pizzaWeatherMachineCostWeatherMachine").style.color = "#DB2929"; 
    }
    // Pizza Super Drill
    if (money >= pizzaSuperDrillCost){
         document.getElementById("pizzaSuperDrillCost").style.color = "#4DBD33"; 
    }
    if (money < pizzaSuperDrillCost){
         document.getElementById("pizzaSuperDrillCost").style.color = "#DB2929"; 
    }
    if (slave >= pizzaSuperDrillCostSlave){
         document.getElementById("pizzaSuperDrillCostSlave").style.color = "#4DBD33"; 
    }
    if (slave < pizzaSuperDrillCostSlave){
         document.getElementById("pizzaSuperDrillCostSlave").style.color = "#DB2929"; 
    }
    if (cleaner >= pizzaSuperDrillCostCleaner){
         document.getElementById("pizzaSuperDrillCostCleaner").style.color = "#4DBD33"; 
    }
    if (cleaner < pizzaSuperDrillCostCleaner){
         document.getElementById("pizzaSuperDrillCostCleaner").style.color = "#DB2929"; 
    }
    if (operator >= pizzaSuperDrillCostOperator){
         document.getElementById("pizzaSuperDrillCostOperator").style.color = "#4DBD33"; 
    }
    if (operator < pizzaSuperDrillCostOperator){
         document.getElementById("pizzaSuperDrillCostOperator").style.color = "#DB2929"; 
    }
    if (scientist >= pizzaSuperDrillCostScientist){
         document.getElementById("pizzaSuperDrillCostScientist").style.color = "#4DBD33"; 
    }
    if (scientist < pizzaSuperDrillCostScientist){
         document.getElementById("pizzaSuperDrillCostScientist").style.color = "#DB2929"; 
    }
    if (scrapMetal >= pizzaSuperDrillCostScrapMetal){
         document.getElementById("pizzaSuperDrillCostScrapMetal").style.color = "#4DBD33"; 
    }
    if (scrapMetal < pizzaSuperDrillCostScrapMetal){
         document.getElementById("pizzaSuperDrillCostScrapMetal").style.color = "#DB2929"; 
    }
    if (superDrill >= pizzaSuperDrillCostSuperDrill){
         document.getElementById("pizzaSuperDrillCostSuperDrill").style.color = "#4DBD33"; 
    }
    if (superDrill < pizzaSuperDrillCostSuperDrill){
         document.getElementById("pizzaSuperDrillCostSuperDrill").style.color = "#DB2929"; 
    }
    // Pizza Moon Base
    if (money >= pizzaMoonBaseCost){
         document.getElementById("pizzaMoonBaseCost").style.color = "#4DBD33"; 
    }
    if (money < pizzaMoonBaseCost){
         document.getElementById("pizzaMoonBaseCost").style.color = "#DB2929"; 
    }
    if (slave >= pizzaMoonBaseCostSlave){
         document.getElementById("pizzaMoonBaseCostSlave").style.color = "#4DBD33"; 
    }
    if (slave < pizzaMoonBaseCostSlave){
         document.getElementById("pizzaMoonBaseCostSlave").style.color = "#DB2929"; 
    }
    if (cleaner >= pizzaMoonBaseCostCleaner){
         document.getElementById("pizzaMoonBaseCostCleaner").style.color = "#4DBD33"; 
    }
    if (cleaner < pizzaMoonBaseCostCleaner){
         document.getElementById("pizzaMoonBaseCostCleaner").style.color = "#DB2929"; 
    }
    if (operator >= pizzaMoonBaseCostOperator){
         document.getElementById("pizzaMoonBaseCostOperator").style.color = "#4DBD33"; 
    }
    if (operator < pizzaMoonBaseCostOperator){
         document.getElementById("pizzaMoonBaseCostOperator").style.color = "#DB2929"; 
    }
    if (scientist >= pizzaMoonBaseCostScientist){
         document.getElementById("pizzaMoonBaseCostScientist").style.color = "#4DBD33"; 
    }
    if (scientist < pizzaMoonBaseCostScientist){
         document.getElementById("pizzaMoonBaseCostScientist").style.color = "#DB2929"; 
    }
    if (astronaut >= pizzaMoonBaseCostAstronaut){
         document.getElementById("pizzaMoonBaseCostAstronaut").style.color = "#4DBD33"; 
    }
    if (astronaut < pizzaMoonBaseCostAstronaut){
         document.getElementById("pizzaMoonBaseCostAstronaut").style.color = "#DB2929"; 
    }
    if (scrapMetal >= pizzaMoonBaseCostScrapMetal){
         document.getElementById("pizzaMoonBaseCostScrapMetal").style.color = "#4DBD33"; 
    }
    if (scrapMetal < pizzaMoonBaseCostScrapMetal){
         document.getElementById("pizzaMoonBaseCostScrapMetal").style.color = "#DB2929"; 
    }
    if (spaceElevator >= pizzaMoonBaseCostSpaceElevator){
         document.getElementById("pizzaMoonBaseCostSpaceElevator").style.color = "#4DBD33"; 
    }
    if (spaceElevator < pizzaMoonBaseCostSpaceElevator){
         document.getElementById("pizzaMoonBaseCostSpaceElevator").style.color = "#DB2929"; 
    }
    if (moonBase >= pizzaMoonBaseCostMoonBase){
         document.getElementById("pizzaMoonBaseCostMoonBase").style.color = "#4DBD33"; 
    }
    if (moonBase < pizzaMoonBaseCostMoonBase){
         document.getElementById("pizzaMoonBaseCostMoonBase").style.color = "#DB2929"; 
    }
    // Rocket Ship 
    if (money >= rocketShipCost){
         document.getElementById("rocketShipCost").style.color = "#4DBD33";
    }
    if (money < rocketShipCost){
         document.getElementById("rocketShipCost").style.color = "#DB2929";
    }
    // Supply Crew 
    if (scientist >= supplyCrewScientist){
         document.getElementById("supplyCrewScientist").style.color = "#4DBD33";
    }
    if (scientist < supplyCrewScientist){
         document.getElementById("supplyCrewScientist").style.color = "#DB2929";
    }
    if (astronaut >= supplyCrewAstronaut){
         document.getElementById("supplyCrewAstronaut").style.color = "#4DBD33";
    }
    if (astronaut < supplyCrewAstronaut){
         document.getElementById("supplyCrewAstronaut").style.color = "#DB2929";
    }
    // Donate Fuel 
    if (pizza >= donateFuelCost){
         document.getElementById("donateFuelCost").style.color = "#4DBD33";
    }
    if (pizza < donateFuelCost){
         document.getElementById("donateFuelCost").style.color = "#DB2929";
    }

    // Resources //
    if (money >= slaveCost){
         document.getElementById("slaveCost").style.color = "#4DBD33";
    }
    if (money < slaveCost){
         document.getElementById("slaveCost").style.color = "#DB2929";
    }
    // Cleaner
    if (money >= cleanerCost){
         document.getElementById("cleanerCost").style.color = "#4DBD33";
    }
    if (money < cleanerCost){
         document.getElementById("cleanerCost").style.color = "#DB2929";
    }
    // Manager
    if (money >= managerCost){
         document.getElementById("managerCost").style.color = "#4DBD33";
    }
    if (money < managerCost){
         document.getElementById("managerCost").style.color = "#DB2929";
    }
    // Operator
    if (money >= operatorCost){
         document.getElementById("operatorCost").style.color = "#4DBD33";
    }
    if (money < operatorCost){
         document.getElementById("operatorCost").style.color = "#DB2929";
    }
    // Scientist
    if (money >= scientistCost){
         document.getElementById("scientistCost").style.color = "#4DBD33";
    }
    if (money < scientistCost){
         document.getElementById("scientistCost").style.color = "#DB2929";
    }
    // Astronaut
    if (money >= astronautCost){
         document.getElementById("astronautCost").style.color = "#4DBD33";
    }
    if (money < astronautCost){
         document.getElementById("astronautCost").style.color = "#DB2929";
    }
    // Cart
    if (money >= cartCost){
         document.getElementById("cartCost").style.color = "#4DBD33";
    }
    if (money < cartCost){
         document.getElementById("cartCost").style.color = "#DB2929";
    }
    // Van
    if (money >= vanCost){
         document.getElementById("vanCost").style.color = "#4DBD33";
    }
    if (money < vanCost){
         document.getElementById("vanCost").style.color = "#DB2929";
    }
    // Parlour
    if (money >= parlourCost){
         document.getElementById("parlourCost").style.color = "#4DBD33";
    }
    if (money < parlourCost){
         document.getElementById("parlourCost").style.color = "#DB2929";
    }
    // Restaurant
    if (money >= restaurantCost){
         document.getElementById("restaurantCost").style.color = "#4DBD33";
    }
    if (money < restaurantCost){
         document.getElementById("restaurantCost").style.color = "#DB2929";
    }
    // Palace
    if (money >= palaceCost){
         document.getElementById("palaceCost").style.color = "#4DBD33";
    }
    if (money < palaceCost){
         document.getElementById("palaceCost").style.color = "#DB2929";
    }
    // Factory
    if (money >= factoryCost){
         document.getElementById("factoryCost").style.color = "#4DBD33";
    }
    if (money < factoryCost){
         document.getElementById("factoryCost").style.color = "#DB2929";
    }
    // Converter
    if (money >= converterCost){
         document.getElementById("converterCost").style.color = "#4DBD33";
    }
    if (money < converterCost){
         document.getElementById("converterCost").style.color = "#DB2929";
    }
    // Weather Machine
    if (money >= weatherMachineCost){
         document.getElementById("weatherMachineCost").style.color = "#4DBD33";
    }
    if (money < weatherMachineCost){
         document.getElementById("weatherMachineCost").style.color = "#DB2929";
    }
    // Super Drill
    if (money >= superDrillCost){
         document.getElementById("superDrillCost").style.color = "#4DBD33";
    }
    if (money < superDrillCost){
         document.getElementById("superDrillCost").style.color = "#DB2929";
    }
    // Moon Base
    if (money >= moonBaseCost){
         document.getElementById("moonBaseCost").style.color = "#4DBD33";
    }
    if (money < moonBaseCost){
         document.getElementById("moonBaseCost").style.color = "#DB2929";
    }
    // Scrap Metal
    if (money >= scrapMetalCost){
         document.getElementById("scrapMetalCost").style.color = "#4DBD33";
    }
    if (money < scrapMetalCost){
         document.getElementById("scrapMetalCost").style.color = "#DB2929";
    }
    // Space Elevator
    if (money >= spaceElevatorCost){
         document.getElementById("spaceElevatorCost").style.color = "#4DBD33";
    }
    if (money < spaceElevatorCost){
         document.getElementById("spaceElevatorCost").style.color = "#DB2929";
    }

    // Upgrades //
    if (money >= autoClickerCost){
         document.getElementById("autoClickerCost").style.color = "#4DBD33";
    }
    if (money < autoClickerCost){
         document.getElementById("autoClickerCost").style.color = "#DB2929";
    }
    // Convenience 1 
    if (money >= convenienceCost){
         document.getElementById("convenienceCost").style.color = "#4DBD33";
    }
    if (money < convenienceCost){
         document.getElementById("convenienceCost").style.color = "#DB2929";
    }
    // Convenience 2 
    if (money >= convenience2Cost){
         document.getElementById("convenience2Cost").style.color = "#4DBD33";
    }
    if (money < convenience2Cost){
         document.getElementById("convenience2Cost").style.color = "#DB2929";
    }
    // Convenience 3 
    if (money >= convenience3Cost){
         document.getElementById("convenience3Cost").style.color = "#4DBD33";
    }
    if (money < convenience3Cost){
         document.getElementById("convenience3Cost").style.color = "#DB2929";
    }
    // Click 1
    if (money >= clickUpgradeCost){
         document.getElementById("clickUpgradeCost").style.color = "#4DBD33";
    }
    if (money < clickUpgradeCost){
         document.getElementById("clickUpgradeCost").style.color = "#DB2929";
    }
    // Click 2
    if (money >= upgradeThirdCost){
         document.getElementById("upgradeThirdCost").style.color = "#4DBD33";
    }
    if (money < upgradeThirdCost){
         document.getElementById("upgradeThirdCost").style.color = "#DB2929";
    }
    // Click 3
    if (money >= upgradeCloneCost){
         document.getElementById("upgradeCloneCost").style.color = "#4DBD33";
    }
    if (money < upgradeCloneCost){
         document.getElementById("upgradeCloneCost").style.color = "#DB2929";
    }
    // Click 4
    if (money >= upgradeBodyCost){
         document.getElementById("upgradeBodyCost").style.color = "#4DBD33";
    }
    if (money < upgradeBodyCost){
         document.getElementById("upgradeBodyCost").style.color = "#DB2929";
    }
    // Pepperoni
    if (money >= upgradePepperoniCost){
         document.getElementById("upgradePepperoniCost").style.color = "#4DBD33";
    }
    if (money < upgradePepperoniCost){
         document.getElementById("upgradePepperoniCost").style.color = "#DB2929";
    }
    // Chicken
    if (money >= upgradeChickenCost){
         document.getElementById("upgradeChickenCost").style.color = "#4DBD33";
    }
    if (money < upgradeChickenCost){
         document.getElementById("upgradeChickenCost").style.color = "#DB2929";
    }
    // Beef
    if (money >= upgradeBeefCost){
         document.getElementById("upgradeBeefCost").style.color = "#4DBD33";
    }
    if (money < upgradeBeefCost){
         document.getElementById("upgradeBeefCost").style.color = "#DB2929";
    }
    // Chicken
    if (money >= upgradeSausageCost){
         document.getElementById("upgradeSausageCost").style.color = "#4DBD33";
    }
    if (money < upgradeSausageCost){
         document.getElementById("upgradeSausageCost").style.color = "#DB2929";
    }
}


//=======================
// Pizza Makers Section |                                                                                   
//=======================

// Start of Worker Section

var worker = 0;
var workerCost = Math.floor(50 * Math.pow(1.05, worker));
function buyWorker(){
    var workerCost = Math.floor(50 * Math.pow(1.05, worker));                    //works out the cost of this worker
    if(money >= workerCost){                                                //checks that the player can afford the worker
        document.getElementById("mybox").style.display = "block";  
        document.getElementById("mybox6").style.display = "block"; 
        document.getElementById("mybox19").style.display = "block";            
        worker = worker + 1;                                                //increases number of workers
        money = money - workerCost;                                          //removes the money spent
        document.getElementById('worker').innerHTML = worker;                //updates the number of workers for the user
        document.getElementById('money').innerHTML = addCommas(money);              //updates the number of money for the user
        updateColours();
    };
    
    var nextWorkerCost = Math.floor(50 * Math.pow(1.05, worker));                    //works out the cost of the next worker
    document.getElementById('workerCost').innerHTML = addCommas(nextWorkerCost);            //updates the worker cost for the user
    document.getElementById('workerCostTT').innerHTML = addCommas(nextWorkerCost);          //updates the worker cost in the tooltip
};

window.setInterval(function(){
    
    pizzaClick(worker * 0.5 );
    
}, 1000);

function loadWorker(){
    var workerCost = Math.floor(50 * Math.pow(1.05, worker));
    var nextWorkerCost = Math.floor(50 * Math.pow(1.05, worker));      
    document.getElementById('workerCost').innerHTML = addCommas(nextWorkerCost);  
    document.getElementById('workerCostTT').innerHTML = addCommas(nextWorkerCost);
    if (worker >= 1){
        document.getElementById("mybox").style.display = "block";
        document.getElementById("mybox6").style.display = "block";
        document.getElementById("mybox19").style.display = "block"; 
    }   
};

// End of Worker Section

// Start of Pizza Cart Section

document.getElementById("mybox19").style.display = "none";

var pizzaCart = 0;
var pizzaCartCost = Math.floor(200 * Math.pow(1.05, pizzaCart));
var pizzaCartCostSlave = 1 
var pizzaCartCostCart = 1
function buyPizzaCart(){
    var pizzaCartCost = Math.floor(200 * Math.pow(1.05, pizzaCart)); 
    var pizzaCartCostSlave = 1 
    var pizzaCartCostCart = 1
    if(money >= pizzaCartCost && slave >= pizzaCartCostSlave && cart >= pizzaCartCostCart){   
        document.getElementById("mybox20").style.display = "block";  
        document.getElementById("mybox7").style.display = "block"; 
        document.getElementById("autoClickerHide").style.display = "block";                            
        pizzaCart = pizzaCart + 1;                                  
        money = money - pizzaCartCost;  
        slave = slave - pizzaCartCostSlave;
        cart = cart - pizzaCartCostCart;                        
        document.getElementById('pizzaCart').innerHTML = pizzaCart;  
        document.getElementById('slave').innerHTML = addCommas(slave);
        document.getElementById('cart').innerHTML = cart;
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();
        if (pizzaCart >= 1 && autoClicker === 0){
        document.getElementById("mybox44").style.display = "block";
    }  
    };
    var nextPizzaCartCost = Math.floor(200 * Math.pow(1.05, pizzaCart));       
    document.getElementById('pizzaCartCost').innerHTML = addCommas(nextPizzaCartCost); 
    document.getElementById('pizzaCartCostTT').innerHTML = addCommas(nextPizzaCartCost); 
};

window.setInterval(function(){
    
    pizzaClick(pizzaCart * 2 );
    
}, 1000);

function loadCart(){
    var pizzaCartCost = Math.floor(200 * Math.pow(1.05, pizzaCart));
    var nextPizzaCartCost = Math.floor(200 * Math.pow(1.05, pizzaCart));      
    document.getElementById('pizzaCartCost').innerHTML = addCommas(nextPizzaCartCost);  
    document.getElementById('pizzaCartCostTT').innerHTML = addCommas(nextPizzaCartCost);
    if (pizzaCart >= 1 && autoClicker === 0){
        document.getElementById("mybox44").style.display = "block";
        autoClickerNum = 5;
        document.getElementById('autoClickerNum').innerHTML = addCommas(autoClickerNum);
    }
    if (pizzaCart >= 1){
        document.getElementById("mybox20").style.display = "block";  
        document.getElementById("mybox7").style.display = "block";
        document.getElementById("autoClickerHide").style.display = "block";
    }
    if (autoClicker >= 1){
            document.getElementById("mybox44").style.display = "none";
         }
};

//End of Pizza Cart Section 

//Start of Pizza Van Section

document.getElementById("mybox20").style.display = "none";

var pizzaVan = 0;
var pizzaVanCost = Math.floor(500 * Math.pow(1.05, pizzaVan)); 
var pizzaVanCostSlave = 2 
var pizzaVanCostVan = 1
function buyPizzaVan(){
    var pizzaVanCost = Math.floor(500 * Math.pow(1.05, pizzaVan)); 
    var pizzaVanCostSlave = 2 
    var pizzaVanCostVan = 1
    if(money >= pizzaVanCost && slave >= pizzaVanCostSlave && van >= pizzaVanCostVan){  
        document.getElementById("mybox21").style.display = "block"; 
        document.getElementById("mybox8").style.display = "block"; 
        document.getElementById("mybox1").style.display = "block";
        document.getElementById("mybox2").style.display = "block";                               
        pizzaVan = pizzaVan + 1;                                  
        money = money - pizzaVanCost;  
        slave = slave - pizzaVanCostSlave;
        van = van - pizzaVanCostVan;                        
        document.getElementById('pizzaVan').innerHTML = pizzaVan;  
        document.getElementById('slave').innerHTML = addCommas(slave);
        document.getElementById('van').innerHTML = van;
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextPizzaVanCost = Math.floor(500 * Math.pow(1.05, pizzaVan));       
    document.getElementById('pizzaVanCost').innerHTML = addCommas(nextPizzaVanCost);
    document.getElementById('pizzaVanCostTT').innerHTML = addCommas(nextPizzaVanCost);  
};

window.setInterval(function(){
    
    pizzaClick(pizzaVan * 6 );
    
}, 1000);

function loadVan(){
    var pizzaVanCost = Math.floor(500 * Math.pow(1.05, pizzaVan));
    var nextPizzaVanCost = Math.floor(500 * Math.pow(1.05, pizzaVan));      
    document.getElementById('pizzaVanCost').innerHTML = addCommas(nextPizzaVanCost);  
    document.getElementById('pizzaVanCostTT').innerHTML = addCommas(nextPizzaVanCost);
    if (pizzaVan >= 1){
        document.getElementById("mybox21").style.display = "block"; 
        document.getElementById("mybox8").style.display = "block"; 
        document.getElementById("mybox1").style.display = "block";
        document.getElementById("mybox2").style.display = "block"; 
    }
};

//End of Pizza Cart Section

//Start of Pizza Parlour Section

document.getElementById("mybox21").style.display = "none";

var pizzaParlour = 0;
var pizzaParlourCost = Math.floor(2000 * Math.pow(1.05, pizzaParlour)); 
var pizzaParlourCostSlave = 3 
var pizzaParlourCostCleaner = 1 
var pizzaParlourCostManager = 1
var pizzaParlourCostParlour = 1
function buyPizzaParlour(){
    var pizzaParlourCost = Math.floor(2000 * Math.pow(1.05, pizzaParlour)); 
    var pizzaParlourCostSlave = 3 
    var pizzaParlourCostCleaner = 1 
    var pizzaParlourCostManager = 1
    var pizzaParlourCostParlour = 1
    if(money >= pizzaParlourCost && slave >= pizzaParlourCostSlave && parlour >= pizzaParlourCostParlour && cleaner >= pizzaParlourCostCleaner && manager >= pizzaParlourCostManager){  
        document.getElementById("mybox9").style.display = "block"; 
        document.getElementById("mybox22").style.display = "block";                                  
        pizzaParlour = pizzaParlour + 1;                                  
        money = money - pizzaParlourCost;  
        slave = slave - pizzaParlourCostSlave;
        cleaner = cleaner - pizzaParlourCostCleaner;
        manager = manager - pizzaParlourCostManager;
        parlour = parlour - pizzaParlourCostParlour;                        
        document.getElementById('pizzaParlour').innerHTML = pizzaParlour;  
        document.getElementById('slave').innerHTML = addCommas(slave);
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);
        document.getElementById('manager').innerHTML = addCommas(manager);
        document.getElementById('parlour').innerHTML = parlour;
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours(); 
        if (pizzaParlour === 1){
            document.getElementById("mybox41").style.display = "block";
        } 
    };
    var nextPizzaParlourCost = Math.floor(2000 * Math.pow(1.05, pizzaParlour));       
    document.getElementById('pizzaParlourCost').innerHTML = addCommas(nextPizzaParlourCost); 
    document.getElementById('pizzaParlourCostTT').innerHTML = addCommas(nextPizzaParlourCost); 
};

window.setInterval(function(){
    
    pizzaClick(pizzaParlour * 20 );
    
}, 1000);

function loadParlour(){
    var pizzaParlourCost = Math.floor(2000 * Math.pow(1.05, pizzaParlour));
    var nextPizzaParlourCost = Math.floor(2000 * Math.pow(1.05, pizzaParlour));      
    document.getElementById('pizzaParlourCost').innerHTML = addCommas(nextPizzaParlourCost);  
    document.getElementById('pizzaParlourCostTT').innerHTML = addCommas(nextPizzaParlourCost);
     if (pizzaParlour >= 1 && convenienceBought === 0){
            document.getElementById("mybox41").style.display = "block";
        } 
    if (pizzaParlour >= 1){
        document.getElementById("mybox9").style.display = "block"; 
        document.getElementById("mybox22").style.display = "block";
    }
    if (convenienceBought >= 1){
        document.getElementById("mybox41").style.display = "none";
        document.getElementById("smallbox10").style.display = "inline-block";
        document.getElementById("smallbox100").style.display = "inline-block";
        document.getElementById("smallbox1000").style.display = "inline-block";
        document.getElementById("1smallbox10").style.display = "inline-block";
        document.getElementById("1smallbox100").style.display = "inline-block";
        document.getElementById("1smallbox1000").style.display = "inline-block";
        document.getElementById("2smallbox10").style.display = "inline-block";
        document.getElementById("2smallbox100").style.display = "inline-block";
        document.getElementById("2smallbox1000").style.display = "inline-block";
         }
};

//End of Pizza Parlour Section

//Start of Pizza Restaurant Section

document.getElementById("mybox22").style.display = "none";

var pizzaRestaurant = 0;
var pizzaRestaurantCost = Math.floor(10000 * Math.pow(1.05, pizzaRestaurant)); 
var pizzaRestaurantCostSlave = 8 
var pizzaRestaurantCostCleaner = 2 
var pizzaRestaurantCostManager = 1
var pizzaRestaurantCostRestaurant = 1
function buyPizzaRestaurant(){
    var pizzaRestaurantCost = Math.floor(10000 * Math.pow(1.05, pizzaRestaurant)); 
    var pizzaRestaurantCostSlave = 8 
    var pizzaRestaurantCostCleaner = 2 
    var pizzaRestaurantCostManager = 1
    var pizzaRestaurantCostRestaurant = 1
    if(money >= pizzaRestaurantCost && slave >= pizzaRestaurantCostSlave && restaurant >= pizzaRestaurantCostRestaurant && cleaner >= pizzaRestaurantCostCleaner && manager >= pizzaRestaurantCostManager){
        document.getElementById("mybox10").style.display = "block"; 
        document.getElementById("mybox23").style.display = "block"; 
        document.getElementById("mybox33").style.display = "block";                                   
        pizzaRestaurant = pizzaRestaurant + 1;                                  
        money = money - pizzaRestaurantCost;  
        slave = slave - pizzaRestaurantCostSlave;
        cleaner = cleaner - pizzaRestaurantCostCleaner;
        manager = manager - pizzaRestaurantCostManager;
        restaurant = restaurant - pizzaRestaurantCostRestaurant;                        
        document.getElementById('pizzaRestaurant').innerHTML = pizzaRestaurant;  
        document.getElementById('slave').innerHTML = addCommas(slave);
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);
        document.getElementById('manager').innerHTML = addCommas(manager);
        document.getElementById('restaurant').innerHTML = restaurant;
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextPizzaRestaurantCost = Math.floor(10000 * Math.pow(1.05, pizzaRestaurant));       
    document.getElementById('pizzaRestaurantCost').innerHTML = addCommas(nextPizzaRestaurantCost);
    document.getElementById('pizzaRestaurantCostTT').innerHTML = addCommas(nextPizzaRestaurantCost);  
};

window.setInterval(function(){
    
    pizzaClick(pizzaRestaurant * 60 );
    
}, 1000);

function loadRestaurant(){
    var pizzaRestaurantCost = Math.floor(10000 * Math.pow(1.05, pizzaRestaurant));
    var nextPizzaRestaurantCost = Math.floor(10000 * Math.pow(1.05, pizzaRestaurant));      
    document.getElementById('pizzaRestaurantCost').innerHTML = addCommas(nextPizzaRestaurantCost);  
    document.getElementById('pizzaRestaurantCostTT').innerHTML = addCommas(nextPizzaRestaurantCost);
     if (pizzaRestaurant >= 1){
        document.getElementById("mybox10").style.display = "block"; 
        document.getElementById("mybox23").style.display = "block";
        document.getElementById("mybox33").style.display = "block"; 
    }
};

//End of Pizza Restaurant Section

//Start of Pizza Palace Section

document.getElementById("mybox23").style.display = "none";

var pizzaPalace = 0;
var pizzaPalaceCost = Math.floor(50000 * Math.pow(1.05, pizzaPalace)); 
var pizzaPalaceCostSlave = 16 
var pizzaPalaceCostCleaner = 4 
var pizzaPalaceCostManager = 2
var pizzaPalaceCostPalace = 1
function buyPizzaPalace(){
    var pizzaPalaceCost = Math.floor(50000 * Math.pow(1.05, pizzaPalace)); 
    var pizzaPalaceCostSlave = 16 
    var pizzaPalaceCostCleaner = 4 
    var pizzaPalaceCostManager = 2
    var pizzaPalaceCostPalace = 1
    if(money >= pizzaPalaceCost && slave >= pizzaPalaceCostSlave && palace >= pizzaPalaceCostPalace && cleaner >= pizzaPalaceCostCleaner && manager >= pizzaPalaceCostManager){
        document.getElementById("mybox11").style.display = "block"; 
        document.getElementById("mybox24").style.display = "block";                                      
        pizzaPalace = pizzaPalace + 1;                                  
        money = money - pizzaPalaceCost;  
        slave = slave - pizzaPalaceCostSlave;
        cleaner = cleaner - pizzaPalaceCostCleaner;
        manager = manager - pizzaPalaceCostManager;
        palace = palace - pizzaPalaceCostPalace;                        
        document.getElementById('pizzaPalace').innerHTML = pizzaPalace;  
        document.getElementById('slave').innerHTML = addCommas(slave);
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);
        document.getElementById('manager').innerHTML = addCommas(manager);
        document.getElementById('palace').innerHTML = palace;
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();  
    };
    var nextPizzaPalaceCost = Math.floor(50000 * Math.pow(1.05, pizzaPalace));       
    document.getElementById('pizzaPalaceCost').innerHTML = addCommas(nextPizzaPalaceCost); 
    document.getElementById('pizzaPalaceCostTT').innerHTML = addCommas(nextPizzaPalaceCost);  
};

window.setInterval(function(){
    
    pizzaClick(pizzaPalace * 180 );
    
}, 1000);

function loadPalace(){
    var pizzaPalaceCost = Math.floor(50000 * Math.pow(1.05, pizzaPalace));
    var nextPizzaPalaceCost = Math.floor(50000 * Math.pow(1.05, pizzaPalace));      
    document.getElementById('pizzaPalaceCost').innerHTML = addCommas(nextPizzaPalaceCost);  
    document.getElementById('pizzaPalaceCostTT').innerHTML = addCommas(nextPizzaPalaceCost);
      if (pizzaPalace >= 1){
        document.getElementById("mybox11").style.display = "block"; 
        document.getElementById("mybox24").style.display = "block"; 
    }
};

//End of Pizza Palace Section

//Start of Pizza Factory Section

document.getElementById("mybox24").style.display = "none";

var pizzaFactory = 0;
var pizzaFactoryCost = Math.floor(200000 * Math.pow(1.05, pizzaFactory)); 
var pizzaFactoryCostSlave = 32 
var pizzaFactoryCostCleaner = 8 
var pizzaFactoryCostManager = 4
var pizzaFactoryCostFactory = 1
function buyPizzaFactory(){
    var pizzaFactoryCost = Math.floor(200000 * Math.pow(1.05, pizzaFactory)); 
    var pizzaFactoryCostSlave = 32 
    var pizzaFactoryCostCleaner = 8 
    var pizzaFactoryCostManager = 4
    var pizzaFactoryCostFactory = 1
    if(money >= pizzaFactoryCost && slave >= pizzaFactoryCostSlave && factory >= pizzaFactoryCostFactory && cleaner >= pizzaFactoryCostCleaner && manager >= pizzaFactoryCostManager){
        document.getElementById("mybox12").style.display = "block"; 
        document.getElementById("mybox17").style.display = "block"; 
        document.getElementById("mybox3").style.display = "block";
        document.getElementById("mybox4").style.display = "block"; 
        document.getElementById("mybox25").style.display = "block"; 
                                           
        pizzaFactory = pizzaFactory + 1;                                  
        money = money - pizzaFactoryCost;  
        slave = slave - pizzaFactoryCostSlave;
        cleaner = cleaner - pizzaFactoryCostCleaner;
        manager = manager - pizzaFactoryCostManager;
        factory = factory - pizzaFactoryCostFactory;                        
        document.getElementById('pizzaFactory').innerHTML = pizzaFactory;  
        document.getElementById('slave').innerHTML = addCommas(slave);
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);
        document.getElementById('manager').innerHTML = addCommas(manager);
        document.getElementById('factory').innerHTML = factory;
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();
        if (pizzaFactory === 1){
            document.getElementById("mybox42").style.display = "block";
            document.getElementById("mybox37").style.display = "block";
        }  
    };
    var nextPizzaFactoryCost = Math.floor(200000 * Math.pow(1.05, pizzaFactory));       
    document.getElementById('pizzaFactoryCost').innerHTML = addCommas(nextPizzaFactoryCost); 
    document.getElementById('pizzaFactoryCostTT').innerHTML = addCommas(nextPizzaFactoryCost); 
};

window.setInterval(function(){
    
    pizzaClick(pizzaFactory * 400 );
    
}, 1000);

function loadFactory(){
    var pizzaFactoryCost = Math.floor(200000 * Math.pow(1.05, pizzaFactory));
    var nextPizzaFactoryCost = Math.floor(200000 * Math.pow(1.05, pizzaFactory));      
    document.getElementById('pizzaFactoryCost').innerHTML = addCommas(nextPizzaFactoryCost);  
    document.getElementById('pizzaFactoryCostTT').innerHTML = addCommas(nextPizzaFactoryCost);
     if (pizzaFactory >= 1 && convenience2Bought === 0){
            document.getElementById("mybox42").style.display = "block";
        }  
    if (pizzaFactory >= 1 && upgradePepperoniBought === 0){
            document.getElementById("mybox37").style.display = "block";
        }  
     if (pizzaFactory >= 1){
        document.getElementById("mybox12").style.display = "block"; 
        document.getElementById("mybox17").style.display = "block"; 
        document.getElementById("mybox3").style.display = "block";
        document.getElementById("mybox4").style.display = "block"; 
        document.getElementById("mybox25").style.display = "block";
    }

     if (convenience2Bought >= 1){
            document.getElementById("mybox42").style.display = "none";
            document.getElementById("3smallbox10").style.display = "inline-block";
         document.getElementById("3smallbox100").style.display = "inline-block";
         document.getElementById("3smallbox1000").style.display = "inline-block";
         document.getElementById("4smallbox10").style.display = "inline-block";
         document.getElementById("4smallbox100").style.display = "inline-block";
         document.getElementById("4smallbox1000").style.display = "inline-block";
         document.getElementById("6smallbox10").style.display = "inline-block";
         document.getElementById("6smallbox100").style.display = "inline-block";
         document.getElementById("6smallbox1000").style.display = "inline-block";
         }
    
    if(clickUpgradeBought >= 1){
    document.getElementById("mybox34").style.display = "block";
   }

   if(upgradeThirdBought >= 1){
    document.getElementById("mybox34").style.display = "none";
    document.getElementById("mybox35").style.display = "block";
   }    

   if(upgradeCloneBought >= 1){
    document.getElementById("mybox35").style.display = "none";
    document.getElementById("mybox36").style.display = "block";
   } 

   if(upgradeBodyBought >= 1){
    document.getElementById("mybox36").style.display = "none";
   }  

   if (upgradePepperoniBought >= 1){
    document.getElementById("mybox37").style.display = "none";
    document.getElementById("mybox38").style.display = "block";
    }  

   if (upgradeChickenBought >= 1){
    document.getElementById("mybox38").style.display = "none";
    document.getElementById("mybox39").style.display = "block";
    }

   if (upgradeBeefBought >= 1){
    document.getElementById("mybox39").style.display = "none";
    document.getElementById("mybox40").style.display = "block";
    }

   if (upgradeSausageBought >= 1){
    document.getElementById("mybox40").style.display = "none";
    }
};

//End of Pizza Factory Section

//Start of Pizza Converter Section

document.getElementById("mybox25").style.display = "none";

var pizzaConverter = 0;
var pizzaConverterCost = Math.floor(1000000 * Math.pow(1.05, pizzaConverter)); 
var pizzaConverterCostSlave = 64 
var pizzaConverterCostCleaner = 16 
var pizzaConverterCostOperator = 8
var pizzaConverterCostScientist = 4
var pizzaConverterCostScrapMetal = 10
var pizzaConverterCostConverter = 1
function buyPizzaConverter(){
    var pizzaConverterCost = Math.floor(1000000 * Math.pow(1.05, pizzaConverter)); 
    var pizzaConverterCostSlave = 64 
    var pizzaConverterCostCleaner = 16 
    var pizzaConverterCostOperator = 8
    var pizzaConverterCostScientist = 4
    var pizzaConverterCostScrapMetal = 10
    var pizzaConverterCostConverter = 1
    if(money >= pizzaConverterCost && slave >= pizzaConverterCostSlave && converter >= pizzaConverterCostConverter && cleaner >= pizzaConverterCostCleaner && operator >= pizzaConverterCostOperator && scientist >= pizzaConverterCostScientist && scrapMetal >= pizzaConverterCostScrapMetal){                                   
        document.getElementById("mybox26").style.display = "block"; 
        document.getElementById("mybox13").style.display = "block";
        pizzaConverter = pizzaConverter + 1;                                  
        money = money - pizzaConverterCost;  
        slave = slave - pizzaConverterCostSlave;
        cleaner = cleaner - pizzaConverterCostCleaner;
        operator = operator - pizzaConverterCostOperator;
        scientist = scientist - pizzaConverterCostScientist;
        scrapMetal = scrapMetal - pizzaConverterCostScrapMetal;
        converter = converter - pizzaConverterCostConverter;                        
        document.getElementById('pizzaConverter').innerHTML = pizzaConverter;  
        document.getElementById('slave').innerHTML = addCommas(slave);
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);
        document.getElementById('operator').innerHTML = addCommas(operator);
        document.getElementById('scientist').innerHTML = addCommas(scientist);
        document.getElementById('scrapMetal').innerHTML = addCommas(scrapMetal);
        document.getElementById('converter').innerHTML = converter;
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextPizzaConverterCost = Math.floor(1000000 * Math.pow(1.05, pizzaConverter));       
    document.getElementById('pizzaConverterCost').innerHTML = addCommas(nextPizzaConverterCost);
    document.getElementById('pizzaConverterCostTT').innerHTML = addCommas(nextPizzaConverterCost);  

};

window.setInterval(function(){
    
    pizzaClick(pizzaConverter * 10000 );
    
}, 1000);

function loadConverter(){
    var pizzaConverterCost = Math.floor(1000000 * Math.pow(1.05, pizzaConverter));
    var nextPizzaConverterCost = Math.floor(1000000 * Math.pow(1.05, pizzaConverter));      
    document.getElementById('pizzaConverterCost').innerHTML = addCommas(nextPizzaConverterCost);  
    document.getElementById('pizzaConverterCostTT').innerHTML = addCommas(nextPizzaConverterCost);
     if (pizzaConverter >= 1){
        document.getElementById("mybox26").style.display = "block"; 
        document.getElementById("mybox13").style.display = "block";
    }
};

//End of Pizza Converter Section

//Start of Pizza Weather Machine Section

document.getElementById("mybox26").style.display = "none";

var pizzaWeatherMachine = 0;
var pizzaWeatherMachineCost = Math.floor(25000000 * Math.pow(1.05, pizzaWeatherMachine)); 
var pizzaWeatherMachineCostSlave = 128 
var pizzaWeatherMachineCostCleaner = 32 
var pizzaWeatherMachineCostOperator = 16
var pizzaWeatherMachineCostScientist = 8
var pizzaWeatherMachineCostScrapMetal = 20
var pizzaWeatherMachineCostWeatherMachine = 1
function buyPizzaWeatherMachine(){
    var pizzaWeatherMachineCost = Math.floor(25000000 * Math.pow(1.05, pizzaWeatherMachine)); 
    var pizzaWeatherMachineCostSlave = 128 
    var pizzaWeatherMachineCostCleaner = 32 
    var pizzaWeatherMachineCostOperator = 16
    var pizzaWeatherMachineCostScientist = 8
    var pizzaWeatherMachineCostScrapMetal = 20
    var pizzaWeatherMachineCostWeatherMachine = 1
    if(money >= pizzaWeatherMachineCost && slave >= pizzaWeatherMachineCostSlave && weatherMachine >= pizzaWeatherMachineCostWeatherMachine && cleaner >= pizzaWeatherMachineCostCleaner && operator >= pizzaWeatherMachineCostOperator && scientist >= pizzaWeatherMachineCostScientist && scrapMetal >= pizzaWeatherMachineCostScrapMetal){                                   
        document.getElementById("mybox27").style.display = "block"; 
        document.getElementById("mybox14").style.display = "block";
        pizzaWeatherMachine = pizzaWeatherMachine + 1;                                  
        money = money - pizzaWeatherMachineCost;  
        slave = slave - pizzaWeatherMachineCostSlave;
        cleaner = cleaner - pizzaWeatherMachineCostCleaner;
        operator = operator - pizzaWeatherMachineCostOperator;
        scientist = scientist - pizzaWeatherMachineCostScientist;
        scrapMetal = scrapMetal - pizzaWeatherMachineCostScrapMetal;
        weatherMachine = weatherMachine - pizzaWeatherMachineCostWeatherMachine;                        
        document.getElementById('pizzaWeatherMachine').innerHTML = pizzaWeatherMachine;  
        document.getElementById('slave').innerHTML = addCommas(slave);
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);
        document.getElementById('operator').innerHTML = addCommas(operator);
        document.getElementById('scientist').innerHTML = addCommas(scientist);
        document.getElementById('scrapMetal').innerHTML = addCommas(scrapMetal);
        document.getElementById('weatherMachine').innerHTML = weatherMachine;
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextPizzaWeatherMachineCost = Math.floor(25000000 * Math.pow(1.05, pizzaWeatherMachine));       
    document.getElementById('pizzaWeatherMachineCost').innerHTML = addCommas(nextPizzaWeatherMachineCost); 
    document.getElementById('pizzaWeatherMachineCostTT').innerHTML = addCommas(nextPizzaWeatherMachineCost); 
};

window.setInterval(function(){
    
    pizzaClick(pizzaWeatherMachine * 30000 );
    
}, 1000);

function loadWeatherMachine(){
    var pizzaWeatherMachineCost = Math.floor(25000000 * Math.pow(1.05, pizzaWeatherMachine));
    var nextPizzaWeatherMachineCost = Math.floor(25000000 * Math.pow(1.05, pizzaWeatherMachine));      
    document.getElementById('pizzaWeatherMachineCost').innerHTML = addCommas(nextPizzaWeatherMachineCost);  
    document.getElementById('pizzaWeatherMachineCostTT').innerHTML = addCommas(nextPizzaWeatherMachineCost);
     if (pizzaWeatherMachine >= 1){
        document.getElementById("mybox27").style.display = "block"; 
        document.getElementById("mybox14").style.display = "block";
    }
};

//End of Pizza Weather Machine Section

//Start of Pizza Super Drill Section

document.getElementById("mybox27").style.display = "none";

var pizzaSuperDrill = 0;
var pizzaSuperDrillCost = Math.floor(500000000 * Math.pow(1.05, pizzaSuperDrill)); 
var pizzaSuperDrillCostSlave = 256 
var pizzaSuperDrillCostCleaner = 64 
var pizzaSuperDrillCostOperator = 32
var pizzaSuperDrillCostScientist = 16
var pizzaSuperDrillCostScrapMetal = 30
var pizzaSuperDrillCostSuperDrill = 1
function buyPizzaSuperDrill(){
    var pizzaSuperDrillCost = Math.floor(500000000 * Math.pow(1.05, pizzaSuperDrill)); 
    var pizzaSuperDrillCostSlave = 256 
    var pizzaSuperDrillCostCleaner = 64 
    var pizzaSuperDrillCostOperator = 32
    var pizzaSuperDrillCostScientist = 16
    var pizzaSuperDrillCostScrapMetal = 30
    var pizzaSuperDrillCostSuperDrill = 1
    if(money >= pizzaSuperDrillCost && slave >= pizzaSuperDrillCostSlave && superDrill >= pizzaSuperDrillCostSuperDrill && cleaner >= pizzaSuperDrillCostCleaner && operator >= pizzaSuperDrillCostOperator && scientist >= pizzaSuperDrillCostScientist && scrapMetal >= pizzaSuperDrillCostScrapMetal){                                   
        document.getElementById("mybox28").style.display = "block"; 
        document.getElementById("mybox15").style.display = "block";
        document.getElementById("mybox16").style.display = "block";
        document.getElementById("mybox5").style.display = "block";
        pizzaSuperDrill = pizzaSuperDrill + 1;                                  
        money = money - pizzaSuperDrillCost;  
        slave = slave - pizzaSuperDrillCostSlave;
        cleaner = cleaner - pizzaSuperDrillCostCleaner;
        operator = operator - pizzaSuperDrillCostOperator;
        scientist = scientist - pizzaSuperDrillCostScientist;
        scrapMetal = scrapMetal - pizzaSuperDrillCostScrapMetal;
        superDrill = superDrill - pizzaSuperDrillCostSuperDrill;                        
        document.getElementById('pizzaSuperDrill').innerHTML = pizzaSuperDrill;  
        document.getElementById('slave').innerHTML = addCommas(slave);
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);
        document.getElementById('operator').innerHTML = addCommas(operator);
        document.getElementById('scientist').innerHTML = addCommas(scientist);
        document.getElementById('scrapMetal').innerHTML = addCommas(scrapMetal);
        document.getElementById('superDrill').innerHTML = superDrill;
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();
        if (pizzaSuperDrill === 1){
            document.getElementById("mybox43").style.display = "block";
        }  
    };
    var nextPizzaSuperDrillCost = Math.floor(500000000 * Math.pow(1.05, pizzaSuperDrill));       
    document.getElementById('pizzaSuperDrillCost').innerHTML = addCommas(nextPizzaSuperDrillCost); 
    document.getElementById('pizzaSuperDrillCostTT').innerHTML = addCommas(nextPizzaSuperDrillCost);  
};

window.setInterval(function(){
    
    pizzaClick(pizzaSuperDrill * 75000 );
    
}, 1000);

function loadSuperDrill(){
    var pizzaSuperDrillCost = Math.floor(500000000 * Math.pow(1.05, pizzaSuperDrill));
    var nextPizzaSuperDrillCost = Math.floor(500000000 * Math.pow(1.05, pizzaSuperDrill));      
    document.getElementById('pizzaSuperDrillCost').innerHTML = addCommas(nextPizzaSuperDrillCost);  
    document.getElementById('pizzaSuperDrillCostTT').innerHTML = addCommas(nextPizzaSuperDrillCost);
    if (pizzaSuperDrill >= 1 && convenience3Bought === 0){
            document.getElementById("mybox43").style.display = "block";
        }  
    if (pizzaSuperDrill >= 1){
        document.getElementById("mybox28").style.display = "block"; 
        document.getElementById("mybox15").style.display = "block";
        document.getElementById("mybox16").style.display = "block";
        document.getElementById("mybox5").style.display = "block";
    }
    if (convenience3Bought >= 1){
        document.getElementById("mybox43").style.display = "none";
        document.getElementById("5smallbox10").style.display = "inline-block";
        document.getElementById("5smallbox100").style.display = "inline-block";
        document.getElementById("5smallbox1000").style.display = "inline-block";
    }
};

//End of Pizza Super Drill Section

//Start of Pizza Moon Base Section

document.getElementById("mybox28").style.display = "none";

var pizzaMoonBase = 0;
var pizzaMoonBaseCost = Math.floor(1000000000 * Math.pow(1.05, pizzaMoonBase)); 
var pizzaMoonBaseCostSlave = 512 
var pizzaMoonBaseCostCleaner = 128
var pizzaMoonBaseCostOperator = 64
var pizzaMoonBaseCostScientist = 32
var pizzaMoonBaseCostAstronaut = 16
var pizzaMoonBaseCostScrapMetal = 50
var pizzaMoonBaseCostSpaceElevator = 2
var pizzaMoonBaseCostMoonBase = 1
function buyPizzaMoonBase(){
    var pizzaMoonBaseCost = Math.floor(1000000000 * Math.pow(1.05, pizzaMoonBase)); 
    var pizzaMoonBaseCostSlave = 512 
    var pizzaMoonBaseCostCleaner = 128
    var pizzaMoonBaseCostOperator = 64
    var pizzaMoonBaseCostScientist = 32
    var pizzaMoonBaseCostAstronaut = 16
    var pizzaMoonBaseCostScrapMetal = 50
    var pizzaMoonBaseCostSpaceElevator = 2
    var pizzaMoonBaseCostMoonBase = 1
    if(money >= pizzaMoonBaseCost && slave >= pizzaMoonBaseCostSlave && moonBase >= pizzaMoonBaseCostMoonBase && spaceElevator >= pizzaMoonBaseCostSpaceElevator && astronaut >= pizzaMoonBaseCostAstronaut && cleaner >= pizzaMoonBaseCostCleaner && operator >= pizzaMoonBaseCostOperator && scientist >= pizzaMoonBaseCostScientist && scrapMetal >= pizzaMoonBaseCostScrapMetal){                                   
        document.getElementById("spacetravel").style.display = "block";
        pizzaMoonBase = pizzaMoonBase + 1;                                  
        money = money - pizzaMoonBaseCost;  
        slave = slave - pizzaMoonBaseCostSlave;
        cleaner = cleaner - pizzaMoonBaseCostCleaner;
        operator = operator - pizzaMoonBaseCostOperator;
        scientist = scientist - pizzaMoonBaseCostScientist;
        astronaut = astronaut - pizzaMoonBaseCostAstronaut;
        scrapMetal = scrapMetal - pizzaMoonBaseCostScrapMetal;
        spaceElevator = spaceElevator - pizzaMoonBaseCostSpaceElevator;
        moonBase = moonBase - pizzaMoonBaseCostMoonBase;                        
        document.getElementById('pizzaMoonBase').innerHTML = pizzaMoonBase;  
        document.getElementById('slave').innerHTML = addCommas(slave);
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);
        document.getElementById('operator').innerHTML = addCommas(operator);
        document.getElementById('scientist').innerHTML = addCommas(scientist);
        document.getElementById('astronaut').innerHTML = addCommas(astronaut);
        document.getElementById('scrapMetal').innerHTML = addCommas(scrapMetal);
        document.getElementById('spaceElevator').innerHTML = spaceElevator;
        document.getElementById('moonBase').innerHTML = moonBase;
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextPizzaMoonBaseCost = Math.floor(1000000000 * Math.pow(1.05, pizzaMoonBase));       
    document.getElementById('pizzaMoonBaseCost').innerHTML = addCommas(nextPizzaMoonBaseCost);
    document.getElementById('pizzaMoonBaseCostTT').innerHTML = addCommas(nextPizzaMoonBaseCost);  

};

window.setInterval(function(){
    
    pizzaClick(pizzaMoonBase * 200000 );
    
}, 1000);

function loadMoonBase(){
    var pizzaMoonBaseCost = Math.floor(1000000000 * Math.pow(1.05, pizzaMoonBase));
    var nextPizzaMoonBaseCost = Math.floor(1000000000 * Math.pow(1.05, pizzaMoonBase));      
    document.getElementById('pizzaMoonBaseCost').innerHTML = addCommas(nextPizzaMoonBaseCost);  
    document.getElementById('pizzaMoonBaseCostTT').innerHTML = addCommas(nextPizzaMoonBaseCost);
    if (pizzaMoonBase >= 1){
        document.getElementById("spacetravel").style.display = "block";
    }
};

//End of Pizza Moon Base Section


//=====================================
// Resources for Pizza Makers Section |                                                                                   |
//=====================================

document.getElementById("mybox").style.display = "none";

var slave = 0;
var totalSlave = 0;
var slaveCost = Math.floor(20 * Math.pow(1.0, totalSlave));
function buySlave(){
    var slaveCost = Math.floor(20 * Math.pow(1.0, totalSlave));     
    if(money >= slaveCost){                                   
        slave = slave + 1;   
        totalSlave = totalSlave + 1;                                
        money = money - slaveCost;                          
        document.getElementById('slave').innerHTML = addCommas(slave);  
        document.getElementById('totalSlave').innerHTML = addCommas(totalSlave);  
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();  
    };
    var nextSlaveCost = Math.floor(20 * Math.pow(1.0, totalSlave));       
   
};

document.getElementById("smallbox10").style.display = "none";

var slave = 0;
var totalSlave = 0;

function buyTenSlave(){
    var tenSlaveCost = Math.floor(200 * Math.pow(1.0, totalSlave));     
    if(money >= tenSlaveCost){                                   
        slave = slave + 10;   
        totalSlave = totalSlave + 10;                                
        money = money - tenSlaveCost;                          
        document.getElementById('slave').innerHTML = addCommas(slave);  
        document.getElementById('totalSlave').innerHTML = addCommas(totalSlave);  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextSlaveCost = Math.floor(200 * Math.pow(1.0, totalSlave));       
   
};

document.getElementById("smallbox100").style.display = "none";

var slave = 0;
var totalSlave = 0;

function buyHundredSlave(){
    var hundredSlaveCost = Math.floor(2000 * Math.pow(1.0, totalSlave));     
    if(money >= hundredSlaveCost){                                   
        slave = slave + 100;   
        totalSlave = totalSlave + 100;                                
        money = money - hundredSlaveCost;                          
        document.getElementById('slave').innerHTML = addCommas(slave);  
        document.getElementById('totalSlave').innerHTML = addCommas(totalSlave);  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextSlaveCost = Math.floor(2000 * Math.pow(1.0, totalSlave));       
   
};

document.getElementById("smallbox1000").style.display = "none";

var slave = 0;
var totalSlave = 0;

function buyThousandSlave(){
    var thousandSlaveCost = Math.floor(20000 * Math.pow(1.0, totalSlave));     
    if(money >= thousandSlaveCost){                                   
        slave = slave + 1000;   
        totalSlave = totalSlave + 1000;                                
        money = money - thousandSlaveCost;                          
        document.getElementById('slave').innerHTML = addCommas(slave);  
        document.getElementById('totalSlave').innerHTML = addCommas(totalSlave);  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextSlaveCost = Math.floor(20000 * Math.pow(1.0, totalSlave));       
   
};

document.getElementById("mybox1").style.display = "none";

var cleaner = 0;
var totalCleaner = 0;
var cleanerCost = Math.floor(30 * Math.pow(1.0, totalCleaner)); 
function buyCleaner(){
    var cleanerCost = Math.floor(30 * Math.pow(1.0, totalCleaner));     
    if(money >= cleanerCost){                                   
        cleaner = cleaner + 1;   
        totalCleaner = totalCleaner + 1;                                
        money = money - cleanerCost;                          
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);  
        document.getElementById('totalCleaner').innerHTML = addCommas(totalCleaner);  
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();  
    };
    var nextCleanerCost = Math.floor(30 * Math.pow(1.0, totalCleaner));    
};

document.getElementById("1smallbox10").style.display = "none";

var cleaner = 0;
var totalCleaner = 0;

function buyTenCleaner(){
    var tenCleanerCost = Math.floor(300 * Math.pow(1.0, totalCleaner));     
    if(money >= tenCleanerCost){                                   
        cleaner = cleaner + 10;   
        totalCleaner = totalCleaner + 10;                                
        money = money - tenCleanerCost;                          
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);  
        document.getElementById('totalCleaner').innerHTML = addCommas(totalCleaner);  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextCleanerCost = Math.floor(300 * Math.pow(1.0, totalCleaner)); 
};

document.getElementById("1smallbox100").style.display = "none";

var cleaner = 0;
var totalCleaner = 0;

function buyHundredCleaner(){
    var hundredCleanerCost = Math.floor(3000 * Math.pow(1.0, totalCleaner));     
    if(money >= hundredCleanerCost){                                   
        cleaner = cleaner + 100;   
        totalCleaner = totalCleaner + 100;                                
        money = money - hundredCleanerCost;                          
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);  
        document.getElementById('totalCleaner').innerHTML = addCommas(totalCleaner);  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextCleanerCost = Math.floor(3000 * Math.pow(1.0, totalCleaner));      
};

document.getElementById("1smallbox1000").style.display = "none";

var cleaner = 0;
var totalCleaner = 0;

function buyThousandCleaner(){
    var thousandCleanerCost = Math.floor(30000 * Math.pow(1.0, totalCleaner));     
    if(money >= thousandCleanerCost){                                   
        cleaner = cleaner + 1000;   
        totalCleaner = totalCleaner + 1000;                                
        money = money - thousandCleanerCost;                          
        document.getElementById('cleaner').innerHTML = addCommas(cleaner);  
        document.getElementById('totalCleaner').innerHTML = addCommas(totalCleaner);  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextCleanerCost = Math.floor(30000 * Math.pow(1.0, totalCleaner));         
};

document.getElementById("mybox2").style.display = "none";

var manager = 0;
var totalManager = 0;
var managerCost = Math.floor(40 * Math.pow(1.0, totalManager));
function buyManager(){
    var managerCost = Math.floor(40 * Math.pow(1.0, totalManager));     
    if(money >= managerCost){                                   
        manager = manager + 1;   
        totalManager = totalManager + 1;                                
        money = money - managerCost;                          
        document.getElementById('manager').innerHTML = addCommas(manager);  
        document.getElementById('totalManager').innerHTML = addCommas(totalManager);  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextManagerCost = Math.floor(40 * Math.pow(1.0, totalManager));       
 
};

document.getElementById("2smallbox10").style.display = "none";

var manager = 0;
var totalManager = 0;

function buyTenManager(){
    var tenManagerCost = Math.floor(400 * Math.pow(1.0, totalManager));     
    if(money >= tenManagerCost){                                   
        manager = manager + 10;   
        totalManager = totalManager + 10;                                
        money = money - tenManagerCost;                          
        document.getElementById('manager').innerHTML = addCommas(manager);  
        document.getElementById('totalManager').innerHTML = addCommas(totalManager);  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextManagerCost = Math.floor(400 * Math.pow(1.0, totalManager));        
};

document.getElementById("2smallbox100").style.display = "none";

var manager = 0;
var totalManager = 0;

function buyHundredManager(){
    var hundredManagerCost = Math.floor(4000 * Math.pow(1.0, totalManager));     
    if(money >= hundredManagerCost){                                   
        manager = manager + 100;   
        totalManager = totalManager + 100;                                
        money = money - hundredManagerCost;                          
        document.getElementById('manager').innerHTML = addCommas(manager);  
        document.getElementById('totalManager').innerHTML = addCommas(totalManager);  
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();  
    };
    var nextManagerCost = Math.floor(4000 * Math.pow(1.0, totalManager));        
};

document.getElementById("2smallbox1000").style.display = "none";

var manager = 0;
var totalManager = 0;

function buyThousandManager(){
    var thousandManagerCost = Math.floor(40000 * Math.pow(1.0, totalManager));     
    if(money >= thousandManagerCost){                                   
        manager = manager + 1000;   
        totalManager = totalManager + 1000;                                
        money = money - thousandManagerCost;                          
        document.getElementById('manager').innerHTML = addCommas(manager);  
        document.getElementById('totalManager').innerHTML = addCommas(totalManager);  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextManagerCost = Math.floor(40000 * Math.pow(1.0, totalManager));        
};

document.getElementById("mybox4").style.display = "none";

var scientist = 0;
var totalScientist = 0;
var scientistCost = Math.floor(1000 * Math.pow(1.0, totalScientist));  
function buyScientist(){
    var scientistCost = Math.floor(1000 * Math.pow(1.0, totalScientist));     
    if(money >= scientistCost){                                   
        scientist = scientist + 1;   
        totalScientist = totalScientist + 1;                                
        money = money - scientistCost;                          
        document.getElementById('scientist').innerHTML = addCommas(scientist);  
        document.getElementById('totalScientist').innerHTML = addCommas(totalScientist);  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextScientistCost = Math.floor(1000 * Math.pow(1.0, totalScientist));       
};

document.getElementById("4smallbox10").style.display = "none";

var scientist = 0;
var totalScientist = 0;

function buyTenScientist(){
    var tenScientistCost = Math.floor(10000 * Math.pow(1.0, totalScientist));     
    if(money >= tenScientistCost){                                   
        scientist = scientist + 10;   
        totalScientist = totalScientist + 10;                                
        money = money - tenScientistCost;                          
        document.getElementById('scientist').innerHTML = addCommas(scientist);  
        document.getElementById('totalScientist').innerHTML = addCommas(totalScientist);  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextScientistCost = Math.floor(10000 * Math.pow(1.0, totalScientist));       
};

document.getElementById("4smallbox100").style.display = "none";

var scientist = 0;
var totalScientist = 0;

function buyHundredScientist(){
    var hundredScientistCost = Math.floor(100000 * Math.pow(1.0, totalScientist));     
    if(money >= hundredScientistCost){                                   
        scientist = scientist + 100;   
        totalScientist = totalScientist + 100;                                
        money = money - hundredScientistCost;                          
        document.getElementById('scientist').innerHTML = addCommas(scientist);  
        document.getElementById('totalScientist').innerHTML = addCommas(totalScientist);  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextScientistCost = Math.floor(100000 * Math.pow(1.0, totalScientist));       
};

document.getElementById("4smallbox1000").style.display = "none";

var scientist = 0;
var totalScientist = 0;

function buyThousandScientist(){
    var thousandScientistCost = Math.floor(1000000 * Math.pow(1.0, totalScientist));     
    if(money >= thousandScientistCost){                                   
        scientist = scientist + 1000;   
        totalScientist = totalScientist + 1000;                                
        money = money - thousandScientistCost;                          
        document.getElementById('scientist').innerHTML = addCommas(scientist);  
        document.getElementById('totalScientist').innerHTML = addCommas(totalScientist);  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextScientistCost = Math.floor(1000000 * Math.pow(1.0, totalScientist));       
};

document.getElementById("mybox3").style.display = "none";

var operator = 0;
var totalOperator = 0;
var operatorCost = Math.floor(500 * Math.pow(1.0, totalOperator));
function buyOperator(){
    var operatorCost = Math.floor(500 * Math.pow(1.0, totalOperator));     
    if(money >= operatorCost){                                   
        operator = operator + 1;   
        totalOperator = totalOperator + 1;                                
        money = money - operatorCost;                          
        document.getElementById('operator').innerHTML = addCommas(operator);  
        document.getElementById('totalOperator').innerHTML = addCommas(totalOperator);  
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();  
    };
    var nextOperatorCost = Math.floor(500 * Math.pow(1.0, totalOperator));        
};

document.getElementById("3smallbox10").style.display = "none";

var operator = 0;
var totalOperator = 0;

function buyTenOperator(){
    var tenOperatorCost = Math.floor(5000 * Math.pow(1.0, totalOperator));     
    if(money >= tenOperatorCost){                                   
        operator = operator + 10;   
        totalOperator = totalOperator + 10;                                
        money = money - tenOperatorCost;                          
        document.getElementById('operator').innerHTML = addCommas(operator);  
        document.getElementById('totalOperator').innerHTML = addCommas(totalOperator);  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextOperatorCost = Math.floor(5000 * Math.pow(1.0, totalOperator));        
};

document.getElementById("3smallbox100").style.display = "none";

var operator = 0;
var totalOperator = 0;

function buyHundredOperator(){
    var hundredOperatorCost = Math.floor(50000 * Math.pow(1.0, totalOperator));     
    if(money >= hundredOperatorCost){                                   
        operator = operator + 100;   
        totalOperator = totalOperator + 100;                                
        money = money - hundredOperatorCost;                          
        document.getElementById('operator').innerHTML = addCommas(operator);  
        document.getElementById('totalOperator').innerHTML = addCommas(totalOperator);  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextOperatorCost = Math.floor(50000 * Math.pow(1.0, totalOperator));        
};

document.getElementById("3smallbox1000").style.display = "none";

var operator = 0;
var totalOperator = 0;

function buyThousandOperator(){
    var thousandOperatorCost = Math.floor(500000 * Math.pow(1.0, totalOperator));     
    if(money >= thousandOperatorCost){                                   
        operator = operator + 1000;   
        totalOperator = totalOperator + 1000;                                
        money = money - thousandOperatorCost;                          
        document.getElementById('operator').innerHTML = addCommas(operator);  
        document.getElementById('totalOperator').innerHTML = addCommas(totalOperator);  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextOperatorCost = Math.floor(500000 * Math.pow(1.0, totalOperator));        
};

document.getElementById("mybox5").style.display = "none";

var astronaut = 0;
var totalAstronaut = 0;
var astronautCost = Math.floor(2000 * Math.pow(1.0, totalAstronaut));
function buyAstronaut(){
    var astronautCost = Math.floor(2000 * Math.pow(1.0, totalAstronaut));     
    if(money >= astronautCost){                                   
        astronaut = astronaut + 1;   
        totalAstronaut = totalAstronaut + 1;                                
        money = money - astronautCost;                          
        document.getElementById('astronaut').innerHTML = addCommas(astronaut);  
        document.getElementById('totalAstronaut').innerHTML = addCommas(totalAstronaut);  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextAstronautCost = Math.floor(2000 * Math.pow(1.0, totalAstronaut));        
};

document.getElementById("5smallbox10").style.display = "none";

var astronaut = 0;
var totalAstronaut = 0;

function buyTenAstronaut(){
    var tenAstronautCost = Math.floor(20000 * Math.pow(1.0, totalAstronaut));     
    if(money >= tenAstronautCost){                                   
        astronaut = astronaut + 10;   
        totalAstronaut = totalAstronaut + 10;                                
        money = money - tenAstronautCost;                          
        document.getElementById('astronaut').innerHTML = addCommas(astronaut);  
        document.getElementById('totalAstronaut').innerHTML = addCommas(totalAstronaut);  
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();  
    };
    var nextAstronautCost = Math.floor(20000 * Math.pow(1.0, totalAstronaut));        
};

document.getElementById("5smallbox100").style.display = "none";

var astronaut = 0;
var totalAstronaut = 0;

function buyHundredAstronaut(){
    var hundredAstronautCost = Math.floor(200000 * Math.pow(1.0, totalAstronaut));     
    if(money >= hundredAstronautCost){                                   
        astronaut = astronaut + 100;   
        totalAstronaut = totalAstronaut + 100;                                
        money = money - hundredAstronautCost;                          
        document.getElementById('astronaut').innerHTML = addCommas(astronaut);  
        document.getElementById('totalAstronaut').innerHTML = addCommas(totalAstronaut);  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextAstronautCost = Math.floor(200000 * Math.pow(1.0, totalAstronaut));        
};

document.getElementById("5smallbox1000").style.display = "none";

var astronaut = 0;
var totalAstronaut = 0;

function buyThousandAstronaut(){
    var thousandAstronautCost = Math.floor(2000000 * Math.pow(1.0, totalAstronaut));     
    if(money >= thousandAstronautCost){                                   
        astronaut = astronaut + 1000;   
        totalAstronaut = totalAstronaut + 1000;                                
        money = money - thousandAstronautCost;                          
        document.getElementById('astronaut').innerHTML = addCommas(astronaut);  
        document.getElementById('totalAstronaut').innerHTML = addCommas(totalAstronaut);  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextAstronautCost = Math.floor(2000000 * Math.pow(1.0, totalAstronaut));       
};

document.getElementById("mybox6").style.display = "none";

var cart = 0;
var totalCart = 0;
var cartCost = Math.floor(100 * Math.pow(1.0, totalCart));
function buyCart(){
    var cartCost = Math.floor(100 * Math.pow(1.0, totalCart));     
    if(money >= cartCost){                                   
        cart = cart + 1;   
        totalCart = totalCart + 1;                                
        money = money - cartCost;                          
        document.getElementById('cart').innerHTML = cart;  
        document.getElementById('totalCart').innerHTML = totalCart;  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextCartCost = Math.floor(100 * Math.pow(1.0, totalCart));       
    document.getElementById('cartCost').innerHTML = nextCartCost; 
};

document.getElementById("mybox7").style.display = "none";

var van = 0;
var totalVan = 0;
var vanCost = Math.floor(300 * Math.pow(1.0, totalVan));  
function buyVan(){
    var vanCost = Math.floor(300 * Math.pow(1.0, totalVan));     
    if(money >= vanCost){                                   
        van = van + 1;   
        totalVan = totalVan + 1;                                
        money = money - vanCost;                          
        document.getElementById('van').innerHTML = van;  
        document.getElementById('totalVan').innerHTML = totalVan;  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextVanCost = Math.floor(300 * Math.pow(1.0, totalVan));       
    document.getElementById('vanCost').innerHTML = nextVanCost; 
};

document.getElementById("mybox8").style.display = "none";

var parlour = 0;
var totalParlour = 0;
var parlourCost = Math.floor(1200 * Math.pow(1.0, totalParlour)); 
function buyParlour(){
    var parlourCost = Math.floor(1200 * Math.pow(1.0, totalParlour));     
    if(money >= parlourCost){                                   
        parlour = parlour + 1;   
        totalParlour = totalParlour + 1;                                
        money = money - parlourCost;                          
        document.getElementById('parlour').innerHTML = parlour;  
        document.getElementById('totalParlour').innerHTML = totalParlour;  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextParlourCost = Math.floor(1200 * Math.pow(1.0, totalParlour));        
};

document.getElementById("mybox9").style.display = "none";

var restaurant = 0;
var totalRestaurant = 0;
var restaurantCost = Math.floor(6000 * Math.pow(1.0, totalRestaurant));  
function buyRestaurant(){
    var restaurantCost = Math.floor(6000 * Math.pow(1.0, totalRestaurant));     
    if(money >= restaurantCost){                                   
        restaurant = restaurant + 1;   
        totalRestaurant = totalRestaurant + 1;                                
        money = money - restaurantCost;                          
        document.getElementById('restaurant').innerHTML = restaurant;  
        document.getElementById('totalRestaurant').innerHTML = totalRestaurant;  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextRestaurantCost = Math.floor(6000 * Math.pow(1.0, totalRestaurant));       
};

document.getElementById("mybox10").style.display = "none";

var palace = 0;
var totalPalace = 0;
var palaceCost = Math.floor(30000 * Math.pow(1.0, totalPalace)); 
function buyPalace(){
    var palaceCost = Math.floor(30000 * Math.pow(1.0, totalPalace));     
    if(money >= palaceCost){                                   
        palace = palace + 1;   
        totalPalace = totalPalace + 1;                                
        money = money - palaceCost;                          
        document.getElementById('palace').innerHTML = palace;  
        document.getElementById('totalPalace').innerHTML = totalPalace;  
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();  
    };
    var nextPalaceCost = Math.floor(30000 * Math.pow(1.0, totalPalace));       
};

document.getElementById("mybox11").style.display = "none";

var factory = 0;
var totalFactory = 0;
var factoryCost = Math.floor(130000 * Math.pow(1.0, totalFactory)); 
function buyFactory(){
    var factoryCost = Math.floor(130000 * Math.pow(1.0, totalFactory));     
    if(money >= factoryCost){                                   
        factory = factory + 1;   
        totalFactory = totalFactory + 1;                                
        money = money - factoryCost;                          
        document.getElementById('factory').innerHTML = factory;  
        document.getElementById('totalFactory').innerHTML = totalFactory;  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextFactoryCost = Math.floor(130000 * Math.pow(1.0, totalFactory));        
};

document.getElementById("mybox12").style.display = "none";

var converter = 0;
var totalConverter = 0;
var converterCost = Math.floor(500000 * Math.pow(1.0, totalConverter));
function buyConverter(){
    var converterCost = Math.floor(500000 * Math.pow(1.0, totalConverter));     
    if(money >= converterCost){                                   
        converter = converter + 1;   
        totalConverter = totalConverter + 1;                                
        money = money - converterCost;                          
        document.getElementById('converter').innerHTML = converter;  
        document.getElementById('totalConverter').innerHTML = totalConverter;  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextConverterCost = Math.floor(500000 * Math.pow(1.0, totalConverter));       
};

document.getElementById("mybox13").style.display = "none";

var weatherMachine = 0;
var totalWeatherMachine = 0;
var weatherMachineCost = Math.floor(8000000 * Math.pow(1.0, totalWeatherMachine));
function buyWeatherMachine(){
    var weatherMachineCost = Math.floor(8000000 * Math.pow(1.0, totalWeatherMachine));     
    if(money >= weatherMachineCost){                                   
        weatherMachine = weatherMachine + 1;   
        totalWeatherMachine = totalWeatherMachine + 1;                                
        money = money - weatherMachineCost;                          
        document.getElementById('weatherMachine').innerHTML = weatherMachine;  
        document.getElementById('totalWeatherMachine').innerHTML = totalWeatherMachine;  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextWeatherMachineCost = Math.floor(8000000 * Math.pow(1.0, totalWeatherMachine));        
};

document.getElementById("mybox14").style.display = "none";

var superDrill = 0;
var totalSuperDrill = 0;
var superDrillCost = Math.floor(100000000 * Math.pow(1.0, totalSuperDrill));
function buySuperDrill(){
    var superDrillCost = Math.floor(100000000 * Math.pow(1.0, totalSuperDrill));     
    if(money >= superDrillCost){                                   
        superDrill = superDrill + 1;   
        totalSuperDrill = totalSuperDrill + 1;                                
        money = money - superDrillCost;                          
        document.getElementById('superDrill').innerHTML = superDrill;  
        document.getElementById('totalSuperDrill').innerHTML = totalSuperDrill;  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextSuperDrillCost = Math.floor(100000000 * Math.pow(1.0, totalSuperDrill));        
};

document.getElementById("mybox16").style.display = "none";

var moonBase = 0;
var totalMoonBase = 0;
var moonBaseCost = Math.floor(500000000 * Math.pow(1.0, totalMoonBase));
function buyMoonBase(){
    var moonBaseCost = Math.floor(500000000 * Math.pow(1.0, totalMoonBase));     
    if(money >= moonBaseCost){                                   
        moonBase = moonBase + 1;   
        totalMoonBase = totalMoonBase + 1;                                
        money = money - moonBaseCost;                          
        document.getElementById('moonBase').innerHTML = moonBase;  
        document.getElementById('totalMoonBase').innerHTML = totalMoonBase;  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextMoonBaseCost = Math.floor(500000000 * Math.pow(1.0, totalMoonBase));        
};

document.getElementById("mybox15").style.display = "none";

var spaceElevator = 0;
var totalSpaceElevator = 0;
var spaceElevatorCost = Math.floor(200000000 * Math.pow(1.0, totalSpaceElevator));
function buySpaceElevator(){
    var spaceElevatorCost = Math.floor(200000000 * Math.pow(1.0, totalSpaceElevator));     
    if(money >= spaceElevatorCost){                                   
        spaceElevator = spaceElevator + 1;   
        totalSpaceElevator = totalSpaceElevator + 1;                                
        money = money - spaceElevatorCost;                          
        document.getElementById('spaceElevator').innerHTML = spaceElevator;  
        document.getElementById('totalSpaceElevator').innerHTML = totalSpaceElevator;  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextSpaceElevatorCost = Math.floor(200000000 * Math.pow(1.0, totalSpaceElevator));        
};

document.getElementById("mybox17").style.display = "none";

var scrapMetal = 0;
var totalScrapMetal = 0;
var scrapMetalCost = Math.floor(10000 * Math.pow(1.0, totalScrapMetal));
function buyScrapMetal(){
    var scrapMetalCost = Math.floor(10000 * Math.pow(1.0, totalScrapMetal));     
    if(money >= scrapMetalCost){                                   
        scrapMetal = scrapMetal + 1;   
        totalScrapMetal = totalScrapMetal + 1;                                
        money = money - scrapMetalCost;                          
        document.getElementById('scrapMetal').innerHTML = addCommas(scrapMetal);  
        document.getElementById('totalScrapMetal').innerHTML = totalScrapMetal;  
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();  
    };
    var nextScrapMetalCost = Math.floor(10000 * Math.pow(1.0, totalScrapMetal));        
};

document.getElementById("6smallbox10").style.display = "none";

var scrapMetal = 0;
var totalScrapMetal = 0;

function buyTenScrapMetal(){
    var tenScrapMetalCost = Math.floor(100000 * Math.pow(1.0, totalScrapMetal));     
    if(money >= tenScrapMetalCost){                                   
        scrapMetal = scrapMetal + 10;   
        totalScrapMetal = totalScrapMetal + 10;                                
        money = money - tenScrapMetalCost;                          
        document.getElementById('scrapMetal').innerHTML = addCommas(scrapMetal);  
        document.getElementById('totalScrapMetal').innerHTML = totalScrapMetal;  
        document.getElementById('money').innerHTML = addCommas(money);  
        updateColours();
    };
    var nextScrapMetalCost = Math.floor(100000 * Math.pow(1.0, totalScrapMetal));        
};
document.getElementById("6smallbox100").style.display = "none";

var scrapMetal = 0;
var totalScrapMetal = 0;

function buyHundredScrapMetal(){
    var hundredScrapMetalCost = Math.floor(1000000 * Math.pow(1.0, totalScrapMetal));     
    if(money >= hundredScrapMetalCost){                                   
        scrapMetal = scrapMetal + 100;   
        totalScrapMetal = totalScrapMetal + 100;                                
        money = money - hundredScrapMetalCost;                          
        document.getElementById('scrapMetal').innerHTML = addCommas(scrapMetal);  
        document.getElementById('totalScrapMetal').innerHTML = totalScrapMetal;  
        document.getElementById('money').innerHTML = addCommas(money); 
        updateColours(); 
    };
    var nextScrapMetalCost = Math.floor(1000000 * Math.pow(1.0, totalScrapMetal));        
};

document.getElementById("6smallbox1000").style.display = "none";

var scrapMetal = 0;
var totalScrapMetal = 0;

function buyThousandScrapMetal(){
    var thousandScrapMetalCost = Math.floor(10000000 * Math.pow(1.0, totalScrapMetal));     
    if(money >= thousandScrapMetalCost){                                   
        scrapMetal = scrapMetal + 1000;   
        totalScrapMetal = totalScrapMetal + 1000;                                
        money = money - thousandScrapMetalCost;                          
        document.getElementById('scrapMetal').innerHTML = addCommas(scrapMetal);  
        document.getElementById('totalScrapMetal').innerHTML = totalScrapMetal;  
        document.getElementById('money').innerHTML = addCommas(money);
        updateColours();  
    };
    var nextScrapMetalCost = Math.floor(10000000 * Math.pow(1.0, totalScrapMetal));        
};

document.getElementById("spacetravel").style.display = "none";

var rocketShip = 0;
var rocketname = 0;
var rocketShipCost = 100000000000; 
function buyRocketShip(){
    var rocketShipCost = 100000000000;      
    if(money >= rocketShipCost){                                   
        rocketShip = rocketShip + 1;                                   
        money = money - rocketShipCost;                          
        document.getElementById('rocketShip').innerHTML = rocketShip;    
        document.getElementById('money').innerHTML = addCommas(money);
        rocketname = prompt("Please name your rocket ship (insert penis joke): ")
        updateColours();  
    };
};

var donateFuel = 0;
var name = 0;
var donateFuelCost = 100000000000;
function buyDonateFuel(){
    var donateFuelCost = 100000000000;      
    if(pizza >= donateFuelCost){                                   
        donateFuel = donateFuel + 1;                                   
        pizza = pizza - donateFuelCost;                          
        document.getElementById('donateFuel').innerHTML = donateFuel;    
        document.getElementById('pizza').innerHTML = addCommas(pizza); 
        name = prompt("Please enter your name: ");
        updateColours(); 
    };
};

var supplyCrew = 0;
var supplyCrewScientist = 5000;
var supplyCrewAstronaut = 5000;
function buySupplyCrew(){
    var supplyCrewScientist = 5000; 
    var supplyCrewAstronaut = 5000;     
    if(scientist >= supplyCrewScientist && astronaut >= supplyCrewAstronaut){                                   
        supplyCrew = supplyCrew + 1;                                   
        scientist = scientist - supplyCrewScientist; 
        astronaut = astronaut - supplyCrewAstronaut;                         
        document.getElementById('supplyCrew').innerHTML = supplyCrew; 
        document.getElementById('scientist').innerHTML = addCommas(scientist);
        document.getElementById('astronaut').innerHTML = addCommas(astronaut);   
        document.getElementById('pizza').innerHTML = addCommas(pizza); 
        updateColours(); 
    };
};
var exploreSpace = 0;
function buyExploreSpace(){
    var exploreSpaceRocketShip = 1; 
    var exploreSpaceFuel = 1;  
    var exploreSpaceCrew = 1; 
    if (exploreSpace >= 1) {
        saveGame();
        window.location.href ="mars.html"
    }  
    if(supplyCrew >= exploreSpaceCrew && donateFuel >= exploreSpaceFuel && rocketShip >= exploreSpaceRocketShip ){
        exploreSpace = exploreSpace + 1;
        document.getElementById('supplyCrew').innerHTML = supplyCrew; 
        document.getElementById('donateFuel').innerHTML = donateFuel; 
        document.getElementById('rocketShip').innerHTML = rocketShip; 
        updateColours();
        alert("Congratulations! Your pizza making journey has finally come to an end. After travelling through our solar system for months, " + rocketname + " finally landed on Mars, our neighbouring planet. Let it be known that " + name + " managed to kickstart the advancement of the space age with their perseverance and dedication. " + name + " will forever be remembered throughout history as the founding father of space colonisation and travel. People will name their children after you for millenia and you will provide inspiration to mankind for the rest of our existence. Click Okay to continue.");
        saveGame();
        window.location.href ="mars.html"
    };
};

//===================
// Upgrades Section  |                                                                                   
//===================

document.getElementById("mybox33").style.display = "none";

var clickUpgradeBought = 0;
var clickUpgradeCost = 50000;
function buyClickUpgrade(){
    var clickUpgradeCost = 50000;
    if(money >= clickUpgradeCost){
        money = money - clickUpgradeCost;
        clickUpgradeBought = clickUpgradeBought + 1;
         document.getElementById('clickUpgradeBought').innerHTML = clickUpgradeBought;
         document.getElementById('money').innerHTML = addCommas(money);
         updateColours();
   };
   if(clickUpgradeBought >= 1){
    document.getElementById("mybox34").style.display = "block";
   }
   if(upgradeThirdBought >= 1){
    document.getElementById("mybox34").style.display = "none";
   }    
   if(clickUpgradeBought === 2){
    confirm("Cool free pizza!")
   }
   if(clickUpgradeBought === 3){
    confirm("More pizza? Wooo")
   }
   if(clickUpgradeBought === 4){
    confirm("Stop I'm full!")
   }
   if(clickUpgradeBought === 5){
    confirm("You do realise you gain nothing from this.")
   }
   if(clickUpgradeBought === 6){
    confirm("You're literally throwing your pizza away.")
   }
   if(clickUpgradeBought === 7){
    confirm("Go ahead waste your pizza.")
   }
   if(clickUpgradeBought === 8){
    confirm("Seriously this is going no where. ")
   }
   if(clickUpgradeBought === 9){
    confirm("Stupid human. ")
   }
   if(clickUpgradeBought === 10){
    confirm("Stop it. ")
   }
   if(clickUpgradeBought === 11){
    confirm("Please")
   }
   if(clickUpgradeBought === 12){
    confirm("Have Mercy!")
   }
   if(clickUpgradeBought === 13){
    confirm("What have I done to you?")
   }
   if(clickUpgradeBought === 14){
    confirm("You're heading the right way for a smack bottom, Donkey.")
   }
   if(clickUpgradeBought === 15){
    confirm("Don't make me do it.")
   }
   if(clickUpgradeBought === 16){
    confirm("I'm going to do it.")
   }
   if(clickUpgradeBought === 17){
    confirm("That's it.")
   }
   if(clickUpgradeBought === 18){
    confirm("Last chance.")
   }
   if(clickUpgradeBought === 19){
    confirm("I'm serious.")
   }
   if(clickUpgradeBought === 20){
    confirm("I'm gonna do it.")
   }
   if(clickUpgradeBought === 21){
    confirm("I told you. Jerk.")
    money = 0;
    document.getElementById('money').innerHTML = addCommas(money);  
   }
   if(clickUpgradeBought === 22){
     confirm("Oh cmon! What is your problem?") 
   }
   if(clickUpgradeBought === 23){
    confirm("I stole all your money.")  
   }
   if(clickUpgradeBought === 24){
    confirm("Literally, I took everything you had.")  
   }
   if(clickUpgradeBought === 25){
    confirm("Don't you learn?")  
   }
   if(clickUpgradeBought === 26){
    confirm("Just back off, Dude.")  
   }
   if(clickUpgradeBought === 27){
    confirm("I am going to count to 10.")  
   }
   if(clickUpgradeBought === 28){
    confirm("If you don't leave me alone by then...")  
   }
   if(clickUpgradeBought === 29){
    confirm("I will bring you a world of pain.")  
   }
   if(clickUpgradeBought === 30){
    confirm("10")  
   }
   if(clickUpgradeBought === 31){
    confirm("9")  
   }
   if(clickUpgradeBought === 32){
    confirm("8")  
   }
   if(clickUpgradeBought === 33){
    confirm("7")  
   }
   if(clickUpgradeBought === 34){
    confirm("6")  
   }
   if(clickUpgradeBought === 35){
    confirm("5")  
   }
   if(clickUpgradeBought === 36){
    confirm("4")  
   }
   if(clickUpgradeBought === 37){
    confirm("3")  
   }
   if(clickUpgradeBought === 38){
    confirm("2")  
   }
   if(clickUpgradeBought === 39){
    confirm("1")  
   }
   if(clickUpgradeBought === 40){
    confirm("0.")
    money = 0;
    document.getElementById('money').innerHTML = addCommas(money); 
    pizza = 0;
    document.getElementById('pizza').innerHTML = addCommas(pizza);   
   }
   if(clickUpgradeBought === 41){
    confirm("After all that you still want to do this?")  
   }
   if(clickUpgradeBought === 42){
    confirm("I underestimated you.")  
   }
   if(clickUpgradeBought === 43){
    confirm("Perhaps maybe you are ready?")  
   }
   if(clickUpgradeBought === 44){
    confirm("No, no, no. I'm being silly.")  
   }
   if(clickUpgradeBought === 45){
    confirm("Although you did make it this far.")  
   }
   if(clickUpgradeBought === 46){
    confirm("Shall I trust you with this secret?")  
   }
   if(clickUpgradeBought === 47){
    confirm("You need to promise me that you can be trusted.")  
   }
   if(clickUpgradeBought === 48){
    confirm("Are you ready?")  
   }
   if(clickUpgradeBought === 49){
    confirm("Dick butt.")  
   }
   if(clickUpgradeBought >= 50){
    var win=window.open('http://pizzapresser.com/flappypizza.html', '_blank');
    win.focus(); 
   }

};

document.getElementById("mybox34").style.display = "none";

var upgradeThirdBought = 0;
var upgradeThirdCost = 25000000;
function buyThirdUpgrade(){
    var upgradeThirdCost = 25000000;
    if(money >= upgradeThirdCost){
        money = money - upgradeThirdCost;
        upgradeThirdBought = upgradeThirdBought + 1;
         document.getElementById('upgradeThirdBought').innerHTML = upgradeThirdBought;
         document.getElementById('money').innerHTML = addCommas(money);
         updateColours();
    if(upgradeThirdBought >= 1){
    document.getElementById("mybox34").style.display = "none";
    document.getElementById("mybox35").style.display = "block";
   }    
   }
}; 

document.getElementById("mybox35").style.display = "none";

var upgradeCloneBought = 0;
var upgradeCloneCost = 200000000;
function buyCloneUpgrade(){
    var upgradeCloneCost = 200000000;
    if(money >= upgradeCloneCost){
        money = money - upgradeCloneCost;
        upgradeCloneBought = upgradeCloneBought + 1;
         document.getElementById('upgradeCloneBought').innerHTML = upgradeCloneBought;
         document.getElementById('money').innerHTML = addCommas(money);
         updateColours();
    if(upgradeCloneBought >= 1){
    document.getElementById("mybox35").style.display = "none";
    document.getElementById("mybox36").style.display = "block";
   }    
   }
}; 

document.getElementById("mybox36").style.display = "none";

var upgradeBodyBought = 0;
var upgradeBodyCost = 500000000;
function buyBodyUpgrade(){
    var upgradeBodyCost = 500000000;
    if(money >= upgradeBodyCost){
        money = money - upgradeBodyCost;
        upgradeBodyBought = upgradeBodyBought + 1;
         document.getElementById('upgradeBodyBought').innerHTML = upgradeBodyBought;
         document.getElementById('money').innerHTML = addCommas(money);
         updateColours();
    if(upgradeBodyBought >= 1){
    document.getElementById("mybox36").style.display = "none";
   }      
   }
};

document.getElementById("mybox37").style.display = "none";

var upgradePepperoniBought = 0;
var upgradePepperoniCost = 2000000;
function buyUpgradePepperoni(){
    var upgradePepperoniCost = 2000000;
    if(money >= upgradePepperoniCost){
        money = money - upgradePepperoniCost;
        upgradePepperoniBought = upgradePepperoniBought + 1;
         document.getElementById('upgradePepperoniBought').innerHTML = upgradePepperoniBought;
         document.getElementById('money').innerHTML = addCommas(money);
         updateColours();
         if (upgradePepperoniBought >= 1){
            document.getElementById("mybox37").style.display = "none";
            document.getElementById("mybox38").style.display = "block";
         }
    }
};

document.getElementById("mybox38").style.display = "none";

var upgradeChickenBought = 0;
var upgradeChickenCost = 500000000;
function buyUpgradeChicken(){
    var upgradeChickenCost = 500000000;
    if(money >= upgradeChickenCost){
        money = money - upgradeChickenCost;
        upgradeChickenBought = upgradeChickenBought + 1;
         document.getElementById('upgradeChickenBought').innerHTML = upgradeChickenBought;
         document.getElementById('money').innerHTML = addCommas(money);
         updateColours();
         if (upgradeChickenBought >= 1){
            document.getElementById("mybox38").style.display = "none";
            document.getElementById("mybox39").style.display = "block";
         }
    }
};

document.getElementById("mybox39").style.display = "none";

var upgradeBeefBought = 0;
var upgradeBeefCost = 1000000000;
function buyUpgradeBeef(){
    var upgradeBeefCost = 1000000000;
    if(money >= upgradeBeefCost){
        money = money - upgradeBeefCost;
        upgradeBeefBought = upgradeBeefBought + 1;
         document.getElementById('upgradeBeefBought').innerHTML = upgradeBeefBought;
         document.getElementById('money').innerHTML = addCommas(money);
         updateColours();
         if (upgradeBeefBought >= 1){
            document.getElementById("mybox39").style.display = "none";
            document.getElementById("mybox40").style.display = "block";
         }
    }
};

document.getElementById("mybox40").style.display = "none";

var upgradeSausageBought = 0;
var upgradeSausageCost = 10000000000;
function buyUpgradeSausage(){
    var upgradeSausageCost = 10000000000;
    if(money >= upgradeSausageCost){
        money = money - upgradeSausageCost;
        upgradeSausageBought = upgradeSausageBought + 1;
         document.getElementById('upgradeSausageBought').innerHTML = upgradeSausageBought;
         document.getElementById('money').innerHTML = addCommas(money);
         updateColours();
         if (upgradeSausageBought >= 1){
            document.getElementById("mybox40").style.display = "none";
         }
    }
};

document.getElementById("mybox41").style.display = "none";

var convenienceBought = 0;
var convenienceCost = 10000;
function buyConvenienceUpgrade(){
    var convenienceCost = 10000;
    if(money >= convenienceCost){
        money = money - convenienceCost;
        convenienceBought = convenienceBought + 1;
         document.getElementById('convenienceBought').innerHTML = convenienceBought;
         document.getElementById('money').innerHTML = addCommas(money);
         document.getElementById("smallbox10").style.display = "inline-block";
         document.getElementById("smallbox100").style.display = "inline-block";
         document.getElementById("smallbox1000").style.display = "inline-block";
         document.getElementById("1smallbox10").style.display = "inline-block";
         document.getElementById("1smallbox100").style.display = "inline-block";
         document.getElementById("1smallbox1000").style.display = "inline-block";
         document.getElementById("2smallbox10").style.display = "inline-block";
         document.getElementById("2smallbox100").style.display = "inline-block";
         document.getElementById("2smallbox1000").style.display = "inline-block";
         updateColours();
         if (convenienceBought >= 1){
            document.getElementById("mybox41").style.display = "none";
         }
    }
};

document.getElementById("mybox42").style.display = "none";

var convenience2Bought = 0;
var convenience2Cost = 100000;
function buyConvenience2Upgrade(){
    var convenience2Cost = 100000;
    if(money >= convenience2Cost){
        money = money - convenience2Cost;
        convenience2Bought = convenience2Bought + 1;
         document.getElementById('convenience2Bought').innerHTML = convenience2Bought;
         document.getElementById('money').innerHTML = addCommas(money);
         document.getElementById("3smallbox10").style.display = "inline-block";
         document.getElementById("3smallbox100").style.display = "inline-block";
         document.getElementById("3smallbox1000").style.display = "inline-block";
         document.getElementById("4smallbox10").style.display = "inline-block";
         document.getElementById("4smallbox100").style.display = "inline-block";
         document.getElementById("4smallbox1000").style.display = "inline-block";
         document.getElementById("6smallbox10").style.display = "inline-block";
         document.getElementById("6smallbox100").style.display = "inline-block";
         document.getElementById("6smallbox1000").style.display = "inline-block";
         updateColours();
         if (convenience2Bought >= 1){
            document.getElementById("mybox42").style.display = "none";
         }
    }
};

document.getElementById("mybox43").style.display = "none";

var convenience3Bought = 0;
var convenience3Cost = 100000000;
function buyConvenience3Upgrade(){
    var convenience3Cost = 100000000;
    if(money >= convenience3Cost){
        money = money - convenience3Cost;
        convenience3Bought = convenience3Bought + 1;
         document.getElementById('convenience3Bought').innerHTML = convenience3Bought;
         document.getElementById('money').innerHTML = addCommas(money);
         document.getElementById("5smallbox10").style.display = "inline-block";
         document.getElementById("5smallbox100").style.display = "inline-block";
         document.getElementById("5smallbox1000").style.display = "inline-block";
         updateColours();
         if (convenience3Bought >= 1){
            document.getElementById("mybox43").style.display = "none";
         }
    }
};

document.getElementById("mybox44").style.display = "none";
document.getElementById("autoClickerHide").style.display = "none";

var autoClicker = 0;
var autoClickerNum = 0;
var autoClickerCost = 500;
function buyAutoClicker(){
    var autoClickerCost = 500;
    if(money >= autoClickerCost){
        money = money - autoClickerCost;
        autoClicker = autoClicker + 1;
        autoClickerNum = 5;
         document.getElementById('autoClicker').innerHTML = autoClicker;
         document.getElementById('autoClickerNum').innerHTML = autoClickerNum;
         document.getElementById('money').innerHTML = addCommas(money);
         updateColours();
         if (autoClicker >= 1){
            document.getElementById("mybox44").style.display = "none";
         }
    }
};

window.setInterval(function(){
    
    pizzaClick(autoClicker * 1);
    
}, 200);

//===================
// Quests Section    |                                                                                   
//===================

var pizza = 0;
var questsDone = 0;
var totalPizzaQuests = 0;
var questCap = 0;
var questCap2 = 0;
var questCap3 = 0;
var questCap4 = 0;
var questCap5 = 0;
var questCap6 = 0;
var questCap7 = 0;
var questCap8 = 0;
var questCap9 = 0;
var questCap10 = 0;
var questCap11 = 0;
var questCap12 = 0;
var questCap13 = 0;
var questCap14 = 0;
var questCap15 = 0;
var questCap16 = 0;
var questCap17 = 0;
var questCap18 = 0;
var questCap18 = 0;
var questCap19 = 0;
var questCap20 = 0;
var questCap21 = 0;
var questCap22 = 0;
var questCap23 = 0;
var questCap24 = 0;
var questCap25 = 0;
var questCap26 = 0;
var questCap27 = 0;
var questCap28 = 0;
var questCap29 = 0;
var questCap30 = 0;
var questCap31 = 0;
var questCap32 = 0;
var questCap33 = 0;
var questCap34 = 0;
var questCap35 = 0;
var questCap36 = 0;
var questCap37 = 0;
var questCap38 = 0;
var questCap39 = 0;
var questCap40 = 0;
var questCap41 = 0;
var questCap42 = 0;
var questCap42 = 0;
var questCap43 = 0;
var questCap44 = 0;
var questCap45 = 0;
var questCap46 = 0;
var questCap47 = 0;
var questCap48 = 0;
var questCap49 = 0;
var questCap50 = 0;
var questCap51 = 0;
var questCap52 = 0;
var questCap53 = 0;
var questCap54 = 0;
var questCap55 = 0;
var questCap56 = 0;
var questCap57 = 0;
var questCap58 = 0;
var questCap59 = 0;
var questCap60 = 0;
var questCap61 = 0;
var questCap62 = 0;
var questCap63 = 0;
var questCap64 = 0;
var questCap65 = 0;
var questCap66 = 0;
var questCap67 = 0;
var questCap68 = 0;
var questCap69 = 0;
var questCap70 = 0;
var questCap71 = 0;
var questCap72 = 0;
var questCap73 = 0;
var questCap74 = 0;
var questCap75 = 0;
var questCap76 = 0;
var questCap77 = 0;
var questCap78 = 0;
var questCap79 = 0;
var questCap80 = 0;
var questCap81 = 0;

function questChecker(){
    if (totalPizza >= 10 && questCap === 0){
         pizza = pizza + 1;
         totalPizza = totalPizza + 1;
         totalPizzaQuests = totalPizzaQuests + 1;
         questsDone = questsDone + 1;
         questCap = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox101").style.display = "none";      
    }
    if (totalPizza >= 100 && questCap2 === 0){
         pizza = pizza + 10;
         totalPizza = totalPizza + 10;
         totalPizzaQuests = totalPizzaQuests + 10;
         questsDone = questsDone + 1;
         questCap2 = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox102").style.display = "none"; 
    }
    if (totalPizza >= 1000 && questCap3 === 0){
         pizza = pizza + 100;
         totalPizza = totalPizza + 100;
         totalPizzaQuests = totalPizzaQuests + 100;
         questsDone = questsDone + 1;
         questCap3 = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox103").style.display = "none"; 
    }
    if (totalPizza >= 10000 && questCap4 === 0){
         pizza = pizza + 1000;
         totalPizza = totalPizza + 1000;
         totalPizzaQuests = totalPizzaQuests + 1000;
         questsDone = questsDone + 1;
         questCap4 = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox104").style.display = "none"; 
    }
     if (totalPizza >= 100000 && questCap5 === 0){
         pizza = pizza + 10000;
         totalPizza = totalPizza + 10000;
         totalPizzaQuests = totalPizzaQuests + 10000;
         questsDone = questsDone + 1;
         questCap5 = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox105").style.display = "none"; 
    }
     if (totalPizza >= 1000000 && questCap6 === 0){
         pizza = pizza + 100000;
         totalPizza = totalPizza + 100000;
         totalPizzaQuests = totalPizzaQuests + 100000;
         questsDone = questsDone + 1;
         questCap6 = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox106").style.display = "none"; 
    }
     if (totalPizza >= 10000000 && questCap7 === 0){
         pizza = pizza + 1000000;
         totalPizza = totalPizza + 1000000;
         totalPizzaQuests = totalPizzaQuests + 1000000;
         questsDone = questsDone + 1;
         questCap7 = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox107").style.display = "none"; 
    }
    if (totalPizza >= 100000000 && questCap8 === 0){
         pizza = pizza + 10000000;
         totalPizza = totalPizza + 10000000;
         totalPizzaQuests = totalPizzaQuests + 10000000;
         questsDone = questsDone + 1;
         questCap8 = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox108").style.display = "none"; 
    }
    if (totalPizza >= 1000000000 && questCap9 === 0){
         pizza = pizza + 100000000;
         totalPizza = totalPizza + 100000000;
         totalPizzaQuests = totalPizzaQuests + 100000000;
         questsDone = questsDone + 1;
         questCap9 = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox109").style.display = "none"; 
    }
    if (totalPizza >= 10000000000 && questCap10 === 0){
         pizza = pizza + 1000000000;
         totalPizza = totalPizza + 1000000000;
         totalPizzaQuests = totalPizzaQuests + 1000000000;
         questsDone = questsDone + 1;
         questCap10 = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox110").style.display = "none"; 
    }
    if (totalPizza >= 100000000000 && questCap11 === 0){
         pizza = pizza + 10000000000;
         totalPizza = totalPizza + 10000000000;
         totalPizzaQuests = totalPizzaQuests + 10000000000;
         questsDone = questsDone + 1;
         questCap11 = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox111").style.display = "none"; 
    }
    if (totalPizza >= 1000000000000 && questCap12 === 0){
         pizza = pizza + 100000000000;
         totalPizza = totalPizza + 100000000000;
         totalPizzaQuests = totalPizzaQuests + 100000000000;
         questsDone = questsDone + 1;
         questCap12 = 1;
         document.getElementById('pizza').innerHTML = addCommas(pizza);
         document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
         document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
         document.getElementById('questsDone').innerHTML = addCommas(questsDone);
         document.getElementById("mybox112").style.display = "none"; 
    }
    if (worker >= 1 && questCap13 === 0){
        pizza = pizza + 5;
        totalPizza = totalPizza + 5;
        totalPizzaQuests = totalPizzaQuests + 5;
        questsDone = questsDone + 1;
        questCap13 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox113").style.display = "none";
    }
    if (worker >= 10 && questCap14 === 0){
        pizza = pizza + 500;
        totalPizza = totalPizza + 500;
        totalPizzaQuests = totalPizzaQuests + 500;
        questsDone = questsDone + 1;
        questCap14 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox114").style.display = "none";
    }
    if (worker >= 50 && questCap15 === 0){
        pizza = pizza + 10000;
        totalPizza = totalPizza + 10000;
        totalPizzaQuests = totalPizzaQuests + 10000;
        questsDone = questsDone + 1;
        questCap15 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox115").style.display = "none";
    }    
    if (worker >= 100 && questCap16 === 0){
        pizza = pizza + 50000;
        totalPizza = totalPizza + 50000;
        totalPizzaQuests = totalPizzaQuests + 50000;
        questsDone = questsDone + 1;
        questCap16 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox116").style.display = "none";
    } 
    if (worker >= 200 && questCap17 === 0){
        pizza = pizza + 500000;
        totalPizza = totalPizza + 500000;
        totalPizzaQuests = totalPizzaQuests + 500000;
        questsDone = questsDone + 1;
        questCap17 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox117").style.display = "none";
    } 
    if (worker >= 400 && questCap18 === 0){
        pizza = pizza + 100000000000;
        totalPizza = totalPizza + 100000000000;
        totalPizzaQuests = totalPizzaQuests + 100000000000;
        questsDone = questsDone + 1;
        questCap18 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox118").style.display = "none";
    }
    if (pizzaCart >= 1 && questCap19 === 0){
        pizza = pizza + 20;
        totalPizza = totalPizza + 20;
        totalPizzaQuests = totalPizzaQuests + 20;
        questsDone = questsDone + 1;
        questCap19 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox119").style.display = "none";
    }
    if (pizzaCart >= 10 && questCap20 === 0){
        pizza = pizza + 2000;
        totalPizza = totalPizza + 2000;
        totalPizzaQuests = totalPizzaQuests + 2000;
        questsDone = questsDone + 1;
        questCap20 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox120").style.display = "none";
    }
    if (pizzaCart >= 50 && questCap21 === 0){
        pizza = pizza + 25000;
        totalPizza = totalPizza + 25000;
        totalPizzaQuests = totalPizzaQuests + 25000;
        questsDone = questsDone + 1;
        questCap21 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox121").style.display = "none";
    } 
    if (pizzaCart >= 100 && questCap22 === 0){
        pizza = pizza + 200000;
        totalPizza = totalPizza + 200000;
        totalPizzaQuests = totalPizzaQuests + 200000;
        questsDone = questsDone + 1;
        questCap22 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox122").style.display = "none";
    }
    if (pizzaCart >= 200 && questCap23 === 0){
        pizza = pizza + 1000000;
        totalPizza = totalPizza + 1000000;
        totalPizzaQuests = totalPizzaQuests + 1000000;
        questsDone = questsDone + 1;
        questCap23 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox123").style.display = "none";
    }
    if (pizzaCart >= 350 && questCap24 === 0){
        pizza = pizza + 100000000000;
        totalPizza = totalPizza + 100000000000;
        totalPizzaQuests = totalPizzaQuests + 100000000000;
        questsDone = questsDone + 1;
        questCap24 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox124").style.display = "none";
    }
    if (pizzaVan >= 1 && questCap25 === 0){
        pizza = pizza + 50;
        totalPizza = totalPizza + 50;
        totalPizzaQuests = totalPizzaQuests + 50;
        questsDone = questsDone + 1;
        questCap25 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox125").style.display = "none";
    }
    if (pizzaVan >= 10 && questCap26 === 0){
        pizza = pizza + 5000;
        totalPizza = totalPizza + 5000;
        totalPizzaQuests = totalPizzaQuests + 5000;
        questsDone = questsDone + 1;
        questCap26 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox126").style.display = "none";
    } 
    if (pizzaVan >= 50 && questCap27 === 0){
        pizza = pizza + 25000;
        totalPizza = totalPizza + 25000;
        totalPizzaQuests = totalPizzaQuests + 25000;
        questsDone = questsDone + 1;
        questCap27 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox127").style.display = "none";
    }
    if (pizzaVan >= 100 && questCap28 === 0){
        pizza = pizza + 125000;
        totalPizza = totalPizza + 125000;
        totalPizzaQuests = totalPizzaQuests + 125000;
        questsDone = questsDone + 1;
        questCap28 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox128").style.display = "none";
    }
    if (pizzaVan >= 200 && questCap29 === 0){
        pizza = pizza + 1000000;
        totalPizza = totalPizza + 1000000;
        totalPizzaQuests = totalPizzaQuests + 1000000;
        questsDone = questsDone + 1;
        questCap29 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox129").style.display = "none";
    }
    if (pizzaVan >= 325 && questCap30 === 0){
        pizza = pizza + 100000000000;
        totalPizza = totalPizza + 100000000000;
        totalPizzaQuests = totalPizzaQuests + 100000000000;
        questsDone = questsDone + 1;
        questCap30 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox130").style.display = "none";
    } 
    if (pizzaParlour >= 1 && questCap31 === 0){
        pizza = pizza + 150;
        totalPizza = totalPizza + 150;
        totalPizzaQuests = totalPizzaQuests + 150;
        questsDone = questsDone + 1;
        questCap31 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox131").style.display = "none";
    }
    if (pizzaParlour >= 10 && questCap32 === 0){
        pizza = pizza + 5000;
        totalPizza = totalPizza + 5000;
        totalPizzaQuests = totalPizzaQuests + 5000;
        questsDone = questsDone + 1;
        questCap32 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox132").style.display = "none";
    } 
    if (pizzaParlour >= 50 && questCap33 === 0){
        pizza = pizza + 100000;
        totalPizza = totalPizza + 100000;
        totalPizzaQuests = totalPizzaQuests + 100000;
        questsDone = questsDone + 1;
        questCap33 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox133").style.display = "none";
    }     
    if (pizzaParlour >= 100 && questCap34 === 0){
        pizza = pizza + 500000;
        totalPizza = totalPizza + 500000;
        totalPizzaQuests = totalPizzaQuests + 500000;
        questsDone = questsDone + 1;
        questCap34 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox134").style.display = "none";
    }  
    if (pizzaParlour >= 200 && questCap35 === 0){
        pizza = pizza + 1500000;
        totalPizza = totalPizza + 1500000;
        totalPizzaQuests = totalPizzaQuests + 1500000;
        questsDone = questsDone + 1;
        questCap35 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox135").style.display = "none";
    } 
    if (pizzaParlour >= 300 && questCap36 === 0){
        pizza = pizza + 100000000000;
        totalPizza = totalPizza + 100000000000;
        totalPizzaQuests = totalPizzaQuests + 100000000000;
        questsDone = questsDone + 1;
        questCap36 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox136").style.display = "none";
    } 
    if (pizzaRestaurant >= 1 && questCap37 === 0){
        pizza = pizza + 500;
        totalPizza = totalPizza + 500;
        totalPizzaQuests = totalPizzaQuests + 500;
        questsDone = questsDone + 1;
        questCap37 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox137").style.display = "none";
    }  
    if (pizzaRestaurant >= 10 && questCap38 === 0){
        pizza = pizza + 10000;
        totalPizza = totalPizza + 10000;
        totalPizzaQuests = totalPizzaQuests + 10000;
        questsDone = questsDone + 1;
        questCap38 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox138").style.display = "none";
    }
    if (pizzaRestaurant >= 50 && questCap39 === 0){
        pizza = pizza + 300000;
        totalPizza = totalPizza + 300000;
        totalPizzaQuests = totalPizzaQuests + 300000;
        questsDone = questsDone + 1;
        questCap39 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox139").style.display = "none";
    }
    if (pizzaRestaurant >= 100 && questCap40 === 0){
        pizza = pizza + 1200000;
        totalPizza = totalPizza + 1200000;
        totalPizzaQuests = totalPizzaQuests + 1200000;
        questsDone = questsDone + 1;
        questCap40 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox140").style.display = "none";
    }
    if (pizzaRestaurant >= 200 && questCap41 === 0){
        pizza = pizza + 2500000;
        totalPizza = totalPizza + 2500000;
        totalPizzaQuests = totalPizzaQuests + 2500000;
        questsDone = questsDone + 1;
        questCap41 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox141").style.display = "none";
    } 
    if (pizzaRestaurant >= 275 && questCap42 === 0){
        pizza = pizza + 100000000000;
        totalPizza = totalPizza + 100000000000;
        totalPizzaQuests = totalPizzaQuests + 100000000000;
        questsDone = questsDone + 1;
        questCap42 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox142").style.display = "none";
    }
    if (pizzaPalace >= 1 && questCap43 === 0){
        pizza = pizza + 1000;
        totalPizza = totalPizza + 1000;
        totalPizzaQuests = totalPizzaQuests + 1000;
        questsDone = questsDone + 1;
        questCap43 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox143").style.display = "none";
    }
    if (pizzaPalace >= 10 && questCap44 === 0){
        pizza = pizza + 20000;
        totalPizza = totalPizza + 20000;
        totalPizzaQuests = totalPizzaQuests + 20000;
        questsDone = questsDone + 1;
        questCap44 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox144").style.display = "none";
    }
    if (pizzaPalace >= 50 && questCap45 === 0){
        pizza = pizza + 500000;
        totalPizza = totalPizza + 500000;
        totalPizzaQuests = totalPizzaQuests + 500000;
        questsDone = questsDone + 1;
        questCap45 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox145").style.display = "none";
    }
    if (pizzaPalace >= 100 && questCap46 === 0){
        pizza = pizza + 2000000;
        totalPizza = totalPizza + 2000000;
        totalPizzaQuests = totalPizzaQuests + 2000000;
        questsDone = questsDone + 1;
        questCap46 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox146").style.display = "none";
    }   
    if (pizzaPalace >= 200 && questCap47 === 0){
        pizza = pizza + 5000000;
        totalPizza = totalPizza + 5000000;
        totalPizzaQuests = totalPizzaQuests + 5000000;
        questsDone = questsDone + 1;
        questCap47 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox147").style.display = "none";
    }
    if (pizzaPalace >= 250 && questCap48 === 0){
        pizza = pizza + 100000000000;
        totalPizza = totalPizza + 100000000000;
        totalPizzaQuests = totalPizzaQuests + 100000000000;
        questsDone = questsDone + 1;
        questCap48 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox148").style.display = "none";
    }
    if (pizzaFactory >= 1 && questCap49 === 0){
        pizza = pizza + 20000;
        totalPizza = totalPizza + 20000;
        totalPizzaQuests = totalPizzaQuests + 20000;
        questsDone = questsDone + 1;
        questCap49 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox149").style.display = "none";
    }
    if (pizzaFactory >= 10 && questCap50 === 0){
        pizza = pizza + 200000;
        totalPizza = totalPizza + 200000;
        totalPizzaQuests = totalPizzaQuests + 200000;
        questsDone = questsDone + 1;
        questCap50 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox150").style.display = "none";
    }
    if (pizzaFactory >= 50 && questCap51 === 0){
        pizza = pizza + 3000000;
        totalPizza = totalPizza + 3000000;
        totalPizzaQuests = totalPizzaQuests + 3000000;
        questsDone = questsDone + 1;
        questCap51 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox151").style.display = "none";
    }
    if (pizzaFactory >= 100 && questCap52 === 0){
        pizza = pizza + 10000000;
        totalPizza = totalPizza + 10000000;
        totalPizzaQuests = totalPizzaQuests + 10000000;
        questsDone = questsDone + 1;
        questCap52 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox152").style.display = "none";
    }
    if (pizzaFactory >= 200 && questCap53 === 0){
        pizza = pizza + 50000000;
        totalPizza = totalPizza + 50000000;
        totalPizzaQuests = totalPizzaQuests + 50000000;
        questsDone = questsDone + 1;
        questCap53 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox153").style.display = "none";
    }
    if (pizzaFactory >= 215 && questCap54 === 0){
        pizza = pizza + 100000000000;
        totalPizza = totalPizza + 100000000000;
        totalPizzaQuests = totalPizzaQuests + 100000000000;
        questsDone = questsDone + 1;
        questCap54 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox154").style.display = "none";
    }
    if (pizzaConverter >= 1 && questCap55 === 0){
        pizza = pizza + 75000;
        totalPizza = totalPizza + 75000;
        totalPizzaQuests = totalPizzaQuests + 75000;
        questsDone = questsDone + 1;
        questCap55 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox155").style.display = "none";
    }
    if (pizzaConverter >= 10 && questCap56 === 0){
        pizza = pizza + 750000;
        totalPizza = totalPizza + 750000;
        totalPizzaQuests = totalPizzaQuests + 750000;
        questsDone = questsDone + 1;
        questCap56 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox156").style.display = "none";
    }
    if (pizzaConverter >= 50 && questCap57 === 0){
        pizza = pizza + 5000000;
        totalPizza = totalPizza + 5000000;
        totalPizzaQuests = totalPizzaQuests + 5000000;
        questsDone = questsDone + 1;
        questCap57 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox157").style.display = "none";
    }
    if (pizzaConverter >= 100 && questCap58 === 0){
        pizza = pizza + 20000000;
        totalPizza = totalPizza + 20000000;
        totalPizzaQuests = totalPizzaQuests + 20000000;
        questsDone = questsDone + 1;
        questCap58 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox158").style.display = "none";
    }
    if (pizzaConverter >= 150 && questCap59 === 0){
        pizza = pizza + 100000000;
        totalPizza = totalPizza + 100000000;
        totalPizzaQuests = totalPizzaQuests + 100000000;
        questsDone = questsDone + 1;
        questCap59 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox159").style.display = "none";
    }
    if (pizzaConverter >= 190 && questCap60 === 0){
        pizza = pizza + 100000000000;
        totalPizza = totalPizza + 100000000000;
        totalPizzaQuests = totalPizzaQuests + 100000000000;
        questsDone = questsDone + 1;
        questCap60 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox160").style.display = "none";
    }
    if (pizzaWeatherMachine >= 1 && questCap61 === 0){
        pizza = pizza + 1000000;
        totalPizza = totalPizza + 1000000;
        totalPizzaQuests = totalPizzaQuests + 1000000;
        questsDone = questsDone + 1;
        questCap61 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox161").style.display = "none";
    }
    if (pizzaWeatherMachine >= 10 && questCap62 === 0){
        pizza = pizza + 25000000;
        totalPizza = totalPizza + 25000000;
        totalPizzaQuests = totalPizzaQuests + 25000000;
        questsDone = questsDone + 1;
        questCap62 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox162").style.display = "none";
    }
    if (pizzaWeatherMachine >= 50 && questCap63 === 0){
        pizza = pizza + 50000000;
        totalPizza = totalPizza + 50000000;
        totalPizzaQuests = totalPizzaQuests + 50000000;
        questsDone = questsDone + 1;
        questCap63 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox163").style.display = "none";
    }
    if (pizzaWeatherMachine >= 100 && questCap64 === 0){
        pizza = pizza + 500000000;
        totalPizza = totalPizza + 500000000;
        totalPizzaQuests = totalPizzaQuests + 500000000;
        questsDone = questsDone + 1;
        questCap64 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox164").style.display = "none";
    }
    if (pizzaWeatherMachine >= 120 && questCap65 === 0){
        pizza = pizza + 100000000000;
        totalPizza = totalPizza + 100000000000;
        totalPizzaQuests = totalPizzaQuests + 100000000000;
        questsDone = questsDone + 1;
        questCap65 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox165").style.display = "none";
    }
    if (pizzaSuperDrill >= 1 && questCap66 === 0){
        pizza = pizza + 50000000;
        totalPizza = totalPizza + 50000000;
        totalPizzaQuests = totalPizzaQuests + 50000000;
        questsDone = questsDone + 1;
        questCap66 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox166").style.display = "none";
    }
    if (pizzaSuperDrill >= 10 && questCap67 === 0){
        pizza = pizza + 500000000;
        totalPizza = totalPizza + 500000000;
        totalPizzaQuests = totalPizzaQuests + 500000000;
        questsDone = questsDone + 1;
        questCap67 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox167").style.display = "none";
    }
    if (pizzaSuperDrill >= 50 && questCap68 === 0){
        pizza = pizza + 10000000000;
        totalPizza = totalPizza + 10000000000;
        totalPizzaQuests = totalPizzaQuests + 10000000000;
        questsDone = questsDone + 1;
        questCap68 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox168").style.display = "none";
    }
    if (pizzaSuperDrill >= 65 && questCap69 === 0){
        pizza = pizza + 100000000000;
        totalPizza = totalPizza + 100000000000;
        totalPizzaQuests = totalPizzaQuests + 100000000000;
        questsDone = questsDone + 1;
        questCap69 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox169").style.display = "none";
    }
    if (pizzaMoonBase >= 1 && questCap70 === 0){
        pizza = pizza + 100000000;
        totalPizza = totalPizza + 100000000;
        totalPizzaQuests = totalPizzaQuests + 100000000;
        questsDone = questsDone + 1;
        questCap70 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox170").style.display = "none";
    }
    if (pizzaMoonBase >= 10 && questCap71 === 0){
        pizza = pizza + 1000000000;
        totalPizza = totalPizza + 1000000000;
        totalPizzaQuests = totalPizzaQuests + 1000000000;
        questsDone = questsDone + 1;
        questCap71 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox171").style.display = "none";
    }
    if (pizzaMoonBase >= 50 && questCap72 === 0){
        pizza = pizza + 100000000000;
        totalPizza = totalPizza + 100000000000;
        totalPizzaQuests = totalPizzaQuests + 100000000000;
        questsDone = questsDone + 1;
        questCap72 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox172").style.display = "none";
    }
    if (totalSlave >= 1000000 && questCap73 === 0){
        pizza = pizza + 1000000000;
        totalPizza = totalPizza + 1000000000;
        totalPizzaQuests = totalPizzaQuests + 1000000000;
        questsDone = questsDone + 1;
        questCap73 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox173").style.display = "none";
    }
    if (totalCleaner >= 500000 && questCap74 === 0){
        pizza = pizza + 1000000000;
        totalPizza = totalPizza + 1000000000;
        totalPizzaQuests = totalPizzaQuests + 1000000000;
        questsDone = questsDone + 1;
        questCap74 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox174").style.display = "none";
    }
    if (totalManager >= 300000 && questCap75 === 0){
        pizza = pizza + 1000000000;
        totalPizza = totalPizza + 1000000000;
        totalPizzaQuests = totalPizzaQuests + 1000000000;
        questsDone = questsDone + 1;
        questCap75 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox175").style.display = "none";
    }
    if (totalOperator >= 300000 && questCap76 === 0){
        pizza = pizza + 1000000000;
        totalPizza = totalPizza + 1000000000;
        totalPizzaQuests = totalPizzaQuests + 1000000000;
        questsDone = questsDone + 1;
        questCap76 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox176").style.display = "none";
    }
    if (totalScientist >= 300000 && questCap77 === 0){
        pizza = pizza + 1000000000;
        totalPizza = totalPizza + 1000000000;
        totalPizzaQuests = totalPizzaQuests + 1000000000;
        questsDone = questsDone + 1;
        questCap77 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox177").style.display = "none";
    }
    if (totalAstronaut >= 300000 && questCap78 === 0){
        pizza = pizza + 1000000000;
        totalPizza = totalPizza + 1000000000;
        totalPizzaQuests = totalPizzaQuests + 1000000000;
        questsDone = questsDone + 1;
        questCap78 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox178").style.display = "none";
    }
    if (totalScrapMetal >= 500000 && questCap79 === 0){
        pizza = pizza + 1000000000;
        totalPizza = totalPizza + 1000000000;
        totalPizzaQuests = totalPizzaQuests + 1000000000;
        questsDone = questsDone + 1;
        questCap79 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox179").style.display = "none";
    }
    if (clickUpgradeBought >= 50 && questCap80 === 0){
        pizza = pizza + 1000000000;
        totalPizza = totalPizza + 1000000000;
        totalPizzaQuests = totalPizzaQuests + 1000000000;
        questsDone = questsDone + 1;
        questCap80 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox180").style.display = "none";
    }
    if (totalPizzaQuests >= 1231542735336 && questCap81 === 0){
        pizza = pizza + 10000000000000;
        totalPizza = totalPizza + 10000000000000;
        totalPizzaQuests = totalPizzaQuests + 10000000000000;
        questsDone = questsDone + 1;
        questCap81 = 1;
        document.getElementById('pizza').innerHTML = addCommas(pizza);
        document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
        document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
        document.getElementById('questsDone').innerHTML = addCommas(questsDone);
        document.getElementById("mybox181").style.display = "none";
    }
    if (questCap >= 1){
        document.getElementById("mybox101").style.display = "none";
    }
    if (questCap2 >= 1){
        document.getElementById("mybox102").style.display = "none";
    }
    if (questCap3 >= 1){
        document.getElementById("mybox103").style.display = "none";
    }
    if (questCap4 >= 1){
        document.getElementById("mybox104").style.display = "none";
    }
    if (questCap5 >= 1){
        document.getElementById("mybox105").style.display = "none";
    }
    if (questCap6 >= 1){
        document.getElementById("mybox106").style.display = "none";
    }
    if (questCap7 >= 1){
        document.getElementById("mybox107").style.display = "none";
    }
    if (questCap8 >= 1){
        document.getElementById("mybox108").style.display = "none";
    }
    if (questCap9 >= 1){
        document.getElementById("mybox109").style.display = "none";
    }
    if (questCap10 >= 1){
        document.getElementById("mybox110").style.display = "none";
    }
    if (questCap11 >= 1){
        document.getElementById("mybox111").style.display = "none";
    }
    if (questCap12 >= 1){
        document.getElementById("mybox112").style.display = "none";
    }
    if (questCap13 >= 1){
        document.getElementById("mybox113").style.display = "none";
    }
    if (questCap14 >= 1){
        document.getElementById("mybox114").style.display = "none";
    }
    if (questCap15 >= 1){
        document.getElementById("mybox115").style.display = "none";
    }
    if (questCap16 >= 1){
        document.getElementById("mybox116").style.display = "none";
    }
    if (questCap17 >= 1){
        document.getElementById("mybox117").style.display = "none";
    }
    if (questCap18 >= 1){
        document.getElementById("mybox118").style.display = "none";
    }
    if (questCap19 >= 1){
        document.getElementById("mybox119").style.display = "none";
    }
    if (questCap20 >= 1){
        document.getElementById("mybox120").style.display = "none";
    }
    if (questCap21 >= 1){
        document.getElementById("mybox121").style.display = "none";
    }
    if (questCap22 >= 1){
        document.getElementById("mybox122").style.display = "none";
    }
    if (questCap23 >= 1){
        document.getElementById("mybox123").style.display = "none";
    }
    if (questCap24 >= 1){
        document.getElementById("mybox124").style.display = "none";
    }
    if (questCap25 >= 1){
        document.getElementById("mybox125").style.display = "none";
    }
    if (questCap26 >= 1){
        document.getElementById("mybox126").style.display = "none";
    }
    if (questCap27 >= 1){
        document.getElementById("mybox127").style.display = "none";
    }
    if (questCap28 >= 1){
        document.getElementById("mybox128").style.display = "none";
    }
    if (questCap29 >= 1){
        document.getElementById("mybox129").style.display = "none";
    }
    if (questCap30 >= 1){
        document.getElementById("mybox130").style.display = "none";
    }
    if (questCap31 >= 1){
        document.getElementById("mybox131").style.display = "none";
    }
    if (questCap32 >= 1){
        document.getElementById("mybox132").style.display = "none";
    }
    if (questCap33 >= 1){
        document.getElementById("mybox133").style.display = "none";
    }
    if (questCap34 >= 1){
        document.getElementById("mybox134").style.display = "none";
    }
    if (questCap35 >= 1){
        document.getElementById("mybox135").style.display = "none";
    }
    if (questCap36 >= 1){
        document.getElementById("mybox136").style.display = "none";
    }
    if (questCap37 >= 1){
        document.getElementById("mybox137").style.display = "none";
    }
    if (questCap38 >= 1){
        document.getElementById("mybox138").style.display = "none";
    }
    if (questCap39 >= 1){
        document.getElementById("mybox139").style.display = "none";
    }
    if (questCap40 >= 1){
        document.getElementById("mybox140").style.display = "none";
    }
    if (questCap41 >= 1){
        document.getElementById("mybox141").style.display = "none";
    }
    if (questCap42 >= 1){
        document.getElementById("mybox142").style.display = "none";
    }
    if (questCap43 >= 1){
        document.getElementById("mybox143").style.display = "none";
    }
    if (questCap44 >= 1){
        document.getElementById("mybox144").style.display = "none";
    }
    if (questCap45 >= 1){
        document.getElementById("mybox145").style.display = "none";
    }
    if (questCap46 >= 1){
        document.getElementById("mybox146").style.display = "none";
    }
    if (questCap47 >= 1){
        document.getElementById("mybox147").style.display = "none";
    }
    if (questCap48 >= 1){
        document.getElementById("mybox148").style.display = "none";
    }
    if (questCap49 >= 1){
        document.getElementById("mybox149").style.display = "none";
    }
    if (questCap50 >= 1){
        document.getElementById("mybox150").style.display = "none";
    }
    if (questCap51 >= 1){
        document.getElementById("mybox151").style.display = "none";
    }
    if (questCap52 >= 1){
        document.getElementById("mybox152").style.display = "none";
    }
    if (questCap53 >= 1){
        document.getElementById("mybox153").style.display = "none";
    }
    if (questCap54 >= 1){
        document.getElementById("mybox154").style.display = "none";
    }
    if (questCap55 >= 1){
        document.getElementById("mybox155").style.display = "none";
    }
    if (questCap56 >= 1){
        document.getElementById("mybox156").style.display = "none";
    }
    if (questCap57 >= 1){
        document.getElementById("mybox157").style.display = "none";
    }
    if (questCap58 >= 1){
        document.getElementById("mybox158").style.display = "none";
    }
    if (questCap59 >= 1){
        document.getElementById("mybox159").style.display = "none";
    }
    if (questCap60 >= 1){
        document.getElementById("mybox160").style.display = "none";
    }
    if (questCap61 >= 1){
        document.getElementById("mybox161").style.display = "none";
    }
    if (questCap62 >= 1){
        document.getElementById("mybox162").style.display = "none";
    }
    if (questCap63 >= 1){
        document.getElementById("mybox163").style.display = "none";
    }
    if (questCap64 >= 1){
        document.getElementById("mybox164").style.display = "none";
    }
    if (questCap65 >= 1){
        document.getElementById("mybox165").style.display = "none";
    }
    if (questCap66 >= 1){
        document.getElementById("mybox166").style.display = "none";
    }
    if (questCap67 >= 1){
        document.getElementById("mybox167").style.display = "none";
    }
    if (questCap68 >= 1){
        document.getElementById("mybox168").style.display = "none";
    }
    if (questCap69 >= 1){
        document.getElementById("mybox169").style.display = "none";
    }
    if (questCap70 >= 1){
        document.getElementById("mybox170").style.display = "none";
    }
    if (questCap71 >= 1){
        document.getElementById("mybox171").style.display = "none";
    }
    if (questCap72 >= 1){
        document.getElementById("mybox172").style.display = "none";
    }
    if (questCap73 >= 1){
        document.getElementById("mybox173").style.display = "none";
    }
    if (questCap74 >= 1){
        document.getElementById("mybox174").style.display = "none";
    }
    if (questCap75 >= 1){
        document.getElementById("mybox175").style.display = "none";
    }
    if (questCap76 >= 1){
        document.getElementById("mybox176").style.display = "none";
    }
    if (questCap77 >= 1){
        document.getElementById("mybox177").style.display = "none";
    }
    if (questCap78 >= 1){
        document.getElementById("mybox178").style.display = "none";
    }
    if (questCap79 >= 1){
        document.getElementById("mybox179").style.display = "none";
    }
    if (questCap80 >= 1){
        document.getElementById("mybox180").style.display = "none";
    }
    if (questCap81 >= 1){
        document.getElementById("mybox181").style.display = "none";
    }
}

//===================
// Save Section      |                                                                                   
//===================
function saveGame(){
    
    localStorage['save'] = btoa(JSON.stringify(pizza));
    localStorage['save1'] = btoa(JSON.stringify(money));
    localStorage['save2'] = btoa(JSON.stringify(worker));
    localStorage['save3'] = btoa(JSON.stringify(pizzaCart));
    localStorage['save4'] = btoa(JSON.stringify(pizzaVan));
    localStorage['save5'] = btoa(JSON.stringify(pizzaParlour));
    localStorage['save6'] = btoa(JSON.stringify(pizzaRestaurant));
    localStorage['save7'] = btoa(JSON.stringify(pizzaPalace));
    localStorage['save8'] = btoa(JSON.stringify(pizzaFactory));
    localStorage['save9'] = btoa(JSON.stringify(pizzaConverter));
    localStorage['save10'] = btoa(JSON.stringify(pizzaWeatherMachine));
    localStorage['save11'] = btoa(JSON.stringify(slave));
    localStorage['save12'] = btoa(JSON.stringify(totalSlave));
    localStorage['save13'] = btoa(JSON.stringify(cleaner));
    localStorage['save14'] = btoa(JSON.stringify(totalCleaner));
    localStorage['save15'] = btoa(JSON.stringify(manager));
    localStorage['save16'] = btoa(JSON.stringify(totalManager));
    localStorage['save17'] = btoa(JSON.stringify(scientist));
    localStorage['save18'] = btoa(JSON.stringify(totalScientist));
    localStorage['save19'] = btoa(JSON.stringify(astronaut));
    localStorage['save20'] = btoa(JSON.stringify(totalAstronaut));
    localStorage['save21'] = btoa(JSON.stringify(cart));
    localStorage['save22'] = btoa(JSON.stringify(totalCart));
    localStorage['save23'] = btoa(JSON.stringify(van));
    localStorage['save24'] = btoa(JSON.stringify(totalVan));
    localStorage['save25'] = btoa(JSON.stringify(parlour));
    localStorage['save26'] = btoa(JSON.stringify(totalParlour));
    localStorage['save27'] = btoa(JSON.stringify(restaurant));
    localStorage['save28'] = btoa(JSON.stringify(totalRestaurant));
    localStorage['save29'] = btoa(JSON.stringify(palace));
    localStorage['save30'] = btoa(JSON.stringify(totalPalace));
    localStorage['save31'] = btoa(JSON.stringify(factory));
    localStorage['save32'] = btoa(JSON.stringify(totalFactory));
    localStorage['save33'] = btoa(JSON.stringify(converter));
    localStorage['save34'] = btoa(JSON.stringify(totalConverter));
    localStorage['save35'] = btoa(JSON.stringify(weatherMachine));
    localStorage['save36'] = btoa(JSON.stringify(totalWeatherMachine));
    localStorage['save37'] = btoa(JSON.stringify(scrapMetal));
    localStorage['save38'] = btoa(JSON.stringify(totalScrapMetal));
    localStorage['save39'] = btoa(JSON.stringify(clickUpgradeBought));
    localStorage['save40'] = btoa(JSON.stringify(upgradeThirdBought));
    localStorage['save41'] = btoa(JSON.stringify(upgradeCloneBought));
    localStorage['save42'] = btoa(JSON.stringify(upgradeBodyBought));
    localStorage['save43'] = btoa(JSON.stringify(upgradePepperoniBought));
    localStorage['save44'] = btoa(JSON.stringify(upgradeChickenBought));
    localStorage['save45'] = btoa(JSON.stringify(upgradeBeefBought));
    localStorage['save46'] = btoa(JSON.stringify(upgradeSausageBought));
    localStorage['save47'] = btoa(JSON.stringify(operator));
    localStorage['save48'] = btoa(JSON.stringify(totalOperator));
    localStorage['save49'] = btoa(JSON.stringify(superDrill));
    localStorage['save50'] = btoa(JSON.stringify(totalSuperDrill));
    localStorage['save51'] = btoa(JSON.stringify(moonBase));
    localStorage['save52'] = btoa(JSON.stringify(totalMoonBase));
    localStorage['save53'] = btoa(JSON.stringify(spaceElevator));
    localStorage['save54'] = btoa(JSON.stringify(totalSpaceElevator));
    localStorage['save55'] = btoa(JSON.stringify(donateFuel));
    localStorage['save56'] = btoa(JSON.stringify(rocketShip));
    localStorage['save57'] = btoa(JSON.stringify(supplyCrew));
    localStorage['save58'] = btoa(JSON.stringify(exploreSpace));
    localStorage['save59'] = btoa(JSON.stringify(pizzaSuperDrill));
    localStorage['save60'] = btoa(JSON.stringify(pizzaMoonBase));
    localStorage['save61'] = btoa(JSON.stringify(rocketname));
    localStorage['save62'] = btoa(JSON.stringify(name));
    localStorage['save63'] = btoa(JSON.stringify(convenienceBought));
    localStorage['save64'] = btoa(JSON.stringify(convenience2Bought));
    localStorage['save65'] = btoa(JSON.stringify(convenience3Bought));
    localStorage['save66'] = btoa(JSON.stringify(autoClicker));
    localStorage['save67'] = btoa(JSON.stringify(autoClickerNum));
    localStorage['save68'] = btoa(JSON.stringify(totalPizza));
    localStorage['save69'] = btoa(JSON.stringify(questsDone));
    localStorage['save70'] = btoa(JSON.stringify(totalPizzaQuests));
    localStorage['save71'] = btoa(JSON.stringify(questCap));
    localStorage['save72'] = btoa(JSON.stringify(questCap2));
    localStorage['save73'] = btoa(JSON.stringify(questCap3));
    localStorage['save74'] = btoa(JSON.stringify(questCap4));
    localStorage['save75'] = btoa(JSON.stringify(questCap5));
    localStorage['save76'] = btoa(JSON.stringify(questCap6));
    localStorage['save77'] = btoa(JSON.stringify(questCap7));
    localStorage['save78'] = btoa(JSON.stringify(questCap8));
    localStorage['save79'] = btoa(JSON.stringify(questCap9));
    localStorage['save80'] = btoa(JSON.stringify(questCap10));
    localStorage['save81'] = btoa(JSON.stringify(questCap11));
    localStorage['save82'] = btoa(JSON.stringify(questCap12));
    localStorage['save83'] = btoa(JSON.stringify(questCap13));
    localStorage['save84'] = btoa(JSON.stringify(questCap14));
    localStorage['save85'] = btoa(JSON.stringify(questCap15));
    localStorage['save86'] = btoa(JSON.stringify(questCap16));
    localStorage['save87'] = btoa(JSON.stringify(questCap17));
    localStorage['save88'] = btoa(JSON.stringify(questCap18));
    localStorage['save89'] = btoa(JSON.stringify(questCap19));
    localStorage['save90'] = btoa(JSON.stringify(questCap20));
    localStorage['save91'] = btoa(JSON.stringify(questCap21));
    localStorage['save92'] = btoa(JSON.stringify(questCap22));
    localStorage['save93'] = btoa(JSON.stringify(questCap23));
    localStorage['save94'] = btoa(JSON.stringify(questCap24));
    localStorage['save95'] = btoa(JSON.stringify(questCap25));
    localStorage['save96'] = btoa(JSON.stringify(questCap26));
    localStorage['save97'] = btoa(JSON.stringify(questCap27));
    localStorage['save98'] = btoa(JSON.stringify(questCap28));
    localStorage['save99'] = btoa(JSON.stringify(questCap29));
    localStorage['save100'] = btoa(JSON.stringify(questCap30));
    localStorage['save101'] = btoa(JSON.stringify(questCap31));
    localStorage['save102'] = btoa(JSON.stringify(questCap32));
    localStorage['save103'] = btoa(JSON.stringify(questCap33));
    localStorage['save104'] = btoa(JSON.stringify(questCap34));
    localStorage['save105'] = btoa(JSON.stringify(questCap35));
    localStorage['save106'] = btoa(JSON.stringify(questCap36));
    localStorage['save107'] = btoa(JSON.stringify(questCap37));
    localStorage['save108'] = btoa(JSON.stringify(questCap38));
    localStorage['save109'] = btoa(JSON.stringify(questCap39));
    localStorage['save110'] = btoa(JSON.stringify(questCap40));
    localStorage['save111'] = btoa(JSON.stringify(questCap41));
    localStorage['save112'] = btoa(JSON.stringify(questCap42));
    localStorage['save113'] = btoa(JSON.stringify(questCap43));
    localStorage['save114'] = btoa(JSON.stringify(questCap44));
    localStorage['save115'] = btoa(JSON.stringify(questCap45));
    localStorage['save116'] = btoa(JSON.stringify(questCap46));
    localStorage['save117'] = btoa(JSON.stringify(questCap47));
    localStorage['save118'] = btoa(JSON.stringify(questCap48));
    localStorage['save119'] = btoa(JSON.stringify(questCap49));
    localStorage['save120'] = btoa(JSON.stringify(questCap50));
    localStorage['save121'] = btoa(JSON.stringify(questCap51));
    localStorage['save122'] = btoa(JSON.stringify(questCap52));
    localStorage['save123'] = btoa(JSON.stringify(questCap53));
    localStorage['save124'] = btoa(JSON.stringify(questCap54));
    localStorage['save125'] = btoa(JSON.stringify(questCap55));
    localStorage['save126'] = btoa(JSON.stringify(questCap56));
    localStorage['save127'] = btoa(JSON.stringify(questCap57));
    localStorage['save128'] = btoa(JSON.stringify(questCap58));
    localStorage['save129'] = btoa(JSON.stringify(questCap59));
    localStorage['save130'] = btoa(JSON.stringify(questCap60));
    localStorage['save131'] = btoa(JSON.stringify(questCap61));
    localStorage['save132'] = btoa(JSON.stringify(questCap62));
    localStorage['save133'] = btoa(JSON.stringify(questCap63));
    localStorage['save134'] = btoa(JSON.stringify(questCap64));
    localStorage['save135'] = btoa(JSON.stringify(questCap65));
    localStorage['save136'] = btoa(JSON.stringify(questCap66));
    localStorage['save137'] = btoa(JSON.stringify(questCap67));
    localStorage['save138'] = btoa(JSON.stringify(questCap68));
    localStorage['save139'] = btoa(JSON.stringify(questCap69));
    localStorage['save140'] = btoa(JSON.stringify(questCap70));
    localStorage['save141'] = btoa(JSON.stringify(questCap71));
    localStorage['save142'] = btoa(JSON.stringify(questCap72));
    localStorage['save143'] = btoa(JSON.stringify(questCap73));
    localStorage['save144'] = btoa(JSON.stringify(questCap74));
    localStorage['save145'] = btoa(JSON.stringify(questCap75));
    localStorage['save146'] = btoa(JSON.stringify(questCap76));
    localStorage['save147'] = btoa(JSON.stringify(questCap77));
    localStorage['save148'] = btoa(JSON.stringify(questCap78));
    localStorage['save149'] = btoa(JSON.stringify(questCap79));
    localStorage['save150'] = btoa(JSON.stringify(questCap80));
    localStorage['save151'] = btoa(JSON.stringify(questCap81));
}

function loadGame() {

    pizza = JSON.parse(atob(localStorage['save']))
    money = JSON.parse(atob(localStorage['save1']))
    worker = JSON.parse(atob(localStorage['save2']))
    pizzaCart = JSON.parse(atob(localStorage['save3']))
    pizzaVan = JSON.parse(atob(localStorage['save4']))
    pizzaParlour = JSON.parse(atob(localStorage['save5']))
    pizzaRestaurant = JSON.parse(atob(localStorage['save6']))
    pizzaPalace = JSON.parse(atob(localStorage['save7']))
    pizzaFactory = JSON.parse(atob(localStorage['save8']))
    pizzaConverter = JSON.parse(atob(localStorage['save9']))
    pizzaWeatherMachine = JSON.parse(atob(localStorage['save10']))
    slave = JSON.parse(atob(localStorage['save11']))
    totalSlave = JSON.parse(atob(localStorage['save12']))
    cleaner = JSON.parse(atob(localStorage['save13']))
    totalCleaner = JSON.parse(atob(localStorage['save14']))
    manager = JSON.parse(atob(localStorage['save15']))
    totalManager = JSON.parse(atob(localStorage['save16']))
    scientist = JSON.parse(atob(localStorage['save17']))
    totalScientist = JSON.parse(atob(localStorage['save18']))
    astronaut = JSON.parse(atob(localStorage['save19']))
    totalAstronaut = JSON.parse(atob(localStorage['save20']))
    cart = JSON.parse(atob(localStorage['save21']))
    totalCart = JSON.parse(atob(localStorage['save22']))
    van = JSON.parse(atob(localStorage['save23']))
    totalVan = JSON.parse(atob(localStorage['save24']))
    parlour = JSON.parse(atob(localStorage['save25']))
    totalParlour = JSON.parse(atob(localStorage['save26']))
    restaurant = JSON.parse(atob(localStorage['save27']))
    totalRestaurant = JSON.parse(atob(localStorage['save28']))
    palace = JSON.parse(atob(localStorage['save29']))
    totalPalace = JSON.parse(atob(localStorage['save30']))
    factory = JSON.parse(atob(localStorage['save31']))
    totalFactory = JSON.parse(atob(localStorage['save32']))
    converter = JSON.parse(atob(localStorage['save33']))
    totalConverter = JSON.parse(atob(localStorage['save34']))
    weatherMachine = JSON.parse(atob(localStorage['save35']))
    totalWeatherMachine = JSON.parse(atob(localStorage['save36']))
    scrapMetal = JSON.parse(atob(localStorage['save37']))
    totalScrapMetal = JSON.parse(atob(localStorage['save38']))
    clickUpgradeBought = JSON.parse(atob(localStorage['save39']))
    upgradeThirdBought = JSON.parse(atob(localStorage['save40']))
    upgradeCloneBought = JSON.parse(atob(localStorage['save41']))
    upgradeBodyBought = JSON.parse(atob(localStorage['save42']))
    upgradePepperoniBought = JSON.parse(atob(localStorage['save43']))
    upgradeChickenBought = JSON.parse(atob(localStorage['save44']))
    upgradeBeefBought = JSON.parse(atob(localStorage['save45']))
    upgradeSausageBought = JSON.parse(atob(localStorage['save46']))
    operator = JSON.parse(atob(localStorage['save47']))
    totalOperator = JSON.parse(atob(localStorage['save48']))
    superDrill = JSON.parse(atob(localStorage['save49']))
    totalSuperDrill = JSON.parse(atob(localStorage['save50']))
    moonBase = JSON.parse(atob(localStorage['save51']))
    totalMoonBase = JSON.parse(atob(localStorage['save52']))
    spaceElevator = JSON.parse(atob(localStorage['save53']))
    totalSpaceElevator = JSON.parse(atob(localStorage['save54']))
    donateFuel = JSON.parse(atob(localStorage['save55']))
    rocketShip = JSON.parse(atob(localStorage['save56']))
    supplyCrew = JSON.parse(atob(localStorage['save57']))
    exploreSpace = JSON.parse(atob(localStorage['save58']))
    pizzaSuperDrill = JSON.parse(atob(localStorage['save59']))
    pizzaMoonBase = JSON.parse(atob(localStorage['save60']))
    rocketname = JSON.parse(atob(localStorage['save61']))
    name = JSON.parse(atob(localStorage['save62']))
    convenienceBought = JSON.parse(atob(localStorage['save63']))
    convenience2Bought = JSON.parse(atob(localStorage['save64']))
    convenience3Bought = JSON.parse(atob(localStorage['save65']))
    autoClicker = JSON.parse(atob(localStorage['save66']))
    autoClickerNum = JSON.parse(atob(localStorage['save67']))
    totalPizza = JSON.parse(atob(localStorage['save68']))
    questsDone = JSON.parse(atob(localStorage['save69']))
    totalPizzaQuests = JSON.parse(atob(localStorage['save70']))
    questCap = JSON.parse(atob(localStorage['save71']))
    questCap2 = JSON.parse(atob(localStorage['save72']))
    questCap3 = JSON.parse(atob(localStorage['save73']))
    questCap4 = JSON.parse(atob(localStorage['save74']))
    questCap5 = JSON.parse(atob(localStorage['save75']))
    questCap6 = JSON.parse(atob(localStorage['save76']))
    questCap7 = JSON.parse(atob(localStorage['save77']))
    questCap8 = JSON.parse(atob(localStorage['save78']))
    questCap9 = JSON.parse(atob(localStorage['save79']))
    questCap10 = JSON.parse(atob(localStorage['save80']))
    questCap11 = JSON.parse(atob(localStorage['save81']))
    questCap12 = JSON.parse(atob(localStorage['save82']))
    questCap13 = JSON.parse(atob(localStorage['save83']))
    questCap14 = JSON.parse(atob(localStorage['save84']))
    questCap15 = JSON.parse(atob(localStorage['save85']))
    questCap16 = JSON.parse(atob(localStorage['save86']))
    questCap17 = JSON.parse(atob(localStorage['save87']))
    questCap18 = JSON.parse(atob(localStorage['save88']))
    questCap19 = JSON.parse(atob(localStorage['save89']))
    questCap20 = JSON.parse(atob(localStorage['save90']))
    questCap21 = JSON.parse(atob(localStorage['save91']))
    questCap22 = JSON.parse(atob(localStorage['save92']))
    questCap23 = JSON.parse(atob(localStorage['save93']))
    questCap24 = JSON.parse(atob(localStorage['save94']))
    questCap25 = JSON.parse(atob(localStorage['save95']))
    questCap26 = JSON.parse(atob(localStorage['save96']))
    questCap27 = JSON.parse(atob(localStorage['save97']))
    questCap28 = JSON.parse(atob(localStorage['save98']))
    questCap29 = JSON.parse(atob(localStorage['save99']))
    questCap30 = JSON.parse(atob(localStorage['save100']))
    questCap31 = JSON.parse(atob(localStorage['save101']))
    questCap32 = JSON.parse(atob(localStorage['save102']))
    questCap33 = JSON.parse(atob(localStorage['save103']))
    questCap34 = JSON.parse(atob(localStorage['save104']))
    questCap35 = JSON.parse(atob(localStorage['save105']))
    questCap36 = JSON.parse(atob(localStorage['save106']))
    questCap37 = JSON.parse(atob(localStorage['save107']))
    questCap38 = JSON.parse(atob(localStorage['save108']))
    questCap39 = JSON.parse(atob(localStorage['save109']))
    questCap40 = JSON.parse(atob(localStorage['save110']))
    questCap41 = JSON.parse(atob(localStorage['save111']))
    questCap42 = JSON.parse(atob(localStorage['save112']))
    questCap43 = JSON.parse(atob(localStorage['save113']))
    questCap44 = JSON.parse(atob(localStorage['save114']))
    questCap45 = JSON.parse(atob(localStorage['save115']))
    questCap46 = JSON.parse(atob(localStorage['save116']))
    questCap47 = JSON.parse(atob(localStorage['save117']))
    questCap48 = JSON.parse(atob(localStorage['save118']))
    questCap49 = JSON.parse(atob(localStorage['save119']))
    questCap50 = JSON.parse(atob(localStorage['save120']))
    questCap51 = JSON.parse(atob(localStorage['save121']))
    questCap52 = JSON.parse(atob(localStorage['save122']))
    questCap53 = JSON.parse(atob(localStorage['save123']))
    questCap54 = JSON.parse(atob(localStorage['save124']))
    questCap55 = JSON.parse(atob(localStorage['save125']))
    questCap56 = JSON.parse(atob(localStorage['save126']))
    questCap57 = JSON.parse(atob(localStorage['save127']))
    questCap58 = JSON.parse(atob(localStorage['save128']))
    questCap59 = JSON.parse(atob(localStorage['save129']))
    questCap60 = JSON.parse(atob(localStorage['save130']))
    questCap61 = JSON.parse(atob(localStorage['save131']))
    questCap62 = JSON.parse(atob(localStorage['save132']))
    questCap63 = JSON.parse(atob(localStorage['save133']))
    questCap64 = JSON.parse(atob(localStorage['save134']))
    questCap65 = JSON.parse(atob(localStorage['save135']))
    questCap66 = JSON.parse(atob(localStorage['save136']))
    questCap67 = JSON.parse(atob(localStorage['save137']))
    questCap68 = JSON.parse(atob(localStorage['save138']))
    questCap69 = JSON.parse(atob(localStorage['save139']))
    questCap70 = JSON.parse(atob(localStorage['save140']))
    questCap71 = JSON.parse(atob(localStorage['save141']))
    questCap72 = JSON.parse(atob(localStorage['save142']))
    questCap73 = JSON.parse(atob(localStorage['save143']))
    questCap74 = JSON.parse(atob(localStorage['save144']))
    questCap75 = JSON.parse(atob(localStorage['save145']))
    questCap76 = JSON.parse(atob(localStorage['save146']))
    questCap77 = JSON.parse(atob(localStorage['save147']))
    questCap78 = JSON.parse(atob(localStorage['save148']))
    questCap79 = JSON.parse(atob(localStorage['save149']))
    questCap80 = JSON.parse(atob(localStorage['save150']))
    questCap81 = JSON.parse(atob(localStorage['save151']))


    document.getElementById('pizza').innerHTML = addCommas(pizza);
    document.getElementById('money').innerHTML = addCommas(money);
    document.getElementById('worker').innerHTML = worker;
    document.getElementById('pizzaCart').innerHTML = pizzaCart;
    document.getElementById('pizzaVan').innerHTML = pizzaVan;
    document.getElementById('pizzaParlour').innerHTML = pizzaParlour;
    document.getElementById('pizzaRestaurant').innerHTML = pizzaRestaurant;
    document.getElementById('pizzaPalace').innerHTML = pizzaPalace;
    document.getElementById('pizzaFactory').innerHTML = pizzaFactory;
    document.getElementById('pizzaConverter').innerHTML = pizzaConverter;
    document.getElementById('pizzaWeatherMachine').innerHTML = pizzaWeatherMachine;
    document.getElementById('slave').innerHTML = addCommas(slave);
    document.getElementById('totalSlave').innerHTML = addCommas(totalSlave);
    document.getElementById('cleaner').innerHTML = addCommas(cleaner);
    document.getElementById('totalCleaner').innerHTML = addCommas(totalCleaner);
    document.getElementById('manager').innerHTML = addCommas(manager);
    document.getElementById('totalManager').innerHTML = addCommas(totalManager);
    document.getElementById('scientist').innerHTML = addCommas(scientist);
    document.getElementById('totalScientist').innerHTML = addCommas(totalScientist);
    document.getElementById('astronaut').innerHTML = addCommas(astronaut);
    document.getElementById('totalAstronaut').innerHTML = addCommas(totalAstronaut);
    document.getElementById('cart').innerHTML = cart;
    document.getElementById('totalCart').innerHTML = totalCart;
    document.getElementById('van').innerHTML = van;
    document.getElementById('totalVan').innerHTML = totalVan;
    document.getElementById('parlour').innerHTML = parlour;
    document.getElementById('totalParlour').innerHTML = totalParlour;
    document.getElementById('restaurant').innerHTML = restaurant;
    document.getElementById('totalRestaurant').innerHTML = totalRestaurant;
    document.getElementById('palace').innerHTML = palace;
    document.getElementById('totalPalace').innerHTML = totalPalace;
    document.getElementById('factory').innerHTML = factory;
    document.getElementById('totalFactory').innerHTML = totalFactory;
    document.getElementById('converter').innerHTML = converter;
    document.getElementById('totalConverter').innerHTML = totalConverter;
    document.getElementById('weatherMachine').innerHTML = weatherMachine;
    document.getElementById('totalWeatherMachine').innerHTML = totalWeatherMachine;
    document.getElementById('scrapMetal').innerHTML = addCommas(scrapMetal);
    document.getElementById('totalScrapMetal').innerHTML = addCommas(totalScrapMetal);
    document.getElementById('clickUpgradeBought').innerHTML = addCommas(clickUpgradeBought);
    document.getElementById('upgradeThirdBought').innerHTML = upgradeThirdBought;
    document.getElementById('upgradeCloneBought').innerHTML = upgradeCloneBought;
    document.getElementById('upgradeBodyBought').innerHTML = upgradeBodyBought;
    document.getElementById('upgradePepperoniBought').innerHTML = upgradePepperoniBought;
    document.getElementById('upgradeChickenBought').innerHTML = upgradeChickenBought;
    document.getElementById('upgradeBeefBought').innerHTML = upgradeBeefBought;
    document.getElementById('upgradeSausageBought').innerHTML = upgradeSausageBought;
    document.getElementById('operator').innerHTML = addCommas(operator);
    document.getElementById('totalOperator').innerHTML = addCommas(totalOperator);
    document.getElementById('superDrill').innerHTML = superDrill;
    document.getElementById('totalSuperDrill').innerHTML = totalSuperDrill;
    document.getElementById('moonBase').innerHTML = moonBase;
    document.getElementById('totalMoonBase').innerHTML = totalMoonBase;
    document.getElementById('spaceElevator').innerHTML = spaceElevator;
    document.getElementById('totalSpaceElevator').innerHTML = totalSpaceElevator;
    document.getElementById('donateFuel').innerHTML = donateFuel;
    document.getElementById('rocketShip').innerHTML = rocketShip;
    document.getElementById('supplyCrew').innerHTML = supplyCrew;
    document.getElementById('pizzaSuperDrill').innerHTML = pizzaSuperDrill;
    document.getElementById('pizzaMoonBase').innerHTML = pizzaMoonBase;
    document.getElementById('convenienceBought').innerHTML = convenienceBought;
    document.getElementById('convenience2Bought').innerHTML = convenience2Bought;
    document.getElementById('convenience3Bought').innerHTML = convenience3Bought;
    document.getElementById('autoClicker').innerHTML = autoClicker;
    document.getElementById('autoClickerNum').innerHTML = autoClickerNum;
    document.getElementById('totalPizza').innerHTML = addCommas(totalPizza);
    document.getElementById('questsDone').innerHTML = questsDone;
    document.getElementById('totalPizzaQuests').innerHTML = addCommas(totalPizzaQuests);
    
};

window.setInterval(function(){
    
    saveGame();
    
}, 60000);

function deleteGame() {
    localStorage.clear();
    location.reload();
}

$(document).ready(function(){

        $("#mybox").hover(function() {//Mouse Enters
            $("#tooltip").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox1").hover(function() {//Mouse Enters
            $("#tooltip1").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip1").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip1").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox2").hover(function() {//Mouse Enters
            $("#tooltip2").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip2").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip2").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox3").hover(function() {//Mouse Enters
            $("#tooltip3").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip3").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip3").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox4").hover(function() {//Mouse Enters
            $("#tooltip4").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip4").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip4").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox5").hover(function() {//Mouse Enters
            $("#tooltip5").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip5").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip5").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox6").hover(function() {//Mouse Enters
            $("#tooltip6").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip6").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip6").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox7").hover(function() {//Mouse Enters
            $("#tooltip7").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip7").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip7").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox8").hover(function() {//Mouse Enters
            $("#tooltip8").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip8").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip8").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox9").hover(function() {//Mouse Enters
            $("#tooltip9").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip9").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip9").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox10").hover(function() {//Mouse Enters
            $("#tooltip10").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip10").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip10").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox11").hover(function() {//Mouse Enters
            $("#tooltip11").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip11").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip11").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox12").hover(function() {//Mouse Enters
            $("#tooltip12").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip12").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip12").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox13").hover(function() {//Mouse Enters
            $("#tooltip13").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip13").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip13").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox14").hover(function() {//Mouse Enters
            $("#tooltip14").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip14").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip14").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox15").hover(function() {//Mouse Enters
            $("#tooltip15").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip15").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip15").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox16").hover(function() {//Mouse Enters
            $("#tooltip16").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip16").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip16").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox17").hover(function() {//Mouse Enters
            $("#tooltip17").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip17").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX+15;
            var my = event.pageY+15;
            $("#tooltip17").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox18").hover(function() {//Mouse Enters
            $("#tooltip18").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip18").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip18").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox19").hover(function() {//Mouse Enters
            $("#tooltip19").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip19").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip19").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox20").hover(function() {//Mouse Enters
            $("#tooltip20").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip20").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip20").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox21").hover(function() {//Mouse Enters
            $("#tooltip21").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip21").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip21").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox22").hover(function() {//Mouse Enters
            $("#tooltip22").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip22").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip22").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox23").hover(function() {//Mouse Enters
            $("#tooltip23").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip23").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip23").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox24").hover(function() {//Mouse Enters
            $("#tooltip24").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip24").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip24").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox25").hover(function() {//Mouse Enters
            $("#tooltip25").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip25").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip25").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox26").hover(function() {//Mouse Enters
            $("#tooltip26").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip26").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip26").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox27").hover(function() {//Mouse Enters
            $("#tooltip27").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip27").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip27").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox28").hover(function() {//Mouse Enters
            $("#tooltip28").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip28").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip28").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox29").hover(function() {//Mouse Enters
            $("#tooltip29").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip29").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip29").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox30").hover(function() {//Mouse Enters
            $("#tooltip30").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip30").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip30").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox31").hover(function() {//Mouse Enters
            $("#tooltip31").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip31").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip31").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox32").hover(function() {//Mouse Enters
            $("#tooltip32").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip32").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip32").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox33").hover(function() {//Mouse Enters
            $("#tooltip33").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip33").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip33").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox34").hover(function() {//Mouse Enters
            $("#tooltip34").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip34").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip34").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox35").hover(function() {//Mouse Enters
            $("#tooltip35").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip35").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip35").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox36").hover(function() {//Mouse Enters
            $("#tooltip36").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip36").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip36").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox37").hover(function() {//Mouse Enters
            $("#tooltip37").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip37").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip37").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox38").hover(function() {//Mouse Enters
            $("#tooltip38").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip38").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip38").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox39").hover(function() {//Mouse Enters
            $("#tooltip39").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip39").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip39").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox40").hover(function() {//Mouse Enters
            $("#tooltip40").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip40").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip40").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox41").hover(function() {//Mouse Enters
            $("#tooltip41").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip41").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip41").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox42").hover(function() {//Mouse Enters
            $("#tooltip42").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip42").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip42").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox43").hover(function() {//Mouse Enters
            $("#tooltip43").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip43").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip43").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox44").hover(function() {//Mouse Enters
            $("#tooltip44").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip44").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip44").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox45").hover(function() {//Mouse Enters
            $("#tooltip45").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip45").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip45").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox46").hover(function() {//Mouse Enters
            $("#tooltip46").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip46").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip46").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox47").hover(function() {//Mouse Enters
            $("#tooltip47").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip47").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip47").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox48").hover(function() {//Mouse Enters
            $("#tooltip48").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip48").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip48").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox49").hover(function() {//Mouse Enters
            $("#tooltip49").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip49").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip49").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox50").hover(function() {//Mouse Enters
            $("#tooltip50").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip50").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip50").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox51").hover(function() {//Mouse Enters
            $("#tooltip51").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip51").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip51").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox52").hover(function() {//Mouse Enters
            $("#tooltip52").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip52").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip52").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox53").hover(function() {//Mouse Enters
            $("#tooltip53").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip53").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip53").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox54").hover(function() {//Mouse Enters
            $("#tooltip54").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip54").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip54").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox55").hover(function() {//Mouse Enters
            $("#tooltip55").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip55").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip55").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox56").hover(function() {//Mouse Enters
            $("#tooltip56").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip56").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip56").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox57").hover(function() {//Mouse Enters
            $("#tooltip57").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip57").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip57").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox58").hover(function() {//Mouse Enters
            $("#tooltip58").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip58").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip58").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox59").hover(function() {//Mouse Enters
            $("#tooltip59").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip59").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip59").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox60").hover(function() {//Mouse Enters
            $("#tooltip60").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip60").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip60").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox61").hover(function() {//Mouse Enters
            $("#tooltip61").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip61").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip61").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox62").hover(function() {//Mouse Enters
            $("#tooltip62").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip62").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip62").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox63").hover(function() {//Mouse Enters
            $("#tooltip63").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip63").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip63").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox64").hover(function() {//Mouse Enters
            $("#tooltip64").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip64").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip64").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox65").hover(function() {//Mouse Enters
            $("#tooltip65").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip65").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip65").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox100").hover(function() {//Mouse Enters
            $("#tooltip100").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip100").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip100").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox101").hover(function() {//Mouse Enters
            $("#tooltip101").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip101").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip101").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox102").hover(function() {//Mouse Enters
            $("#tooltip102").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip102").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip102").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox103").hover(function() {//Mouse Enters
            $("#tooltip103").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip103").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip103").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox104").hover(function() {//Mouse Enters
            $("#tooltip104").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip104").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip104").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox105").hover(function() {//Mouse Enters
            $("#tooltip105").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip105").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip105").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox106").hover(function() {//Mouse Enters
            $("#tooltip106").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip106").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip106").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox107").hover(function() {//Mouse Enters
            $("#tooltip107").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip107").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip107").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox108").hover(function() {//Mouse Enters
            $("#tooltip108").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip108").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip108").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox109").hover(function() {//Mouse Enters
            $("#tooltip109").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip109").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip109").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox110").hover(function() {//Mouse Enters
            $("#tooltip110").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip110").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip110").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox111").hover(function() {//Mouse Enters
            $("#tooltip111").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip111").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip111").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox112").hover(function() {//Mouse Enters
            $("#tooltip112").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip112").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip112").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox113").hover(function() {//Mouse Enters
            $("#tooltip113").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip113").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip113").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox114").hover(function() {//Mouse Enters
            $("#tooltip114").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip114").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip114").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox115").hover(function() {//Mouse Enters
            $("#tooltip115").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip115").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip115").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox116").hover(function() {//Mouse Enters
            $("#tooltip116").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip116").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip116").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox117").hover(function() {//Mouse Enters
            $("#tooltip117").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip117").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip117").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox118").hover(function() {//Mouse Enters
            $("#tooltip118").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip118").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip118").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox119").hover(function() {//Mouse Enters
            $("#tooltip119").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip119").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip119").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox120").hover(function() {//Mouse Enters
            $("#tooltip120").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip120").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip120").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox121").hover(function() {//Mouse Enters
            $("#tooltip121").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip121").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip121").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox122").hover(function() {//Mouse Enters
            $("#tooltip122").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip122").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip122").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox123").hover(function() {//Mouse Enters
            $("#tooltip123").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip123").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip123").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox124").hover(function() {//Mouse Enters
            $("#tooltip124").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip124").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip124").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox125").hover(function() {//Mouse Enters
            $("#tooltip125").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip125").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip125").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox126").hover(function() {//Mouse Enters
            $("#tooltip126").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip126").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip126").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox127").hover(function() {//Mouse Enters
            $("#tooltip127").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip127").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip127").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox128").hover(function() {//Mouse Enters
            $("#tooltip128").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip128").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip128").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox129").hover(function() {//Mouse Enters
            $("#tooltip129").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip129").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip129").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox130").hover(function() {//Mouse Enters
            $("#tooltip130").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip130").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip130").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox131").hover(function() {//Mouse Enters
            $("#tooltip131").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip131").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip131").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox132").hover(function() {//Mouse Enters
            $("#tooltip132").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip132").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip132").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox133").hover(function() {//Mouse Enters
            $("#tooltip133").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip133").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip133").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox134").hover(function() {//Mouse Enters
            $("#tooltip134").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip134").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip134").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox135").hover(function() {//Mouse Enters
            $("#tooltip135").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip135").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip135").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox136").hover(function() {//Mouse Enters
            $("#tooltip136").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip136").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip136").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox137").hover(function() {//Mouse Enters
            $("#tooltip137").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip137").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip137").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox138").hover(function() {//Mouse Enters
            $("#tooltip138").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip138").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip138").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox139").hover(function() {//Mouse Enters
            $("#tooltip139").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip139").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip139").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox140").hover(function() {//Mouse Enters
            $("#tooltip140").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip140").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip140").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox141").hover(function() {//Mouse Enters
            $("#tooltip141").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip141").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip141").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox142").hover(function() {//Mouse Enters
            $("#tooltip142").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip142").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip142").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox143").hover(function() {//Mouse Enters
            $("#tooltip143").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip143").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip143").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox144").hover(function() {//Mouse Enters
            $("#tooltip144").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip144").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip144").css("left",mx+"px").css("top",my+"px");
    });
});


$(document).ready(function(){

        $("#mybox145").hover(function() {//Mouse Enters
            $("#tooltip145").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip145").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip145").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox146").hover(function() {//Mouse Enters
            $("#tooltip146").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip146").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip146").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox147").hover(function() {//Mouse Enters
            $("#tooltip147").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip147").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip147").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox148").hover(function() {//Mouse Enters
            $("#tooltip148").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip148").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip148").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox149").hover(function() {//Mouse Enters
            $("#tooltip149").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip149").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip149").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox150").hover(function() {//Mouse Enters
            $("#tooltip150").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip150").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip150").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox151").hover(function() {//Mouse Enters
            $("#tooltip151").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip151").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip151").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox152").hover(function() {//Mouse Enters
            $("#tooltip152").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip152").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip152").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox153").hover(function() {//Mouse Enters
            $("#tooltip153").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip153").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip153").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox154").hover(function() {//Mouse Enters
            $("#tooltip154").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip154").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip154").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox155").hover(function() {//Mouse Enters
            $("#tooltip155").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip155").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip155").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox156").hover(function() {//Mouse Enters
            $("#tooltip156").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip156").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip156").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox157").hover(function() {//Mouse Enters
            $("#tooltip157").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip157").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip157").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox158").hover(function() {//Mouse Enters
            $("#tooltip158").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip158").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip158").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox159").hover(function() {//Mouse Enters
            $("#tooltip159").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip159").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip159").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox160").hover(function() {//Mouse Enters
            $("#tooltip160").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip160").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip160").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox161").hover(function() {//Mouse Enters
            $("#tooltip161").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip161").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip161").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox162").hover(function() {//Mouse Enters
            $("#tooltip162").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip162").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip162").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox163").hover(function() {//Mouse Enters
            $("#tooltip163").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip163").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip163").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox164").hover(function() {//Mouse Enters
            $("#tooltip164").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip164").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip164").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox165").hover(function() {//Mouse Enters
            $("#tooltip165").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip165").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip165").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox166").hover(function() {//Mouse Enters
            $("#tooltip166").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip166").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip166").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox167").hover(function() {//Mouse Enters
            $("#tooltip167").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip167").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip167").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox168").hover(function() {//Mouse Enters
            $("#tooltip168").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip168").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip168").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox169").hover(function() {//Mouse Enters
            $("#tooltip169").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip169").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip169").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox170").hover(function() {//Mouse Enters
            $("#tooltip170").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip170").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip170").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox171").hover(function() {//Mouse Enters
            $("#tooltip171").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip171").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip171").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox172").hover(function() {//Mouse Enters
            $("#tooltip172").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip172").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip172").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox173").hover(function() {//Mouse Enters
            $("#tooltip173").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip173").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip173").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox174").hover(function() {//Mouse Enters
            $("#tooltip174").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip174").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip174").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox175").hover(function() {//Mouse Enters
            $("#tooltip175").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip175").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip175").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox176").hover(function() {//Mouse Enters
            $("#tooltip176").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip176").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip176").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox177").hover(function() {//Mouse Enters
            $("#tooltip177").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip177").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip177").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox178").hover(function() {//Mouse Enters
            $("#tooltip178").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip178").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip178").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox179").hover(function() {//Mouse Enters
            $("#tooltip179").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip179").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip179").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox180").hover(function() {//Mouse Enters
            $("#tooltip180").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip180").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip180").css("left",mx+"px").css("top",my+"px");
    });
});

$(document).ready(function(){

        $("#mybox181").hover(function() {//Mouse Enters
            $("#tooltip181").css("display","block");
        }, function(){//Mouse Leaves
            $("#tooltip181").css("display","none");
        });
        $(document).mousemove(function(event){
            var mx = event.pageX-100;
            var my = event.pageY+30;
            $("#tooltip181").css("left",mx+"px").css("top",my+"px");
    });
});

$("#pizzapic, #xpStop, #myBox, #myBox1, #myBox2, #myBox3, #myBox4, #myBox5, #myBox6, #myBox7, #myBox8, #myBox9, #myBox10, #myBox11, #myBox12, #myBox13, #myBox14, #myBox15, #myBox16, #myBox17, #myBox18, #myBox19, #myBox20, #myBox21, #myBox22, #myBox23, #myBox24, #myBox25, #myBox26, #myBox27, #myBox28" ).keypress(function(e){
   if(e.keyCode === 13){
       e.preventDefault();
   }
});

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

