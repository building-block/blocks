import throttle from 'lodash.throttle';

interface ProgressTrackerConfig {
  throttleWait: number;
  [key: string]: any;
}

interface CurrentProgress {
  // total bytes to be transferred
  total?: number;
  // total bytes finished transfering
  finished?: number;
  // Overall percent; 0-100
  percent?: number;
  // Overall progress; 0-1
  progress?: number;
  // Total time elapsed in seconds
  elapsed: number;
  // Remaining time to completion in seconds
  remaining?: number;
  // Trnasfer speed in bytes/sec
  speed?: number;
  // Trnasfer speed in bits/sec
  bitrate?: number;
}

interface TransferEvent {
    // total bytes to be transferred
    total: number;
    // total bytes finished transfering
    finished: number;
    computable: boolean;
}

type MaybeProgressValue<T> = T | undefined;

export const fromXHREvent = (xhrEvent: ProgressEvent): TransferEvent => ({
  computable: xhrEvent.lengthComputable,
  finished: xhrEvent.loaded,
  total: xhrEvent.total,
});

export const createProgressTracker = ({
  throttleWait,
}: ProgressTrackerConfig = { throttleWait: 250 }) => {
  const started = Date.now();

  return throttle(({
    total,
    finished,
    computable = total > 0 && finished >= 0,
  }: TransferEvent): CurrentProgress => {
    let elapsed: number;

    let percent: MaybeProgressValue<number>;
    let speed: MaybeProgressValue<number>;
    let progress: MaybeProgressValue<number>;
    let remaining: MaybeProgressValue<number>;
    let bitrate: MaybeProgressValue<number>;

    elapsed = (Date.now() - started) / 1000;

    if (computable) {
      percent = Math.round((finished * 100) / total);

      // wait till values warm up
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
      total,
      finished,
      percent,
      progress,
      elapsed,
      remaining,
      speed,
      bitrate,
    };
  }, throttleWait);
};
