/**
 * Domain is the input range [min, max] of values to be scaled
 * For example, if we have data values ranging from 0 to 100, the domain would be [0, 100]
 */
export type Domain = [number, number];

/**
 * Range is the output range [min, max] that domain values will be mapped to
 * For example, if we want to map our data to a 400px width chart, range would be [0, 400]
 */
export type Range = [number, number];

/**
 * Scale is a function that maps a value from domain to range
 * It takes a number input and returns the scaled output
 */
export type Scale = (n: number) => number;

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
