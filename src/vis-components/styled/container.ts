import { SeedTokenOptions } from '../../theme';
import { createStyledComponent, getCommonStyle } from './utils';

const getContainerStyle = (theme: SeedTokenOptions) => {
  return getCommonStyle(theme);
};

export const Container = createStyledComponent({
  element: 'div',
  factoryStyles: getContainerStyle,
});
