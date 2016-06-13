angular.module('clickerApp')

.factory('Resources', function() {

  var Resource = function(data) {
    var factory_ = this;
    factory_.id = data.id;
    factory_.name = data.name;
    factory_.description = data.description;
    factory_.cost = data.cost;
    factory_.owned = data.owned;
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
