import { SeedTokenOptions } from '../../theme';
import { createStyledComponent, getCommonStyle } from './utils';

const getParagraphStyle = (theme: SeedTokenOptions) => {
  const lineHeight = theme.lineHeight;
  return {
    ...getCommonStyle(theme),
    minHeight: `${lineHeight}px`,
    lineHeight: `${lineHeight}px`,
    marginBottom: '4px',
  };
};

export const P = createStyledComponent({
  element: 'p',
  factoryStyles: getParagraphStyle,
});
