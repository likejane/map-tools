Mapper.generate = new function() {

    _generate = this;
    this.markerCounter;

    this.init = function() {
        L.mapbox.accessToken = 'pk.eyJ1IjoicmFkZGRpYyIsImEiOiJkNmU0ZDNkZTg1ZmEzYzZjNGRmYWE0NDg2ODNlMzkxYyJ9.JuCOrEi6fdy9zRDW-lJo7A';

        if (Mapper.map_components.map) Mapper.map_components.map.remove();
        Mapper.map_components.map = new L.mapbox.map('map', 'mapbox.streets', {
                doubleClickZoom: false
            })
            .setView([40.741924698522055, -73.98957252502441], 12);

        var geocoderControl = L.mapbox.geocoderControl('mapbox.places');
        geocoderControl.addTo(Mapper.map_components.map);

        geocoderControl.on('select', function(d) {
            var geocodeData = {'latlng': {'lat': d.feature.geometry.coordinates[1],
            'lng': d.feature.geometry.coordinates[0]}};

            Mapper.annotate.addMarker(geocodeData);
        });



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

                    _generate.markerCounter = data.points.length + 1;

                    Mapper.map_components.storageMarkerLayer.addData(data.points);

                    _generate.attachPopups();

                    Mapper.ui.els.savedPins.empty();

                    var markers = data.points;

                    $.each(markers, function(x, marker) {
                        Mapper.annotate.addPinTemplate(marker)
                    });
                Mapper.map_components.map.fitBounds(Mapper.map_components.storageMarkerLayer.getBounds());
                }
            )
        }


    this.addListeners = function() {
        Mapper.map_components.map.on('dblclick', Mapper.annotate.addMarker)
    }

    this.attachPopups = function() {
        Mapper.map_components.storageMarkerLayer.eachLayer(function(layer) {
            layer.bindPopup(layer.feature.properties.title, {
                closeButton: false
            });
        });

        Mapper.map_components.storageMarkerLayer.on('mouseover', function(e) {
            e.layer.openPopup();
        });
        Mapper.map_components.storageMarkerLayer.on('mouseout', function(e) {
            e.layer.closePopup();
        });
    };

}();
