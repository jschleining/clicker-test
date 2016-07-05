angular.module('Overlords')

.factory('Resource', ['$rootScope', function ($rootScope) {

	var Resource = function(_params)
	{
		this.init.call(this, _params);
	};
	Resource.prototype = {
		init : function(_params)
		{
			this.name = _params._name;
			this.description = _params._description;
			this.quantity = 0;
		},
		GetName : function(){return this.name;},
		GetDescription : function(){return this.description;},
		GetQuantity : function(){return this.ranks;},
		UpdateQuantity : function(_qty)
		{
			this.quantity += _qty;
		}
	};

	return Resource;
}]);
