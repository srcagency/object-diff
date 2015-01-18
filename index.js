'use strict';

export default function(){
	let ref = arguments[0];
	let diff = {};

	for (let c of arguments) {
		let keys = Object.keys(c);

		for (let key of keys) {
			if (c[key] !== ref[key])
				diff[key] = c[key];
		}
	}

	return diff;
}
