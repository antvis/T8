import { SeedTokenOptions } from '../../theme';
import { DomProps } from '../dom';

/**
 * Generic style factory function type.
 * @param theme - The theme seed token.
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
}

/**
 * Common props of styled components.
 */
export type StyledProps = DomProps & {
  theme?: SeedTokenOptions;
};
