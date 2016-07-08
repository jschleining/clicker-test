angular.module('clickerApp')

.factory('Factories', ['$rootScope', function($rootScope) {

  var Factory = function(data) {
    var factory_ = this;

    factory_.base = {
      id: data.id,
      name: data.name,
      description: data.description,
      cost: data.baseCost,
      production: data.baseProduction,
      shadowIcon: data.shadowIcon,
      fullIcon: data.fullIcon
    };

    factory_.current = {
      cost: angular.copy(data.baseCost),
      production: angular.copy(data.baseProduction),
      totalProduction: 0,
      owned: 0,
      state: angular.copy(data.state)
    };

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
      this.current.owned++;
      this.current.cost = Math.round(this.current.cost * 1.15);
    }
    this.current.totalProduction = this.current.production * this.current.owned;
  }

  Factory.prototype.toggleListener = function() {
    this.unbindHandler ? this.stopWatchingEvent() : this.startWatchingEvent();
  }

  Factory.prototype.handlePingEvent = function(data) {
    this.eventCount++;
    this.updateQuantity(1);
  }

  Factory.prototype.startWatchingEvent = function() {
    console.log(this.base.name + ' Started Listening');
    var _this = this;
    this.unbindHandler = $rootScope.$on( "BUY_FACTORY_" + this.base.id, function(event, data) {_this.handlePingEvent(data);} );
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
