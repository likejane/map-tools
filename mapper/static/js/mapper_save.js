Mapper.save = new function() {

	this.markerArray = []
	this.markerIds = 0

	this.init = function() {

	}

	this.saveMarker = function() {

		var lat = Mapper.ui.els.markerLat.text()
		var lng = Mapper.ui.els.markerLng.text()
		var desc = Mapper.ui.els.markerDescField.val()

		if (lat != '') {
	    	var markerData = {
	  			lat: lat,
	  			lng: lng,
	  			desc: desc,
	  			id: Mapper.save.markerIds
			};

			var output = Mustache.render("<div id='markerList{{id}}'><div class='markerListText'>{{id}} {{lat}} {{lng}} {{desc}}</div> <div class='markerDeleteButton'>delete</div></div>", markerData);
			Mapper.ui.els.markerList.append(output)
			Mapper.ui.els.markerDescField.val('description')
			Mapper.ui.els.markerLat.text('')
			Mapper.ui.els.markerLng.text('')

			Mapper.save.markerArray.push(markerData)
			Mapper.save.markerIds += 1
		} else {
			alert('please doubleclick to select point')
		}
    }

}();
