angular.module('Clicker')

.factory('Upgrade', ['$rootScope', function ($rootScope) {

	var Upgrade = function(_params)
	{
		this.unlocked = false; //4 states - hidden / black silhouette / greyed out / fully visible
		this.purchased = false;

		this.unbindHandler = null;

		this.init.call(this, _params);
	};
	Upgrade.prototype = {
		init : function(_params)
		{
			this.id = _params._id;
			this.name = _params._name;
			this.description = _params._description;
			this.cost = _params._cost;

			// unlock information
			this.target = _params._target; // Clicker, Generator, Global
			this.type = _params._type; // Add, Multiply
			this.amount = _params._amount; // Amount Modified by (attached to _type)
			this.generatorID = _params._generatorID; // Generator associated with, if any
			this.requiredUpgradeID = _params._reqUpgradeID; // upgrade prerequisite
			this.reqQty = _params._reqQty; // required quantity of Generator X to unlock
			this.reqWPS = _params._reqWPS; // required WPS to unlock
			
			switch(this.target)
			{
				case 'Clicker':
					this.listenMessage = this.reqWPS;
				break;
				case 'Generator':
					this.listenMessage = this.reqQty;
				break;
				case 'Global':
				break;
			}

			this.addEventListener();
		},
		getID : function(){return this.id;},
		getName : function(){return this.name;},
		getCost : function(){return this.cost;},
		getUnlocked : function(){return this.unlocked;},
		getPurchased : function(){return this.purchased;},
		getTarget : function(){return this.target;},
		getType : function(){return this.type;},
		getAmount : function(){return this.amount;},
		buy : function (_widgetInfo){
			if(_widgetInfo.currentWidgets >= this.cost)
			{
				_widgetInfo.currentWidgets -= this.cost;
				this.purchased = true;

				switch(this.target)
				{
					case 'Clicker':
						$rootScope.$emit('CLICKER_UPGRADE_PURCHASE', {id : this.id, type : this.type, value : this.amount});
					break;
					case 'Generator':
						$rootScope.$emit('GENERATOR_' + this.generatorID + '_UPGRADE_PURCHASE', {id : this.id, type : this.type, value : this.amount});
					break;
					case 'Global':
					break;
				}
			}
		},
		addEventListener : function()
		{
			var _this = this;
			switch(this.target)
			{
				case 'Clicker':
					this.unbindHandler = 	$rootScope.$on('WPS_UPDATE', function(event, data) {
												if(data >= _this.listenMessage)
												{
													_this.unlocked = true;
													_this.removeEventlistener();
												}
											});
				break;
				case 'Generator':
					this.unbindHandler = 	$rootScope.$on('GENERATOR_' + this.generatorID + '_PURCHASE', function(event, data) {
												if(data >= _this.listenMessage)
												{
													_this.unlocked = true;
													_this.removeEventlistener();
												}
											});
				break;
				case 'Global':
				break;
			}
		},
		removeEventlistener : function()
		{
			this.unbindHandler();
			this.listenMessage = null;
		}
	};

	return Upgrade;
}]);


//.service('Upgrades', function($rootScope, Generators){
	// Constructor
	/*function Upgrade(_id, _name, _cost, _target, _type, _amount, _generatorID, _reqUpgradeID, _reqQty, _reqWPS){
		// private properties
		//this.id = _id;
		//this.name = _name;
		//this.description = '';
		//this.cost = _cost;
		//this.unlocked = false; // if unlocked, it isn't hidden - 4 states - hidden / black silhouette / greyed out / fully visible
		//this.purchased = false;
		//this.target = _target; // Clicker, Generator, Global
		//this.type = _type;
		//this.amount = _amount;
		//this.generatorID = _generatorID;
		//this.requiredUpgradeID = _reqUpgradeID || null;
		//this.reqQty = _reqQty;
		//this.reqWPS = _reqWPS;
	}*/
	
	// GETTERS
	//Upgrade.prototype.getID = function (){return this.id;};
	//Upgrade.prototype.getName = function (){return this.name;};
	//Upgrade.prototype.getCost = function (){return this.cost;};
	//Upgrade.prototype.getUnlocked = function (){return this.unlocked;};
	//Upgrade.prototype.getPurchased = function (){return this.purchased;};
	//Upgrade.prototype.getTarget = function (){return this.target;};
	//Upgrade.prototype.getType = function (){return this.type;};
	//Upgrade.prototype.getAmount = function (){return this.amount;};
	
	// PUBLIC FUNCTIONS ASSIGNED tO PROTOTYPE
	/*Upgrade.prototype.buy = function (_widgetInfo, _clickInfo){
		var canPurchase = this.checkEligibility(_widgetInfo);
		if(canPurchase && _widgetInfo.currentWidgets >= this.cost)
		{
			_widgetInfo.currentWidgets -= this.cost;
			this.purchased = true;
			
			switch(this.target)
			{
				case 'Clicker': // might add extra requirements later
					// broadcast update for main controller
					$rootScope.$broadcast('updateMainWPC');
				break;
				case 'Generator':
					for(var i = 0; i < Generators.generators.length; i++)
					{
						if(Generators.generators[i].getID() === this.generatorID)
						{
							Generators.generators[i].addUpgrade(this);
						}
					}
					// broadcast update for main controller
					$rootScope.$broadcast('updateMainWPS');
				break;
				case 'Global': // TODO: ADD GLOBAL UPGRADES (this.gh.AddUpgrade(this.type, this.Amount);)
				break;
			}
		}
	};*/
	/*Upgrade.prototype.checkEligibility = function(_widgetInfo){
		if(!this.purchased)
		{
			switch(this.target)
			{
				case 'Clicker': // might add extra requirements later
					if(_widgetInfo.wps >= this.reqWPS) // if WPS is >= required value
					{
						return true;
					}
				break;
				case 'Generator':
					for(var i = 0; i < Generators.generators.length; i++)
					{
						if(Generators.generators[i].getID() === this.generatorID)
						{
							if(Generators.generators[i].getOwned() >= this.reqQty)
							{
								return true;
							}
						}
					}
				break;
				case 'Global': // TODO: ADD GLOBAL UPGRADES (this.gh.AddUpgrade(this.type, this.Amount);)
				break;
			}
		}
		else
		{
			return false;
		}
	}*/
	
	/*this.checkUnlockedUpgrades = function(_widgetInfo, _clickInfo)
	{
		for(var i = 0; i < this.upgrades.length; i++)
		{
			if(!this.upgrades[i].unlocked)
			{
				switch(this.upgrades[i].target)
				{
					case 'Clicker':
						if(_widgetInfo.wps >= this.upgrades[i].reqWPS)
						{
							this.upgrades[i].unlocked = true;
						}
					break;
					case 'Generator':
						for(var j = 0; j < Generators.generators.length; j++)
						{
							if(Generators.generators[j].getID() === this.upgrades[i].generatorID)
							{
								if(Generators.generators[j].getOwned() >= this.upgrades[i].reqQty)
								{
									this.upgrades[i].unlocked = true;
								}
							}
						}
					break;
					case 'Global':
					break;
				}
			}
		}*/


		/*for(var i = 0; i < this.upgrades.length; i++)
		{
			if(!this.upgrades[i].unlocked)
			{
				for(var j = 0; j < this.upgrades.length; j++)
				{
					if(this.upgrades[j].getID() === this.upgrades[i].getUnlockGenerator())
					{
						if(this.upgrades[j].getOwned() >= this.upgrades[i].getUnlockQuantity())
						{
							this.upgrades[i].unlocked = true;
						}
					}
				}
			}
		}*/

/*
	};*/


	// create upgrades
	
//});

