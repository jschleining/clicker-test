angular.module('clickerApp')

.factory('Factories', ['$rootScope', function($rootScope) {

  var Factory = function(data) {
    var factory_ = this;
    var listeners = {};

    factory_.base = {
      id: data.id,
      name: data.name,
      description: data.description,
      cost: data.baseCost,
      production: data.baseProduction,
      shadowIcon: data.shadowIcon,
      fullIcon: data.fullIcon,
      requirements: data.requirements
    };

    factory_.current = {
      cost: angular.copy(data.baseCost),
      production: angular.copy(data.baseProduction),
      totalProduction: 0,
      owned: 0,
      state: angular.copy(data.state),
      purchased: false,
      isPurchaseable: false
    };

    // testing events
    // factory_.unbindHandler = null;
    factory_.eventCount = 0;
    // factory_.isWatchingEvent = false;
    // factory_.startWatchingEvent();

    factory_.init();
  }

  Factory.prototype.init = function() {
    this.addListeners();
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

  // Factory.prototype.toggleListener = function() {
  //   this.unbindHandler ? this.stopWatchingEvent() : this.startWatchingEvent();
  // }

  Factory.prototype.handlePingEvent = function(data) {
    this.eventCount++;
    // this.updateQuantity(1);
  }

  // Factory.prototype.startWatchingEvent = function() {
  //   console.log(this.base.name + ' Started Listening');
  //   var _this = this;
  //   this.unbindHandler = $rootScope.$on( "BUY_FACTORY_" + this.base.id, function(event, data) {_this.handlePingEvent(data);} );
  //   this.isWatchingEvent = true;
  // }

  Factory.prototype.stopWatchingEvent = function(evt) {
    //Pass in unlock.type and unlock.target to be able to kill handler. e.g.
    //data = {type: 'BUY_FACTORY_', target: 'fid-0001'}
    //listeners[data.type + data.target]();


    // this.unbindHandler();
    // this.unbindHandler = null;
    // this.isWatchingEvent = false;
    evt();
    evt = null;
  }

  Factory.prototype.addListeners = function() {
    var _this = this;
    this.requirementsHandler = [];

    this.purchaseHandler = $rootScope.$on( "BUY_FACTORY_" + this.base.id, function(event, data) {
      _this.handlePingEvent(data);
      _this.updateQuantity(1); // make dynamic qty later
    });

    for (var req = 0; req < this.base.requirements.unlock.length; req++) {
      this.requirementsHandler.push(

      );
    }

    // //assume access to game data through variable gameData;
    // for (var facotry in gameData.FACTORIES) {
    //   var requirements = gameData.FACTORIES[factory].requirements
    //   if (requirements) {
    //     for (var requirement in requirements) {
    //       if (requirements[requirement].unlock && requirements[requirement].unlock.length > 0) {
    //         for (unlock in requirements[requirement].unlock) {
    //           listeners[requirements[requirement].unlock[unlock]] = 
    //               $rootScope.$on( requirements[requirement].unlock.type + requirements[requirement].target, function(event, data) {
    //             //whatever you are trying to do. Handle events generically by calling function according to data passed into $broadcast.
    //             _this.handlePingEvent(data);
    //             _this.updateQuantity(1); // make dynamic qty later
    //           });
    //         }
    //       }
    //     }
    //   }
    // }

  }

  return {
    getFactory: function(data) {
      return new Factory(data);
    }
  }
}]);
