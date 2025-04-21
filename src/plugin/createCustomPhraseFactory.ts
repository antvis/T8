import { PhraseDescriptor, CustomPhraseDescriptor } from './plugin-protocol.type';
import { createPhraseFactory } from './createPhraseFactory';

/**
 * Creates a factory function for custom phrase descriptors.
 *
 * This function takes a descriptor object and returns a new descriptor with the
 * `isEntity` property set to `false`. The descriptor is expected to be of type
 * `CustomPhraseDescriptor<MetaData>`, where `MetaData` is the type of the metadata.
 *
 * @param descriptor - The descriptor object to be converted into a custom phrase descriptor
 * @returns A new custom phrase descriptor with the `isEntity` property set to `false`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCustomPhraseFactory = <MetaData = any>(
  descriptor: Omit<CustomPhraseDescriptor<MetaData>, 'isEntity'>,
): PhraseDescriptor<MetaData> => createPhraseFactory(false)<MetaData>(descriptor);
