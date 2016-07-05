require(["uiplanetscreen", "uitravelscreen", "jquery", "jqueryui", "tooltipster"]);

// ---------------------------------------------------------------------------
// Some const values used in ui code
// ---------------------------------------------------------------------------
MouseButtons = {
	left: 1,
	middle: 2,
	right: 3
};

//---------------------------------------------------------------------------
// UI Class
// ---------------------------------------------------------------------------

function UI() {
	this.screenPlanet = undefined;
	this.screenTravel = undefined;

	this.isDragging = false;
	this.pendingDragElementTime = Date.now();
	this.pendingDragElement = undefined;
	this.activeDragElement = undefined;
	this.activeDragSource = undefined;
	this.activeDragTarget = undefined;

	this.activeFloats = [];

	this.cursorPositionX = 0;
	this.cursorPositionY = 0;

	this.numberFormatter = utils.formatters.raw;

	this.keyBindings = {};
	this.modalDialogs = 0;
	this.hasModalDialog = false;

	// ---------------------------------------------------------------------------
	// main UI functions
	// ---------------------------------------------------------------------------
	this.init = function() {
		//if ($("#new-message-count").text() == 0) {
		//	  $(".new-message").css("display", "none");
		//};
		// Setup key bindings
		$(window).delegate('*', 'keypress', this.onKeyPress);
		$(document).bind('keypress', this.onKeyPress);
		$(document).on('mousemove', this.onMouseMove);
		$(document).on('mouseup', this.onMouseUp);

		this.screenPlanet = new UIPlanetScreen();
		this.screenPlanet.init();

		this.screenTravel = new UITravelScreen();
		this.screenTravel.init();

		if (game.settings.travelActive) {
			$('#depth').text(game.settings.travelDistanceElapsed + " / " + game.settings.travelDistanceRemaining);
		}

		// Todo: function to switch screens
		if (game.currentPlanet) {
			this.screenPlanet.show();
			this.screenTravel.hide();
		} else {
			this.screenPlanet.hide();
			this.screenTravel.show();
		}
	};

	this.update = function(currentTime) {
		if (game.settings.travelActive) {
			$('#depth').text(game.settings.travelDistanceElapsed + " / " + game.settings.travelDistanceRemaining);
		}
		// Todo: do this a bit more proper maybe with a callback or something
		if (game.currentPlanet && !ui.screenPlanet.isVisible) {
			ui.screenTravel.hide();
			ui.screenPlanet.show();
		}

		this.screenPlanet.update(currentTime);
		this.screenTravel.update(currentTime);

		// Check if we are starting a drag operation
		//if (this.pendingDragElement && currentTime - this.pendingDragElementTime > sys.dragDelay) {
		//	this.enterDrag(this.pendingDragElement);
		//	this.pendingDragElement = undefined;
		//}
	};

	this.onKeyPress = function(paremeter) {
		var self = ui;
		var _char = String.fromCharCode(paremeter.which).toLowerCase();

		var skipBindings = false;
		if (self.hasModalDialog) {
			skipBindings = true;
		} else if ($(document.activeElement).is("input")) {
			skipBindings = true;
		}
		// Add more reasons to skip the keyboard shortcuts around here.

		if (!skipBindings) {
			var callback = self.keyBindings[_char];
			if (callback) {
				callback();
			}
		}
	};

	this.onMouseMove = function(parameter) {
		var self = ui;

		this.cursorPositionX = parameter.pageX;
		this.cursorPositionY = parameter.pageY;

		if (!self.isDragging) {
			return;
		}

		self.activeDragElement.moveTo(this.cursorPositionX + 1, this.cursorPositionY + 1);
	};

	this.onMouseUp = function(parameter) {
		var self = ui;

		// If we are pending a drag cancel it
		if (self.pendingDragElement) {
			self.pendingDragElement = undefined;
		}

		// If we are not in a drag bail out
		if (!self.isDragging) {
			return;
		}

		self.finishDrag();
	};

	this.notify = function(message) {
		console.log(message);
	};

	this.notifyError = function(message) {
		console.log(notifyError);
	};

	this.showDialog = function(buttonSuccess, buttonCancel, title, callback) {
		var self = ui;
		var buttons = {};
		buttons[buttonSuccess] = function() {
			callback();
			$(this).dialog("close");
		};
		buttons[buttonCancel] = function() {
			$(this).dialog("close");
		};

		self.addModalLayer();
		$('<div></div>').dialog({
			autoOpen: true,
			title: title,
			modal: true,
			buttons: buttons,
			open: function() {
				$(this).siblings('.ui-dialog-buttonpane').find('button:eq(1)').focus();
			},
			close: function() {
				self.removeModalLayer();
			}
		});
	};

	this.bindKey = function(key, callback) {
		this.keyBindings[key] = callback;
	};

	this.addModalLayer = function() {
		this.modalDialogs++;
		this.hasModalDialog = true;
	};

	this.removeModalLayer = function() {
		this.modalDialogs--;
		this.hasModalDialog = this.modalDialogs.length > 0;
	};

	// ---------------------------------------------------------------------------
	// building functions
	// ---------------------------------------------------------------------------
	this.buildCraftingCostTooltip = function(item) {
		var cost = game.getCraftingCost(item.id, 1);
		var costEntries = [];
		for (var key in cost) {
			var costItem = game.getItem(key);
			if (costItem === undefined) {
				utils.log("Invalid item in crafting for " + item.id + ": " + key);
				costEntries.push('NaN !ERR!');
				continue;
			}
			costEntries.push(cost[key] + ' ' + costItem.name);
		}
		return costEntries.join(', ');
	};

	this.buildGearSlot = function(id, slotType, itemId, parent) {
		var item = undefined;
		if (itemId) {
			item = game.getItem(itemId);
		};

		var slot = new UISlot(id + '_' + slotType, parent);
		slot.classes = slotType + ' gearSlot hasMenu';
		slot.init();

		if (item != undefined) {
			slot.set(item, 1);
		}
		return slot;
	};
};
