import { seedToken } from '../seed';
import type { ThemeProps } from '../theme.type';

export function getFontSize({ size = 'normal' }: ThemeProps) {
  return `${size === 'small' ? seedToken.fontSizeSmall : seedToken.fontSizeBase}px`;
}

export function getFontSizeNumber({ size = 'normal' }: ThemeProps) {
  return size === 'small' ? seedToken.fontSizeSmall : seedToken.fontSizeBase;
}
