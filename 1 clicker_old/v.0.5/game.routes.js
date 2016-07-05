angular.module('ClickerApp')

.config(function ($stateProvider) {
	$stateProvider.state('index', {
		url: '',
		controller: 'GameController as gc',
		templateUrl: './templates/game.tpl.html'
	});
});