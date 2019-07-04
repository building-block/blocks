# xhr-track-progress

Track progress, bitrate (speed), remaining time from XHR upload & download events

<a href="https://www.npmjs.com/package/@building-block/xhr-track-progress"><img src="https://img.shields.io/npm/v/@building-block/xhr-track-progress.svg?style=flat" alt="npm"></a>
<a href="https://unpkg.com/@building-block/xhr-track-progress/"><img src="https://img.badgesize.io/https://unpkg.com/@building-block/xhr-track-progress/lib/xhrFetch.js?compression=gzip" alt="gzip size"></a>

## Usage

```javascript
import fetch from '@building-block/xhr-fetch';
import trackProgress, { fromXHREvent } from '@building-block/xhr-track-progress';

const stats = trackProgress(fromXHREvent(xhrEvent));
```

Try with [Runkit](https://npm.runkit.com/@building-block/xhr-track-progress)
