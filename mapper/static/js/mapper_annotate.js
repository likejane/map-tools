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

    	_annotate.marker.addTo(Mapper.map_components.activeMarkerLayer);
    	//Mapper.map_components.activeMarkerLayer.addLayer(_annotate.marker);

    	//_annotate.markerLatLng = newMarker.getLatLng();
    	//_annotate.markerJSON = newMarker.toGeoJSON();
    	//Mapper.ui.els.markerLat.text(_annotate.marker.getLatLng().lat)
    	//Mapper.ui.els.markerLng.text(_annotate.marker.getLatLng().lng)
    	Mapper.ui.els.markerLoc.text(_annotate.marker.getLatLng())
		}

}();
