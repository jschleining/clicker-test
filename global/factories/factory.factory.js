angular.module('clickerApp')

.factory('Factories', ['$rootScope', function($rootScope) {

  var Factory = function(data) {
    var factory_ = this;
    factory_.id = data.id;
    factory_.name = data.name;
    factory_.description = data.description;
    factory_.baseCost = data.baseCost;
    factory_.currentCost = data.baseCost;
    factory_.owned = 0;
    factory_.baseProduction = data.baseProduction;
    factory_.currentProduction = data.baseProduction;
    factory_.totalProduction = 0;

    // testing events
    factory_.unbindHandler = null;
    factory_.eventCount = 0;
    factory_.isWatchingEvent = false;
    factory_.startWatchingEvent();
  }

  // quantity should be 1 only until i write the multiple purchase code and can tell the user
  // how much it will currentCost to purchase multiples
  Factory.prototype.updateQuantity = function(qty) {
    for (var i = 0; i < qty; i++) {
      this.owned++;
      this.currentCost = Math.round(this.currentCost * 1.15);
    }
    this.totalProduction = this.currentProduction * this.owned;
  }

  Factory.prototype.toggleListener = function() {
    this.unbindHandler ? this.stopWatchingEvent() : this.startWatchingEvent();
  }

  Factory.prototype.handlePingEvent = function(data) {
    this.eventCount++;
    this.updateQuantity(1);
    console.log('Purchased ' + this.name + ': ', this.eventCount);
  }

  Factory.prototype.startWatchingEvent = function() {
    console.log('Started Listening');
    var _this = this;
    this.unbindHandler = $rootScope.$on( "BUY_FACTORY_" + this.id, function(event, data) {_this.handlePingEvent(data);} );
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
