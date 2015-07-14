Mapper.annotate = new function() {

	_annotate = this;

	this.markerLatLng = {};
	this.markerJSON = {};

	this.init = function() {

	}

	this.addMarker = function(e) {

    	var newMarker = new L.marker(e.latlng, {
    		draggable: true })
    		.addTo(Mapper.map_components.map.featureLayer);

    	_annotate.markerLatLng = newMarker.getLatLng();
    	_annotate.markerJSON = newMarker.toGeoJSON();
    	Mapper.ui.els.markerLat.text(_annotate.markerLatLng.lat)
    	Mapper.ui.els.markerLng.text(_annotate.markerLatLng.lng)
		}

}();
