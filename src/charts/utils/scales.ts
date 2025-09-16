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

    // Avoid division by zero if the domain is a single point.
    // In this case, all input values will map to the start of the range.
    if (d1 === d2) {
      return r1;
    }

    // If the range is a single point, all input values will map to that point.
    if (r1 === r2) {
      return r1;
    }

    // The core linear interpolation formula.
    // It calculates the proportional position of 'n' within the domain
    // and then maps that position to the corresponding value in the range.
    return r1 + ((r2 - r1) * (n - d1)) / (d2 - d1);
  };
