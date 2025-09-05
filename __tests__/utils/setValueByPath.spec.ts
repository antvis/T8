import { describe, it, expect } from 'vitest';
import { setValueByPath } from '../../src/utils/setValueByPath';

describe('setValueByPath', () => {
  it('should set value at single key path', () => {
    const obj = { a: 1 };
    const result = setValueByPath(obj, ['a'], 2);
    expect(result).toBe(true);
    expect(obj.a).toBe(2);
  });

  it('should set value at nested path', () => {
    const obj = { a: { b: { c: 1 } } };
    const result = setValueByPath(obj, ['a', 'b', 'c'], 2);
    expect(result).toBe(true);
    expect(obj.a.b.c).toBe(2);
  });

  it('should assign value when path is empty', () => {
    const obj = { a: 1 };
    const result = setValueByPath(obj, [], { b: 2 });
    expect(result).toBe(false);
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  it('should return false when path does not exist', () => {
    const obj = { a: 1 };
    const result = setValueByPath(obj, ['b', 'c'], 2);
    expect(result).toBe(false);
    expect(obj).toEqual({ a: 1 });
  });

  it('should return false when intermediate value is not object', () => {
    const obj = { a: 'string' };
    const result = setValueByPath(obj, ['a', 'b'], 2);
    expect(result).toBe(false);
    expect(obj).toEqual({ a: 'string' });
  });

  it('should work with array indices', () => {
    const obj = { arr: [1, 2, 3] };
    const result = setValueByPath(obj, ['arr', 1], 5);
    expect(result).toBe(true);
    expect(obj.arr[1]).toBe(5);
  });

  it('should return false when object is null', () => {
    const result = setValueByPath(null, ['a'], 1);
    expect(result).toBe(false);
  });

  it('should add new property to existing object', () => {
    const obj = { a: 1 };
    const result = setValueByPath(obj, ['b'], 2);
    expect(result).toBe(true);
    expect(obj).toEqual({ a: 1, b: 2 });
  });
});
