Mapper.annotate = new function() {
	_annotate = this;

	this.marker;
	this.activeMarkerStatus = false;
	this.markerCounter = 1;

	this.data = {};

  	this.markerLatLng = {};
  	this.markerJSON = {};

  	this.pinTemplate = '\
	<div data-id="{{properties.marker_id}}" class="col col-12 border-bottom pb1 mb2 display-flex">\
        <div class="mr3 flex-1">\
          <p><span class="text-gray--lightest mr1">Pin {{properties.marker_id}}</span>({{geometry.coordinates}})</p>\
          <p class="mt1">{{properties.title}}</p>\
        </div>\
        <div class="vertical-center">\
          <button class="markerEditBtn">Edit</button><span class="mx1">|</span><button class="markerDeleteBtn">Delete</button>\
        </div>\
      </div>';

	this.init = function() {

  	}

  	this.addMarker = function(e) {

		if (_annotate.activeMarkerStatus == false) {
	    	_annotate.marker = new L.marker(e.latlng, {
	    		draggable: true });

	    	_annotate.marker.addTo(Mapper.map_components.activeMarkerLayer);

	    	_annotate.activeMarkerStatus = true;

	    	Mapper.ui.els.markerLoc.text(_annotate.marker.toGeoJSON().geometry.coordinates.join(', '))

	    	_annotate.marker.on('dragend', function(event) {
	    	Mapper.ui.els.markerLoc.text(_annotate.marker.toGeoJSON().geometry.coordinates.join(', '))
    	})

		} else {
			_annotate.marker.setLatLng(e.latlng)
			Mapper.ui.els.markerLoc.text(_annotate.marker.toGeoJSON().geometry.coordinates.join(', '))
		}

	}


  	this.saveMarker = function() {

	    if (_annotate.activeMarkerStatus == true) {

	    	var markerJSON = Mapper.annotate.marker.toGeoJSON()

	     	//Update properties on the marker
	     	markerJSON.properties.title = Mapper.ui.els.markerDesc.val()
	     	markerJSON.properties.marker_id = _annotate.markerCounter

	      	Mapper.map_components.activeMarkerLayer.removeLayer(Mapper.annotate.marker);
	      	Mapper.map_components.storageMarkerLayer.addData(markerJSON);

	      	_annotate.addPinTemplate(markerJSON);

	      	_annotate.activeMarkerStatus = false;
	      	_annotate.markerCounter += 1;
	    	Mapper.ui.els.markerLoc.text('');
	    	// Mapper.ui.selectEls();
	    	// _annotate.addEvents();


	    } else {
	    	alert('please doubleclick to select point')
	    }
	};

	this.addPinTemplate = function(marker) {
    	var output = Mustache.render(this.pinTemplate, marker);
    	Mapper.ui.els.savedPins.append(output);
  	};

  	// this.addEvents = function() {
  	// 	_ui.els.markerDeleteBtn.click(_annotate.deleteMarker());
  	// 	_ui.els.markerEditBtn.click(_annotate.editMarker());
  	// };

  	this.deleteMarker = function(event) {
  		markerID = $(event.currentTarget).parent().parent().attr('data-id');
		_annotate.data.points = Mapper.map_components.storageMarkerLayer.toGeoJSON()
		_annotate.data.points.features = _annotate.data.points.features
               .filter(function (el) {
                        return el.properties.marker_id !== parseInt(markerID);
                       });
		Mapper.map_components.storageMarkerLayer.clearLayers()
		Mapper.map_components.storageMarkerLayer.addData(_annotate.data.points)
		$(event.currentTarget).parent().parent().remove();
  	};

  	this.editMarker = function(event) {
  		markerID = $(event.currentTarget).parent().parent().attr('data-id');
  		console.log(markerID)
  	}

}();
