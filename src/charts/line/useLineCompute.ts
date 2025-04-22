import { useState, useEffect } from 'preact/hooks';
import { scaleLinear, Scale } from './scaleLinear';
import { DEFAULT_FONT_SIZE } from '../hooks/getElementFontSize';

// Adjust value to create padding around the line chart for better visibility
const SCALE_ADJUST = 2;

/**
 * Line class handles the calculation and generation of line chart paths
 * It computes the dimensions, scales, and point coordinates for rendering
 */
class Line {
  // Array of data points to be visualized
  protected data: number[] = [];
  // Base size determined by font size
  protected size = DEFAULT_FONT_SIZE;
  // Height of the chart (defaults to size)
  protected height = this.size;
  // Width of the chart (calculated based on data length)
  protected width = this.getWidth();
  // Scale function for X axis
  protected xScale: Scale | undefined;
  // Scale function for Y axis
  protected yScale: Scale | undefined;
  // Array of [x,y] coordinates for each data point
  protected points: [number, number][] = [];

  /**
   * Create a new Line chart instance
   * @param size - Base size for the chart (typically derived from font size)
   * @param data - Array of numeric values to visualize
   */
  constructor(size: number, data: number[]) {
    this.size = size;
    this.data = data;
    this.compute();
  }

  /**
   * Calculate the width of the chart based on size and data length
   * @returns Width in pixels
   */
  protected getWidth() {
    return Math.max(this.size * 2, this.data?.length * 2);
  }

  /**
   * Compute all necessary values for rendering the line chart
   * Sets up scales, dimensions, and point coordinates
   */
  protected compute() {
    if (!this.data) return;
    this.height = this.size;
    this.width = this.getWidth();
    // Create scale for X-axis mapping chart width to data indices
    this.xScale = scaleLinear([0, this.width], [0, this.data?.length - 1]);
    // Find min and max values in data for Y-axis scaling
    const [min, max] = [Math.min(...this.data), Math.max(...this.data)];
    // Create scale for Y-axis with slight padding (SCALE_ADJUST)
    this.yScale = scaleLinear([SCALE_ADJUST, this.height - SCALE_ADJUST], [min, max]);
    // Convert data points to [x,y] coordinates
    // Note: Y coordinates are inverted (this.height - ...) because SVG coordinates
    // start from top-left corner (0,0) and go down and right
    this.points = this.data.map((item, index) => [this.xScale?.(index), this.height - this.yScale?.(item)]);
  }

  /**
   * Generate SVG path string for the line
   * @returns SVG path data string or null if no data
   */
  getLinePath(): null | string {
    if (!this.data?.length || !this.xScale || !this.yScale) return null;
    const path = this.points.reduce((prev, [x, y], index) => {
      if (index === 0) return `M${x} ${y}`; // Move to first point
      return `${prev} L ${x} ${y}`; // Draw line to subsequent points
    }, '');
    return path;
  }

  /**
   * Generate SVG polygon points for area under the line
   * Creates a closed shape by adding points along the bottom
   * @returns SVG polygon points string or null if no data
   */
  getPolygonPath(): null | string {
    if (!this.data?.length || !this.xScale || !this.yScale) return null;
    const polygonPoints = [...this.points];
    const last = this.points[this.points.length - 1];
    // Add bottom-right corner
    polygonPoints.push([last[0], this.height]);
    // Add bottom-left corner
    polygonPoints.push([0, this.height]);
    // Add first point to close the shape
    const startPoint = this.points[0];
    polygonPoints.push(startPoint);

    // Convert points array to SVG polygon points format
    const path = polygonPoints.reduce((prev, [x, y]) => `${prev} ${x},${y}`, '');
    return path;
  }

  /**
   * Get width and height of the chart container
   * @returns [width, height] array
   */
  getContainer() {
    return [this.width, this.height];
  }
}

/**
 * React hook for line chart computation
 * Creates and updates a Line instance when size or data changes
 *
 * @param size - Base size of the chart (typically derived from font size)
 * @param data - Array of numeric values to visualize
 * @returns Object containing dimensions and path data for rendering
 */
export const useLineCompute = (size: number, data: number[]) => {
  const [line, setLine] = useState<Line>(new Line(size, data));

  // Re-compute when size or data changes
  useEffect(() => {
    setLine(new Line(size, data));
  }, [size, data]);

  return {
    width: line.getContainer()[0],
    height: line.getContainer()[1],
    linePath: line.getLinePath(),
    polygonPath: line.getPolygonPath(),
  };
};
