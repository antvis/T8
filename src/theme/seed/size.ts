const presetFontBaseSize = {
  fontSize: 14,
  lineHeight: 24,
} as const;

const presetFontSmallSize = {
  fontSize: 12,
  lineHeight: 20,
} as const;

export const presetFontSize = {
  base: presetFontBaseSize,
  small: presetFontSmallSize,
} as const;
