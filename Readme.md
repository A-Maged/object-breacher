# Object Breacher

The Fastest library to get and set nested values in objects using a path

# Benchmarks

###### Benchmarked againest:

- lodash
- @hapi/hoek
- dot-prop
- object-path
- nested-property

<img width="550" src="https://github.com/A-Maged/object-breacher/blob/main/screenshot.png?raw=true" alt="Benchmarks">

Checkout [the script](https://github.com/A-Maged/object-breacher/blob/main/bench.js) used to do this benchmark test

## Install:

##### NPM:

```bash
npm install object-breacher
```

##### Yarn:

```bash
yarn add object-breacher
```

## USAGE

### Import:

```js
import { get, set } from "object-breacher";
// or
const { get, set } = require("object-breacher");
```

### `Get`

Access nested value.

`Params:`

- obj: `Object`
- path: `String` | `Array`
- options?: `TGetOptions`
  - `defaultValue?: String`
  - `pathSeparator?: String`

```js
/* This can be any object */
let routes = {
  app: {
    root: '/app',
    home: {
      test: '/home/test',
    },
  },
};

const homeUrl = get(routes, 'app.home.test');

const homeUrl = get(routes, 'app#home#test', {
  defaultValue: '/';
  pathSeparator: '#';
});

```

### `Set`

Change nested values dynamically.

`Params:`

- obj: `Object`
- path: `String` | `Array`
- value: `any`
- options?: `TSetOptions`
  - `pathSeparator?: String`

```js
set(routes, "app.home.test", "YOUR VALUE HERE");

/* With Options */
set(routes, "app/home/settings", "/settings", {
  pathSeparator: "/",
});

/* Not supplying an object will create a new object with the keys and value specified */
set("app.home.test", "worked!"); // {app: {home: {test: 'worked!'}}}

/* Value can be of any type */
set(routes, "wink.face", ["😉", ";-)"]);

set(routes, "auth", {
  login: {
    index: "/auth/login",
    facebook: "/auth/login/facebook",
  },
});
```
