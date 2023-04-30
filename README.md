# Raindeer
> Because websites aren't bloated enough as it is

[![NPM Version][npm-version-badge]][npm-url]
[![Downloads Stats][npm-downloads-badge]][npm-url]

## What's it all about?
Raindeer (not to be confused with
[reindeer](https://en.wikipedia.org/wiki/Reindeer)) is a rather small package
that takes a list of emojis and make them rain all over your website.

Demo: https://codepen.io/scriptcoded/pen/ZEqJPKd

## Installation

Install with Yarn:
```bash
yarn add raindeer
```
Install with NPM:
```bash
npm install raindeer
```
UMD script:
```html
<script src="https://unpkg.com/raindeer"></script>
```

## Usage

A simple and pretty "useful" use case is to make things rain whenever anything
is clicked.

```js
document.addEventListener('click', function () {
  EmojiRain.start(document.body, {
    duration: 2,
    dropSize: 40,
    emoji: {
      '😄': 5,
      '🍰': 1
    }
  })
})
```

These are the options that can be given to `EmojiRain.start`:

| Option | Default value | Type | Description |
| ------ | ------------- | ---- | ----------- |
| `emoji` | *Required* | `String \| Array \| Object` | Set to a single emoji as a string to make only that emoji rain. Set to an array of emoji strings to make those emoji rain equally much. Set to an object where the keys are emoji and the value is the likeliness of that emoji raining. |
| `duration` | `0` | `Number` | The duration of the rain. If set to 0 the rain will go on until `EmojiRain.stop()` is called. |
| `dropsPerSecond` | `10` | `Number` | How many drops to create per second |
| `dropSize` | `20` | `Number` | The size of the drops. This actually controls the font size in `px` of the emoji. |
| `speedMin` | `500` | `Number` | The minimum time allowed for a drop to travel across the screen. |
| `speedMax` | `1000` | `Number` | The minimum time allowed for a drop to travel across the screen. |
| `rotationStartMin` | `-90` | `Number` | The minimum allowed start rotation for a drop. |
| `rotationStartMax` | `-180` | `Number` | The maximum allowed start rotation for a drop. |
| `rotationDistanceMin` | `0` | `Number` | The minimum allowed rotation distance for a drop. |
| `rotationDistanceMax` | `45` | `Number` | The maximum allowed rotation distance for a drop. |
| `resolution` | `2` | `Number` | The amount of times that new drops will be created each second. This shouldn't need to be increased and could potentially have a high performance impact. |

## Contributing

See the [contribution guidelines](CONTRIBUTING.md).

## Tests

There are currently no tests. I'll make sure to add some when I get the time.

## Code style

We use [ESLint](https://eslint.org/) for making sure that our code remains pretty and consistent throughout the project. If your editor doesn't automatically pick up our config you can lint the code using `npm run lint`.

## Additional information

Malcolm Nihlén - malcolm.nihlen@gmail.com

Distributed under the MIT licence. See `LICENCE` for more information.

https://github.com/scriptcoded

[npm-version-badge]: https://img.shields.io/npm/v/raindeer.svg
[npm-downloads-badge]: https://img.shields.io/npm/dm/raindeer.svg
[npm-url]: https://npmjs.org/package/raindeer
