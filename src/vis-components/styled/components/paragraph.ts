import { ThemeProps, seedToken } from '../../../theme';
import { createStyledComponent } from '../styledFactory';
import getCommonStyle from './common';

const getParagraphStyle = (theme?: ThemeProps) => {
  return {
    ...getCommonStyle(theme ?? {}),
    minHeight: `${seedToken.lineHeight.base}px`,
    lineHeight: `${seedToken.lineHeight.base}px`,
    marginBottom: '4px',
  };
};

export const P = createStyledComponent({
  element: 'p',
  factoryStyles: getParagraphStyle,
});
