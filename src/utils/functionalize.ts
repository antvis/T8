import { TypeOrMetaReturnType } from '../schema';

const isFunction = (val: unknown) => typeof val === 'function';

export function functionalize<T>(val: TypeOrMetaReturnType<T>, defaultVal?: T) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return isFunction(val) ? (val as () => T) : (...args: unknown[]) => (val === undefined ? defaultVal : val) as T;
}
