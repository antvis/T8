import { PluginManager } from './PluginManager';
import { presetPlugins } from './presets';

/**
 * NOTE: the plugin created by createCustomPhraseFactory will work when the spec is phrase
 */
export { createCustomPhraseFactory } from './createCustomPhraseFactory';

/**
 * NOTE: the plugin created by createCustomBlockFactory will work when the spec is section & paragraph
 */
export { createCustomBlockFactory } from './createCustomBlockFactory';

export { PluginManager } from './PluginManager';
export * from './presets';
export * from './plugin-protocol.type';

export const presetPluginManager = new PluginManager(presetPlugins);
