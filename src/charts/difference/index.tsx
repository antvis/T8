import { renderRankChart } from '../rank';
import { ARROW_FILL_COLOR, arrow } from '../utils';

export interface DifferenceChartConfig {
  data: number[];
}

export const renderDifferenceChart = (container: Element, config: DifferenceChartConfig): void => {
  const { data = [] } = config;
  if (!data.length) return;

  renderRankChart(container, { data }, (svg, xScale, yScale) => {
    // draw arrow on rank chart
    const arrowPath = arrow(xScale, yScale);
    svg
      .append('path')
      .attr(
        'd',
        arrowPath({ index: 0 + 0.5, value: data[0] }, { index: data.length - 1 + 0.5, value: data[data.length - 1] }),
      )
      .attr('stroke', ARROW_FILL_COLOR)
      .attr('fill', ARROW_FILL_COLOR);
  });
};
