'use strict';

export default function( r, ...cs ){
	let d = {};

	for (let c of cs) {
		let keys = Object.keys(c);

		for (let key of keys) {
			if (c[key] !== r[key])
				d[key] = c[key];
		}
	}

	return d;
}
