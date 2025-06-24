import {
  Text,
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
} from '../src';

describe('index', () => {
  test("T8's api", () => {
    expect(Text).toBeDefined();
    expect(createCustomBlockFactory).toBeDefined();
    expect(createCustomPhraseFactory).toBeDefined();
    expect(PluginManager).toBeDefined();
    expect(createMetricName).toBeDefined();
    expect(createMetricValue).toBeDefined();
    expect(createDeltaValue).toBeDefined();
    expect(createRatioValue).toBeDefined();
    expect(createOtherMetricValue).toBeDefined();
    expect(createContributeRatio).toBeDefined();
    expect(createDimensionValue).toBeDefined();
    expect(createProportion).toBeDefined();
    expect(createTimeDesc).toBeDefined();
    expect(createTrendDesc).toBeDefined();
  });
});
