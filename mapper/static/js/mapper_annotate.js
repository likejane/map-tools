Mapper.annotate = new function() {

	this.init = function() {

	}

	this.addMarker = function() {

    	var newMarker = new L.marker(e.latlng, {
    		draggable: true })
    		.addTo(map);

    	alert(e.latlng);
		}

}();
