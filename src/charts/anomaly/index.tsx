import { createSvg, getElementFontSize, scaleLinear } from '../utils';

const LINE_COLOR = '#1890FF';
const ANOMALY_COLOR = '#FF8C00';
const ANOMALY_WIDTH = 1;
const ANOMALY_HEIGHT = 12;
const SCALE_ADJUST = 2;

export interface AnomalyChartConfig {
  data: number[];
}

export const renderAnomalyChart = (container: Element, config: AnomalyChartConfig): void => {
  const { data = [] } = config;
  if (!data.length) return;

  const chartSize = getElementFontSize(container);

  const height = chartSize;
  const width = Math.max(chartSize * 2, data.length * 2);

  const svg = createSvg(container, width, height);

  const xScale = scaleLinear([0, data.length - 1], [SCALE_ADJUST, width - SCALE_ADJUST]);
  const centerY = height / 2;

  svg
    .append('line')
    .attr('x1', SCALE_ADJUST)
    .attr('y1', centerY)
    .attr('x2', width - SCALE_ADJUST)
    .attr('y2', centerY)
    .attr('stroke', LINE_COLOR)
    .attr('stroke-width', 1);

  data.forEach((value, index) => {
    const x = xScale(index);

    if (value !== 0) {
      svg
        .append('line')
        .attr('x1', x)
        .attr('y1', centerY - ANOMALY_HEIGHT / 2)
        .attr('x2', x)
        .attr('y2', centerY + ANOMALY_HEIGHT / 2)
        .attr('stroke', ANOMALY_COLOR)
        .attr('stroke-width', ANOMALY_WIDTH);
    }
  });
};
