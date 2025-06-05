import { ThemeProps, getFontSize, seedToken } from '../../../theme';
import { createStyledComponent } from '../styledFactory';

const getEntityStyle = (theme?: ThemeProps) => {
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

export const Entity = createStyledComponent({
  element: 'span',
  factoryStyles: getEntityStyle,
});
