import { TypeOrMetaReturnType } from '../schema';

const isFunction = (val: unknown) => typeof val === 'function';

export function functionalize<T>(val: TypeOrMetaReturnType<T>, defaultVal: T | undefined) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return isFunction(val) ? (val as () => T) : (...args: unknown[]) => (val as T) || defaultVal;
}
