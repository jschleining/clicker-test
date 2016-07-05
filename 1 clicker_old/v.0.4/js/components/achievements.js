angular.module('Clicker')

.factory('Achievement', ['$rootScope', function($rootScope){

	var Achievement = function(_params)
	{
		this.unlocked = false;
		this.unbindHandler = null;

		this.init.call(this, _params);
	};
	Achievement.prototype = {
		init : function(_params)
		{
			this.id = _params._id;
			this.name = _params._name;
			this.description = _params._description;
			this.type = _params._type; // Clicker, Generator, Global
			this.listenMessage = _params._listenMessage;
			this.data = _params._data;
			
			this.addEventListeners();
		},
		GetID : function (){return this.id;},
		GetName : function (){return this.name;},
		GetDescription : function (){return this.description;},
		GetAttained : function(){return this.unlocked},
		addEventListeners : function()
		{
			var _this = this;

			switch(this.type)
			{
				case 'Clicker':
					this.unbindHandler = 	$rootScope.$on(this.listenMessage, function(event, data) {
												if(data >= _this.data)
												{
													_this.unlocked = true;
													_this.removeEventlistener();
												}
											});
				break;
				case 'Generator':
				break;
				case 'Global':
				break;
			}
		},
		removeEventlistener : function()
		{
			this.unbindHandler();
		}
	};

return Achievement;
}]);

/*
.service('Achievements', function ($rootScope, Generators, Upgrades) {
	// Constructor
	function Achievement(_id, _name, _reqType, _reqQty) {
		// private properties
		this.id = _id;
		this.name = _name;
		this.reqType = _reqType;
		this.reqQty = _reqQty;
		this.attained = false;
	}

	// GETTERS
	Achievement.prototype.getID = function (){return this.id;};
	Achievement.prototype.getName = function (){return this.name;};
	Achievement.prototype.getReqType = function (){return this.reqType;};
	Achievement.prototype.getReqQty = function (){return this.reqQty;};
	Achievement.prototype.getAttained = function (){return this.attained;};
	
	// PUBLIC FUNCTIONS ASSIGNED tO PROTOTYPE
	Achievement.prototype.checkIfAttained = function (_widgetInfo, _clickInfo){
		// run every frame. check in main loop to see if it has been attained before running this function
		// types: wps, wpc, generator[id], upgrade[id], timer, generators(qty), upgrades(qty)
		var att = false;
		switch(this.reqType)
		{
			case 'wps':
				if(_widgetInfo.wps >= this.reqQty)
				{
					att = true;
				}
			break;
			case 'wpc':
				if(_clickInfo.currentValue >= this.reqQty)
				{
					att = true;
				}
			break;
		}
		
		if(att)
		{
			this.attained = true;
		}
	};

	// create achievements
	this.achievements = [
		new Achievement(0, 'WPS Achievement 1', 'wps', 10),
		new Achievement(1, 'WPS Achievement 2', 'wps', 100),
		new Achievement(2, 'WPC Achievement 1', 'wpc', 2),
		new Achievement(3, 'WPC Achievement 2', 'wpc', 4)
	];
});
*/