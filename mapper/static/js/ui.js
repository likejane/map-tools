Mapper.ui = new function() {
	_ui = this;

	this.els = {};
	this.selectors = {
		'mapCreator': '#map-creator',
		'testBtn': '#testbutton',
		'markerLat': '#markerLat',
		'markerLng': '#markerLng',
		'markerDescField': '#markerDescField',
		'markerSaveButton': '#markerSaveButton',
		'markerList': '#markerList'
	};
	this.templates = {};
	this.events = {};

	this.init = function() {
		_ui.selectEls();
		_ui.addEvents();
	}

	this.selectEls = function() {
		$.each(_ui.selectors, function(x, selector) {
			_ui.els[x] = $(selector);
		});
	}

	this.addEvents = function() {
		_ui.els.testBtn.click(_ui.toggleCreator);
		_ui.els.markerSaveButton.click(Mapper.save.saveMarker);
	}

	this.toggleCreator = function() {
		_ui.els.mapCreator.slideToggle();
	}


}();
