Mapper.cms = new function() {

	_cms = this;

	this.init = function() {
		$.ajax({
			url: "/api/maps",
			type: "GET",
			contentType: "application/json",
		}).done(_cms.addDropDownOptions);
	}

	this.addDropDownOptions = function(params) {
		$.each(params, function(x, map) {
			Mapper.ui.els.mapSelect.append('<option>' + map.name + '</option>')
		})
	}
}()