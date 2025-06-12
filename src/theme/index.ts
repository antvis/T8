export { getThemeSeedToken } from './util';
export type { SeedTokenOptions, ThemeOptions } from './types';
export { defaultSeedToken } from './seed';

export const defaultTheme = {
  theme: 'light',
  size: 'base',
} as const;
