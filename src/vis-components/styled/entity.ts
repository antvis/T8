import { SeedTokenOptions } from '../../theme';
import { createStyledComponent } from './utils';

const getEntityStyle = (theme: SeedTokenOptions) => {
  return {
    display: 'inline-block',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontSize: `${theme.fontSize}px`,
    fontFamily: theme.fontFamily,
    lineHeight: '1.5em',
    borderRadius: '2px',
    color: theme.colorEntityBase,
    margin: '0 2px',
  };
};

export const Entity = createStyledComponent({
  element: 'span',
  factoryStyles: getEntityStyle,
});
