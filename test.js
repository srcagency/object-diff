'use strict';

var diff = require('./');
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

	t.deepEqual(diff(a, b), {
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

	t.deepEqual(diff(a, b, c), {
		speed: 5,
		power: 22,
		level: 100,
		weight: 10,
		material: 'steel',
	});

	t.deepEqual(diff({}, {}), {});

	t.end();
});

test('Custom equality', function( t ) {
	var created = '2016-04-24T10:39:23.419Z';
	var now = new Date();

	var a = {
		created: new Date(created),
		updated: new Date(created),
	};

	var b = {
		created: new Date(created),	// unchanged
		updated: now,				// changed
	};

	t.deepEqual(diff(a, b), {
		created: new Date(created),
		updated: now,
	}, 'expected default behavior');

	t.deepEqual(diff.custom({
		equal: dateAwareComparator,
	}, a, b), {
		updated: now,
	});

	t.end();
});

function dateAwareComparator( a, b ){
	if (a instanceof Date && b instanceof Date)
		return a.getTime() === b.getTime();

	return a === b;
}
