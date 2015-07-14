Mapper.ui = new function() {
	_ui = this;

	this.els = {};
	this.selectors = {
		'mapCreator': '#map-creator',
		'createNewMap': '#createNewMapBtn',
		'savePublish': '#savePublishBtn',
		'cancelMap': '#cancelMapBtn',
		'variable': '#css-selector'	
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
		_ui.els.createNewMap.click(_ui.openMapCreator);
		_ui.els.cancelMap.click(_ui.closeMapCreator);
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