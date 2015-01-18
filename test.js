'use strict';

import objectDiff from './';
import test from 'tape';

test(function( t ) {
	let a = {
		speed: 4,
		power: 54,
		height: undefined,
		level: 1,
	};

	let b = {
		speed: 4,			// unchanged
		power: 22,			// changed
		level: undefined,	// changed
		weight: 10,			// added
	};

	t.deepEqual(objectDiff(a, b), {
		power: 22,
		level: undefined,
		weight: 10,
	});

	let c = {
		speed: 5,				// changed
		power: 54,				// unchanged
		level: 100,				// changed
		material: 'steel',		// added
		location: undefined,	// added but undefined
	};

	t.deepEqual(objectDiff(a, b, c), {
		speed: 5,
		power: 22,
		level: 100,
		weight: 10,
		material: 'steel',
	});

	t.end();
});
