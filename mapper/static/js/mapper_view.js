Mapper.view = new function() {

  _view = this;
  var map_id = Mapper.map_id

	this.loadData = function(map_id) {
		$.ajax({
        dataType: "json",
        url: "/api/maps/"+Mapper.map_id+"?include=points"}
		).done(
			function(data) {
				console.log(data);
        Mapper.ui.els.mapTitle.text(data.name);
        Mapper.ui.els.Notes.text(data.notes);
  			});
	}

}
