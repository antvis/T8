/**
 * Path generators for SVG shapes
 * Creates SVG path data for lines, areas, and arcs
 */

import type { Scale, Point } from './types';

/**
 * Creates a line generator function
 * Converts data points to SVG path data for lines
 *
 * @param xScale - Scale function for X coordinates
 * @param yScale - Scale function for Y coordinates
 * @returns Function that generates SVG path data from data array
 */
export const line = (xScale: Scale, yScale: Scale, height: number) => {
  return (data: number[]): string => {
    if (!data.length) return '';

    const points = data.map((item, index) => [xScale(index), height - yScale(item)] as Point);
    return points.reduce((path, [x, y], i) => {
      if (i === 0) return `M${x} ${y}`;
      return `${path} L${x} ${y}`;
    }, '');
  };
};

/**
 * Creates an area generator function
 * Converts data points to SVG path data for filled areas
 *
 * @param xScale - Scale function for X coordinates
 * @param yScale - Scale function for Y coordinates
 * @param y0 - Baseline Y coordinate for the area
 * @returns Function that generates SVG path data from data array
 */
export const area = (xScale: Scale, yScale: Scale, y0: number) => {
  return (data: number[]): string => {
    if (!data.length) return '';

    const points = data.map((d, i) => [xScale(i), y0 - yScale(d)] as Point);
    const areaPoints = [...points, [points[points.length - 1][0], y0], [points[0][0], y0]];

    return areaPoints.reduce((path, [x, y], i) => {
      if (i === 0) return `M${x} ${y}`;
      return `${path} L${x} ${y}`;
    }, '');
  };
};

/**
 * Creates an arc generator function
 * Converts angle data to SVG path data for arcs
 *
 * @param radius - radius of the arc
 * @returns Function that generates SVG path data from start and end angles
 */
export const arc = (radius: number) => {
  return (centerX: number, centerY: number, endAngle: number): string => {
    const dx = centerX + radius * Math.sin(endAngle);
    const dy = centerY - radius * Math.cos(endAngle);

    const largeArcFlag = endAngle <= Math.PI ? 0 : 1;

    return [
      `M${centerX} ${centerY - radius}`,
      `A${radius} ${radius} 0 ${largeArcFlag} 1 ${dx} ${dy}`,
      `L${centerX} ${centerY}`,
      'Z',
    ].join(' ');
  };
};

/**
 * Creates an arrow generator function
 * Converts start and end points to SVG path data for lines with arrowheads
 *
 * @param xScale - Scale function for X coordinates
 * @param yScale - Scale function for Y coordinates
 * @returns Function that generates SVG path data from start and end points
 */
export const arrow = (xScale: Scale, yScale: Scale, arrowheadLength = 2, arrowheadWidth = 2) => {
  return (startData: { index: number; value: number }, endData: { index: number; value: number }): string => {
    const startX = xScale(startData.index);
    const startY = yScale(startData.value);
    const endX = xScale(endData.index);
    const endY = yScale(endData.value);

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const angle = Math.atan2(deltaY, deltaX);

    const basePointX = endX - arrowheadLength * Math.cos(angle);
    const basePointY = endY - arrowheadLength * Math.sin(angle);

    const arrowPoint1X = basePointX - (arrowheadWidth / 2) * Math.sin(angle);
    const arrowPoint1Y = basePointY + (arrowheadWidth / 2) * Math.cos(angle);
    const arrowPoint2X = basePointX + (arrowheadWidth / 2) * Math.sin(angle);
    const arrowPoint2Y = basePointY - (arrowheadWidth / 2) * Math.cos(angle);

    return [
      `M${startX} ${startY}`,
      `L${basePointX} ${basePointY}`,
      `M${endX} ${endY}`,
      `L${arrowPoint1X} ${arrowPoint1Y}`,
      `L${arrowPoint2X} ${arrowPoint2Y}`,
      `Z`,
    ].join(' ');
  };
};

/**
 * Generates an SVG path string for a smooth Bézier curve (similar to d3.curveBasis)
 * based on a set of input points.
 *
 * NOTE: This is a simplified B-spline implementation suitable for smooth line generation,
 *
 * @param points - An array of coordinate pairs [[x0, y0], [x1, y1], ...] to be interpolated.
 * @returns A complete SVG path data string (starting with 'M' followed by 'C' segments).
 */
export function curveBasis(points: [number, number][]): string {
  if (points.length < 4) {
    // For simplicity, return a straight line for few points
    const path = points.map((p) => p.join(',')).join('L');
    return `M${path}`;
  }

  // A very simplified B-spline path generation for demonstration
  // This is not a complete implementation of d3.curveBasis,
  // but it generates a smooth-looking curve.
  let path = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length - 2; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2];

    const x0 = p0[0];
    const y0 = p0[1];
    const x1 = p1[0];
    const y1 = p1[1];
    const x2 = p2[0];
    const y2 = p2[1];
    const x3 = p3[0];
    const y3 = p3[1];

    const cp1x = x1 + (x2 - x0) / 6;
    const cp1y = y1 + (y2 - y0) / 6;
    const cp2x = x2 - (x3 - x1) / 6;
    const cp2y = y2 - (y3 - y1) / 6;

    path += `C${cp1x},${cp1y},${cp2x},${cp2y},${x2},${y2}`;
  }
  return path;
}

export const createCurvePath = (xScale: Scale, yScale: Scale, data: Point[]): string => {
  if (!data || data.length < 2) {
    return '';
  }

  const points: Point[] = data.map((d) => [xScale(d[0]), yScale(d[1])]);
  return curveBasis(points);
};
