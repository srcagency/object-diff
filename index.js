'use strict';

module.exports = diff;

function diff(){
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

			if (c[key] !== ref[key])
				diff[key] = c[key];
		}
	}

	return diff;
}
