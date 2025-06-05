export { Text } from './text';
export { generateTextSpec } from './schema';
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

/**
 * export all types
 */
export * from './plugin/plugin-protocol.type';
export * from './schema/schema-protocol.type';
export * from './theme/theme.type';
export * from './vis-components/events.type';
