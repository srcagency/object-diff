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
	/* Date */
	if (a instanceof Date && !(b instanceof Date)) return false;
	else if (!(a instanceof Date) && b instanceof Date) return false;
	else if (a instanceof Date && b instanceof Date)
		return a.getTime() === b.getTime();

	/* Array */
	else if (Array.isArray(a) && !Array.isArray(b)) return false;
	else if (!Array.isArray(a) && Array.isArray(b)) return false;
	else if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length != b.length) return false;
		for (var i = 0; i < a.length; i++) {
			if (a[i] != b[i]) return false;
		}

		return true;
	}
	/* Object */
	else if (typeof a === 'object' && typeof b !== 'object') return false;
	else if (typeof a !== 'object' && typeof b === 'object') return false;
	else if (typeof a == 'object' && typeof b === 'object') {
		var keysA = Object.keys(a);
		var keysB = Object.keys(b);
		if (keysA.length != keysB.length) return false;
		for (var i = 0; i < keysA.length; i++) {
			if (typeof b[keysA[i]] === 'undefined') return false;
			if (!isStrictEqual(a[keysA[i]], b[keysA[i]])) return false;
		}

		for (var i = 0; i < keysB.length; i++) {
			if (typeof a[keysB[i]] === 'undefined') return false;
			if (!isStrictEqual(a[keysB[i]], b[keysB[i]])) return false;
		}

		return true;
	}

	/* Value */
	return a === b;
}
