import { ThemeProps, getLineHeight } from '../../theme';
import { createStyledComponent, getCommonStyle } from './utils';

const getParagraphStyle = (theme?: ThemeProps) => {
  const lineHeight = getLineHeight(theme ?? {});
  return {
    ...getCommonStyle(theme ?? {}),
    minHeight: lineHeight,
    lineHeight: lineHeight,
    marginBottom: '4px',
  };
};

export const P = createStyledComponent({
  element: 'p',
  factoryStyles: getParagraphStyle,
});
