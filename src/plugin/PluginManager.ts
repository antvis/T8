import { isCustomPhrase, isEntityPhrase } from '../schema';
import { EntityMetaData, EntityType, PhraseSpec } from '../schema';
import { PhraseDescriptor, BlockDescriptor, PluginType } from './types';
import { isBlockDescriptor, isEntityDescriptor, isCustomPhraseDescriptor } from './utils';

/**
 * PluginManager class responsible for registering, managing, and retrieving
 * different types of plugins (entities, custom phrases, and blocks).
 *
 * This class serves as a central registry for all plugin components in the application,
 * allowing dynamic extension of functionality through the plugin system.
 */
export class PluginManager {
  /** Storage for entity type plugins mapped by their entity type */
  protected entities: Partial<Record<EntityType, PhraseDescriptor<EntityMetaData>>> = {};

  /** Storage for custom phrase plugins mapped by their key/identifier */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected customPhrases: Record<string, PhraseDescriptor<any>> = {};

  /** Storage for custom block plugins mapped by their key/identifier */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected customBlocks: Record<string, BlockDescriptor<any>> = {};

  /**
   * Creates a new PluginManager instance and registers provided plugins.
   * If no plugins are provided, only presets will be registered.
   *
   * @param plugins - Optional array of plugins to register
   */
  constructor(plugins?: PluginType[]) {
    if (plugins) this.registerAll(plugins);
  }

  /**
   * Registers a single plugin based on its type.
   * The plugin is stored in the appropriate collection based on its descriptor type.
   *
   * @param plugin - The plugin to register
   */
  register(plugin: PluginType) {
    if (isBlockDescriptor(plugin)) {
      this.customBlocks[plugin.key] = plugin;
    }
    if (isEntityDescriptor(plugin)) {
      this.entities[plugin.key] = plugin;
    }
    if (isCustomPhraseDescriptor(plugin)) {
      this.customPhrases[plugin.key] = plugin;
    }
  }

  /**
   * Registers multiple plugins at once.
   *
   * @param plugins - Array of plugins to register
   */
  registerAll(plugins: PluginType[]) {
    plugins.forEach((plugin) => this.register(plugin));
  }

  /**
   * Retrieves an entity descriptor by its entity type.
   *
   * @param entityType - The type of entity to retrieve
   * @returns The corresponding entity descriptor or undefined if not found
   */
  getEntityDescriptor(entityType: EntityType) {
    return this.entities[entityType];
  }

  /**
   * Retrieves a custom phrase descriptor by its type.
   *
   * @param customType - The type identifier of the custom phrase
   * @returns The corresponding custom phrase descriptor or undefined if not found
   */
  getCustomPhraseDescriptor(customType: string) {
    return this.customPhrases[customType];
  }

  /**
   * Retrieves a block descriptor by its type.
   *
   * @param customType - The type identifier of the block
   * @returns The corresponding block descriptor or undefined if not found
   */
  getBlockDescriptor(customType: string) {
    return this.customBlocks[customType];
  }

  /**
   * Retrieves a phrase descriptor based on a phrase specification.
   * This method determines the appropriate descriptor type from the specification.
   *
   * @param spec - The phrase specification to look up
   * @returns The corresponding phrase descriptor or null if not found
   */
  getPhraseDescriptorBySpec(spec: PhraseSpec) {
    if (isCustomPhrase(spec)) return this.getCustomPhraseDescriptor(spec.metadata.customType);
    if (isEntityPhrase(spec)) return this.getEntityDescriptor(spec.metadata.entityType);
    return null;
  }
}
