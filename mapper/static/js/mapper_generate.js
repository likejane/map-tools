Mapper.generate = new function() {

	this.init = function() {
		L.mapbox.accessToken = 'pk.eyJ1IjoicmFkZGRpYyIsImEiOiJkNmU0ZDNkZTg1ZmEzYzZjNGRmYWE0NDg2ODNlMzkxYyJ9.JuCOrEi6fdy9zRDW-lJo7A';

		Mapper.form_components.coords = document.getElementById('info')
		Mapper.map_components.map = L.mapbox.map('map', 'mapbox.streets', {
		doubleClickZoom: false })
    	.setView([38.1089, 13.3545], 8);

    	Mapper.map_components.markerGroup = new L.LayerGroup();
    	Mapper.generate.addListeners()

	}

	    this.addListeners = function() {
	    	Mapper.map_components.map.on('dblclick', Mapper.annotate.addMarker)

    }


}();
