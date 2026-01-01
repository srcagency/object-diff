import {default as diff, custom} from './index.js'
import test from 'tape'

test((t) => {
	const a = {
		speed: 4,
		power: 54,
		height: undefined,
		level: 1,
	}
	const b = {
		speed: 4, // unchanged
		power: 22, // changed
		level: undefined, // changed
		weight: 10, // added
	}

	t.deepEqual(diff(a, b), {
		power: 22,
		level: undefined,
		weight: 10,
	})

	const c = {
		speed: 5, // changed
		power: 54, // unchanged
		level: 100, // changed
		material: 'steel', // added
		location: undefined, // added but undefined
	}

	t.deepEqual(diff(a, b, c), {
		speed: 5,
		power: 22,
		level: 100,
		weight: 10,
		material: 'steel',
	})
	t.deepEqual(diff({}, {}), {})
	t.end()
})

test('Custom equality', (t) => {
	const created = '2016-04-24T10:39:23.419Z'
	const now = new Date()

	const a = {
		created: new Date(created),
		updated: new Date(created),
	}

	const b = {
		created: new Date(created), // unchanged
		updated: now, // changed
	}

	t.deepEqual(
		diff(a, b),
		{
			created: new Date(created),
			updated: now,
		},
		'expected default behavior',
	)

	t.deepEqual(custom(dateAwareComparator, a, b), {
		updated: now,
	})

	t.end()
})

function dateAwareComparator(a, b) {
	if (a instanceof Date && b instanceof Date) {
		return a.getTime() === b.getTime()
	}

	return a === b
}
