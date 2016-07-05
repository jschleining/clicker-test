angular.module('ClickerApp')

.factory('AppData', ['$rootScope', function($rootScope){

	var AppData = function(_params)
	{
		this.newGameHandler = null;

		this.clickEventHandler = null;
		this.tickEventHandler = null;

		this.hardResetEventHandler = null;
		this.softResetEventHandler = null;

		this.saveEventHandler = null;

		this.blurEventHandler = null;
		this.exitEventHandler = null;
		this.focusEventHandler = null;

		this.clickerInitHandler = null;

		this.widgetsSpentEventHandler = null;

		this.wpsUpdateEventHandler = null;

		this.init.call(this, _params);
	};
	AppData.prototype = {
		init : function(_params)
		{
			this.gameTitle = 'Clicker Game';
			this.gameVersion = 0.4;
			this.clickBaseValue = 1; 	// boo. dont want to hard code this. want to have it set by 
										// an event fired from clicker. 
			this.ticksPerSecond = 4;
			this.ticks = 0;

			this.hardReset();
			
			this.addEventListeners();
		},

		GetTitle : function(){return this.gameData.title;},
		GetVersion : function(){return this.gameData.version;},

		GetTicksPerSecond : function(){return this.gameData.ticksPerSecond;},
		GetTickMilliseconds : function(){return this.gameData.tickMilliseconds;},

		GetTimePlayedThisGame : function(){return this.gameData.timePlayedThisGame;},
		GetTimePlayedAllTime : function(){return this.gameData.timePlayedAllTime;},
		GetActiveTimeThisGame : function(){return this.gameData.activeTimeThisGame;},
		GetActiveTimeAllTime : function(){return this.gameData.activeTimeAllTime;},
		GetBlurTimeThisGame : function(){return this.gameData.blurTimeThisGame;},
		GetBlurTimeAllTime : function(){return this.gameData.blurTimeAllTime;},
		GetOfflineTimeThisGame : function(){return this.gameData.offlineTimeThisGame;},
		GetOfflineTimeThisGame : function(){return this.gameData.offlineTimeAllTime;},
		GetLastTimeBlurred : function(){return this.gameData.gameBlurred;},
		GetLastTimeClosed : function(){return this.gameData.gameClosed;},

		GetCurrentWidgets : function(){return this.gameData.currentWidgets;},
		GetWidgetsThisGame : function(){return this.gameData.widgetsThisGame;},
		GetWidgetsAllTime : function(){return this.gameData.widgetsAllTime;},

		GetWidgetsSpentThisGame : function(){return this.gameData.widgetsSpentThisGame;},
		GetWidgetsSpentAllTime : function(){return this.gameData.widgetsSpentAllTime;},

		GetClicksThisGame : function(){return this.gameData.clicksThisGame;},
		GetClicksAllTime : function(){return this.gameData.clicksAllTime;},
		GetClickedWidgetsThisGame : function(){return this.gameData.clickedWidgetsThisGame;},
		GetClickedWidgetsAllTime : function(){return this.gameData.clickedWidgetsAllTime;},
		GetWidgetsPerClick : function(){return this.gameData.widgetsPerClick;},

		GetTotalGeneratorsThisGame : function(){return this.gameData.totalGeneratorsThisGame;},
		GetTotalGeneratorsAllTime : function(){return this.gameData.totalGeneratorsAllTime;},
		GetGenerators : function(){return this.gameData.generatorsOwned;},
		GetWidgetsPerSecond : function(){return this.gameData.widgetsPerSecond;},

		GetOriginalGameStart : function(){return this.gameData.originalGameStart;},
		GetThisGameStart : function(){return this.gameData.thisGameStart;},

		GetGameResets : function(){return this.gameData.gameResets;},

		GetPrestigePoints : function(){return this.gameData.prestigePoints;},

		GetSaveData : function(){return this.gameData;},
		LoadSaveData : function(_data){this.gameData = _data},

		hardReset : function()
		{
			this.gameData = {
				title : this.gameTitle,
				version : this.gameVersion,
				lastSave : null,

				ticksPerSecond : this.ticksPerSecond,
				tickMilliseconds : Math.floor(1000 / this.ticksPerSecond),
				
				timePlayedThisGame : 0,
				timePlayedAllTime : 0,
				activeTimeThisGame : 0,
				activeTimeAllTime : 0,
				blurTimeThisGame : 0,
				blurTimeAllTime : 0,
				offlineTimeThisGame : 0,
				offlineTimeAllTime : 0,

				gameBlur : null,
				gameExit : null,

				currentWidgets : 0,
				widgetsThisGame : 0,
				widgetsAllTime : 0,

				widgetsSpentThisGame : 0,
				widgetsSpentAllTime : 0,

				clicksThisGame : 0,
				clicksAllTime : 0,
				clickedWidgetsThisGame : 0,
				clickedWidgetsAllTime : 0,
				widgetsPerClick : this.clickBaseValue,

				totalGeneratorsThisGame : 0,
				totalGeneratorsAllTime : 0,
				generatorsOwned : [], // {id : 0, unlocked : false, owned : 0, upgrades : [{id : 0}], wps : 0, generated : 0}
				widgetsPerSecond : 0,
				
				originalGameStart : Date.now(),
				thisGameStart : null,
				gameResets : [], //date for each reset
				prestigePoints : 0
			}
		},

		updateClicks : function()
		{
			this.gameData.clicksThisGame++;
			this.gameData.clicksAllTime++;

			//alert('updateClicks: ' + JSON.stringify(this.gameData));
			this.updateWidgets(this.gameData.widgetsPerClick, 'CLICK');
		},

		updateWPS : function(_wps)
		{
			this.gameData.widgetsPerSecond = _wps;
		},

		updateTicks : function()
		{
			this.ticks++;

			// run calculations once per second
			if(this.ticks % this.ticksPerSecond === 0)
			{
				// do calculations here...
				this.updateWidgets(this.gameData.widgetsPerSecond, 'GENERATORS');
				// reset ticks
				this.ticks = 0;
				$rootScope.$emit('TICK_FULL');
			}

			// update display...
		},

		updateWidgets : function(_widgets, _src)
		{
			//alert(_widgets + " || " + _src);
			switch(_src)
			{
				case 'PURCHASE':
					this.gameData.currentWidgets -= _widgets;

					this.gameData.widgetsSpentThisGame += _widgets;
					this.gameData.widgetsSpentAllTime += _widgets;
				break;
				case 'CLICK':
					// TEMPORARY FORMULAS
					this.gameData.clickedWidgetsThisGame += _widgets;
					this.gameData.clickedWidgetsAllTime += _widgets;

					this.gameData.currentWidgets += _widgets;
					this.gameData.widgetsThisGame += _widgets;
					this.gameData.widgetsAllTime += _widgets;
				break;
				case 'GENERATORS':
					this.gameData.currentWidgets += _widgets;
					this.gameData.widgetsThisGame += _widgets;
					this.gameData.widgetsAllTime += _widgets;
				break;
			}
		},
		
		softReset : function()
		{
			var newTime = Date.now();

			this.gameData.prestigePoints++; // TEMPORARY FOR TESTING

			this.gameData.timePlayedThisGame = 0;
			this.gameData.activeTimeThisGame = 0;
			this.gameData.blurTimeThisGame = 0;
			this.gameData.offlineTimeThisGame = 0;

			this.gameData.gameBlur = null,
			this.gameData.gameExit = null,

			this.gameData.currentWidgets = 0;
			this.gameData.widgetsThisGame = 0;

			this.gameData.widgetsSpentThisGame = 0,

			this.gameData.clicksThisGame = 0;
			this.gameData.clickedWidgetsThisGame = 0;

			this.gameData.widgetsPerClick = this.clickBaseValue * (1 + this.gameData.prestigePoints); // TEMPORARY

			this.gameData.generatorsOwned = 0;
			this.gameData.widgetsPerSecond = 0;
			
			this.gameData.thisGameStart = newTime;
			this.gameData.gameResets.push(newTime);
		},

		updateSaveDate : function()
		{
			this.gameData.lastSave = Date.now();
		},

		blurHandler : function()	// NOT IMPLEMENTED
		{
			this.gameData.gameBlur = Date.now();
		},

		exitHandler : function()	// NOT IMPLEMENTED
		{
			this.gameData.gameExit = Date.now();
		},

		focusHandler : function()	// NOT IMPLEMENTED
		{
			this.gameData.gameBlur = null;
			this.gameData.gameExit = null;
		},

		addEventListeners : function()
		{
			var _this = this;

			this.newGameHandler =	$rootScope.$on('NEW_GAME', function(event) {
										// note that this causes hard reset to happen twice on the first game
										// i'd like to do something more interesting here
										_this.hardReset();
										_this.newGameHandler();
									});

			this.clickEventHandler =	$rootScope.$on('CLICKER_CLICKED', function(event) {
											_this.updateClicks();
										});

			this.tickEventHandler =	$rootScope.$on('TICKER_TICK', function(event) {
											_this.updateTicks();
										});

			this.hardResetEventHandler =	$rootScope.$on('HARD_RESET', function(event) {
												_this.hardReset();
											});

			this.softResetEventHandler =	$rootScope.$on('SOFT_RESET', function(event) {
												_this.softReset();
											});

			this.saveEventHandler =	$rootScope.$on('GAME_SAVE', function(event) {
										_this.updateSaveDate();
									});

			// NOT IMPLEMENTED
			this.blurEventHandler =	$rootScope.$on('GAME_BLUR', function(event) {
										_this.blurHandler();
									});

			// NOT IMPLEMENTED
			this.exitEventHandler =	$rootScope.$on('GAME_EXIT', function(event) {
										_this.exitHandler();
									});
			// NOT IMPLEMENTED
			this.focusEventHandler =	$rootScope.$on('GAME_FOCUS', function(event) {
											_this.focusHandler();
										});

			/*this.clickerInitHandler =	$rootScope.$on('CLICKER_INITIALIZED', function(event, _data) {
											_this.gameData.widgetsPerClick = _data;
											//alert('got it' + ' || ' + _data + ' || ' + _this.gameData.widgetsPerClick);
											_this.clickerInitHandler();
										});*/

			this.widgetsSpentEventHandler	=	$rootScope.$on('WIDGETS_SPENT', function(event, _data) {
												_this.updateWidgets(_data, 'PURCHASE');
											});

			this.wpsUpdateEventHandler =	$rootScope.$on('WPS_UPDATE', function(event, _data) {
												_this.updateWPS(_data);
											});
			
		}
	};

	return AppData;
}]);
