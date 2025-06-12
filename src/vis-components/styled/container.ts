import { ThemeProps } from '../../theme';
import { createStyledComponent, getCommonStyle } from './utils';

const getContainerStyle = (theme?: ThemeProps) => {
  return getCommonStyle(theme ?? {});
};

export const Container = createStyledComponent({
  element: 'div',
  factoryStyles: getContainerStyle,
});
