/**
 * Created by Jeremy on 5/9/2015.
 */

angular.module('Clicker', ['ui.router', 'ngMaterial'])

    .config(function ($stateProvider) {
        $stateProvider.state('index', {
            url: '',
            controller: 'GameController as gc',
            templateUrl: './templates/game.tpl.html'
        });
    })
    .service('Generators', function () {
		debugger;
        // Constructor
        function Generator(_id, _name, _cost, _wps) {
            // private properties
            this.id = _id;
            this.name = _name;
            this.baseCost = _cost;
            this.currentCost = _cost;
            this.owned = 0;
            this.baseWPS = _wps;
            this.currentWPS = _wps;
            this.totalWPS = 0;
            this.costMultiplier = 1.13;
        }

        // Public methods, assigned to prototype
        Generator.prototype.getName = function (){return this.name;};
        Generator.prototype.getCost = function (){return this.currentCost;};
        Generator.prototype.getOwned = function (){return this.owned;};
        Generator.prototype.getCurrentWPS = function (){return this.currentWPS;};
        Generator.prototype.getTotalWPS = function (){return this.totalWPS;};
        Generator.prototype.buy = function (_widgetInfo){
            if(_widgetInfo.currentWidgets >= this.currentCost)
            {
                _widgetInfo.currentWidgets -= this.currentCost;
                this.owned++;
                this.update();
            }
        };
        Generator.prototype.update = function(){this.totalWPS = this.baseWPS * this.owned; this.currentCost *= this.costMultiplier;};

        // create generators
        this.generators = [
            new Generator(0, 'Generator 1', 10, 1),
            new Generator(1, 'Generator 2', 100, 5)
        ];
    })

    .filter('time', function() {

        var conversions = {
            'ss': angular.identity,
            'mm': function(value) { return value * 60; },
            'hh': function(value) { return value * 3600; }
        };

        var padding = function(value, length) {
            var zeroes = length - ('' + (value)).length,
                pad = '';
            while(zeroes-- > 0) pad += '0';
            return pad + value;
        };

        return function(value, unit, format, isPadded) {
            var totalSeconds = conversions[unit || 'ss'](value),
                hh = Math.floor(totalSeconds / 3600),
                mm = Math.floor((totalSeconds % 3600) / 60),
                ss = totalSeconds % 60;

            format = format || 'hh:mm:ss';
            isPadded = angular.isDefined(isPadded)? isPadded: true;
            hh = isPadded? padding(hh, 2): hh;
            mm = isPadded? padding(mm, 2): mm;
            ss = isPadded? padding(ss, 2): ss;

            return format.replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
        };
    })

    .controller('GameController', function ($scope, $timeout, Generators) {
        $scope.model = {};
        $scope.callback = {};

        // timer
        $scope.model.start = new Date().getTime();
        $scope.model.timer = 0;
        $scope.model.elapsed = {elapsed: 0.0, display: 0};

        // list of all generators
        $scope.model.generators = Generators.generators;

        $scope.model.clickInfo = {
            baseValue: 1,
            currentValue: 1,
            manualClicks: 0
        };
        $scope.model.widgetInfo = {
            currentWidgets: 0,
            totalWidgets: 0,
            wps: 0
        };

        $scope.callback.clickHandler = function () {
            $scope.model.clickInfo.manualClicks++;
            $scope.model.widgetInfo.currentWidgets += $scope.model.clickInfo.baseValue;
            $scope.model.widgetInfo.totalWidgets += $scope.model.clickInfo.baseValue;
        };

        // calculate current wps
        $scope.callback.updateWPS = function(){
            $scope.model.widgetInfo.wps = 0;
            for(var i = 0; i < $scope.model.generators.length; i++)
            {
                $scope.model.widgetInfo.wps += ($scope.model.generators[i].totalWPS);
            }
            $scope.model.widgetInfo.currentWidgets += $scope.model.widgetInfo.wps;
            $scope.model.widgetInfo.totalWidgets += $scope.model.widgetInfo.wps;
        };

        $scope.callback.timerEvent = function () {
            $scope.model.timer += 100;

            $scope.model.elapsed.elapsed = Math.floor($scope.model.timer / 100) / 10;
            if(Math.round($scope.model.elapsed.elapsed) == $scope.model.elapsed.elapsed) { $scope.model.elapsed.elapsed += '.0'; }

            $scope.model.elapsed.display = Math.floor($scope.model.elapsed.elapsed);

            if($scope.model.timer % 1000 == 0)
            {
                $scope.callback.updateWPS();
            }


            var diff = (new Date().getTime() - $scope.model.start) - $scope.model.timer;

            $timeout($scope.callback.timerEvent, 100 - diff);
        };
        $timeout(function(){$scope.callback.timerEvent();}, 100);
    });
	
	