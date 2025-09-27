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

/**
 * Standalone ticks function to generate an array of uniformly spaced numbers.
 * This is needed because your scaleLinear method doesn't provide it.
 */

export const ticks = (domain: Domain, count: number): number[] => {
  const [dMin, dMax] = domain;

  // Handle edge cases
  if (dMin === dMax) return [dMin];
  if (count <= 0) return [];

  // Calculate the approximate step size
  const roughStep = (dMax - dMin) / count;

  // Find a "nice" step size based on a power of 10
  const exponent = Math.floor(Math.log10(roughStep));
  const powerOf10 = Math.pow(10, exponent);
  const niceSteps = [1, 2, 5, 10];
  let niceStep = 0;

  for (const s of niceSteps) {
    if (roughStep <= s * powerOf10) {
      niceStep = s * powerOf10;
      break;
    }
  }

  // Adjust for floating point inaccuracies
  if (niceStep === 0) {
    niceStep = niceSteps[niceSteps.length - 1] * powerOf10;
  }

  const result: number[] = [];
  const start = Math.floor(dMin / niceStep) * niceStep;
  const end = Math.ceil(dMax / niceStep) * niceStep;

  // Generate the ticks
  for (let current = start; current <= end; current += niceStep) {
    if (current >= dMin && current <= dMax) {
      result.push(current);
    }
  }

  return result;
};
