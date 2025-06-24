import { SeedTokenOptions } from '../../theme';
import { createStyledComponent } from './utils';

const getHeadingStyle = (theme: SeedTokenOptions, level: number) => {
  const baseStyle = {
    fontFamily: theme.fontFamily,
    color: theme.colorHeadingBase,
  };

  const fontSize = theme.fontSize;
  const lineHeight = theme.lineHeight;

  switch (level) {
    case 1:
      return {
        ...baseStyle,
        fontSize: `${theme.fontSizeMultiples.h1 * fontSize}px`,
        lineHeight: `${theme.lineHeightMultiples.h1 * lineHeight}px`,
        margin: '26px 0 10px 0',
      };
    case 2:
      return {
        ...baseStyle,
        fontSize: `${theme.fontSizeMultiples.h2 * fontSize}px`,
        lineHeight: `${theme.lineHeightMultiples.h2 * lineHeight}px`,
        margin: '21px 0 5px 0',
      };
    case 3:
      return {
        ...baseStyle,
        fontSize: `${theme.fontSizeMultiples.h3 * fontSize}px`,
        lineHeight: `${theme.lineHeightMultiples.h3 * lineHeight}px`,
        margin: '16px 0 5px 0',
      };
    case 4:
      return {
        ...baseStyle,
        fontSize: `${theme.fontSizeMultiples.h4 * fontSize}px`,
        lineHeight: `${theme.lineHeightMultiples.h4 * lineHeight}px`,
        margin: '10px 0 5px 0',
      };
    case 5:
      return {
        ...baseStyle,
        fontSize: `${theme.fontSizeMultiples.h5 * fontSize}px`,
        lineHeight: `${theme.lineHeightMultiples.h5 * lineHeight}px`,
        margin: '8px 0 5px 0',
      };
    case 6:
      return {
        ...baseStyle,
        fontSize: `${theme.fontSizeMultiples.h6 * fontSize}px`,
        lineHeight: `${theme.lineHeightMultiples.h6 * lineHeight}px`,
        minHeight: `${theme.lineHeightMultiples.h6}px`,
        letterSpacing: '0.008em',
        margin: '5px 0 5px 0',
      };
    default:
      return baseStyle;
  }
};

export const Headline = createStyledComponent({
  element: 'h1',
  factoryStyles: (theme) => ({
    ...getHeadingStyle(theme, 1),
    borderBottom: `1px solid ${theme.borderColor}`,
  }),
});

const Heading = Object.fromEntries(
  [1, 2, 3, 4, 5, 6].map((level) => [
    `H${level}`,
    createStyledComponent({ element: 'h' + level, factoryStyles: (theme) => getHeadingStyle(theme, level) }),
  ]),
);

export const { H1, H2, H3, H4, H5, H6 } = Heading;
