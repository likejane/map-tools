Mapper.save = new function() {

	_save = this;
	this.markerArray = [];
	this.markerIds = 0;
	this.data = {};
	this.newMap = false;
	this.fields = ['mapTitle', 'mapNotes'];

	this.init = function() {
		if (!_save.validateFields()) return false;
		_save.collectData();
		_save.saveData();
	}

	this.validateFields = function() {
		var valid = true
		$.each(_save.fields, function(x, field) {
			var field_el = Mapper.ui.els[field];
			if (field_el && field_el.val().length == 0) {
				valid = false;
				field_el.parent().addClass('form-error');
			}
		});
		return valid;
	};

	this.collectData = function() {
		// Get input fields
		$.each(_save.fields, function(x, field) {
			var field_el = Mapper.ui.els[field];
			if (field_el) {
				_save.data[x] = field_el.val()
			}
		});

		if (this.map_id){
			_save.data.id = this.map_id;
		}
		_save.data.name = _save.data[0];
		_save.data.notes = _save.data[1];
		_save.data.points = Mapper.map_components.storageMarkerLayer.toGeoJSON();
	}


	this.saveMap = function(){
		if (Mapper.map_id){
			$.ajax({
			url: "/api/maps/".concat(Mapper.map_id),
			data: JSON.stringify(_save.data), //passes the points but they're actually ignored rn.
			type: "PUT",
			contentType: "application/json"
		}).done(_save.dataSaved);
		}
		else {
			_save.newMap = true;
			$.ajax({
			url: "/api/maps/",
			data: JSON.stringify(_save.data), //passes the points but they're actually ignored rn.
			type: "POST",
			contentType: "application/json"
		}).done(_save.dataSaved);

		}
	}


	this.saveData = function(r) {
		console.log('Saved Data', r);
		_save.saveMap();
	}

	this.dataSaved = function(data) {
		console.log('data', data);
		Mapper.ui.closeMapCreator();
		Mapper.gallery.addToGallery(data);
	}

}();
