import { describe, it, expect } from 'vitest';
import { defaultSeedToken } from '../../src/theme';

describe('theme/index', () => {
  it('defaultSeedToken should be right', () => {
    expect(defaultSeedToken).toEqual({
      borderColor: 'rgb(199, 199, 199)',
      colorBase: 'rgba(0, 0, 0, 0.65)',
      colorConclusion: '#1F0352',
      colorDimensionValue: 'rgba(0, 0, 0, 0.88)',
      colorEntityBase: 'rgba(0, 0, 0, 0.65)',
      colorHeadingBase: 'rgba(0, 0, 0, 0.85)',
      colorLineStroke: '#5B8FF9',
      colorMetricName: 'rgba(0, 0, 0, 0.88)',
      colorMetricValue: '#1677FF',
      colorNegative: '#13A8A8',
      colorOtherValue: 'rgba(0, 0, 0, 0.88)',
      colorPositive: '#FA541C',
      colorProportionFill: '#3471F9',
      colorProportionShadow: '#CDDDFD',
      fontFamily: 'PingFangSC, sans-serif',
      fontSize: 14,
      fontSizeMultiples: {
        h1: 2,
        h2: 1.72,
        h3: 1.4,
        h4: 1.15,
        h5: 1.08,
        h6: 1.08,
      },
      lineHeight: 24,
      lineHeightMultiples: {
        h1: 1.5,
        h2: 1.3,
        h3: 1.15,
        h4: 1,
        h5: 1,
        h6: 1,
      },
    });
  });
});
