import type { ThemeProps } from './type';

export { seedToken } from './seed';
export { getFontSize, getFontSizeNumber } from './getTheme/getFontSize';
export { getLineHeight, getLineHeightNumber } from './getTheme/getLineHeight';
export type { ThemeProps } from './type';

export const defaultTheme: ThemeProps = {
  size: 'normal',
};
