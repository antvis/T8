import { ThemeProps } from '../../../theme';
import { createStyledComponent } from '../styledFactory';
import getCommonStyle from '../commonStyle';
import getLineHeight from '../../../theme/getTheme/getLineHeight';

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
