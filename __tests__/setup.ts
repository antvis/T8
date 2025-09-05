import { expect } from 'vitest';
import { toBeDOMEqual } from './toBeDOMEqual';

expect.extend({
  toBeDOMEqual,
});
