/**
 * The main entry point for the Narrative Text Visualization library.
 */
export { Text } from './text';
/**
 * Type definitions for the Narrative Text Visualization library.
 */
export * from './schema';

export {
  createCustomBlockFactory,
  createCustomPhraseFactory,
  PluginManager,
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
} from './plugin';

export { Events } from './vis-components';
