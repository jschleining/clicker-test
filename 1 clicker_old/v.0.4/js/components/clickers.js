angular.module('ClickerApp')

.factory('Clicker', ['$rootScope', function($rootScope){

	var Clicker = function(_params)
	{
		this.upgradeEventHandler = null;
		this.dataEventHandler = null;

		this.init.call(this, _params);
	};
	Clicker.prototype = {
		init : function(_params)
		{
			this.name = _params._name;
			this.baseValue = _params._baseValue;
			this.currentValue = _params._baseValue;

			this.upgrades = [];
			
			this.addEventListeners();

			// TODO: fire off an event that sets the clicker base value in AppData
			//$rootScope.$emit('CLICKER_INITIALIZED', this.currentValue);
			
		},
		GetName : function(){return this.name;},
		GetValue : function(){return this.currentValue;},
		GetUpgrades : function(){return this.upgrades;},
		addUpgrade : function(_upgradeInfo)
		{
			this.upgrades.push(_upgradeInfo);

			var bwpc = this.baseValue;

			for(var i = 0; i < this.upgrades.length; i++)
			{
				if(this.upgrades[i].type === 'Add')
				{
					bwpc += this.upgrades[i].value;
				}
			}

			for(var i = 0; i < this.upgrades.length; i++)
			{
				if(this.upgrades[i].type === 'Multiply')
				{
					bwpc *= this.upgrades[i].value;
				}
			}

			this.currentValue = Math.round(bwpc);

			// broadcast update for main controller
			$rootScope.$emit('WPC_UPDATE', this.currentValue);
		},
		addEventListeners : function()
		{
			var _this = this;

			this.upgradeEventHandler = 	$rootScope.$on('CLICKER_UPGRADE_PURCHASE', function(event, data) {
											_this.addUpgrade(data);
										});
		}
	};

	return Clicker;
}]);