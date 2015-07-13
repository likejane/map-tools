Mapper.generate = new function() {

	this.init = function() {
		Mapper.map_components.map = L.mapbox.map('map', 'mapbox.streets', {
		doubleClickZoom: false })
    	.setView([38.1089, 13.3545], 8);

    	Mapper.map_components.map = new L.LayerGroup();
    	Mapper.generate.addListeners()

	}

	    this.addListeners = function() {
	    	$(Mapper.map_components.map).on('dblclick', Mapper.annotate.addMarker)

    }


}();
