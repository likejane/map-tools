Mapper.annotate = new function() {

	_annotate = this;

	this.markerJSON = {};

	this.init = function() {

	}

	this.addMarker = function(e) {

    	var newMarker = new L.marker(e.latlng, {
    		draggable: true })
    		.addTo(Mapper.map_components.map);

    	var m = newMarker.getLatLng();
    	_annotate.markerJSON = newMarker.toGeoJSON();
    	Mapper.ui.els.markerLat.text(m.lat)
    	Mapper.ui.els.markerLng.text(m.lng)
		}

}();
