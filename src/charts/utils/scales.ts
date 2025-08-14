/**
 * Scaling functions for data transformation
 * Maps data values to visual coordinates
 */

import type { Domain, Range, Scale } from './types';

/**
 * Creates a linear scale function that maps values from domain to range
 *
 * @param domain - Input range [min, max] of values to be scaled
 * @param range - Output range [min, max] that domain values will be mapped to
 * @returns A function that performs the linear scaling transformation
 */
export const scaleLinear =
  (domain: Domain, range: Range): Scale =>
  (n) => {
    const [d1, d2] = domain;
    const [r1, r2] = range;
    // Returns the intermediate value when the range is zero.
    if (r1 === r2) return (d2 - d1) / 2;
    return (n / (r2 - r1)) * (d2 - d1);
  };

/**
 * Creates a band scale for categorical data
 * Maps discrete categories to continuous positions
 *
 * @param domain - Array of category names
 * @param range - Output range [min, max] for positioning
 * @param padding - Padding between bands (0-1)
 * @returns A function that maps category names to positions
 */
export const scaleBand = (domain: string[], range: Range, padding = 0.1) => {
  const bandWidth = (range[1] - range[0]) / domain.length;
  return (d: string) => {
    const index = domain.indexOf(d);
    return range[0] + index * bandWidth + (bandWidth * padding) / 2;
  };
};
