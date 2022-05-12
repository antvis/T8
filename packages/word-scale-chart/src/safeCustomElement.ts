function safeDecorator(fn) {
  // eslint-disable-next-line func-names
  return function (...args) {
    try {
      return fn.apply(this, args);
    } catch (error) {
      if (error instanceof DOMException && error.message.includes('has already been used with this registry')) {
        return false;
      }
      throw error;
    }
  };
}

// Avoid below error
// Uncaught DOMException: Failed to execute 'define' on 'CustomElementRegistry':
// this name has already been used with this registry
customElements.define = safeDecorator(customElements.define);
