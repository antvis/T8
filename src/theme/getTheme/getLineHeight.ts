import { seedToken } from '../seed';

import type { ThemeProps } from '../theme.type';

export function getLineHeight({ size = 'normal' }: ThemeProps) {
  return `${size === 'small' ? seedToken.lineHeightSmall : seedToken.lineHeightBase}px`;
}

export function getLineHeightNumber({ size = 'normal' }: ThemeProps) {
  return size === 'small' ? seedToken.lineHeightSmall : seedToken.lineHeightBase;
}
