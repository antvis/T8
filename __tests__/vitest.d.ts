import 'vitest';

interface CustomMatchers<R = unknown> {
  toBeDOMEqual(name: string, dir?: string): R;
}

declare module 'vitest' {
  // eslint-disable-next-line
  interface Matchers<T = any> extends CustomMatchers<T> {}
}

declare global {
  namespace Vitest {
    // eslint-disable-next-line
    interface Assertion extends CustomMatchers {}
  }
}
