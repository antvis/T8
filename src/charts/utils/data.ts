export function max<T>(array: T[], accessor?: (d: T) => number): number | undefined {
  if (!array || array.length === 0) {
    return undefined;
  }

  // Use the accessor if provided, otherwise assume the array already contains numbers.
  const values = accessor ? array.map(accessor) : (array as number[]);

  return Math.max(...values);
}

export function extent(array: number[], accessor?: (d: number) => number): [number, number] | [undefined, undefined] {
  if (!array || array.length === 0) {
    return [undefined, undefined];
  }
  const values = accessor ? array.map(accessor) : array;
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  return [minVal, maxVal];
}

export function mean(array: number[], accessor?: (d: number) => number): number | undefined {
  if (!array || array.length === 0) {
    return undefined;
  }
  const values = accessor ? array.map(accessor) : array;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}
