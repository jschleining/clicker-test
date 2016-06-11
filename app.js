var app = angular.module('clickerApp', ['ui.router', 'ngMaterial', 'gameApp']);

app.config(function config($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/game');

	$stateProvider.state('game', {
    url: '/game',
    templateUrl: "/game/game.view.html",
    controller: 'GameController',
    controllerAs: 'vm'    
	});
})

app.controller('MainController', ['$rootScope', '$state', function MainController($rootScope, $state) {
	var vm_ = this;

}]);