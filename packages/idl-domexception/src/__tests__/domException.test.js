import { polyfill } from '../domException';

describe('@building-block/idl-domexception', () => {
  beforeAll(() => {
    // Delete DOMException from jsdom
    delete window.DOMException;
  });

  it('should pass sanity check', () => {
    expect(true).toBe(true);
  });

  it('polyfills', () => {
    expect(window.DOMException).toBeUndefined();

    polyfill();

    expect(window.DOMException).toBeDefined();
    expect(window.DOMException.polyfill).toBe(true);
    expect(window.DOMException.ABORT_ERR).toBe(20);

    const abortError = new DOMException('Aborted', 'AbortError');
    expect(abortError.code).toBe(window.DOMException.ABORT_ERR);
  });
});
