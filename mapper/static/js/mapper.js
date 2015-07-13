var Mapper = new function() {

	_map = this;
	this.els= {}

	this.init = function() {
		_map.els.savebtn = $('savebtn');

		_map.save.init();
	}


}();
Mapper.init();