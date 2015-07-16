Mapper.view = new function() {

  _view = this;

	this.loadData = function() {
		$.ajax({
        dataType: "json",
        url: "/api/maps/"+Mapper.map_id}
		).done(
			function(data) {
				console.log(data);
        Mapper.ui.els.mapCreator.show();
        Mapper.ui.els.mapTitle.val(data.name);
    		Mapper.ui.els.mapNotes.val(data.notes);
        Mapper.generate.init(Mapper.map_id);
  			});
	}

  this.generateEditView = function() {
			_ui.els.editMapBtn.show();
			_ui.els.savePublish.hide();
			_ui.els.markerDesc.hide();
      _ui.els.markerLoc.hide();
			_ui.els.markerSaveButton.hide();
  		_ui.els.markerCancelBtn.hide();
			_ui.els.cancelEditMap.hide();
      _ui.els.savedPins.hide();
  }
}
