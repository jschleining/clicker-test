var gameApp = angular.module('gameApp', ['ui.router', 'ngMaterial']);

gameApp.controller('GameController', ['$rootScope', '$interval', 'GameData', 'Resources', 'Factories', 
		function GameController($rootScope, $interval, GameData, Resources, Factories) {
	var vm_ = this;
	vm_.clickValue = 1;
	vm_.widgets = 0;
	vm_.wps = 0;
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
			wps += vm_.factories[i].totalProduction;
		}

		if (vm_.wps != wps) {
			vm_.wps = wps;
		}

		vm_.widgets += vm_.wps;

		$rootScope.$broadcast( "ping" );
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
		vm_.widgets += vm_.clickValue;
	}

	function buyResource_(index) {
		if (vm_.widgets >= vm_.resources[index].cost) {
			vm_.widgets -= vm_.resources[index].cost;
			vm_.resources[index].updateQuantity(1);
		}
	}

	function buyFactory_(index) {
		if (vm_.widgets >= vm_.factories[index].cost) {
			vm_.widgets -= vm_.factories[index].cost;
			vm_.factories[index].updateQuantity(1);
		}
	}

	init_();
}]);