import { Child, h } from '../../dom';
import { StyledProps, ComponentFactoryOptions } from '../types';
import { defaultSeedToken } from '../../../theme';

/**
 * Universal component factory function
 * Creates pre-styled element creators with consistent behavior
 *
 * @param options - Component factory options
 * @returns A function creating the pre-styled element
 *
 * @example
 * // Create a simple div container
 * const Container = createStyledComponent({
 *   element: 'div',
 *   factoryStyles: getContainerStyle,
 * });
 * const el = Container({ theme, className: 'foo' }, 'children');
 *
 * // Create a fixed-style mark
 * const Bold = createStyledComponent({
 *   element: 'strong'
 * });
 */
export function createStyledComponent(options: ComponentFactoryOptions) {
  const { element, factoryStyles = {} } = options;

  return function Component({ theme = defaultSeedToken, style, ...rest }: StyledProps, ...children: Child[]) {
    const presetStyles = typeof factoryStyles === 'function' ? factoryStyles(theme) : factoryStyles;

    return h(element, { ...rest, style: { ...presetStyles, ...style } }, ...children);
  };
}
