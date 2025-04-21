import { TypeOrMetaReturnType } from '../schema';

const isFunction = (val: unknown) => typeof val === 'function';

export function functionalize<T>(val: TypeOrMetaReturnType<T>, defaultVal: T | undefined) {
  return isFunction(val) ? val : () => val || defaultVal;
}
