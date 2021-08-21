/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value: unknown): string {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return Object.prototype.toString.call(value);
}

export const isFunction = (value: unknown) => typeof value === 'function';
export const isString = (value: unknown) => {
  const type = typeof value;
  return (
    type === 'string' ||
    (type === 'object' && value != null && !Array.isArray(value) && getTag(value) === '[object String]')
  );
};
export const isUndefined = (value: unknown) => value === undefined;
export const isArray = (value: unknown) => Array.isArray(value);
