Mapper.ui = new function() {
	_ui = this;

	this.els = {};
	this.selectors = {
		'mapCreator': '#map-creator',
		'testBtn': '#testbutton',
		'markerLat': '#markerLat',
		'markerLng': '#markerLng',
		'markerLoc': '#markerLoc',
		'markerDesc': '#markerDesc',
		'markerSaveButton': '#markerSaveBtn',
		'markerDeleteButton': '.markerDeleteButton',
		'markerList': '#markerList',
		'createNewMap': '#createNewMapBtn',
		'savePublish': '#savePublishBtn',
		'cancelMap': '#cancelMapBtn',
		'mapTitle': '#mapTitle',
		'mapNotes': '#mapNotes',
		'formInputs': '.form-input',
		'savedPins': '#saved-pins'
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
		_ui.els.markerSaveButton.click(Mapper.annotate.saveMarker);
		_ui.els.markerDeleteButton.click();
		_ui.els.createNewMap.click(_ui.openMapCreator);
		_ui.els.cancelMap.click(_ui.closeMapCreator);
		_ui.els.savePublish.click(Mapper.save.init);
		_ui.els.formInputs.keyup(_ui.toggleInputError);
	}

	this.toggleInputError = function() {
		inputEl = $(this),
		inputElParent = inputEl.parent();

		if (inputEl.val().length > 0) {
			inputElParent.removeClass('form-error');
		} else {
			//inputElParent.addClass('form-error');
		}
	}

	this.openMapCreator = function() {
		_ui.els.createNewMap.hide();
		_ui.els.savePublish.show();
		_ui.els.cancelMap.show();
		_ui.els.formInputs.val('');
		_ui.els.formInputs.parents().removeClass('form-error');
		_ui.els.mapCreator.slideDown(250, function() {
			Mapper.generate.init();
		});
	}

	this.closeMapCreator = function() {
		_ui.els.mapCreator.hide();
		_ui.els.createNewMap.show();
		_ui.els.savePublish.hide();
		_ui.els.cancelMap.hide();
	}


}();
