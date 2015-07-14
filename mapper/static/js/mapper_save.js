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

		var markerJSON= Mapper.annotate.marker.toGeoJSON()

		//Update properties on the marker

		console.log(markerJSON);
		markerJSON.properties.title = Mapper.ui.els.markerDesc.val()
		console.log(markerJSON.properties);
		L.mapbox.featureLayer(markerJSON).addTo(Mapper.map_components.storageMarkerLayer);


/*
		//if (lat != '') {
		if (Mapper.annotate.marker){
	    	var markerData = {
	  			point: Mapper.annotate.marker.getLatLng(),
	  			desc: Mapper.annotate.marker.title,
	  			id: Mapper.save.markerIds
			};

			var output = Mustache.render("<div id='markerList{{id}}'><div class='markerListText'>{{id}} {{point}} {{desc}}</div> <div class='markerDeleteButton'>delete</div></div>", markerData);
			Mapper.ui.els.markerList.append(output)
			Mapper.ui.els.markerDesc.val('description')
			Mapper.ui.els.markerLat.text('')
			Mapper.ui.els.markerLng.text('')

			Mapper.save.markerArray.push(_annotate.markerJSON)
			Mapper.save.markerIds += 1

		} else {
			alert('please doubleclick to select point')
		}*/
    }

    this.saveJSON = function() {

    	console.log(Mapper.map_components.map.featureLayer.toGeoJSON())
    	console.log(Mapper.save.markerArray)
    }

}();
