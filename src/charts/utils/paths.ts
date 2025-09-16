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
export const arrow = (xScale: Scale, yScale: Scale, height: number, arrowheadLength = 2, arrowheadWidth = 2) => {
  return (startData: { index: number; value: number }, endData: { index: number; value: number }): string => {
    const startX = xScale(startData.index + 0.5);
    const startY = height - yScale(startData.value);
    const endX = xScale(endData.index + 0.5);
    const endY = height - yScale(endData.value);

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
