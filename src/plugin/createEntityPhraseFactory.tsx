import { ComponentChildren, JSX } from 'preact';
import { EntityMetaData, EntityType } from '../schema';
import { cloneDeep } from '../utils';
import { PhraseDescriptor, SpecificEntityPhraseDescriptor, CustomEntityMode } from './plugin-protocol.type';
import { createPhraseFactory } from './createPhraseFactory';
import { functionalize } from '../utils';

/**
 * Factory function creator for entity phrase descriptors.
 *
 * This higher-order function creates a factory function that generates entity phrase descriptors.
 * It allows customization of entity descriptors while maintaining default behaviors through
 * merging or overwriting strategies.
 *
 * @param key - The entity type identifier for the phrase
 * @param defaultDescriptor - The base descriptor providing default behavior and styling
 * @returns A factory function that creates customized phrase descriptors
 */
export const createEntityPhraseFactory =
  (key: EntityType, defaultDescriptor: SpecificEntityPhraseDescriptor) =>
  (
    /**
     * @param customDescriptor - Optional descriptor to customize the entity phrase
     * @param mode - Strategy for applying customizations: 'merge' combines with defaults, 'overwrite' replaces defaults
     * @returns A fully configured phrase descriptor for the entity type
     */
    customDescriptor?: SpecificEntityPhraseDescriptor,
    mode: CustomEntityMode = 'merge',
  ): PhraseDescriptor<EntityMetaData> => {
    // Get the base phrase factory for entities
    const entityFactory = createPhraseFactory(true);

    // Start with a deep copy of the default descriptor to avoid mutations
    let entityDescriptor = cloneDeep(defaultDescriptor);

    // Apply customizations if provided
    if (customDescriptor) {
      entityDescriptor =
        mode === 'overwrite' ? customDescriptor : getMergedDescriptor(defaultDescriptor, customDescriptor);
    }

    // Process encoding settings into standard descriptor properties
    if (entityDescriptor.encoding) {
      // Extract styling properties from encoding
      const { color, bgColor, fontSize, fontWeight, underline } = entityDescriptor.encoding;
      // Get existing style function or create an empty one
      const commonStyleFn = functionalize<JSX.CSSProperties>(entityDescriptor?.style, {});

      /**
       * Combines common styles with encoding-specific styles
       * Converts declarative encoding properties into a dynamic style function
       */
      const encodingStyle = (value: string, metadata: EntityMetaData): JSX.CSSProperties => {
        return {
          ...commonStyleFn(value, metadata),
          color: functionalize<string>(color, undefined)(value, metadata),
          backgroundColor: functionalize<string>(bgColor, undefined)(value, metadata),
          fontSize: functionalize<number | string>(fontSize, undefined)(value, metadata),
          fontWeight: functionalize<number | string>(fontWeight, undefined)(value, metadata),
          textDecoration: functionalize<boolean>(underline, false)(value, metadata) ? 'underline' : undefined,
        };
      };
      entityDescriptor.style = encodingStyle;

      // Handle content rendering with prefixes, suffixes, and inline charts
      const { prefix, suffix, inlineChart } = entityDescriptor.encoding;
      const { content } = entityDescriptor;

      /**
       * Creates a content renderer that wraps the entity value with
       * optional prefix, suffix, and inline chart components
       */
      entityDescriptor.content = (value: string, metadata: EntityMetaData) => (
        <>
          {functionalize<ComponentChildren>(prefix, null)(value, metadata)}
          {content ? content(value, metadata) : value}
          {functionalize<ComponentChildren>(suffix, null)(value, metadata)}
          {functionalize<ComponentChildren>(inlineChart, null)(value, metadata)}
        </>
      );

      // Remove encoding object as its properties have been processed
      delete entityDescriptor.encoding;
    }

    // Create the final phrase descriptor with the processed configuration
    return entityFactory<EntityMetaData>({ key, ...entityDescriptor });
  };

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
function getMergedDescriptor(
  defaultDescriptor: SpecificEntityPhraseDescriptor,
  customDescriptor: SpecificEntityPhraseDescriptor,
) {
  // Shallow merge of top-level properties
  const result = { ...defaultDescriptor, ...customDescriptor };
  // Deep merge of encoding objects from both descriptors
  result.encoding = { ...(defaultDescriptor?.encoding || {}), ...(customDescriptor?.encoding || {}) };
  return result;
}
