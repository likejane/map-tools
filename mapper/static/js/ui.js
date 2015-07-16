
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
		'markerCancelBtn': '#markerCancelBtn',
		'markerList': '#markerList',
		'createNewMap': '#createNewMapBtn',
		//'editMap' : '#editMapBtn',
		'editMapBtn': '.edit-map-btn',
		'cancelEditMap' : '#cancelEditMapBtn',
		'savePublish': '#savePublishBtn',
		'cancelMap': '#cancelMapBtn',
		'mapPreview' : '#mapPreview',
		'mapTitle': '#mapTitle',
		'mapNotes': '#mapNotes',
		'formInputs': '.form-input',
		'savedPins': '#saved-pins',
		'mapGrid': '#map-grid',
		'mapSelect': '#map-select'
	};
	this.templates = {};
	this.events = {};

	this.init = function() {
		_ui.selectEls();
		_ui.addEvents();
		$(document).on("click", ".markerDeleteBtn", function(event) {
			Mapper.annotate.deleteMarker(event);
		});
		$(document).on("click", ".markerEditBtn", function(event) {
			Mapper.annotate.editMarker(event);
		});
		if (_ui.els.mapSelect.length > 0) Mapper.cms.init();
	}

	this.selectEls = function() {
		$.each(_ui.selectors, function(x, selector) {
			_ui.els[x] = $(selector);
		});
	}

	this.addEvents = function() {
		_ui.els.markerSaveButton.click(Mapper.annotate.saveMarker);
		_ui.els.markerCancelBtn.click(Mapper.annotate.cancelMarker);
		_ui.els.createNewMap.click(_ui.openMapCreator);
		_ui.els.editMapBtn.click(_ui.openMapEditor);
		_ui.els.cancelEditMap.click(_ui.generateView);
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

	this.closeMapEditor = function() {
			_ui.els.editMapBtn.show();
			_ui.els.savePublish.hide();
			_ui.els.cancelEditMap.hide();
		}

  this.generateView = function() {
			_ui.els.mapTitle.attr('disabled', 'disabled');
			_ui.els.mapTitle.css('border', '0px');
			_ui.els.mapNotes.attr('disabled', 'disabled');
			_ui.els.mapNotes.css('border', '0px');
			_ui.els.editMapBtn.show();
			_ui.els.savePublish.hide();
			_ui.els.markerDesc.hide();
      _ui.els.markerLoc.hide();
			_ui.els.markerSaveButton.hide();
  		_ui.els.markerCancelBtn.hide();
			_ui.els.cancelEditMap.hide();
      _ui.els.savedPins.hide();
	}

	this.openMapEditor = function() {
			_ui.els.mapTitle.attr('disabled', false);
			_ui.els.mapTitle.css('border', "1px solid #aaa");
			_ui.els.mapNotes.attr('disabled', false);
			_ui.els.mapNotes.css('border', "1px solid #aaa");
			_ui.els.editMapBtn.hide();
			_ui.els.savePublish.show();
			_ui.els.markerDesc.show();
      _ui.els.markerLoc.show();
			_ui.els.markerSaveButton.show();
  		_ui.els.markerCancelBtn.show();
			_ui.els.cancelEditMap.show();
			_ui.els.savedPins.show();

		}



}();
