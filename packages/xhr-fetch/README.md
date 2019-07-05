# xhr-fetch

XHR-powered fetch implementation with extras

<a href="https://www.npmjs.com/package/@building-block/xhr-fetch"><img src="https://img.shields.io/npm/v/@building-block/xhr-fetch.svg?style=flat" alt="npm"></a>
<a href="https://unpkg.com/@building-block/xhr-fetch/"><img src="https://img.badgesize.io/https://unpkg.com/@building-block/xhr-fetch/lib/xhrFetch.js?compression=gzip" alt="gzip size"></a>

Although `fetch` is a relatively low-level API and in most cases more complete than XMLHttpRequest, it does not provide an API for request progression. A proposal for [`FetchObserver`](https://github.com/whatwg/fetch/issues/607) is being
worked on but currently it is not possible to implement request progression using just `fetch`.

`xhr-fetch` provides a `fetch`-like interface, enough to make it a viable replacement for `XMLHttpRequest`, that also implements a non-standard request and response progression API.

If response progression is all you need, `fetch` does provide a low-level API for [response progression](https://fetch.spec.whatwg.org/#fetch-api). In that case we recommend that you stick with the standards unless you prefer a higher level abstraction.

### Installation

#### Using npm:

```sh
$ npm install --save @building-block/xhr-fetch
```

#### Using yarn:

```sh
$ yarn add @building-block/xhr-fetch
```


## Usage

```javascript
import xhrFetch from '@building-block/xhr-fetch';

xhrFetch('https://postman-echo.com/put', {
  method: 'PUT',
  headers: { /* headers */ },
  body: { /* body */ },
  onDownloadProgress = (xhrEvent) => {
    console.log('Upload progression', xhrEvent);
  },
  onUploadProgress = (xhrEvent) => {
    console.log('Download progression', xhrEvent);
  },
});
```

Try with [Runkit](https://npm.runkit.com/@building-block/xhr-fetch)

### Tracking progress

To provide a better user experience, you might want to display progression over time such as bitrate (speed), remaining time, transferred bytes, and overall transfer progress, you can use [@building-block/track-progress](../track-progress).

## Caveats

### Aborting requests

`xhr-fetch` supports the abortable fetch API. However, on the client-side, aborting a fetch requires additional DOM APIs: AbortController and AbortSignal. You will need to include an additional polyfill to include these APIs.

```javascript
import xhrFetch from '@building-block/xhr-fetch';

const controller = new AbortController();

xhrFetch('/endpoint', {
  signal: controller.signal,
}).catch((error) => {
  if (error.name === 'AbortError') {
    console.log('Aborted');
  }
});

controller.abort();
```

### Looking for a `fetch` polyfill?

This package is not meant to replace `fetch`. If you're looking for a fetch polyfill, you should use
[whatwg-fetch](https://github.com/github/fetch). If you are looking to use fetch in Node.js, you can
with [node-fetch](https://github.com/bitinn/node-fetch). In universal environments, you can replace
whatwg-fetch and node-fetch with just [cross-fetch](https://github.com/lquixada/cross-fetch).
