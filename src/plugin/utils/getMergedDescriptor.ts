import { SpecificEntityPhraseDescriptor } from '../types';

/**
 * Helper function to merge default and custom descriptor properties.
 *
 * Creates a new descriptor that combines properties from both input descriptors,
 * with special handling for the encoding object to ensure deep merging.
 *
 * @param defaultDescriptor - The base descriptor with default properties
 * @param customDescriptor - The custom descriptor with overriding properties
 * @returns A merged descriptor combining both inputs
 */
export function getMergedDescriptor(
  defaultDescriptor: SpecificEntityPhraseDescriptor,
  customDescriptor: SpecificEntityPhraseDescriptor,
) {
  // Shallow merge of top-level properties
  const result = { ...defaultDescriptor, ...customDescriptor };
  // Deep merge of encoding objects from both descriptors
  result.style = { ...(defaultDescriptor?.style || {}), ...(customDescriptor?.style || {}) };
  return result;
}
