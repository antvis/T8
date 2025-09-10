import { createSvg, getElementFontSize, scaleLinear, line, area } from '../utils';

const LINE_STROKE_COLOR = '#5B8FF9';
const LINE_FILL_COLOR = '#5B8FF9';
const LINEAR_FILL_COLOR_ID = 'wsc-line-fill';
const SCALE_ADJUST = 2;

/**
 * Line chart configuration
 */
export interface LineChartConfig {
  data: number[];
}

/**
 * Renders a line chart with optional gradient fill area
 */
export const renderLineChart = (container: Element, config: LineChartConfig): void => {
  const { data = [] } = config;
  const chartSize = getElementFontSize(container);

  const height = chartSize;
  const width = Math.max(chartSize * 2, data.length * 2);

  const svg = createSvg(container, width, height);

  const xScale = scaleLinear([0, data?.length - 1], [0, width]);
  // Find min and max values in data for Y-axis scaling
  const [min, max] = [Math.min(...data), Math.max(...data)];
  // Create scale for Y-axis with slight padding (SCALE_ADJUST)
  const yScale = scaleLinear([min, max], [SCALE_ADJUST, height - SCALE_ADJUST]);

  // Create gradient
  const defs = svg.append('defs');
  const gradient = defs
    .append('linearGradient')
    .attr('id', LINEAR_FILL_COLOR_ID)
    .attr('x1', '50%')
    .attr('x2', '50%')
    .attr('y1', '0%')
    .attr('y2', '122.389541%');

  gradient.append('stop').attr('offset', '0%').attr('stop-color', LINE_FILL_COLOR);
  gradient.append('stop').attr('offset', '100%').attr('stop-color', '#FFFFFF').attr('stop-opacity', '0');

  // Draw line
  const linePath = line(xScale, yScale, height)(data);

  if (linePath) {
    svg.append('path').attr('d', linePath).attr('stroke', LINE_STROKE_COLOR).attr('fill', 'transparent');
  }

  // Draw area
  const areaPath = area(xScale, yScale, height)(data);
  if (areaPath) {
    svg.append('path').attr('d', areaPath).attr('fill', `url(#${LINEAR_FILL_COLOR_ID})`);
  }
};
