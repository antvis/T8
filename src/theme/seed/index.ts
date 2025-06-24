import { SeedTokenOptions } from '../types';
import { baseSeedToken } from './base';
import { presetTheme } from './theme';

export const defaultSeedToken: SeedTokenOptions = {
  ...baseSeedToken,
  ...presetTheme.light,
} as const;

export { baseSeedToken, presetTheme };
