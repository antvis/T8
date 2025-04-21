import { BlockDescriptor } from './plugin-protocol.type';

/**
 * Creates a factory function for custom block descriptors.
 *
 * This function takes a descriptor object and returns a new descriptor with the
 * `isBlock` property set to `true`. The descriptor is expected to be of type
 * `BlockDescriptor<CustomBlockSpec>`, where `CustomBlockSpec` is the type of
 * the block specification.
 *
 * @param descriptor - The descriptor object to be converted into a block descriptor
 * @returns A new block descriptor with the `isBlock` property set to `true`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCustomBlockFactory = <CustomBlockSpec = any>(
  descriptor: Omit<BlockDescriptor<CustomBlockSpec>, 'isBlock'>,
): BlockDescriptor<CustomBlockSpec> => {
  return { ...descriptor, isBlock: true };
};
