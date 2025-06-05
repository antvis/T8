import { PluginManager } from './PluginManager';
import { presetPlugins } from './presets';

export { createCustomPhraseFactory } from './createCustomPhraseFactory';
export { createEntityPhraseFactory } from './createEntityPhraseFactory';
export { createCustomBlockFactory } from './createCustomBlockFactory';
export { usePluginCreator } from './usePluginCreator';
export { PluginManager } from './PluginManager';
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
export * from './plugin-protocol.type';

export const presetPluginManager = new PluginManager(presetPlugins);

export { presetPlugins };
