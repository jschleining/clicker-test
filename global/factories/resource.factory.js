angular.module('clickerApp')

.factory('Resources', function() {

  var Resource = function(data) {
    var factory_ = this;
    factory_.id = data.id;
    factory_.name = data.name;
    factory_.description = data.description;
    factory_.baseCost = data.baseCost;
    factory_.currentCost = data.baseCost;
    factory_.owned = 0;
  }

  Resource.prototype.updateQuantity = function(qty) {
    this.owned += qty;
  }

  return {
    getResource: function(data) {
      return new Resource(data);
    }
  }
});
