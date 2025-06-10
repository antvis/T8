import { seedToken } from './seed';
import type { ThemeProps } from './types';

export function getFontSize({ size = 'normal' }: ThemeProps) {
  return `${size === 'small' ? seedToken.fontSizeSmall : seedToken.fontSizeBase}px`;
}

export function getFontSizeNumber({ size = 'normal' }: ThemeProps) {
  return size === 'small' ? seedToken.fontSizeSmall : seedToken.fontSizeBase;
}

export function getLineHeight({ size = 'normal' }: ThemeProps) {
  return `${size === 'small' ? seedToken.lineHeightSmall : seedToken.lineHeightBase}px`;
}

export function getLineHeightNumber({ size = 'normal' }: ThemeProps) {
  return size === 'small' ? seedToken.lineHeightSmall : seedToken.lineHeightBase;
}
