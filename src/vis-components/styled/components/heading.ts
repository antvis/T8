import { ThemeProps, seedToken } from '../../../theme';
import { getFontSizeNumber } from '../../../theme/getTheme/getFontSize';
import { createStyledComponent } from '../styledFactory';

const getHeadingStyle = (theme: ThemeProps, level: number) => {
  const baseStyle = {
    fontFamily: seedToken.fontFamily,
  };

  const fontSize = getFontSizeNumber(theme ?? {});

  switch (level) {
    case 1:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSizeMultiples.h1 * fontSize}px`,
        lineHeight: `${seedToken.lineHeight.h1}px`,
        margin: '26px 0 10px 0',
      };
    case 2:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSizeMultiples.h2 * fontSize}px`,
        lineHeight: `${seedToken.lineHeight.h2}px`,
        margin: '21px 0 5px 0',
      };
    case 3:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSizeMultiples.h3 * fontSize}px`,
        lineHeight: `${seedToken.lineHeight.h3}px`,
        margin: '16px 0 5px 0',
      };
    case 4:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSizeMultiples.h4 * fontSize}px`,
        lineHeight: `${seedToken.lineHeight.h4}px`,
        margin: '10px 0 5px 0',
      };
    case 5:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSizeMultiples.h5 * fontSize}px`,
        lineHeight: `${seedToken.lineHeight.h5}px`,
        margin: '8px 0 5px 0',
      };
    case 6:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSizeMultiples.h6 * fontSize}px`,
        lineHeight: `${seedToken.lineHeight.h6}px`,
        color: seedToken.colorBase,
        minHeight: `${seedToken.lineHeight.h6}px`,
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
    borderBottom: `1px solid ${seedToken.borderColor}`,
  }),
});

const Heading = Object.fromEntries(
  [1, 2, 3, 4, 5, 6].map((level) => [
    `H${level}`,
    createStyledComponent({ element: 'h' + level, factoryStyles: (theme) => getHeadingStyle(theme, level) }),
  ]),
);

export const { H1, H2, H3, H4, H5, H6 } = Heading;
