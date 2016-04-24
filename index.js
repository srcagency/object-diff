'use strict';

var defaults = {
	equal: function (a, b) {
		return a === b;
	}
};

function create(options) {
	var equal = options && options.equal || defaults.equal;

	return function diff(){
		var length = arguments.length;
		var ref = arguments[0];
		var diff = {};
		var c;
		var keys;
		var keysLength;
		var key;
		var u;

		for (var i = 1;i < length;i++) {
			c = arguments[i];
			keys = Object.keys(c);
			keysLength = keys.length;

			for (u = 0;u < keysLength;u++) {
				key = keys[u];

				if (! equal(c[key], ref[key]))
					diff[key] = c[key];
			}
		}

		return diff;
	}
}


var diff = create(defaults);
diff.create = create;

module.exports = diff;
