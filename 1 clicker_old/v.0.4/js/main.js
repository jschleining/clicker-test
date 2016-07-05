angular.module('ClickerApp', ['ui.router', 'ngMaterial', 'ngStorage'])

.controller('GameController', ['$window', '$rootScope', '$scope', '$timeout', '$localStorage', 'Assets', function ($window, $rootScope, $scope, $timeout, $localStorage, Assets) {
	$scope.model = {};
	$scope.callback = {};

	$scope.model.appData = Assets.appData;
	$scope.model.clicker = Assets.clicker;
	$scope.model.generators = Assets.generators;

	$scope.model.timerStartTime = Date.now();
	$scope.model.timerCounter = 0;
	$scope.model.timerTickLength = $scope.model.appData.GetTickMilliseconds();

	$scope.model.generatorUpdateEventHandler = $rootScope.$on('GENERATOR_UPDATE', function(event, _data) {
		var wps = 0;

		for(var i = 0; i < $scope.model.generators.length; i++)
		{
			wps += $scope.model.generators[i].GetCombinedWPS();
		}

		$rootScope.$emit('WPS_UPDATE', wps);
	});

	$scope.callback.init = function()
	{
		if($localStorage.appData != null)
		{
			$scope.callback.load();
		}
		else
		{
			$rootScope.$emit('NEW_GAME');
		}

		$timeout( function(){ $scope.callback.timerEvent(); }, $scope.model.appData.GetTickMilliseconds() );
	}

	$scope.callback.clickHandler = function () {
		$rootScope.$emit('CLICKER_CLICKED');
	};


	// SAVE / LOAD
	$scope.callback.save = function(){
		$localStorage.appData = $scope.model.appData.GetSaveData();
		$rootScope.$emit('GAME_SAVED');
	};
	$scope.callback.load = function(){
		$scope.model.appData.LoadSaveData($localStorage.appData);
	};

	// HARD RESET
	$scope.callback.hardReset = function(){
		$localStorage.$reset();
		$rootScope.$emit('HARD_RESET');
	};

	// SOFT RESET - PRESTIGE
	$scope.callback.softReset = function(){ //TEMPORARY FORMULA
		if($scope.model.appData.GetCurrentWidgets() >= ( 1 + $scope.model.appData.GetPrestigePoints() ) * 10 )
		{
			$rootScope.$emit('SOFT_RESET');
		}
	};

	// Game Timer
	$scope.callback.timerEvent = function () {
		$rootScope.$emit('TICKER_TICK');
		$scope.model.timerCounter += $scope.model.timerTickLength;
		var diff = (new Date().getTime() - $scope.model.timerStartTime) - $scope.model.timerCounter;
		$timeout($scope.callback.timerEvent, $scope.model.timerTickLength - diff);
	};

	//$window.onfocus = function(){alert('focused!');}; // TODO: does not work correctly in firefox... revisit later.
	

	$scope.callback.init();
}]);



