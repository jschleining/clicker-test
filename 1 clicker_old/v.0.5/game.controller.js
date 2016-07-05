angular.module('ClickerApp', ['ui.router', 'ngMaterial', 'ngStorage'])

.controller('GameController', ['$window', '$rootScope', '$scope', '$timeout', '$localStorage', function ($window, $rootScope, $scope, $timeout, $localStorage) {
	$scope.model = {};
	$scope.callback = {};

	$scope.callback.init = function()
	{
		
	}
	

	$scope.callback.init();
}]);



