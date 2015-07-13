Mapper.save = new function() {

	this.markerArray = []

	this.init = function() {

	}

	this.saveMarker = function() {

		var lat = Mapper.ui.els.markerLat.text()
		var lng = Mapper.ui.els.markerLng.text()
		var desc = Mapper.ui.els.markerDescField.val()

    	var markerData = {
  			lat: lat,
  			lng: lng,
  			desc: desc
		};

		var output = Mustache.render("{{lat}} {{lng}} {{desc}}<br/>", markerData);
		Mapper.ui.els.markerList.append(output)
		Mapper.ui.els.markerDescField.val('description')
		Mapper.ui.els.markerLat.text('')
		Mapper.ui.els.markerLng.text('')

		Mapper.save.markerArray.push(markerData)
    }

}();
