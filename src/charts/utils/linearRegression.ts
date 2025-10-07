export interface LinearRegressionResult {
  k: number;
  b: number;
}

/**
 * use least square method to fit a line to the points
 * @param points points to fit
 * @returns {k, b} the slope and intercept of the line
 */
export function linearRegression(points: { x: number; y: number }[]): LinearRegressionResult {
  if (!points || points.length < 2) {
    throw new Error('Points array must contain at least two points for linear regression.');
  }

  const n = points.length;
  let sumX = 0;
  let sumY = 0;

  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
  }

  const meanX = sumX / n;
  const meanY = sumY / n;

  let numerator = 0;
  let denominator = 0;

  for (const p of points) {
    const diffX = p.x - meanX;
    const diffY = p.y - meanY;

    numerator += diffX * diffY;
    denominator += diffX * diffX;
  }

  if (denominator === 0) {
    return { k: 0, b: meanY };
  }

  const k = numerator / denominator;

  const b = meanY - k * meanX;

  return { k, b };
}
