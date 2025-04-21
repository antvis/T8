import { commonComponentsList } from './common';
import { createStyledComponent } from './createStyledComponent';

/**
 * Create a styled component
 * Helper function to create and memoize styled components
 */
function createComponent(name: string) {
  const componentConfig = commonComponentsList.find((c) => c.name === name);
  if (!componentConfig) {
    throw new Error(`Component with name "${name}" not found`);
  }

  return createStyledComponent({
    element: componentConfig.element,
    factoryStyles: componentConfig.styles,
  });
}

// Export individual components - these will be tree-shakable
export const Container = createComponent('Container');
export const Entity = createComponent('Entity');
export const Paragraph = createComponent('Paragraph');
export const H1 = createComponent('H1');
export const H2 = createComponent('H2');
export const H3 = createComponent('H3');
export const H4 = createComponent('H4');
export const H5 = createComponent('H5');
export const H6 = createComponent('H6');
export const P = createComponent('P');
export const Li = createComponent('Li');
export const Ol = createComponent('Ol');
export const Ul = createComponent('Ul');
export const Bullet = createComponent('Bullet');
export const Bold = createComponent('Bold');
export const Italic = createComponent('Italic');
export const Underline = createComponent('Underline');
export const Headline = createComponent('Headline');
