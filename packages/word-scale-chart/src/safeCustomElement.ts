function safeDecorator(fn) {
  // eslint-disable-next-line func-names
  return function (...args) {
    try {
      return fn.apply(this, args);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`CustomElement ${args?.[0]} ${error.message}`);
      return false;
    }
  };
}

// Avoid below error
// Uncaught DOMException: Failed to execute 'define' on 'CustomElementRegistry':
// this name has already been used with this registry
customElements.define = safeDecorator(customElements.define);
