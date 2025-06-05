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

  lineHeightBase: 24,
  lineHeightSmall: 20,

  fontFamily: 'PingFangSC, sans-serif',
  borderColor: 'rgb(199, 199, 199)',

  /**
   * if pages use small and normal size together, rem will not work.
   * so we use fontSizeMultiple to calculate the fontSize instead of rem.
   */
  fontSizeMultiples: {
    h1: 2,
    h2: 1.72,
    h3: 1.4,
    h4: 1.15,
    h5: 1.08,
    h6: 1.08,
  },

  lineHeightMultiples: {
    h1: 1.5,
    h2: 1.3,
    h3: 1.15,
    h4: 1,
    h5: 1,
    h6: 1,
  },
} as const;

export const presetLightColors = {
  colorBase: 'rgba(0, 0, 0, 0.65)',
  colorEntityBase: 'rgba(0, 0, 0, 0.65)',
  colorPositive: '#FA541C',
  colorNegative: '#13A8A8',
  colorConclusion: '#1F0352',
  colorDimensionValue: 'rgba(0, 0, 0, 0.88)',
  colorMetricName: 'rgba(0, 0, 0, 0.88)',
  colorMetricValue: '#1677FF',
  colorOtherValue: 'rgba(0, 0, 0, 0.88)',
  colorProportionShadow: '#CDDDFD',
  colorProportionFill: '#3471F9',
  colorLineStroke: '#5B8FF9',
};

export const presetDarkColors = {
  colorBase: 'rgba(255, 255, 255, 0.65)',
  colorEntityBase: 'rgba(255, 255, 255, 0.65)',
  colorPositive: '#FA541C',
  colorNegative: '#13A8A8',
  colorConclusion: '#D8C3F3',
  colorDimensionValue: 'rgba(255, 255, 255, 0.88)',
  colorMetricName: 'rgba(255, 255, 255, 0.88)',
  colorMetricValue: '#4B91FF',
  colorOtherValue: 'rgba(255, 255, 255, 0.88)',
  colorProportionShadow: '#CDDDFD',
  colorProportionFill: '#3471F9',
  colorLineStroke: '#5B8FF9',
} as const;
