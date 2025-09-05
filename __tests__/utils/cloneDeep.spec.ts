import { cloneDeep } from '../../src/utils/cloneDeep';

describe('cloneDeep', () => {
  it('should clone primitive values', () => {
    expect(cloneDeep(42)).toBe(42);
    expect(cloneDeep('hello')).toBe('hello');
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(undefined)).toBe(undefined);
  });

  it('should clone arrays', () => {
    const arr = [1, 2, 3];
    const cloned = cloneDeep(arr);

    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });

  it('should clone nested arrays', () => {
    const arr = [
      [1, 2],
      [3, 4],
    ];
    const cloned = cloneDeep(arr);

    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[0]).not.toBe(arr[0]);
  });

  it('should clone objects', () => {
    const obj = { a: 1, b: 'test' };
    const cloned = cloneDeep(obj);

    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  it('should clone nested objects', () => {
    const obj = { a: { b: { c: 1 } } };
    const cloned = cloneDeep(obj);

    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.a).not.toBe(obj.a);
    expect(cloned.a.b).not.toBe(obj.a.b);
  });

  it('should clone mixed nested structures', () => {
    const data = {
      arr: [1, { nested: 'value' }],
      obj: { arr: [2, 3] },
    };
    const cloned = cloneDeep(data);

    expect(cloned).toEqual(data);
    expect(cloned).not.toBe(data);
    expect(cloned.arr).not.toBe(data.arr);
    expect(cloned.arr[1]).not.toBe(data.arr[1]);
    expect(cloned.obj.arr).not.toBe(data.obj.arr);
  });

  it('should handle Date objects', () => {
    const date = new Date();
    const cloned = cloneDeep(date);

    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
  });
});
