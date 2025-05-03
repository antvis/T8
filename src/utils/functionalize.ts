import { EntityMetaData, TypeOrMetaReturnType } from '../schema';

const isFunction = (val: unknown) => typeof val === 'function';

export function functionalize<T>(
  val: TypeOrMetaReturnType<T>,
  defaultVal: T | undefined,
): (value: string, metadata: EntityMetaData) => T {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return isFunction(val) ? (val as () => T) : (_value: string, _metadata: EntityMetaData) => (val as T) || defaultVal;
}
