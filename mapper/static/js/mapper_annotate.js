Mapper.annotate = new function() {

	_annotate = this;

	this.marker;

	this.markerLatLng = {};
	this.markerJSON = {};

	this.init = function() {

	}

	this.addMarker = function(e) {

    	_annotate.marker = new L.marker(e.latlng, {
    		draggable: true });

    	Mapper.map_components.map.featureLayer.addLayer(newMarker);

    	_annotate.markerLatLng = newMarker.getLatLng();
    	_annotate.markerJSON = newMarker.toGeoJSON();
    	Mapper.ui.els.markerLat.text(_annotate.markerLatLng.lat)
    	Mapper.ui.els.markerLng.text(_annotate.markerLatLng.lng)
		}

}();
