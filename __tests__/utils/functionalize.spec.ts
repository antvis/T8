import { functionalize } from '../../src/utils/functionalize';

describe('functionalize', () => {
  it('should convert object to function that returns the object', () => {
    const obj = { a: 1, b: 2 };
    const fn = functionalize(obj);

    expect(typeof fn).toBe('function');
    expect(fn()).toEqual(obj);
  });

  it('should return the same function if input is already a function', () => {
    const originalFn = () => ({ a: 1, b: 2 });
    const fn = functionalize(originalFn);

    expect(fn).toBe(originalFn);
    expect(fn()).toEqual({ a: 1, b: 2 });
  });

  it('should handle primitive values', () => {
    const str = 'hello';
    const fn = functionalize(str);

    expect(typeof fn).toBe('function');
    expect(fn()).toBe(str);
  });

  it('should handle null and undefined', () => {
    const nullFn = functionalize(null);
    const undefinedFn = functionalize(undefined);

    expect(nullFn()).toBe(null);
    expect(undefinedFn()).toBe(undefined);
  });

  it('should handle arrays', () => {
    const arr = [1, 2, 3];
    const fn = functionalize(arr);

    expect(fn()).toEqual(arr);
  });
});
