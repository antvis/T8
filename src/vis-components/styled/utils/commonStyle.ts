import { ThemeProps, getFontSize, seedToken } from '../../../theme';

export function getCommonStyle(theme: ThemeProps) {
  return {
    fontFamily: seedToken.fontFamily,
    color: seedToken.colorBase,
    fontSize: getFontSize(theme ?? {}),
  };
}
