# object diff

Get the minimal patch to extend literal object A with to transform it into
literal object B

Consider an object retrieved from a server:

```js
{
	name: 'Peter',
	age: 26,
	height: 187,
}
```

Now the user changes stuff using some frontend (e.g. a HTML form) and ends with:

```js
{
	name: 'Peter',
	age: 27,
	height: 186,
}
```

When they hit save, you only want to send off the changed parts to the servers,
to save bits (because you're indeed a programmer), but also to avoid any
unnecessary "merge conflicts" at the server.

Imagine two users changing the same object; if they did not change the exact
same keys of the object, the last user won't erase the first user's changes - in
a lot of cases, that's the expected behavior.

## Usage

```js
import diff from 'object-diff'

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

diff(a, b)
/*
{
	power: 22,
	level: undefined,
	weight: 10,
}
*/

// using a custom equality function

const past = '2016-04-24T10:39:23.419Z'

import custom from 'object-diff'
custom(
  (a, b) => {
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime()
    }
    return a === b
  },
  {
    then: new Date(past),
  },
  {
    then: new Date(past),
  },
)
/*
{}
*/
```

# Compatibility

Versions `0.0.4` and `1.0.0` are functionally equivalent, without known issues,
but are CommonJS modules and compatible with older runtimes.
