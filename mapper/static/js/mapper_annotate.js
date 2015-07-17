Mapper.annotate = new function() {

    _annotate = this;

    this.marker; //points to active mapbox marker object
    this.currentMarkerList; //points to container div of
    this.activeMarkerStatus; //booleen, whether there is an extive marker being created
    this.existingMarkerID; //holds marker_id of marker being edited or deleted
    this.data = {}; //data holder for saving manipulated json's before being sent back into mapbox
    this.markerJSON = {}; //holds json of active marker to allow for saving to storage later
    this.markerJSONrevert = {}; //holds an unedited state of the active layer during edits for canceling
    this.markerLocText = 'Double-click to create pin'; // Store the marker help text

    this.pinTemplate = '\
    <div data-id="{{properties.marker_id}}" class="map-card col col-12 border-bottom p1 pb2 mb2 display-flex">\
        <div class="mr3 flex-1">\
          <p><span class="text-gray--lightest mr1">Pin coords:</span>({{geometry.coordinates}})</p>\
          <p class="mt1 type-4">{{properties.title}}</p>\
        </div>\
        <div class="vertical-center">\
          <a class="markerEditBtn">Edit</a><span class="mx1">|</span><a class="markerDeleteBtn">Delete</a>\
        </div>\
      </div>';

    this.init = function() {

    };

    this.resetMarkerLoc = function() {
      Mapper.ui.els.markerLoc.text(_annotate.markerLocText);
      Mapper.ui.els.markerLoc[0].classList.add('text-gray--lightest');
    };

    this.setMarkerLoc = function() {
      Mapper.ui.els.markerLoc.text(_annotate.marker.toGeoJSON().geometry.coordinates.join(', '));
      Mapper.ui.els.markerLoc[0].classList.remove('text-gray--lightest');
    };    

    this.cancelMarker = function() {
        if (_annotate.existingMarkerID) {
            _annotate.markerJSONrevert.geometry.coordinates = _annotate.markerJSONrevert.geometry.coordinates.reverse();
            Mapper.map_components.storageMarkerLayer.addData(_annotate.markerJSONrevert);
            $('.blockUI').remove();
        };
        Mapper.map_components.activeMarkerLayer.removeLayer(Mapper.annotate.marker);
        _annotate.resetMarkerLoc();
        Mapper.ui.els.markerDesc[0].value = '';
        markerSaveBtn.textContent = 'Add Pin';
        _annotate.activeMarkerStatus = false;
        _annotate.existingMarkerID = null;
    };

    this.addMarker = function(e) {
        if (_annotate.activeMarkerStatus == true) {
            _annotate.marker.setLatLng(e.latlng);
            Mapper.ui.els.markerLoc.text(_annotate.marker.toGeoJSON().geometry.coordinates.join(', '));
        } else {
            _annotate.marker = new L.marker(e.latlng, {
                draggable: true });

            _annotate.marker.addTo(Mapper.map_components.activeMarkerLayer);
            _annotate.activeMarkerStatus = true;

            _annotate.setMarkerLoc();
            _annotate.marker.on('dragend', function(event) {
                Mapper.ui.els.markerLoc.text(_annotate.marker.toGeoJSON().geometry.coordinates.join(', '));
            });

        };

    };


    this.saveMarker = function() {

        if (_annotate.activeMarkerStatus == true && Mapper.ui.els.markerDesc[0].value !== "") {

            _annotate.markerJSON = Mapper.annotate.marker.toGeoJSON()
            _annotate.markerJSON.properties.title = Mapper.ui.els.markerDesc.val()

            // choose different behavior if editing or adding

            if (_annotate.existingMarkerID != null) {
                _annotate.markerJSON.properties.marker_id = parseInt(_annotate.existingMarkerID);
                _annotate.existingMarkerID = null;
                _annotate.editPinTemplate(_annotate.markerJSON);
            } else {
                _annotate.markerJSON.properties.marker_id = Mapper.generate.markerCounter;
                Mapper.generate.markerCounter += 1;
                _annotate.addPinTemplate(_annotate.markerJSON);
            };

            //remove from active layer and add to storage layer
            Mapper.map_components.activeMarkerLayer.removeLayer(Mapper.annotate.marker);
            Mapper.map_components.storageMarkerLayer.addData(_annotate.markerJSON);

            _annotate.activeMarkerStatus = false;

            //clear left-side editing console
            _annotate.resetMarkerLoc();
            Mapper.ui.els.markerDesc[0].value = '';

            markerSaveBtn.textContent = 'Add Pin';
            Mapper.ui.els.savedPins.addClass('saved-pin-card-border');


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

            //block container being edited and change 'add pin' button to 'save pin'
            $(event.currentTarget).parent().parent().block({message: null});
            markerSaveBtn.textContent = 'Save';

            //pull out json of point being edited and return to active layer with normal point-creation behaviors (ie. dragging)
            _annotate.data.points = Mapper.map_components.storageMarkerLayer.toGeoJSON()

            _annotate.data.points.features = _annotate.data.points.features
                   .filter(function (el) {
                            return el.properties.marker_id == parseInt(_annotate.existingMarkerID);
                    });

            _annotate.markerJSONrevert = _annotate.data.points.features[0]; //saved version for reverting via cancel

            _annotate.marker = new L.marker(_annotate.data.points.features[0].geometry.coordinates.reverse(), {
                draggable: true });
            _annotate.marker.addTo(Mapper.map_components.activeMarkerLayer);
            _annotate.activeMarkerStatus = true;
            _annotate.marker.on('dragend', function(event) {
              _annotate.setMarkerLoc();
            });

            //rebuild left-side data form with existing data from point
            Mapper.ui.els.markerDesc[0].value = _annotate.data.points.features[0].properties.title;
            
            _annotate.setMarkerLoc();

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
