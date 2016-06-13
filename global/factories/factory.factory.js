angular.module('clickerApp')

.factory('Factories', ['$rootScope', function($rootScope) {

  var Factory = function(data) {
    var factory_ = this;
    factory_.id = data.id;
    factory_.name = data.name;
    factory_.description = data.description;
    factory_.cost = data.cost;
    factory_.owned = data.owned;
    factory_.production = data.production;
    factory_.totalProduction = 0;

    // testing events
    factory_.unbindHandler = null;
    factory_.eventCount = 0;
    factory_.isWatchingEvent = false;
    factory_.startWatchingEvent();
  }

  // quantity should be 1 only until i write the multiple purchase code and can tell the user
  // how much it will cost to purchase multiples
  Factory.prototype.updateQuantity = function(qty) {
    for (var i = 0; i < qty; i++) {
      this.owned++;
      this.cost = Math.round(this.cost * 1.15);
    }
    this.totalProduction = this.production * this.owned;

    console.log('updateQuantity Pings: ', this.eventCount);
  }

  Factory.prototype.toggleListener = function() {
    this.unbindHandler ? this.stopWatchingEvent() : this.startWatchingEvent();
  }

  Factory.prototype.handlePingEvent = function(event) {
    this.eventCount++;
    console.log('Pings: ', this.eventCount);
  }

  Factory.prototype.startWatchingEvent = function() {
    console.log('Started Listening');
    this.unbindHandler = $rootScope.$on( "ping", this.handlePingEvent );
    this.isWatchingEvent = true;
  }

  Factory.prototype.stopWatchingEvent = function() {
    this.unbindHandler();
    this.unbindHandler = null;
    this.isWatchingEvent = false;
  }

  return {
    getFactory: function(data) {
      return new Factory(data);
    }
  }
}]);




