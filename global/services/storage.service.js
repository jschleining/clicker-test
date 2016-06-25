angular.module('clickerApp')

.service('Storage', function() {
	var service_ = this;

  service_.saveData = {
    currentWidgets: 0,
    totalWidgetsEarned: 0,
    widgetsPerSecond: 0,
    widgetsPerClick: 1
  };


});
