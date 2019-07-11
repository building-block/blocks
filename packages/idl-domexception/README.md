# idl-domexception

[DOMException](https://heycam.github.io/webidl/#idl-DOMException) polyfill

[![NPM](https://img.shields.io/npm/v/@building-block/idl-domexception.svg?style=flat)](https://www.npmjs.com/package/@building-block/idl-domexception) [![Gzip Size](https://img.badgesize.io/https://unpkg.com/@building-block/idl-domexception/dist/domException.js?compression=gzip)](https://unpkg.com/@building-block/idl-domexception/)

### Installation

#### Using npm:

```sh
$ npm install --save @building-block/idl-domexception
```

#### Using yarn:

```sh
$ yarn add @building-block/idl-domexception
```

## Usage

```javascript
import { polyfill } from '@building-block/idl-domexception';

polyfill();
```

Alternatively, you can import the polyfill directly to run the side-effects:

```javascript
import '@building-block/idl-domexception/polyfill';
```

Try with [Runkit](https://npm.runkit.com/@building-block/idl-domexception)
