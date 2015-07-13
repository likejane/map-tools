Mapper.ui = function() {
	_ui = this;

	this.els = {};
	this.selectors = {};
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

	}


}();