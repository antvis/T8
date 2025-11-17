import { createMetricName } from './createMetricName';
import { createMetricValue } from './createMetricValue';
import { createDeltaValue, createRatioValue } from './createCompare';
import { createOtherMetricValue } from './createOtherMetricValue';
import { createContributeRatio } from './createContributeRatio';
import { createDimensionValue } from './createDimensionValue';
import { createProportion } from './createProportion';
import { createTimeDesc } from './createTimeDesc';
import { createTrendDesc } from './createTrendDesc';
import { createRank } from './createRank';
import { createDifference } from './createDifference';
import { createAnomaly } from './createAnomaly';
import { createAssociation } from './createAssociation';
import { createDistribution } from './createDistribution';

/**
 * export all entity phrase factory functions.
 * user can use these factory functions to create entity phrase descriptors quickly to keep the original descriptor.
 */
export const presetPlugins = [
  createMetricName(),
  createMetricValue(),
  createDeltaValue(),
  createRatioValue(),
  createOtherMetricValue(),
  createContributeRatio(),
  createDimensionValue(),
  createProportion(),
  createTimeDesc(),
  createTrendDesc(),
  createRank(),
  createDifference(),
  createAnomaly(),
  createAssociation(),
  createDistribution(),
];

/**
 * export all entity phrase factory functions.
 * user can use these factory functions to create entity phrase descriptors quickly to keep the original descriptor.
 */
export { createMetricName } from './createMetricName';
export { createMetricValue } from './createMetricValue';
export { createDeltaValue, createRatioValue } from './createCompare';
export { createOtherMetricValue } from './createOtherMetricValue';
export { createContributeRatio } from './createContributeRatio';
export { createDimensionValue } from './createDimensionValue';
export { createProportion } from './createProportion';
export { createTimeDesc } from './createTimeDesc';
export { createTrendDesc } from './createTrendDesc';
export { createRank } from './createRank';
export { createDifference } from './createDifference';
export { createAnomaly } from './createAnomaly';
export { createAssociation } from './createAssociation';
export { createDistribution } from './createDistribution';
