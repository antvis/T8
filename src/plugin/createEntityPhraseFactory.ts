import { EntityMetaData, EntityType } from '../schema';
import { cloneDeep } from '../utils';
import { PhraseDescriptor, SpecificEntityPhraseDescriptor, CustomEntityMode } from './types';
import { createPhraseFactory } from './createPhraseFactory';
import { getMergedDescriptor } from './utils';

/**
 * Factory function creator for entity phrase descriptors.
 *
 * This higher-order function creates a factory function that generates entity phrase descriptors.
 * It allows customization of entity descriptors while maintaining default behaviors through
 * merging or overwriting strategies.
 *
 * @param key - The entity type identifier for the phrase.
 * @param defaultDescriptor - The base descriptor providing default behavior and styling.
 * @returns A factory function that creates customized phrase descriptors.
 */
export const createEntityPhraseFactory =
  (key: EntityType, defaultDescriptor: SpecificEntityPhraseDescriptor) =>
  (
    /**
     * @param customDescriptor - Optional descriptor to customize the entity phrase.
     * @param mode - Strategy for applying customizations: 'merge' combines with defaults, 'overwrite' replaces defaults.
     * @returns A fully configured phrase descriptor for the entity type.
     */
    customDescriptor?: SpecificEntityPhraseDescriptor,
    mode: CustomEntityMode = 'merge',
  ): PhraseDescriptor<EntityMetaData> => {
    // Get the base phrase factory for entities.
    const entityFactory = createPhraseFactory(true);

    // Start with a deep copy of the default descriptor to avoid mutations.
    let entityDescriptor = cloneDeep(defaultDescriptor);

    // Apply customizations if provided.
    // TODO: how to process merge & overwrite
    if (customDescriptor) {
      entityDescriptor =
        mode === 'overwrite' ? customDescriptor : getMergedDescriptor(defaultDescriptor, customDescriptor);
    }

    // Create the final phrase descriptor with the processed configuration.
    return entityFactory<EntityMetaData>({ key, ...entityDescriptor });
  };
