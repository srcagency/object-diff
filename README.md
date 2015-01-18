# object diff

Get the minimal patch to extend objectA with to transform it into objectB

[![npm version][npm-image]][npm-url]

Consider an object retrieved from a server:

```js
{
	name: 'Peter',
	age: 26,
	height: 187,
}
```

Now the user changes stuff using some frontend (e.g. a HTML form) and ends
with:

```js
{
	name: 'Peter',
	age: 27,
	height: 186,
}
```

When he hits save, you only want to send off the changed parts to the servers,
to save bits (because you're indeed a programmer), but also to avoid any
unnecessary "merge conflicts" at the server.

Imagine two users changing the same object; if they did not change the exact
same keys of the object, the last user won't erase the first user's changes -
in a lot of cases, that's the expected behavior.

## Install

```
npm install object-diff
```

## Usage

```js
var diff = require('object-diff');

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

diff(a, b);
/*
{
	power: 22,
	level: undefined,
	weight: 10,
}
*/
```

## License

[MIT](http://opensource.org/licenses/MIT) ©
[src.agency](http://src.agency) / Thomas Jensen
[npm-image]: https://img.shields.io/npm/v/object-diff.svg?style=flat
[npm-url]: https://npmjs.org/package/object-diff
