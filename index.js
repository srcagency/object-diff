'use strict';

strict.custom = custom;

module.exports = strict;

function strict(){
	return diff(null, [].slice.call(arguments, 0));
}

function custom( opts ){
	return diff(opts, [].slice.call(arguments, 1));
}

function diff( opts, subjects ){
	var length = subjects.length;
	var ref = subjects[0];
	var diff = {};
	var equal = opts && opts.equal || isStrictEqual;
	var c;
	var keys;
	var keysLength;
	var key;
	var u;

	for (var i = 1;i < length;i++) {
		c = subjects[i];
		keys = Object.keys(c);
		keysLength = keys.length;

		for (u = 0;u < keysLength;u++) {
			key = keys[u];

			if (!equal(c[key], ref[key]))
				diff[key] = c[key];
		}
	}

	return diff;
}

function isStrictEqual( a, b ){
	return a === b;
}
