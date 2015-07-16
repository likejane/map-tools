Mapper.generate = new function() {

	_generate = this;
	this.markerCounter;

	this.init = function() {
		L.mapbox.accessToken = 'pk.eyJ1IjoicmFkZGRpYyIsImEiOiJkNmU0ZDNkZTg1ZmEzYzZjNGRmYWE0NDg2ODNlMzkxYyJ9.JuCOrEi6fdy9zRDW-lJo7A';

		if (Mapper.map_components.map) Mapper.map_components.map.remove();
		Mapper.map_components.map = new L.mapbox.map('map', 'mapbox.streets', {
				doubleClickZoom: false
			})
			.setView([38.1089, 13.3545], 8)
			.addControl(L.mapbox.geocoderControl('mapbox.places'));

		Mapper.map_components.activeMarkerLayer = new L.mapbox.featureLayer()
			.addTo(Mapper.map_components.map);

		Mapper.map_components.storageMarkerLayer = new L.geoJson()
				.addTo(Mapper.map_components.map);

		if (Mapper.map_id) {
			Mapper.generate.loadMap()
		}
		else {
			_generate.markerCounter = 1;
		}

		Mapper.map_components.storageMarkerLayer.options.pointToLayer = L.mapbox.marker.style;

		Mapper.generate.addListeners();

	};

	this.loadMap = function() {
			$.ajax({
			dataType: "json",
			url: "/api/maps/"+Mapper.map_id,}).done(
				function(data) {

					_generate.markerCounter = data.length + 1;

					Mapper.map_components.storageMarkerLayer.addData(data.points);
					var markers = data.points

					$.each(markers, function(x, marker) {
        		Mapper.annotate.addPinTemplate(marker)
    			})
	    		Mapper.map_components.map.fitBounds(Mapper.map_components.storageMarkerLayer.getBounds());
				}
			)
		}


	this.addListeners = function() {
		Mapper.map_components.map.on('dblclick', Mapper.annotate.addMarker)
	}


}();
