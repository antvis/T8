export const seedToken = {
  colorBase: 'rgba(0, 0, 0, 0.65)',
  colorEntityBase: '#404040',
  colorPositive: '#FA541C',
  colorNegative: '#13C2C2',
  colorConclusion: '#030852',
  colorDimensionValue: '#391085',
  colorMetricName: 'rgba(0, 0, 0, 0.88)',
  colorMetricValue: '#1677FF',
  colorOtherValue: '#1677FF',

  fontSizeBase: 14,
  fontSizeSmall: 12,
  fontFamily: 'PingFangSC, sans-serif',
  borderColor: 'rgb(199, 199, 199)',

  /**
   * if pages use small and normal size together, rem will not work.
   * so we use fontSizeMultiple to calculate the fontSize.
   */
  fontSizeMultiples: {
    h1: 2,
    h2: 1.72,
    h3: 1.4,
    h4: 1.15,
    h5: 1.08,
    h6: 1.08,
  },

  lineHeight: {
    h1: 36,
    h2: 32,
    h3: 28,
    h4: 24,
    h5: 24,
    h6: 24,
    base: 24,
  },
} as const;
