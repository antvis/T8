export function cloneDeep<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T;
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => cloneDeep(item)) as unknown as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clonedObj = {} as Record<string, any>;
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clonedObj[key] = cloneDeep((value as Record<string, any>)[key]);
    }
  }

  return clonedObj as T;
}
