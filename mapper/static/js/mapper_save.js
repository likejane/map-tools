Mapper.save = new function() {

	_save = this;
	this.markerArray = [];
	this.markerIds = 0;
	this.data = {};
	this.fields = ['mapTitle', 'mapNotes'];

	this.init = function() {
		if (!_save.validateFields()) return false;
		_save.collectData();
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

		// Get map data
		// ?????
	}


	/*
	 * title
	 * notes
	 * points
	 * - geojson
	 */
	this.saveData = function() {
		$.ajax({
			url: "/api/maps",
			data: _save.data,
			success: _save.dataSaved
		});
	}

	this.dataSave = function() {
		alert('DATA SAVED!')
	}

	this.saveMarker = function() {

		if (Mapper.annotate.marker) {

			var markerJSON = Mapper.annotate.marker.toGeoJSON()

			//Update properties on the marker
			markerJSON.properties.title = Mapper.ui.els.markerDesc.val()

			Mapper.map_components.activeMarkerLayer.removeLayer(Mapper.annotate.marker);
			Mapper.map_components.storageMarkerLayer.addData(markerJSON);
			//L.mapbox.featureLayer(markerJSON).addTo(Mapper.map_components.storageMarkerLayer);

		} else {
			alert('please doubleclick to select point')
		}



	}


}();
