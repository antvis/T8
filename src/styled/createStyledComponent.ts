import { ClassAttributes, createElement, JSX, Ref } from 'preact';
import { CommonComponentProps, ComponentFactoryOptions } from './type';
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
  const { element, factoryStyles = {}, forwardRef = true } = options;

  // Component without size parameter
  return function Component({ children, style, theme, ...rest }: CommonComponentProps) {
    const presetStyles = typeof factoryStyles === 'function' ? factoryStyles(theme) : factoryStyles;

    const combinedStyles = {
      ...presetStyles,
      ...(style as JSX.CSSProperties),
    };

    const props: ClassAttributes<HTMLElement> & JSXInternal.HTMLAttributes = {
      ...rest,
      style: combinedStyles,
    };

    if (forwardRef) {
      props.ref = rest.ref as Ref<HTMLElement> & Ref<EventTarget>;
    }

    return createElement(element, props, children);
  };
}
