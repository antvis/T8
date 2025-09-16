import { renderRankChart } from '../rank';
import { arrow, getElementFontSize } from '../utils';

const ARROW_FILL_COLOR = 'rgb(250, 84, 28)';

export interface DifferenceChartConfig {
  data: number[];
}

export const renderDifferenceChart = (container: Element, config: DifferenceChartConfig): void => {
  const { data = [] } = config;
  if (!data.length) return;

  const chartSize = getElementFontSize(container);

  renderRankChart(container, { data }, (svg, xScale, yScale) => {
    // draw arrow on rank chart
    const height = chartSize;
    const arrowPath = arrow(xScale, yScale, height);
    svg
      .append('path')
      .attr('d', arrowPath({ index: 0, value: data[0] }, { index: data.length - 1, value: data[data.length - 1] }))
      .attr('stroke', ARROW_FILL_COLOR)
      .attr('fill', ARROW_FILL_COLOR);
  });
};
