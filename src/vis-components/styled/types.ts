import { JSX } from 'preact/jsx-runtime';
import { ComponentChildren } from 'preact';
import { SeedTokenOptions } from '../../theme';

/**
 * Generic style factory function type.
 * @param param - Optional style parameter (like size).
 * @returns Style object with CSS properties.
 */
export type StyleFactory = (theme: SeedTokenOptions) => Record<string, string | number>;

/**
 * Component factory options.
 * Configuration for creating styled components.
 */
export interface ComponentFactoryOptions {
  /** HTML element tag name */
  element: string;
  /** Style factory function */
  factoryStyles?: StyleFactory | Record<string, string | number>;
  /** Whether component forwards ref */
  forwardRef?: boolean;
}

/**
 * Common component props interface.
 * Base interface for all styled components.
 */
export interface CommonComponentProps extends JSX.HTMLAttributes<HTMLElement> {
  theme?: SeedTokenOptions;
  children?: ComponentChildren;
  style?: JSX.CSSProperties;
  className?: string;
  [key: string]: unknown;
}
