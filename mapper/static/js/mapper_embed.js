Mapper.embed = new function() {

    _embed = this;

    this.init = function() {
        L.mapbox.accessToken = 'pk.eyJ1IjoicmFkZGRpYyIsImEiOiJkNmU0ZDNkZTg1ZmEzYzZjNGRmYWE0NDg2ODNlMzkxYyJ9.JuCOrEi6fdy9zRDW-lJo7A';

        if (Mapper.map_components.emap) Mapper.map_components.map.remove();
        Mapper.map_components.emap = new L.mapbox.map('map', 'mapbox.streets', {
            zoomControl: false
        });

        // Disable drag and zoom handlers.
                Mapper.map_components.emap.dragging.disable();
                Mapper.map_components.emap.touchZoom.disable();
                Mapper.map_components.emap.doubleClickZoom.disable();
                Mapper.map_components.emap.scrollWheelZoom.disable();


        Mapper.map_components.storageMarkerLayer = new L.geoJson()
            .addTo(Mapper.map_components.emap);

        Mapper.map_components.storageMarkerLayer.options.pointToLayer = L.mapbox.marker.style;

    };

    this.loadMap = function() {
        $.ajax({
            dataType: "json",
            url: "/api/maps/" + Mapper.map_id,
        }).done(
            function(data) {

                Mapper.map_components.storageMarkerLayer.addData(data.points);

                Mapper.generate.attachPopups();

                Mapper.map_components.emap.fitBounds(Mapper.map_components.storageMarkerLayer.getBounds());

            }
        )
    }


}();
