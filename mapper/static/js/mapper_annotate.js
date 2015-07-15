Mapper.annotate = new function() {

  _annotate = this;

  this.marker;

  this.markerLatLng = {};
  this.markerJSON = {};

  this.pinTemplate = '\
	<div class="col col-12 border-bottom pb1 mb2 display-flex">\
        <div class="mr3 flex-1">\
          <p><span class="text-gray--lightest mr1">Pin 1</span>({{geometry.coordinates}})</p>\
          <p class="mt1">{{properties.title}}</p>\
        </div>\
        <div class="vertical-center">\
          <a href="#">Edit</a><span class="mx1">|</span><a href="#">Delete</a>\
        </div>\
      </div>';

  this.init = function() {

  }

  this.addMarker = function(e) {

    _annotate.marker = new L.marker(e.latlng, {
      draggable: true
    });

    _annotate.marker.addTo(Mapper.map_components.activeMarkerLayer);


    Mapper.ui.els.markerLoc.text(_annotate.marker.getLatLng())




  }


  this.saveMarker = function() {

    if (Mapper.annotate.marker) {

      var markerJSON = Mapper.annotate.marker.toGeoJSON()

      //Update properties on the marker
      markerJSON.properties.title = Mapper.ui.els.markerDesc.val()

      Mapper.map_components.activeMarkerLayer.removeLayer(Mapper.annotate.marker);
      Mapper.map_components.storageMarkerLayer.addData(markerJSON);

      _annotate.addPinTemplate(markerJSON);


    } else {
      alert('please doubleclick to select point')
    }



  }
  this.addPinTemplate = function(marker) {
    var output = Mustache.render(this.pinTemplate, marker);
    Mapper.ui.els.savedPins.append(output);
  };


}();
