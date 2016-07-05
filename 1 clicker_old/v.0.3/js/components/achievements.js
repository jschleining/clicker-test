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
			
			if(!this.unlocked)
			{
				this.addEventListeners();
			}
			
		},
		GetID : function (){return this.id;},
		GetName : function (){return this.name;},
		GetDescription : function (){return this.description;},
		GetUnlocked : function(){return this.unlocked},
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