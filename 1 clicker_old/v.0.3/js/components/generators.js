angular.module('Clicker')

.factory('Generator', ['$rootScope', function ($rootScope) {

	var Generator = function(_params)
	{
		this.unlocked = false;
		//this.isListening = false;
		this.unbindHandler = null;
		this.persistentEvent = null;

		this.costMultiplier = 1.13;
		this.costMultiplierAdd = .01;
		this.maxAllowed = 99999;

		this.owned = 0;
		this.combinedWPS = 0;
		this.totalGenerated = 0;
		this.buyQuantity = 1; // TODO: Implement Functionality

		this.init.call(this, _params);
	};
	Generator.prototype = {
		init : function(_params)
		{
			this.id = _params._id;
			this.name = _params._name;
			this.description = _params._description;
			this.baseCost = _params._cost;
			this.baseWPS = _params._wps;

			// Presently Generators are unlocked only by obtaining a 
			// minimum number of the previous tier of Generator
			this.unlockGeneratorID = _params._unlockGeneratorID;
			this.unlockQuantity = _params._unlockQuantity;
			this.listenMessage = _params._unlockQuantity;
			
			this.currentCost = _params._cost;
			this.modifiedWPS = _params._wps;

			this.upgrades = [];

			if(_params._id === _params._unlockGeneratorID)
			{
				this.unlocked = true;
			}

			this.addEventListeners();
		},
		GetID : function(){return this.id;},
		GetName : function(){return this.name;},
		GetDescription : function(){return this.description;},
		GetIsUnlocked : function(){return this.unlocked;},
		GetOwned : function(){return this.owned;},
		GetCost : function(){return this.currentCost;},
		GetModifiedWPS : function(){return this.modifiedWPS;},
		GetCombinedWPS : function(){return this.combinedWPS;},
		GetTotalGenerated : function(){return this.totalGenerated;},
		buy : function(_widgetInfo)
		{
			// TODO: Implement Multiple Purchase Functionality
			if(this.owned + this.buyQuantity < this.maxAllowed)
			{
				if(_widgetInfo.currentWidgets >= this.currentCost)
				{
					_widgetInfo.currentWidgets -= this.currentCost;
					this.owned++;
					this.updateCost();
					this.updateWPS();
					
					// broadcast update for main controller
					$rootScope.$emit('GENERATOR_' + this.id + '_PURCHASE', this.owned);
					$rootScope.$emit('GENERATOR_UPDATE');
				}
				else
				{
					// return insufficient widgets error
				}
			}
			else
			{
				// return quantity error
			}
			
		},
		updateCost : function()
		{
			this.currentCost *= this.costMultiplier;
			this.costMultiplier += this.costMultiplierAdd;
		},
		updateWPS : function()
		{
			this.combinedWPS = this.modifiedWPS * this.owned;
		},
		addUpgrade : function(_upgradeInfo)
		{

			this.upgrades.push(_upgradeInfo);
			this.updateGeneratorWPS();

			// broadcast update for main controller
			$rootScope.$emit('GENERATOR_UPDATE');
		},
		updateGeneratorWPS : function()
		{
			this.modifiedWPS = this.baseWPS;
			var bwps = this.baseWPS;
			
			for(var i = 0; i < this.upgrades.length; i++)
			{
				if(this.upgrades[i].type === 'Add')
				{
					bwps += this.upgrades[i].value;
				}
			}
			
			for(var i = 0; i < this.upgrades.length; i++)
			{
				if(this.upgrades[i].type === 'Multiply')
				{
					bwps *= this.upgrades[i].value;
				}
			}

			this.modifiedWPS = Math.round(bwps);
			this.updateWPS();
		},
		addEventListeners : function()
		{
			var _this = this;
			if(!this.unlocked)
			{
				this.unbindHandler = 	$rootScope.$on('GENERATOR_' + this.unlockGeneratorID + '_PURCHASE', function(event, data) {
											if(data >= _this.listenMessage)
											{
												_this.unlocked = true;
												_this.removeEventlistener();
											}
										});
			}
			

			this.persistentEvent = 	$rootScope.$on('GENERATOR_' + this.id + '_UPGRADE_PURCHASE', function(event, data) {
										_this.addUpgrade(data);
									});

			
			//this.isListening = true;
		},
		removeEventlistener : function()
		{
			this.unbindHandler();
			this.listenMessage = null;
			//this.isListening = false;
		}
	};

	return Generator;
}]);


/*

.factory('MyObject', ['$rootScope', function($rootScope){


	var MyObject = function(_params) {
		this.active = false;
		this.listenMessage;
		this.isListening = false;
		this.unbindHandler;
		this.test = false;

		this.init.call(this, _params);
	};
	MyObject.prototype = {
		init : function(_params)
		{
			this.counter = 0;
			this.id = _params.id;
			this.listenMessage = 'OBJECT_' + _params.requireID + '_COUNTER_' + _params.requireCounter;

			if(_params.id === _params.requireID)
			{
				this.active = true;
			}
			else
			{
				this.addEventListener();
			}
		},
		GetID : function(){return this.id;},
		GetCounter : function(){return this.counter;},
		clicked : function()
		{
			this.counter++;
			$rootScope.$emit('clicked', 'OBJECT_' + this.id + '_COUNTER_' + this.counter);
		},
		activate : function()
		{
			this.active = true;
			this.removeEventListener();
		},
		addEventListener : function()
		{
			var lm = this.listenMessage;
			var _this = this;
			this.unbindHandler = 	$rootScope.$on('clicked', function(event, data) {
										//alert(_this.listenMessage);
										if(data == _this.listenMessage)
										{

											//alert('how the hell do i get back to my factory\'s scope??!!');
											_this.activate();
										}
									});
			
			this.isListening = true;
		},
		removeEventlistener : function()
		{
			this.unbindHandler();
			this.isListening = false;
		}
	};


	return MyObject;

}]);

*/