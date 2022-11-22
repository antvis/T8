export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export function isObject(val: unknown) {
  return typeof val === 'object';
}

export function isUndefined(val: unknown) {
  return val === undefined;
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}
