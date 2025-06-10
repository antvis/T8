import { ClassAttributes, createElement, JSX, Ref } from 'preact';
import { CommonComponentProps, ComponentFactoryOptions } from './types';
import { JSXInternal } from 'preact/src/jsx';

/**
 * Universal component factory function
 * Creates pre-styled components with consistent behavior
 *
 * @param options - Component factory options
 * @returns A new pre-styled component
 *
 * @example
 * // Create a simple div container component
 * const Container = createStyledComponent({
 *   element: 'div',
 *   styleFactory: getContainerStyle,
 *   forwardRef: true
 * });
 *
 * // Create a fixed-style mark component
 * const Bold = createStyledComponent({
 *   element: 'strong'
 * });
 */
export function createStyledComponent(options: ComponentFactoryOptions) {
  const { element, factoryStyles = {} } = options;

  // Component without size parameter
  return function Component({ children, style, theme, forwardRef, ...rest }: CommonComponentProps) {
    const presetStyles = typeof factoryStyles === 'function' ? factoryStyles(theme) : factoryStyles;

    const combinedStyles = {
      ...presetStyles,
      ...(style as JSX.CSSProperties),
    };

    const props: ClassAttributes<HTMLElement> & JSXInternal.HTMLAttributes = {
      ...rest,
      style: combinedStyles,
      ref: forwardRef as Ref<HTMLElement> | undefined,
    };

    const component = createElement(element, props, children);

    return component;
  };
}
