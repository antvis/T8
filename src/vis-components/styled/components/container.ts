import { ThemeProps } from '../../../theme';
import { createStyledComponent } from '../styledFactory';
import getCommonStyle from './common';

const getContainerStyle = (theme?: ThemeProps) => {
  return getCommonStyle(theme ?? {});
};

export const Container = createStyledComponent({
  element: 'div',
  factoryStyles: getContainerStyle,
});
