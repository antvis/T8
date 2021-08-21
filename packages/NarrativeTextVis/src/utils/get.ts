import { isUndefined } from './type';

export const get = (original: unknown, separator: string, defaultValue = undefined) => {
  const path = separator.split('.');
  let value = original;
  for (let i = 0; i < path.length; i += 1) {
    value = value?.[path[i]];
    if (isUndefined(value)) return defaultValue;
  }
  return value || defaultValue;
};
