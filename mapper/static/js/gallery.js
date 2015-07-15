Mapper.gallery = new function() {

	_gallery = this;

	this.galleryTemplate = '\
	<div style="width: 200px">\
		<span>{{name}}</span>\
		<div style="width: 100%; height: 100px; background-color:gray;"></div>\
		<div style="padding:10px; margin: 10px 0; border-radius:5px;width: 100%; border: 1px solid blue;">Copy Map Id Code</div>\
		<div style="padding:10px; margin: 10px 0; border-radius:5px;width: 100%; border: 1px solid blue;">Edit Map</div>\
      </div>';


	this.init = function() {
		_gallery.loadData();
	}

	this.loadData = function() {
		$.ajax({
			url: "/api/maps/",
			type: "GET",
			contentType: "application/json",
			done: _gallery.loadGallery
		}).done(_gallery.loadGallery);
	}

	this.loadGallery = function(gallery) {
		$.each(gallery, function(x, map) {
			console.log('map', map);
			var output = Mustache.render(_gallery.galleryTemplate, map);
    		Mapper.ui.els.mapGrid.append(output);
		})
	}

	//http://api.tiles.mapbox.com/v4/examples.map-zr0njcqy/pin-s-bus+f44(-73.99,40.70,13)/-73.99,40.70,13/500x300.png?access_token=pk.eyJ1IjoicmFkZGRpYyIsImEiOiJkNmU0ZDNkZTg1ZmEzYzZjNGRmYWE0NDg2ODNlMzkxYyJ9.JuCOrEi6fdy9zRDW-lJo7A
	
}()