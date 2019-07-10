import throttle from 'lodash.throttle';

export const fromXHREvent = (xhrEvent: any) => {
  const computable: boolean = xhrEvent.lengthComputable;
  const finished: number = xhrEvent.position || xhrEvent.loaded;
  const total: number = xhrEvent.totalSize || xhrEvent.total;

  return {
    computable,
    finished,
    total,
  };
};

export const createProgressTracker = ({
  throttleWait,
} = { throttleWait: 250 }) => {
  const started = Date.now();

  return throttle(({
    total,
    finished,
    computable = true,
  }) => {
    let percent;
    let speed;
    let progress;
    let remaining;
    let elapsed;
    let bitrate;

    if (computable) {
      percent = Math.round((finished * 100) / total);

      elapsed = (Date.now() - started) / 1000;

      if (elapsed >= 1) {
        speed = finished / elapsed;
      }

      if (total) {
        progress = Math.min(finished, total) / total;

        if (speed) {
          bitrate = speed / 8;
          remaining = 0;

          if (percent < 100) {
            remaining = (total / speed) - elapsed;
            remaining = Number(remaining.toFixed(4));
          }
        }
      }
    }

    return {
      // total bytes to be transferred
      total,
      // total bytes finished transfering
      finished,
      // Overall percent; 0-100
      percent,
      // Overall progress; 0-1
      progress,
      // Total time elapsed in seconds
      elapsed,
      // Remaining time to completion in seconds
      remaining,
      // Trnasfer speed in bytes/sec
      speed,
      // Trnasfer speed in bits/sec
      bitrate,
    };
  }, throttleWait);
};
