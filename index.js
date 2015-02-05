'use strict';

export default function( ref, ...cs ){
	let diff = {};

	for (let c of cs) {
		let keys = Object.keys(c);

		for (let key of keys) {
			if (c[key] !== ref[key])
				diff[key] = c[key];
		}
	}

	return diff;
}
