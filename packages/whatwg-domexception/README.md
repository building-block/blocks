# whatwg-domexception

[DOMException](https://heycam.github.io/webidl/#idl-DOMException) polyfill

[![NPM](https://img.shields.io/npm/v/@building-block/whatwg-domexception.svg?style=flat)](https://www.npmjs.com/package/@building-block/whatwg-domexception) [![Gzip Size](https://img.badgesize.io/https://unpkg.com/@building-block/whatwg-domexception/dist/xhrFetch.js?compression=gzip)](https://unpkg.com/@building-block/whatwg-domexception/)

### Installation

#### Using npm:

```sh
$ npm install --save @building-block/whatwg-domexception
```

#### Using yarn:

```sh
$ yarn add @building-block/whatwg-domexception
```

## Usage

```javascript
import { polyfill } from '@building-block/whatwg-domexception';

polyfill();
```

Alternatively, you can import the polyfill directly to run the side-effects:

```javascript
import '@building-block/whatwg-domexception/polyfill';
```

Try with [Runkit](https://npm.runkit.com/@building-block/whatwg-domexception)
