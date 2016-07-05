angular.module('Clicker', ['ui.router', 'ngMaterial', 'ngStorage'])

.controller('GameController', ['$rootScope', '$scope', '$timeout', '$localStorage', 'Generator', 'Upgrade','Achievement', 'Assets', function ($rootScope, $scope, $timeout, $localStorage, Generator, Upgrade, Achievement, Assets) {
	$scope.model = {};
	$scope.callback = {};

	// test progress bar
	$scope.model.progressBarMode = 'determinate';
	$scope.model.progressBarValue = 75;


	// timer
	$scope.model.start = new Date().getTime();
	$scope.model.timer = 0;
	$scope.model.elapsed = {elapsed: 0.0, display: 0};

	// asset lists
	$scope.model.generators = Assets.generators;
	$scope.model.upgrades = Assets.upgrades;
	$scope.model.achievements = Assets.achievements;

	$scope.model.clickInfo = {
		baseValue: 1,
		currentValue: 1,
		manualClicks: 0,
		upgrades: []
	};
	$scope.model.widgetInfo = {
		currentWidgets: 0,
		totalWidgets: 0,
		wps: 0
	};

	$scope.callback.clickHandler = function () {
		$scope.model.clickInfo.manualClicks++;
		$scope.model.widgetInfo.currentWidgets += $scope.model.clickInfo.currentValue;
		$scope.model.widgetInfo.totalWidgets += $scope.model.clickInfo.currentValue;
	};

	// calculate current wps (whenever generator purchased or upgraded)
	$rootScope.$on('GENERATOR_UPDATE', function(event, data) { 
		$scope.model.widgetInfo.wps = 0;
		for(var i = 0; i < $scope.model.generators.length; i++)
		{
			$scope.model.widgetInfo.wps += ($scope.model.generators[i].GetCombinedWPS());
		}
		$rootScope.$emit('WPS_UPDATE', $scope.model.widgetInfo.wps);
	});

	// add clicker upgrades
	$rootScope.$on('CLICKER_UPGRADE_PURCHASE', function(event, data) { 
		$scope.model.clickInfo.upgrades.push(data);

		// reset current value
		$scope.model.clickInfo.currentValue = $scope.model.clickInfo.baseValue;
		// base wpc
		var bwpc = $scope.model.clickInfo.baseValue;
		 
		for(var i = 0; i < $scope.model.clickInfo.upgrades.length; i++)
		{
			if($scope.model.clickInfo.upgrades[i].type === 'Add')
			{
				bwpc += $scope.model.clickInfo.upgrades[i].value;
			}
		}

		for(var i = 0; i < $scope.model.clickInfo.upgrades.length; i++)
		{
			if($scope.model.clickInfo.upgrades[i].type === 'Multiply')
			{
				bwpc *= $scope.model.clickInfo.upgrades[i].value;
			}
		}
		 
		$scope.model.clickInfo.currentValue = Math.round(bwpc);

		 // fire an event related to WPC upgrading
		 $rootScope.$emit('WPC_UPDATE', $scope.model.clickInfo.currentValue);
	});

	$scope.callback.updateWidgets = function(){
		$scope.model.widgetInfo.currentWidgets += $scope.model.widgetInfo.wps;
		$scope.model.widgetInfo.totalWidgets += $scope.model.widgetInfo.wps;
	};

	// Game Timer
	$scope.callback.timerEvent = function () {
		$scope.model.timer += 100;

		$scope.model.elapsed.elapsed = Math.floor($scope.model.timer / 100) / 10;
		if(Math.round($scope.model.elapsed.elapsed) == $scope.model.elapsed.elapsed) { $scope.model.elapsed.elapsed += '.0'; }

		$scope.model.elapsed.display = Math.floor($scope.model.elapsed.elapsed);

		if($scope.model.timer % 1000 == 0)
		{
			$scope.callback.updateWidgets();
		}

		var diff = (new Date().getTime() - $scope.model.start) - $scope.model.timer;

		$timeout($scope.callback.timerEvent, 100 - diff);
	};
	$timeout(function(){$scope.callback.timerEvent();}, 100);


	$scope.callback.save = function(){
		$localStorage.currentWidgets = $scope.model.widgetInfo.currentWidgets;
		$localStorage.totalWidgets = $scope.model.widgetInfo.totalWidgets;
	};

	$scope.callback.load = function(){
		$scope.model.widgetInfo.currentWidgets = $localStorage.currentWidgets;
		$scope.model.widgetInfo.totalWidgets = $localStorage.totalWidgets;
	};



	// check to see if an event is working correctly
	//$rootScope.$on('WPC_UPDATE', function (event, data) {
    	//alert(data); // 'Broadcast!'
  	//});

}]);