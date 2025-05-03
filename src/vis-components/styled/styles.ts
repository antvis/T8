import { getFontSize, seedToken } from '../../theme';
import type { ThemeProps } from '../../theme';

// Function to get the base container style
export const getContainerStyle = (theme?: ThemeProps) => {
  return {
    fontFamily: seedToken.fontFamily,
    color: seedToken.colorBase,
    fontSize: getFontSize(theme ?? {}),
  };
};

// Function to get the paragraph style
export const getParagraphStyle = (theme?: ThemeProps) => {
  return {
    ...getContainerStyle(theme ?? {}),
    minHeight: `${seedToken.lineHeight.base}px`,
    lineHeight: `${seedToken.lineHeight.base}px`,
    marginBottom: '4px',
  };
};

// Function to get bullet styles
export const getBulletStyle = (theme?: ThemeProps) => {
  return {
    ...getContainerStyle(theme ?? {}),
    paddingLeft: '16px',
    marginBottom: '4px',
  };
};

// Function to get entity style
export const getEntityStyle = (theme?: ThemeProps) => {
  return {
    display: 'inline-block',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontSize: getFontSize(theme ?? {}),
    fontFamily: seedToken.fontFamily,
    lineHeight: '1.5em',
    borderRadius: '2px',
    color: seedToken.colorEntityBase,
  };
};

// Function to get heading styles by level
export const getHeadingStyle = (_: ThemeProps, level: number) => {
  const baseStyle = {
    fontFamily: seedToken.fontFamily,
  };

  switch (level) {
    case 1:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSize.h1}px`,
        lineHeight: `${seedToken.lineHeight.h1}px`,
        margin: '26px 0 10px 0',
      };
    case 2:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSize.h2}px`,
        lineHeight: `${seedToken.lineHeight.h2}px`,
        margin: '21px 0 5px 0',
      };
    case 3:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSize.h3}px`,
        lineHeight: `${seedToken.lineHeight.h3}px`,
        margin: '16px 0 5px 0',
      };
    case 4:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSize.h4}px`,
        lineHeight: `${seedToken.lineHeight.h4}px`,
        margin: '10px 0 5px 0',
      };
    case 5:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSize.h5}px`,
        lineHeight: `${seedToken.lineHeight.h5}px`,
        margin: '8px 0 5px 0',
      };
    case 6:
      return {
        ...baseStyle,
        fontSize: `${seedToken.fontSize.h6}px`,
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
