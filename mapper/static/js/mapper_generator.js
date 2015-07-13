Mapper.generate = new function() {

	this.init = function() {
		Mapper.map = L.mapbox.map('map', 'mapbox.streets', {
		doubleClickZoom: false })
    	.setView([38.1089, 13.3545], 8);
	}


}();
