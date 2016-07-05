angular.module('ClickerApp')

.service('Assets', ['AppData', 'Clicker', 'Generator', function (AppData, Clicker, Generator) {

	this.appData = new AppData();
	this.clicker = new Clicker({_name : 'My Clicker', _baseValue : 1});

	this.generators = [
		new Generator({_id : 0,	_name : 'Cookie Chef',		_description : '',	_cost : 10,				_wps : 1,			_unlockGeneratorID : 0,	_unlockQuantity : 0}),
		new Generator({_id : 1,	_name : 'Muffin Chef',		_description : '',	_cost : 500,			_wps : 5,			_unlockGeneratorID : 0,	_unlockQuantity : 10})//,
		//new Generator({_id : 2,	_name : 'Fig Bar Chef',		_description : '',	_cost : 3000,			_wps : 15,			_unlockGeneratorID : 1,	_unlockQuantity : 10}),
		//new Generator({_id : 3,	_name : 'Cupcake Chef',		_description : '',	_cost : 10000,			_wps : 150,			_unlockGeneratorID : 2,	_unlockQuantity : 10}),
		//new Generator({_id : 4,	_name : 'Cake Chef',		_description : '',	_cost : 40000,			_wps : 500,			_unlockGeneratorID : 3,	_unlockQuantity : 10}),
		//new Generator({_id : 5,	_name : 'Pie Chef',			_description : '',	_cost : 200000,			_wps : 3000,		_unlockGeneratorID : 4,	_unlockQuantity : 10}),
		//new Generator({_id : 6,	_name : 'Fruit Tart Chef',	_description : '',	_cost : 3000000,		_wps : 30000,		_unlockGeneratorID : 5,	_unlockQuantity : 10}),
		//new Generator({_id : 7,	_name : 'Pastry Chef',		_description : '',	_cost : 123456789,		_wps : 200000,		_unlockGeneratorID : 6,	_unlockQuantity : 10}),
		//new Generator({_id : 8,	_name : 'Event Cake Chef',	_description : '',	_cost : 5000000000,		_wps : 3000000,		_unlockGeneratorID : 7,	_unlockQuantity : 10}),
		//new Generator({_id : 9,	_name : 'Chocolatier',		_description : '',	_cost : 75000000000,	_wps : 30000000,	_unlockGeneratorID : 8,	_unlockQuantity : 10})
	];

}]);
