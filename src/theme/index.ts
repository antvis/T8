import type { ThemeProps } from './theme.type';

export { seedToken } from './seed';
export { getFontSize, getFontSizeNumber } from './getTheme/getFontSize';
export { getLineHeight, getLineHeightNumber } from './getTheme/getLineHeight';
export type { ThemeProps } from './theme.type';

export const defaultTheme: ThemeProps = {
  size: 'normal',
};
