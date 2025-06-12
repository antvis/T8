import { baseSeedToken } from './base';
import { presetFontSize } from './size';
import { presetTheme } from './theme';

export const defaultSeedToken = {
  ...baseSeedToken,
  ...presetFontSize.base,
  ...presetTheme.light,
} as const;

export { baseSeedToken, presetFontSize, presetTheme };
