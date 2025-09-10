import { createSvg, getElementFontSize, arc } from '../utils';

// Background color for the unfilled portion of the circle
const PROPORTION_SHADOW_COLOR = '#CDDDFD';
// Fill color for the proportion segment
const PROPORTION_FILL_COLOR = '#3471F9';

/**
 * Proportion chart configuration
 */
export interface ProportionChartConfig {
  data: number; // 0-1
}

/**
 * Renders a circular proportion indicator
 */
export const renderProportionChart = (container: Element, config: ProportionChartConfig): void => {
  const { data = 0 } = config;
  const chartSize = getElementFontSize(container);
  const proportion = Math.max(0, Math.min(1, data)); // Clamp between 0 and 1

  const r = chartSize / 2;
  const svg = createSvg(container, chartSize, chartSize);

  // Background circle
  svg.append('circle').attr('cx', r).attr('cy', r).attr('r', r).attr('fill', PROPORTION_SHADOW_COLOR);

  // Full circle
  // Arc segment
  const endAngle = proportion * 2 * Math.PI;

  const arcPath = arc(r)(r, r, endAngle);
  svg.append('path').attr('d', arcPath).attr('fill', PROPORTION_FILL_COLOR);
};
