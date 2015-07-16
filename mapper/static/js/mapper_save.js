Mapper.save = new function() {

	_save = this;
	this.markerArray = [];
	this.markerIds = 0;
	this.data = {};
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
		console.log("save map");
		$.ajax({
			url: "/api/maps/",
			data: JSON.stringify(_save.data), //passes the points but they're actually ignored rn.
			type: "POST",
			contentType: "application/json"
		}).done(_save.savePoints);
	}

	this.savePoints = function(data){
		if (data){// get map id from POST to /maps/ endpoint.
			Mapper.map_id = data.id;
			_save.data.points.features.forEach(function(d){d.properties.map = Mapper.map_id});
		}
		console.log("save points");
		console.log(_save.data.points);
		$.ajax({
			url: "/api/mappoints/",
			data: JSON.stringify(_save.data.points),
			type: "POST",
			contentType: "application/json",
			done: _save.dataSaved
		}).done(_save.dataSaved);
	}

	this.saveData = function(r) {
		console.log('Saved Data', r);
		_save.saveMap();
	}

	this.dataSaved = function(data) {
		console.log(data);
		Mapper.ui.closeMapCreator();
	}

}();
