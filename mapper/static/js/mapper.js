var Mapper = new function() {

	_map = this;
	this.els= {}
	this.map_components = {
		map: null,
		markerGroup: null
	}

	this.init = function() {
		Mapper.generate.init();
	}


}();

$(document).ready(function() {
	Mapper.init();
});
