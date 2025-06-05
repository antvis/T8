/**
 * Generates an SVG arc path representing a proportion of a circle
 * Used to create pie/circle segments for proportion visualization
 *
 * @param size - The diameter of the circle
 * @param data - The proportion value (between 0 and 1)
 * @returns An SVG path string for the arc
 */
export function getArcPath(size: number, data: number) {
  // Calculate center coordinates
  const cx = size / 2;
  const cy = size / 2;
  // Calculate radius
  const r = size / 2;
  // Convert proportion to angle in radians
  const angle = normalizeProportion(data) * 2 * Math.PI;
  // Calculate end point coordinates using trigonometry
  const dx = cx + r * Math.sin(angle);
  const dy = cy - r * Math.cos(angle);
  // Create SVG path:
  // M - Move to top center of circle
  // A - Draw an arc
  // L - Draw line to center
  // Z - Close path
  const path = `
    M${cx} ${0}
    A ${cx} ${cy} 0 ${angle > Math.PI ? 1 : 0} 1 ${dx} ${dy}
    L ${cx} ${cy} Z
  `;
  return path;
}

/**
 * Ensures the proportion value is between 0 and 1
 *
 * @param data - Input proportion value
 * @returns Normalized value between 0 and 1
 */
function normalizeProportion(data: number | undefined) {
  if (typeof data !== 'number') return 0;
  if (data > 1) return 1;
  if (data < 0) return 0;
  return data;
}
