import { createSvg, getElementFontSize, Scale, scaleLinear, Selection } from '../utils';

// Chart colors
const BAR_FILL_COLOR = '#5B8FF9';
const SCALE_ADJUST = 2;

/**
 * Highlight message interface
 */
export interface HighlightMessage {
  hoverOrNot: boolean;
  message: string | number;
  interactionType?: string;
}

/**
 * Rank chart configuration
 */
export interface RankChartConfig {
  data: number[];
}

/**
 * Get the gap between bars
 * @param data - The data array
 * @returns The gap between bars
 */
const getGap = (data: number[]) => {
  if (data.length < 3) return 4;
  else if (data.length >= 3 && data.length < 5) return 2;
  else return 1;
};

/**
 * Renders a rank chart with bars
 * @param container - The container element
 * @param config - The rank chart configuration
 * @param drawSvgCallback - A callback function to draw the SVG on the chart
 */
export const renderRankChart = (
  container: Element,
  config: RankChartConfig,
  drawSvgCallback?: (svg: Selection, xScale: Scale, yScale: Scale) => void,
): void => {
  const { data = [] } = config;
  if (!data.length) return;

  const chartSize = getElementFontSize(container);

  // Clear existing content
  container.innerHTML = '';

  // Get dimensions
  const height = chartSize;
  const width = chartSize * 2;
  // If there are more than 5 bars, reduce the gap between bars to 1px
  const gap = getGap(data);
  const barWidth = (width - gap * (data.length - 1)) / data.length;

  // Create SVG
  const svg = createSvg(container, width, height);

  // Create scales
  const xScale = scaleLinear([0, data.length - 1], [0, width - barWidth]);
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const yScale = scaleLinear([minValue, maxValue], [SCALE_ADJUST, height - SCALE_ADJUST]);

  // Draw bars
  data.forEach((value, index) => {
    const x = xScale(index);
    const y = yScale(value);

    svg
      .append('rect')
      .attr('class', 'bar')
      .attr('x', x)
      .attr('y', height - y)
      .attr('width', barWidth)
      .attr('height', y)
      .attr('fill', BAR_FILL_COLOR)
      .style('cursor', 'pointer');
  });

  drawSvgCallback?.(svg, xScale, yScale);
};
