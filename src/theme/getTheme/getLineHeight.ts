import { seedToken } from '../seed';

import type { ThemeProps } from '../type';

export function getLineHeight({ size = 'normal' }: ThemeProps) {
  return `${size === 'small' ? seedToken.lineHeightSmall : seedToken.lineHeightBase}px`;
}

export function getLineHeightNumber({ size = 'normal' }: ThemeProps) {
  return size === 'small' ? seedToken.lineHeightSmall : seedToken.lineHeightBase;
}
