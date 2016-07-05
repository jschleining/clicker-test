angular.module('Clicker')

.service('Assets', ['Generator', 'Upgrade', 'Achievement', function (Generator, Upgrade, Achievement) {

	this.generators = [
		new Generator({_id : 0,	_name : 'Cookie Chef',		_description : '',	_cost : 10,				_wps : 1,			_unlockGeneratorID : 0,	_unlockQuantity : 0}),
		new Generator({_id : 1,	_name : 'Muffin Chef',		_description : '',	_cost : 500,			_wps : 5,			_unlockGeneratorID : 0,	_unlockQuantity : 10}),
		new Generator({_id : 2,	_name : 'Fig Bar Chef',		_description : '',	_cost : 3000,			_wps : 15,			_unlockGeneratorID : 1,	_unlockQuantity : 10}),
		new Generator({_id : 3,	_name : 'Cupcake Chef',		_description : '',	_cost : 10000,			_wps : 150,			_unlockGeneratorID : 2,	_unlockQuantity : 10}),
		new Generator({_id : 4,	_name : 'Cake Chef',		_description : '',	_cost : 40000,			_wps : 500,			_unlockGeneratorID : 3,	_unlockQuantity : 10}),
		new Generator({_id : 5,	_name : 'Pie Chef',			_description : '',	_cost : 200000,			_wps : 3000,		_unlockGeneratorID : 4,	_unlockQuantity : 10}),
		new Generator({_id : 6,	_name : 'Fruit Tart Chef',	_description : '',	_cost : 3000000,		_wps : 30000,		_unlockGeneratorID : 5,	_unlockQuantity : 10}),
		new Generator({_id : 7,	_name : 'Pastry Chef',		_description : '',	_cost : 123456789,		_wps : 200000,		_unlockGeneratorID : 6,	_unlockQuantity : 10}),
		new Generator({_id : 8,	_name : 'Event Cake Chef',	_description : '',	_cost : 5000000000,		_wps : 3000000,		_unlockGeneratorID : 7,	_unlockQuantity : 10}),
		new Generator({_id : 9,	_name : 'Chocolatier',		_description : '',	_cost : 75000000000,	_wps : 30000000,	_unlockGeneratorID : 8,	_unlockQuantity : 10})
	];

	this.upgrades = [
		new Upgrade({_id : 0,	_name : 'Spam Click',						_description : '',	_cost : 50,	_target : 'Clicker',	_type : 'Add',		_amount : 1,			_generatorID : null,	_reqUpgradeID : null,	_reqQty : null,	_reqWPS : 10}),
		new Upgrade({_id : 1,	_name : 'Double Click',						_description : '',	_cost : 100, 	_target : 'Clicker',	_type : 'Multiply',	_amount : 2,			_generatorID : null,	_reqUpgradeID : 0,		_reqQty : null,	_reqWPS : 50}),
		new Upgrade({_id : 2,	_name : 'Quadruple Click',					_description : '',	_cost : 500,	_target : 'Clicker',	_type : 'Multiply',	_amount : 2,			_generatorID : null,	_reqUpgradeID : 1,		_reqQty : null,	_reqWPS : 100}),
		new Upgrade({_id : 3,	_name : 'Mega Click',						_description : '',	_cost : 1000,	_target : 'Clicker',	_type : 'Multiply',	_amount : 2,			_generatorID : null,	_reqUpgradeID : 2,		_reqQty : null,	_reqWPS : 500}),
		new Upgrade({_id : 4,	_name : 'Ultra Click',						_description : '',	_cost : 5000,	_target : 'Clicker',	_type : 'Multiply',	_amount : 2,			_generatorID : null,	_reqUpgradeID : 3,		_reqQty : null,	_reqWPS : 10000}),
		
		new Upgrade({_id : 5,	_name : 'Almond Butter Cookies',			_description : '',	_cost : 100,	_target : 'Generator',	_type : 'Add',		_amount : 1,			_generatorID : 0,		_reqUpgradeID : null,	_reqQty : 5,	_reqWPS : null}),
		new Upgrade({_id : 6,	_name : 'Peanut Butter Cookies',			_description : '',	_cost : 500,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 0,		_reqUpgradeID : 5,		_reqQty : 10,	_reqWPS : null}),
		new Upgrade({_id : 7,	_name : 'Snickerdoodles',					_description : '',	_cost : 1000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 0,		_reqUpgradeID : 6,		_reqQty : 50,	_reqWPS : null}),
		new Upgrade({_id : 8,	_name : 'Thin Mints',						_description : '',	_cost : 5000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 0,		_reqUpgradeID : 7,		_reqQty : 100,	_reqWPS : null}),
		new Upgrade({_id : 9,	_name : 'Samoas',							_description : '',	_cost : 50000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 0,		_reqUpgradeID : 8,		_reqQty : 500,	_reqWPS : null}),

		new Upgrade({_id : 10,	_name : 'Banana Muffins',					_description : '',	_cost : 100,	_target : 'Generator',	_type : 'Add',		_amount : 5,			_generatorID : 1,		_reqUpgradeID : null,	_reqQty : 5,	_reqWPS : null}),
		new Upgrade({_id : 11,	_name : 'Blueberry Muffins',				_description : '',	_cost : 500,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 1,		_reqUpgradeID : 10,		_reqQty : 10,	_reqWPS : null}),
		new Upgrade({_id : 12,	_name : 'Chocolate Chunk Muffins',			_description : '',	_cost : 1000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 1,		_reqUpgradeID : 11,		_reqQty : 50,	_reqWPS : null}),
		new Upgrade({_id : 13,	_name : 'Allspice Crumb Muffins',			_description : '',	_cost : 5000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 1,		_reqUpgradeID : 12,		_reqQty : 100,	_reqWPS : null}),
		new Upgrade({_id : 14,	_name : 'Poppy Seed Muffins',				_description : '',	_cost : 50000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 1,		_reqUpgradeID : 13,		_reqQty : 500,	_reqWPS : null}),

		new Upgrade({_id : 15,	_name : 'Fig Roll',							_description : '',	_cost : 100,	_target : 'Generator',	_type : 'Add',		_amount : 15,			_generatorID : 2,		_reqUpgradeID : null,	_reqQty : 5,	_reqWPS : null}),
		new Upgrade({_id : 16,	_name : 'Fig & Honey Roll',					_description : '',	_cost : 500,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 2,		_reqUpgradeID : 15, 	_reqQty : 10,	_reqWPS : null}),
		new Upgrade({_id : 17,	_name : 'Blueberry & Figs',					_description : '',	_cost : 1000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 2,		_reqUpgradeID : 16,		_reqQty : 50,	_reqWPS : null}),
		new Upgrade({_id : 18,	_name : 'Banana, Dark Chocolate & Figs',	_description : '',	_cost : 5000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 2,		_reqUpgradeID : 17,		_reqQty : 100,	_reqWPS : null}),
		new Upgrade({_id : 19,	_name : 'Coconut & Figs',					_description : '',	_cost : 50000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 2,		_reqUpgradeID : 18,		_reqQty : 500,	_reqWPS : null}),

		new Upgrade({_id : 20,	_name : 'Vanilla Cupcakes',					_description : '',	_cost : 100,	_target : 'Generator',	_type : 'Add',		_amount : 150,			_generatorID : 3,		_reqUpgradeID : null,	_reqQty : 5,	_reqWPS : null}),
		new Upgrade({_id : 21,	_name : 'Chocolate Cupcakes',				_description : '',	_cost : 500,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 3,		_reqUpgradeID : 20,		_reqQty : 10,	_reqWPS : null}),
		new Upgrade({_id : 22,	_name : 'Carrot Cupcakes',					_description : '',	_cost : 1000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 3,		_reqUpgradeID : 21,		_reqQty : 50,	_reqWPS : null}),
		new Upgrade({_id : 23,	_name : 'Red Velvet Cupcakes',				_description : '',	_cost : 5000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 3,		_reqUpgradeID : 22,		_reqQty : 100,	_reqWPS : null}),
		new Upgrade({_id : 24,	_name : 'Banana Nutella Cupcakes',			_description : '',	_cost : 50000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 3,		_reqUpgradeID : 23,		_reqQty : 500,	_reqWPS : null}),

		new Upgrade({_id : 25,	_name : 'Yellow Cake',						_description : '',	_cost : 100,	_target : 'Generator',	_type : 'Add',		_amount : 500,			_generatorID : 4,		_reqUpgradeID : null,	_reqQty : 5,	_reqWPS : null}),
		new Upgrade({_id : 26,	_name : 'Chocolate',						_description : '',	_cost : 500, 	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 4,		_reqUpgradeID : 25,		_reqQty : 10,	_reqWPS : null}),
		new Upgrade({_id : 27,	_name : 'Carrot Cake',						_description : '',	_cost : 1000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 4,		_reqUpgradeID : 26,		_reqQty : 50,	_reqWPS : null}),
		new Upgrade({_id : 28,	_name : 'Devil Food Cake',					_description : '',	_cost : 5000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 4,		_reqUpgradeID : 27,		_reqQty : 100,	_reqWPS : null}),
		new Upgrade({_id : 29,	_name : 'Angel Food Cake',					_description : '',	_cost : 50000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 4,		_reqUpgradeID : 28,		_reqQty : 500,	_reqWPS : null}),

		new Upgrade({_id : 30,	_name : 'Strawberry Rhubarb Pie',			_description : '',	_cost : 100,	_target : 'Generator',	_type : 'Add',		_amount : 3000,			_generatorID : 5,		_reqUpgradeID : null,	_reqQty : 5,	_reqWPS : null}),
		new Upgrade({_id : 31,	_name : 'Chocolate Pecan Pie',				_description : '',	_cost : 500,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 5,		_reqUpgradeID : 30,		_reqQty : 10,	_reqWPS : null}),
		new Upgrade({_id : 32,	_name : 'Apple Pie',						_description : '',	_cost : 1000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 5,		_reqUpgradeID : 31,		_reqQty : 50,	_reqWPS : null}),
		new Upgrade({_id : 33,	_name : 'Cherry Cobbler Pie',				_description : '',	_cost : 5000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 5,		_reqUpgradeID : 32,		_reqQty : 100,	_reqWPS : null}),
		new Upgrade({_id : 34,	_name : 'Banana Cream Pie',					_description : '',	_cost : 50000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 5,		_reqUpgradeID : 33,		_reqQty : 500,	_reqWPS : null}),

		new Upgrade({_id : 35,	_name : 'Cream Cheese Tarts',				_description : '',	_cost : 100,	_target : 'Generator',	_type : 'Add',		_amount : 30000,		_generatorID : 6,		_reqUpgradeID : null,	_reqQty : 5,	_reqWPS : null}),
		new Upgrade({_id : 36,	_name : 'Lemon Tarts',						_description : '',	_cost : 500,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 6,		_reqUpgradeID : 35,		_reqQty : 10,	_reqWPS : null}),
		new Upgrade({_id : 37,	_name : 'Peach Tarts',						_description : '',	_cost : 1000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 6, 		_reqUpgradeID : 36,		_reqQty : 50,	_reqWPS : null}),
		new Upgrade({_id : 38,	_name : 'Raspberry Tarts',					_description : '',	_cost : 5000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 6,		_reqUpgradeID : 37,		_reqQty : 100,	_reqWPS : null}),
		new Upgrade({_id : 39,	_name : 'Strawberry Tarts',					_description : '',	_cost : 50000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 6,		_reqUpgradeID : 38,		_reqQty : 500,	_reqWPS : null}),

		new Upgrade({_id : 40,	_name : 'Cinnamon Rolls',					_description : '',	_cost : 100,	_target : 'Generator',	_type : 'Add',		_amount : 200000,		_generatorID : 7,		_reqUpgradeID : null,	_reqQty : 5,	_reqWPS : null}),
		new Upgrade({_id : 41,	_name : 'Cannolis',							_description : '',	_cost : 500,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 7,		_reqUpgradeID : 40,		_reqQty : 10,	_reqWPS : null}),
		new Upgrade({_id : 42,	_name : 'Sugar Puffs',						_description : '',	_cost : 1000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 7,		_reqUpgradeID : 41,		_reqQty : 50,	_reqWPS : null}),
		new Upgrade({_id : 43,	_name : 'Baklavas',							_description : '',	_cost : 5000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 7,		_reqUpgradeID : 42,		_reqQty : 100,	_reqWPS : null}),
		new Upgrade({_id : 44,	_name : 'Bear Claws',						_description : '',	_cost : 50000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 7,		_reqUpgradeID : 43,		_reqQty : 500,	_reqWPS : null}),

		new Upgrade({_id : 45, 	_name : 'Birthday Cakes',					_description : '',	_cost : 100,	_target : 'Generator',	_type : 'Add',		_amount : 3000000,		_generatorID : 8,		_reqUpgradeID : null,	_reqQty : 5,	_reqWPS : null}),
		new Upgrade({_id : 46,	_name : 'New Year\'s Cakes',				_description : '',	_cost : 500,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 8,		_reqUpgradeID : 45,		_reqQty : 10,	_reqWPS : null}),
		new Upgrade({_id : 47,	_name : 'Graduation Cakes',					_description : '',	_cost : 1000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 8,		_reqUpgradeID : 46,		_reqQty : 50,	_reqWPS : null}),
		new Upgrade({_id : 48,	_name : 'Wedding Cakes',					_description : '',	_cost : 5000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 8,		_reqUpgradeID : 47,		_reqQty : 100,	_reqWPS : null}),
		new Upgrade({_id : 49,	_name : 'Celebration Cakes',				_description : '',	_cost : 50000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 8,		_reqUpgradeID : 48,		_reqQty : 500,	_reqWPS : null}),

		new Upgrade({_id : 50,	_name : 'Chocolate Bars',					_description : '',	_cost : 100,	_target : 'Generator',	_type : 'Add',		_amount : 30000000,		_generatorID : 9,		_reqUpgradeID : null,	_reqQty : 5,	_reqWPS : null}),
		new Upgrade({_id : 51,	_name : 'Rum Balls',						_description : '',	_cost : 500,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 9,		_reqUpgradeID : 50,		_reqQty : 10,	_reqWPS : null}),
		new Upgrade({_id : 52,	_name : 'Caramel Filled Chocolates',		_description : '',	_cost : 1000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 9,		_reqUpgradeID : 51,		_reqQty : 50,	_reqWPS : null}),
		new Upgrade({_id : 53,	_name : 'Chocolate Covered Strawberries',	_description : '',	_cost : 5000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 9,		_reqUpgradeID : 52,		_reqQty : 100,	_reqWPS : null}),
		new Upgrade({_id : 54,	_name : 'Cream Filled Chocolates',			_description : '',	_cost : 50000,	_target : 'Generator',	_type : 'Multiply',	_amount : 2,			_generatorID : 9,		_reqUpgradeID : 53,		_reqQty : 500,	_reqWPS : null})
	];

	this.achievements = [
		new Achievement({_id : 0,	_name : 'Hefty Clicker',	_description : '',	_type : 'Clicker',	_listenMessage : 'WPC_UPDATE',	_data : 10}),
		new Achievement({_id : 1,	_name : 'Awesome Clicker',	_description : '',	_type : 'Clicker',	_listenMessage : 'WPC_UPDATE',	_data : 100}),
		new Achievement({_id : 2,	_name : 'Two At Once!',		_description : '',	_type : 'Clicker',	_listenMessage : 'WPC_UPDATE',	_data : 10})
	];


}]);
