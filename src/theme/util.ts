import { baseSeedToken, presetFontSize, presetTheme } from './seed';
import type { SeedTokenOptions, ThemeOptions } from './types';

export const getThemeSeedToken = ({ theme, size }: ThemeOptions, seedToken?: SeedTokenOptions): SeedTokenOptions => {
  return {
    ...baseSeedToken,
    ...presetTheme[theme ?? 'light'],
    ...presetFontSize[size ?? 'base'],
    ...(seedToken ?? {}),
  };
};
