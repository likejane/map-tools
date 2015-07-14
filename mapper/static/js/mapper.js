var Mapper = new function() {

	_map = this;
	this.els= {}
	this.form_components = {
		coords: null
	}
	this.map_components = {
		map: null,
		markerGroup: null
	}

	this.init = function() {
		Mapper.ui.init();
		Mapper.generate.init();
	}


}();

$(document).ready(function() {
	Mapper.init();
});
