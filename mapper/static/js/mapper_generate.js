Mapper.generate = new function() {

	this.init = function() {
		L.mapbox.accessToken = 'pk.eyJ1IjoicmFkZGRpYyIsImEiOiJkNmU0ZDNkZTg1ZmEzYzZjNGRmYWE0NDg2ODNlMzkxYyJ9.JuCOrEi6fdy9zRDW-lJo7A';

		Mapper.map_components.map = L.mapbox.map('map', 'mapbox.streets', {
				doubleClickZoom: false
			})
			.setView([38.1089, 13.3545], 8)
			.addControl(L.mapbox.geocoderControl('mapbox.places'));

		if (Mapper.map_id) {
			Mapper.generate.loadMap()
		}
		else {
			Mapper.map_components.activeMarkerLayer = new L.mapbox.featureLayer()
				.addTo(Mapper.map_components.map);
		}
		Mapper.map_components.storageMarkerLayer = new L.geoJson().addTo(Mapper.map_components.map);

		Mapper.map_components.storageMarkerLayer.options.pointToLayer = L.mapbox.marker.style;

		Mapper.generate.addListeners();

	}

	this.loadMap = function() {
			Mapper.map_components.activeMarkerLayer = new L.mapbox.featureLayer()
				.loadURL('/api/mappoints/?map='+Mapper.map_id)
				.addTo(Mapper.map_components.map)
				.on('ready', function(r) {
					var markers = r.target._geojson
					$.each(markers, function(x, marker) {
        		Mapper.annotate.addPinTemplate(marker)
    			})
	    		Mapper.map_components.map.fitBounds(Mapper.map_components.activeMarkerLayer.getBounds());
				});
	}

	this.addListeners = function() {
		Mapper.map_components.map.on('dblclick', Mapper.annotate.addMarker)
	}


}();
