'use strict';

var objectDiff = require('./');
var test = require('tape');

test(function( t ) {
	var a = {
		speed: 4,
		power: 54,
		height: undefined,
		level: 1,
	};

	var b = {
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

	var c = {
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

test(function( t ) {
	var date1 = new Date();
	var date2 = new Date(date1);

	var a = {
		speed: 4,
		power: 54,
		height: undefined,
		level: 1,
		date: date1
	};

	var b = {
		speed: 4,			// unchanged
		power: 22,			// changed
		level: undefined,	// changed
		weight: 10,		// added
		date: date2		// unchanged
	};

	t.deepEqual(objectDiff(a, b), {
		power: 22,
		level: undefined,
		weight: 10,
		date: date2	// not support Date compare.
	});

	var myObjectDiff = objectDiff.create({
		equal: function diff (a, b) {
			// support Date compare.
			if (a instanceof Date && b instanceof Date) {
				return a.getTime() === b.getTime();
			}

			return a === b;
		}
	});

	t.deepEqual(myObjectDiff(a, b), {
		power: 22,
		level: undefined,
		weight: 10
	});

	t.end();
});
