import { SeedTokenOptions } from '../../../theme';

export function getCommonStyle(theme: SeedTokenOptions) {
  return {
    fontFamily: theme.fontFamily,
    color: theme.colorBase,
    fontSize: theme.fontSize,
  };
}
