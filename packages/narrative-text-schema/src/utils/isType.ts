export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

export function isObject(val: unknown) {
  return typeof val === 'object';
}

export function isUndefined(val: unknown): val is undefined {
  return val === undefined;
}

export function isNull(val: unknown): val is null {
  return val === null;
}
