import { toBeDOMEqual } from './toBeDOMEqual';

declare global {
  interface Matchers<R> {
    toBeDOMEqual(dom: Element | string, name: string, dir?: string): R;
  }
}

expect.extend({
  toBeDOMEqual,
});
