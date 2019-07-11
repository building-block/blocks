import DOMExceptionImpl from 'domexception';

export const polyfill = () => {
  try {
    new DOMException()
  } catch (err) {
    self.DOMException = DOMExceptionImpl;
    self.DOMException.polyfill = true;
  }
};
