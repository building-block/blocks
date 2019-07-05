# track-progress

Track progress, bitrate (speed), remaining time from XHR upload & download events

<a href="https://www.npmjs.com/package/@building-block/track-progress"><img src="https://img.shields.io/npm/v/@building-block/track-progress.svg?style=flat" alt="npm"></a>
<a href="https://unpkg.com/@building-block/track-progress/"><img src="https://img.badgesize.io/https://unpkg.com/@building-block/track-progress/lib/trackProgress.js?compression=gzip" alt="gzip size"></a>

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
import prettyMs from 'pretty-ms';


const trackProgress = createProgressTracker();

const stats = trackProgress(fromXHREvent(xhrEvent));
```

Try with [Runkit](https://npm.runkit.com/@building-block/track-progress)
