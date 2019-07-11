const XHR_READY_STATE = {
  // Client has been created. open() not called yet.
  UNSENT: 0,
  // open() has been called.
  OPENED: 1,
  // send() has been called, and headers and status are available.
  HEADERS_RECEIVED: 2,
  // Downloading; responseText holds partial data.
  LOADING: 3,
  // The operation is complete.
  DONE: 4,
};

const noop = () => {};

const isInRange = (num, begin, end) => num >= begin && num <= end;

// https://github.com/github/fetch/blob/master/fetch.js#L368-L382
const parseHeaders = (rawHeaders = '') => {
  const headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach((line) => {
    const parts = line.split(':');
    const key = parts.shift().trim();
    if (key) {
      const value = parts.join(':').trim();
      headers.append(key, value);
    }
  });
  return headers;
};

const DEFAULT_CONFIG = {
  method: 'GET',
  headers: {},
  body: null,
  onDownloadProgress: noop,
  onUploadProgress: noop,
  signal: null,
  credentials: null,
};

const createFetchishResponse = (xhr) => {
  const {
    response,
    responseText,
    responseURL,
    status,
    statusText,
  } = xhr;

  const blob = () => Promise.resolve(new Blob([response]));
  const json = () => Promise.resolve(JSON.parse(responseText));
  const text = () => Promise.resolve(responseText);

  const clone = () => createFetchishResponse(xhr);

  const headers = parseHeaders(xhr.getAllResponseHeaders());
  const url = responseURL || headers.get('X-Request-URL');

  return {
    blob,
    clone,
    headers,
    json,
    ok: isInRange(status, 200, 299),
    status,
    statusText,
    text,
    url,
  };
};

const xhrFetch = (endpoint, {
  method = 'GET',
  headers = {},
  body = null,
  onDownloadProgress = noop,
  onUploadProgress = noop,
  signal,
  credentials = null,
} = DEFAULT_CONFIG) => new Promise((resolve, reject) => {
  const xmlHttpRequest = new XMLHttpRequest();

  const abortXhr = () => {
    xmlHttpRequest.abort();
  };

  if (signal) {
    signal.addEventListener('abort', abortXhr);
  }

  xmlHttpRequest.open(method.toLowerCase(), endpoint, true);

  // IE10 assumes `withCredentials` is set after `open()` is called.
  if (credentials === 'include') {
    xmlHttpRequest.withCredentials = true;
  }

  if (credentials === 'omit') {
    xmlHttpRequest.withCredentials = false;
  }

  Object.keys(headers).forEach(key => xmlHttpRequest.setRequestHeader(key, headers[key]));

  // TODO switch from DOM Level 2 events to using Level 0 events for browser compatibility
  xmlHttpRequest.addEventListener('readystatechange', () => {
    if (xmlHttpRequest.readyState === XHR_READY_STATE.DONE) {
      // https://xhr.spec.whatwg.org/#the-abort()-method
      if (signal) {
        signal.removeEventListener('abort', abortXhr);
      }
    }
  });

  xmlHttpRequest.addEventListener('error', () => {
    reject(new TypeError('Network request failed'));
  });

  xmlHttpRequest.addEventListener('timeout', () => {
    reject(new TypeError('Network request failed'));
  });

  xmlHttpRequest.addEventListener('abort', () => {
    reject(new DOMException('Aborted', 'AbortError'));
  });

  xmlHttpRequest.addEventListener('load', () => {
    // Handle errors just like `fetch` does. So we resolve all upstream errors, and only throw
    // network errors which are handled in the error event listener.
    resolve(createFetchishResponse(xmlHttpRequest));
  });

  /* download */
  xmlHttpRequest.addEventListener('progress', xhrEvent => onDownloadProgress(xhrEvent));

  /* upload */
  xmlHttpRequest.upload.addEventListener('progress', xhrEvent => onUploadProgress(xhrEvent));

  xmlHttpRequest.send(body);
});

export default xhrFetch;
