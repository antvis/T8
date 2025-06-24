const presetLightColors = {
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
} as const;

const presetDarkColors = {
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

export const presetTheme = {
  light: presetLightColors,
  dark: presetDarkColors,
} as const;
