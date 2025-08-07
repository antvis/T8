import { SeedTokenOptions } from '../../theme';
import { createStyledComponent, getCommonStyle } from './utils';

const getBulletStyle = (theme: SeedTokenOptions) => {
  return {
    ...getCommonStyle(theme),
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
  element: 'ol',
  factoryStyles: (theme) => ({
    ...getBulletStyle(theme),
    listStyleType: 'decimal',
  }),
});

export const Ul = createStyledComponent({
  element: 'ul',
  factoryStyles: (theme) => ({
    ...getBulletStyle(theme),
    listStyleType: 'disc',
  }),
});
