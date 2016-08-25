# Gobblefunk

Rename all the variables in a JavaScript file with a Markov chain based on silly words from Dr. Seuss, Lewis Caroll, and Roald Dahl books. Works within appropriate variable scopes. Detects and preserves camelCase/TitleCase/snake_case whenever possible.

## Installation

Install for programmatic usage:

```
npm install gobblefunk
```

Install for command line usage:

```
npm install -g gobblefunk
```

## Usage

```js
var gobblefunk = require("gobblefunk"),
    fs = require("fs");

var js = fs.readFileSync("my-script.js", "utf8");

fs.writeFileSync("gobblefunked.js", gobblefunk(js));
```

```js
// my-script.js
function multiply(a, b) {
  return a * b;
}

// gobblefunked.js
function struffulate(fizzlenut, mazurka) {
  return fizzlenut * mazurka;
}
```

## Command line usage

```sh
gobblefunk my-script.js > gobblefunked.js
```

Or pipe it:

```sh
cat my-script.js | gobblefunk > gobblefunked.js
```

## Options

There are no options.
