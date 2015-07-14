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

    	Mapper.ui.els.markerLoc.text(_annotate.marker.getLatLng())
		}

}();
