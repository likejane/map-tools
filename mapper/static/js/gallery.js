Mapper.gallery = new function() {

	_gallery = this;

	this.galleryTemplate = '\
	<div data-id="{{id}}" data-name="{{name}}" data-notes="{{notes}}"  class="col col-2 mr2 mb3 galTemp">\
		<span class="bold block mb1">{{name}}</span>\
		<div class="map-background-prison-escape" style="width: 100%; height: 100px; background-color:gray;"></div>\
		<span class="copy-map-id button button--primary full-width mt1">Copy ID</span>\
    <span class="edit-map-btn button button--secondary full-width mt1">Edit Map</span>\
      </div>';


	this.init = function() {
		_gallery.loadData();
	}

	this.loadData = function() {
		$.ajax({
			url: "/api/maps",
			type: "GET",
			contentType: "application/json",
			done: _gallery.loadGallery
		}).done(_gallery.loadGallery);
	}

	this.loadGallery = function(gallery) {
		$.each(gallery, function(x, map) {
			var output = Mustache.render(_gallery.galleryTemplate, map);
    		Mapper.ui.els.mapGrid.append(output);
		});

		_gallery.addEvents();
	}

	this.addToGallery = function(params) {
		var output = Mustache.render(_gallery.galleryTemplate, params);
    	Mapper.ui.els.mapGrid.prepend(output);
    	$('.galTemp').first().hide().fadeIn('slow');

    	_gallery.addEvents();
	}

	this.addEvents = function() {
		Mapper.ui.selectEls();
		Mapper.ui.els.editMapBtn.click(_gallery.openMap);
		_gallery.copyIdSetup();
	}

	this.copyIdSetup = function() {
		var copyIdBtns = $('.copy-map-id'),
			clipBoard = new ZeroClipboard(copyIdBtns);

		clipBoard.on( "ready", function(readyEvent) {
			copyIdBtns.mousedown(function() {
				var elId = $(this).parent().attr('data-id');
				
				ZeroClipboard.setData({
				  "text/plain": elId,
				});
			});
		});
	}

	this.openMap = function() {
		var editBtn = $(this),
			parentEl = editBtn.parent(),
			mapId = parentEl.attr('data-id'),
			name = parentEl.attr('data-name'),
			notes = parentEl.attr('data-notes');

		Mapper.ui.els.mapCreator.show();
		Mapper.ui.els.mapTitle.val(name);
		Mapper.ui.els.mapNotes.val(notes);

		_ui.els.createNewMap.hide();
		_ui.els.savePublish.show();
		_ui.els.cancelMap.show();
		_ui.els.formInputs.val('');

		Mapper.map_id = mapId;
		Mapper.generate.init();

	}

	//http://api.tiles.mapbox.com/v4/examples.map-zr0njcqy/pin-s-bus+f44(-73.99,40.70,13)/-73.99,40.70,13/500x300.png?access_token=pk.eyJ1IjoicmFkZGRpYyIsImEiOiJkNmU0ZDNkZTg1ZmEzYzZjNGRmYWE0NDg2ODNlMzkxYyJ9.JuCOrEi6fdy9zRDW-lJo7A

}()
