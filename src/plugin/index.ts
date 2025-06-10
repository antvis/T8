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

/**
 * NOTE: use these presets to create plugin to apply to the entity phrase spec
 */
export {
  createMetricName,
  createMetricValue,
  createDeltaValue,
  createRatioValue,
  createOtherMetricValue,
  createContributeRatio,
  createDimensionValue,
  createProportion,
  createTimeDesc,
  createTrendDesc,
} from './presets';

export * from './types';

export const presetPluginManager = new PluginManager(presetPlugins);

export { presetPlugins };
