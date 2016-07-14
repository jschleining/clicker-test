var gameApp = angular.module('gameApp', ['ui.router', 'ngMaterial']);

gameApp.controller('GameController', ['$rootScope', '$scope', '$interval', 'GameData', 'Storage', 'Resources', 'Factories', 
		function GameController($rootScope, $scope, $interval, GameData, Storage, Resources, Factories) {
	var vm_ = this;
	vm_.storage = Storage;
	vm_.saveData = Storage.saveData;
	vm_.resources = [];
	vm_.factories = [];

	vm_.timer;
	vm_.ticks = 0;
	vm_.intervalPeriod = 1000;
	vm_.paused = true;

	vm_.onClickTargetClick = onClickTargetClick_;
	vm_.buyResource = buyResource_;
	vm_.buyFactory = buyFactory_;
	vm_.start = start_;
	vm_.stop = stop_;

	function updateGame_() {
		vm_.ticks++;
		var wps = 0;

		for (var i = 0; i < vm_.factories.length; i++) {
			wps += vm_.factories[i].current.totalProduction;
		}

		if (vm_.saveData.widgetsPerSecond != wps) {
			vm_.saveData.widgetsPerSecond = wps;
		}

		vm_.saveData.currentWidgets += vm_.saveData.widgetsPerSecond;
	}

	function init_() {
		for (var resource in GameData.RESOURCES) {
			vm_.resources.push(
				new Resources.getResource(GameData.RESOURCES[resource])
			);
		}

		for (var factory in GameData.FACTORIES) {
			vm_.factories.push(
				new Factories.getFactory(GameData.FACTORIES[factory])
			);
		}

		vm_.start();
	}

	function start_() {
		vm_.paused = false;
		vm_.timer = $interval(function() {
			updateGame_();
		}, vm_.intervalPeriod);
	}

	function stop_() {
		vm_.paused = true;
 		$interval.cancel(vm_.timer);
	}

	function onClickTargetClick_() {
		vm_.saveData.currentWidgets += vm_.saveData.widgetsPerClick;
		console.log(vm_.factories);
	}

	function buyResource_(index) {
		if (vm_.saveData.currentWidgets >= vm_.resources[index].cost) {
			vm_.saveData.currentWidgets -= vm_.resources[index].cost;
			vm_.resources[index].updateQuantity(1);
		}
	}

	function buyFactory_(index) {
		if (vm_.saveData.currentWidgets >= vm_.factories[index].current.cost) {
			vm_.saveData.currentWidgets -= vm_.factories[index].current.cost;
			$rootScope.$broadcast( "BUY_FACTORY_" + vm_.factories[index].base.id );
		}
	}

	init_();
}]);