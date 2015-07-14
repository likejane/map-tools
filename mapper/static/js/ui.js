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
		'markerDeleteButton': '.markerDeleteButton',
		'markerList': '#markerList',
		'saveJSONButton': '#saveJSONButton'
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
		_ui.els.markerDeleteButton.click();
		_ui.els.saveJSONButton.click(Mapper.save.saveJSON);
	}

	this.openMapCreator = function() {
		_ui.els.mapCreator.slideDown(250);
		_ui.els.createNewMap.hide();
		_ui.els.savePublish.show();
		_ui.els.cancelMap.show();
		//_ui.els.mapCreator.addClass('animated slideInUp')
	}

	this.closeMapCreator = function() {
		_ui.els.mapCreator.hide();
		_ui.els.createNewMap.show();
		_ui.els.savePublish.hide();
		_ui.els.cancelMap.hide();
		//_ui.els.mapCreator.addClass('animated slideInUp')
	}


}();
