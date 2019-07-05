# track-progress

Track progress, bitrate (speed), remaining time from XHR upload & download events

<a href="https://www.npmjs.com/package/@building-block/track-progress"><img src="https://img.shields.io/npm/v/@building-block/track-progress.svg?style=flat" alt="npm"></a>
<a href="https://unpkg.com/@building-block/track-progress/"><img src="https://img.badgesize.io/https://unpkg.com/@building-block/track-progress/lib/xhrFetch.js?compression=gzip" alt="gzip size"></a>

## Usage

```javascript
import xhrFetch from '@building-block/xhr-fetch';
import trackProgress, { fromXHREvent } from '@building-block/track-progress';
import prettyMs from 'pretty-ms';


const trackUploadProgress = trackProgress();

const stats = trackUploadProgress(fromXHREvent(xhrEvent));
```

Try with [Runkit](https://npm.runkit.com/@building-block/track-progress)
