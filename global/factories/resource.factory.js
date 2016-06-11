angular.module('clickerApp')

.factory('Resource', function() {

  return function(data) {
    var factory_ = this;
    factory_.name = data.name;
    factory_.description = data.description;
    factory_.cost = data.cost;
    factory_.owned = data.owned;

    factory_.updateQuantity = updateQuantity_;

    function updateQuantity_(qty) {
      factory_.owned += qty;
    }
  };

});