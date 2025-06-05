import { ThemeProps } from '../../../theme';
import getCommonStyle from '../commonStyle';
import { createStyledComponent } from '../styledFactory';

const getBulletStyle = (theme?: ThemeProps) => {
  return {
    ...getCommonStyle(theme ?? {}),
    paddingLeft: '16px',
    marginBottom: '4px',
  };
};

export const Bullet = createStyledComponent({
  element: 'div',
  factoryStyles: getBulletStyle,
});

export const Li = createStyledComponent({
  element: 'li',
  factoryStyles: () => ({
    listStyle: 'inherit',
    lineHeight: '1.74',
  }),
});

export const Ol = createStyledComponent({
  element: 'div',
  factoryStyles: (theme) => ({
    ...getBulletStyle(theme),
    listStyleType: 'decimal',
  }),
});

export const Ul = createStyledComponent({
  element: 'div',
  factoryStyles: (theme) => ({
    ...getBulletStyle(theme),
    listStyleType: 'disc',
  }),
});
