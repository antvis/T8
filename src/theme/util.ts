import { baseSeedToken, presetTheme } from './seed';
import type { SeedTokenOptions } from './types';

export const getThemeSeedToken = (theme: 'dark' | 'light', seedToken?: Partial<SeedTokenOptions>): SeedTokenOptions => {
  const themeToken = presetTheme[theme ?? 'light'] as SeedTokenOptions;

  return {
    ...baseSeedToken,
    ...themeToken,
    ...(seedToken ?? {}),
  } as const;
};
