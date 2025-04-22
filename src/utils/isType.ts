export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export function isObject(val: unknown) {
  return typeof val === 'object';
}

export function isUndefined(val: unknown) {
  return val === undefined;
}

export function isFunction(val: unknown) {
  return typeof val === 'function';
}

export function isNil(val: unknown) {
  return val === null || val === undefined;
}

export function isEmpty(val: unknown) {
  if (Array.isArray(val)) {
    return val.length === 0;
  }
  return val === null || val === undefined || val === '';
}

export function isArray(val: unknown) {
  return Array.isArray(val);
}

export function isNumber(val: unknown) {
  return typeof val === 'number';
}
