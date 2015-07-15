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
		console.log(_save.data);
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
	}

	this.collectData = function() {
		// Get input fields
		$.each(_save.fields, function(x, field) {
			var field_el = Mapper.ui.els[field];
			if (field_el) {
				_save.data[x] = field_el.val()
			}
		});


		_save.data.name = _save.data[0];
		_save.data.notes = _save.data[1];
		_save.data.points = Mapper.map_components.storageMarkerLayer.toGeoJSON();


	}


	/*
	 * title
	 * notes
	 * points
	 * - geojson
	 */
	this.saveData = function() {
		console.log("trying to save");
		$.ajax({
			url: "/api/maps/",
			data: JSON.stringify(_save.data),
			type: "POST",
			contentType: "application/json",
			success: _save.dataSaved,
			error: _save.dataError
		});
	}

	this.dataSave = function() {
		alert('DATA SAVED!')
	}

	this.dataError = function(xhr,errmsg,err) {
		alert('NO SAVE!');
		console.log(xhr.status + ": " + xhr.responseText);
	}

	this.saveMarker = function() {

		if (Mapper.annotate.activeMarkerStatus == true) {

			var markerJSON = Mapper.annotate.marker.toGeoJSON()

			//Update properties on the marker
			markerJSON.properties.title = Mapper.ui.els.markerDesc.val()

			Mapper.map_components.activeMarkerLayer.removeLayer(Mapper.annotate.marker);
			Mapper.map_components.storageMarkerLayer.addData(markerJSON);
			Mapper.annotate.activeMarkerStatus = false;


		} else {
			alert('please doubleclick to select point')
		}



	}



}();
