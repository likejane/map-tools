Mapper.annotate = new function() {

	_annotate = this;

	this.marker;

	this.markerLatLng = {};
	this.markerJSON = {};

	this.pinTemplate = '\
	<div class="col col-12 border-bottom pb1 mb2 display-flex">\
        <div class="mr3 flex-1">\
          <p><span class="text-gray--lightest mr1">Pin 1</span>({{0}}, {{1}})</p>\
          <p class="mt1">Vivamus vehicula rhoncus mi vel imperdiet. Duis eu finibus nisl, pellentesque facilisis neque. </p>\
        </div>\
        <div class="vertical-center">\
          <a href="#">Edit</a><span class="mx1">|</span><a href="#">Delete</a>\
        </div>\
      </div>';

	this.init = function() {

	}

	this.addMarker = function(e) {

    	_annotate.marker = new L.marker(e.latlng, {
    		draggable: true });

    	_annotate.marker.addTo(Mapper.map_components.activeMarkerLayer);


    	Mapper.ui.els.markerLoc.text(_annotate.marker.getLatLng())

    	_annotate.markerLatLng = newMarker.getLatLng();
    	_annotate.markerJSON = newMarker.toGeoJSON();
    	Mapper.ui.els.markerLat.text(_annotate.markerLatLng.lat);
    	Mapper.ui.els.markerLng.text(_annotate.markerLatLng.lng);

    	_annotate.addPinTemplate(_annotate.markerJSON);
	}

	this.addPinTemplate = function(marker) {
		var output = Mustache.render(this.pinTemplate, marker.geometry.coordinates);
		Mapper.ui.els.savedPins.append(output);
	}


}();
