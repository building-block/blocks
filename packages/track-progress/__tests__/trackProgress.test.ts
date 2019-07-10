import { advanceBy, advanceTo, clear } from 'jest-date-mock';
import { createProgressTracker } from '../src/trackProgress';

describe('@building-block/track-progress', () => {
  it('should pass sanity check', () => {
    expect(true).toBe(true);
  });

  it('correctly tracks progress', () => {
    advanceTo(new Date(2019, 6, 10, 0, 0, 0));

    const trackProgress = createProgressTracker({ throttleWait: 0 });
    const oneMinute = 60 * 1000;
    const oneMebibyte = 1024 * 1024;

    expect(trackProgress({ total: oneMebibyte, finished: 0 })).toMatchObject({
      bitrate: undefined,
      elapsed: 0,
      finished: 0,
      percent: 0,
      progress: 0,
      remaining: undefined,
      speed: undefined,
      total: oneMebibyte,
    });

    advanceBy(oneMinute / 2);

    expect(trackProgress({ total: oneMebibyte, finished: oneMebibyte / 2 })).toMatchObject({
      bitrate: 2184.5333333333333,
      elapsed: oneMinute / 2 / 1000,
      finished: oneMebibyte / 2,
      percent: 50,
      progress: 0.5,
      remaining: oneMinute / 2 / 1000,
      speed: 2184.5333333333333 * 8,
      total: oneMebibyte,
    });

    advanceBy(oneMinute / 2);

    expect(trackProgress({ total: oneMebibyte, finished: oneMebibyte })).toMatchObject({
      bitrate: 2184.5333333333333,
      elapsed: oneMinute / 1000,
      finished: oneMebibyte,
      percent: 100,
      progress: 1,
      remaining: 0,
      speed: 2184.5333333333333 * 8,
      total: oneMebibyte,
    });
  });
});
