Mapper.annotate = new function() {

    _annotate = this;

    this.marker; //points to active mapbox marker object
    this.currentMarkerList; //points to container div of
    this.activeMarkerStatus; //booleen, whether there is an extive marker being created
    this.existingMarkerID; //holds marker_id of marker being edited or deleted
    this.data = {}; //data holder for saving manipulated json's before being sent back into mapbox
    this.markerJSON = {}; //holds json of active marker to allow for saving to storage later

    this.pinTemplate = '\
    <div data-id="{{properties.marker_id}}" class="col col-12 border-bottom pb1 mb2 display-flex">\
        <div class="mr3 flex-1">\
          <p><span class="text-gray--lightest mr1">Pin coords:</span>({{geometry.coordinates}})</p>\
          <p class="mt1">{{properties.title}}</p>\
        </div>\
        <div class="vertical-center">\
          <a class="markerEditBtn">Edit</a><span class="mx1">|</span><a class="markerDeleteBtn">Delete</a>\
        </div>\
      </div>';

    this.init = function() {

    }


    this.addMarker = function(e) {

        if (_annotate.activeMarkerStatus == true) {
            _annotate.marker.setLatLng(e.latlng);
            Mapper.ui.els.markerLoc.text(_annotate.marker.toGeoJSON().geometry.coordinates.join(', '));
        } else {
            _annotate.marker = new L.marker(e.latlng, {
                draggable: true });

            _annotate.marker.addTo(Mapper.map_components.activeMarkerLayer);
            _annotate.activeMarkerStatus = true;

            Mapper.ui.els.markerLoc.text(_annotate.marker.toGeoJSON().geometry.coordinates.join(', '));

            _annotate.marker.on('dragend', function(event) {
                Mapper.ui.els.markerLoc.text(_annotate.marker.toGeoJSON().geometry.coordinates.join(', '));
            });

        };

    };


    this.saveMarker = function() {

        if (_annotate.activeMarkerStatus == true && Mapper.ui.els.markerDesc[0].value !== "") {

            var markerJSON = Mapper.annotate.marker.toGeoJSON()
            markerJSON.properties.title = Mapper.ui.els.markerDesc.val()

            // choose different behavior if editing or adding
            if (_annotate.existingMarkerID) {
                markerJSON.properties.marker_id = parseInt(_annotate.existingMarkerID);
                _annotate.existingMarkerID = null;
                _annotate.editPinTemplate(markerJSON);
            } else {
                markerJSON.properties.marker_id = _generate.markerCounter;
                _generate.markerCounter += 1;
                _annotate.addPinTemplate(markerJSON);
            };

            //remove from active layer and add to storage layer
            Mapper.map_components.activeMarkerLayer.removeLayer(Mapper.annotate.marker);
            Mapper.map_components.storageMarkerLayer.addData(markerJSON);

            _annotate.activeMarkerStatus = false;

            //clear left-side editing console
            Mapper.ui.els.markerLoc.text('');
            Mapper.ui.els.markerDesc[0].value = '';

        } else {

            alert('Please doubleclick to select point and fill in description')

        }
    };

    this.addPinTemplate = function(marker) {
        var output = Mustache.render(this.pinTemplate, marker);
        Mapper.ui.els.savedPins.append(output);
    };

    this.editPinTemplate = function(marker) {
        var output = Mustache.render(this.pinTemplate, marker);
        _annotate.currentMarkerList.replaceWith(output);
    };

    this.deleteMarker = function(event) {

        //grab marker_id from button's container
         _annotate.existingMarkerID = $(event.currentTarget).parent().parent().attr('data-id');

         //get all non-selected markers, build json, clear map, and return data to map without deleted point
        _annotate.data.points = Mapper.map_components.storageMarkerLayer.toGeoJSON()
        _annotate.data.points.features = _annotate.data.points.features
               .filter(function (el) {
                        return el.properties.marker_id !== parseInt(_annotate.existingMarkerID);
                       });
        Mapper.map_components.storageMarkerLayer.clearLayers()
        Mapper.map_components.storageMarkerLayer.addData(_annotate.data.points)

        //remove from list
        $(event.currentTarget).parent().parent().remove();
         _annotate.existingMarkerID = null;
    };

    this.editMarker = function(event) {

        //check to make sure you're not already editing or creating a point
        if (_annotate.activeMarkerStatus) {
            alert('cannot edit while there is a marker being created or edited, please save or cancel');
        } else {
            //grab marker_id from button's container, and container
            _annotate.currentMarkerList = $(event.currentTarget).parent().parent();
            _annotate.existingMarkerID = $(event.currentTarget).parent().parent().attr('data-id');

            //block container being edited
            $(event.currentTarget).parent().parent().block({message: null});

            //pull out json of point being edited and return to active layer with normal point-creation behaviors (ie. dragging)
            _annotate.data.points = Mapper.map_components.storageMarkerLayer.toGeoJSON()
            _annotate.data.points.features = _annotate.data.points.features
                   .filter(function (el) {
                            return el.properties.marker_id == parseInt(_annotate.existingMarkerID);
                    });
            _annotate.marker = new L.marker(_annotate.data.points.features[0].geometry.coordinates.reverse(), {
                draggable: true });
            _annotate.marker.addTo(Mapper.map_components.activeMarkerLayer);
            _annotate.activeMarkerStatus = true;
            _annotate.marker.on('dragend', function(event) {
                Mapper.ui.els.markerLoc.text(_annotate.marker.toGeoJSON().geometry.coordinates.join(', '));
            });

            //rebuild left-side data form with existing data from point
            Mapper.ui.els.markerDesc[0].value = _annotate.data.points.features[0].properties.title;
            Mapper.ui.els.markerLoc.text(_annotate.marker.toGeoJSON().geometry.coordinates.join(', '));

            //rebuild json of all points except point being edited, clear layer, and rebuild storage layer
            _annotate.data.points = Mapper.map_components.storageMarkerLayer.toGeoJSON();
            _annotate.data.points.features = _annotate.data.points.features
                   .filter(function (el) {
                            return el.properties.marker_id !== parseInt( _annotate.existingMarkerID);
                           });
            Mapper.map_components.storageMarkerLayer.clearLayers();
            Mapper.map_components.storageMarkerLayer.addData(_annotate.data.points);
        };

  	}

}();
