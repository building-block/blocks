# track-progress

Track progress, bitrate (speed), remaining time from XHR upload & download events

[![NPM](https://img.shields.io/npm/v/@building-block/track-progress.svg?style=flat)](https://www.npmjs.com/package/@building-block/track-progress) [![Gzip Size](https://img.badgesize.io/https://unpkg.com/@building-block/track-progress/dist/trackProgress.js?compression=gzip)](https://unpkg.com/@building-block/track-progress/)

### Installation

#### Using npm:

```sh
$ npm install --save @building-block/track-progress
```

#### Using yarn:

```sh
$ yarn add @building-block/track-progress
```

## Usage

```javascript
import xhrFetch from '@building-block/xhr-fetch';
import { createProgressTracker, fromXHREvent } from '@building-block/track-progress';

const trackUploadProgress = createProgressTracker();

response = await xhrFetch('/upload', {
  method: 'PUT',
  /* ... */
  onUploadProgress: xhrEvent => {
    const stats = trackUploadProgress(fromXHREvent(xhrEvent));
    /* ... */
  },
});
```

Try with [Runkit](https://npm.runkit.com/@building-block/track-progress)
