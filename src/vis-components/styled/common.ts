import { seedToken } from '../../theme';
import { getBulletStyle, getContainerStyle, getEntityStyle, getHeadingStyle, getParagraphStyle } from './styles';
import { CommonComponentConfig } from './type';

/**
 * Heading component list
 */
const headingComponentsList: CommonComponentConfig[] = [1, 2, 3, 4, 5, 6].map((level) => ({
  name: `H${level}`,
  element: `h${level}`,
  styles: (theme) => ({
    ...getHeadingStyle(theme, level),
  }),
}));

/**
 * Styled common components list
 */
export const commonComponentsList: CommonComponentConfig[] = [
  {
    name: 'Container',
    element: 'div',
    styles: getContainerStyle,
  },
  {
    name: 'Entity',
    element: 'span',
    styles: getEntityStyle,
  },
  {
    name: 'Paragraph',
    element: 'p',
    styles: getParagraphStyle,
  },
  {
    name: 'Bullet',
    element: 'div',
    styles: getBulletStyle,
  },
  {
    name: 'Li',
    element: 'li',
    styles: () => ({
      listStyle: 'inherit',
      lineHeight: '1.74',
    }),
  },
  {
    name: 'Ol',
    element: 'div',
    styles: (theme) => ({
      ...getBulletStyle(theme),
      listStyleType: 'decimal',
    }),
  },
  {
    name: 'Ul',
    element: 'div',
    styles: (theme) => ({
      ...getBulletStyle(theme),
      listStyleType: 'disc',
    }),
  },
  {
    name: 'P',
    element: 'p',
    styles: getParagraphStyle,
  },
  {
    name: 'Bold',
    element: 'em',
  },
  {
    name: 'Italic',
    element: 'em',
  },
  {
    name: 'Underline',
    element: 'u',
  },
  {
    name: 'Headline',
    element: 'h1',
    styles: (theme) => ({
      ...getHeadingStyle(theme, 1),
      borderBottom: `1px solid ${seedToken.borderColor}`,
    }),
  },
  ...headingComponentsList,
];
