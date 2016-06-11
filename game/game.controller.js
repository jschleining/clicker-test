var gameApp = angular.module('gameApp', ['ui.router', 'ngMaterial']);

gameApp.controller('GameController', ['Resource', 'GameData', function GameController(Resource, GameData) {
	var vm_ = this;	
	vm_.points = 0;
	vm_.resources = [];

	vm_.onClick = onClick_;

	function init_() {

		vm_.resources = GameData.RESOURCES;
    console.log('Game Loaded');
	}

	function onClick_() {
		vm_.points++;
		console.log('Clicked');
	}

	init_();
}]);