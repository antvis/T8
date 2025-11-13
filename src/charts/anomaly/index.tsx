import { getElementFontSize } from '../../utils';
import { ChartRenderFunction } from '../types';
import { createSvg, LINE_STROKE_COLOR, scaleLinear, HIGHLIGHT_COLOR, SCALE_ADJUST } from '../utils';

const ANOMALY_WIDTH = 1;
const ANOMALY_HEIGHT = 12;

export interface AnomalyChartConfig {
  data: number[];
}

export const renderAnomalyChart: ChartRenderFunction<AnomalyChartConfig> = (
  container,
  config,
  paragraphType,
  themeSeedToken,
) => {
  const { data = [] } = config;
  if (!data.length) return;

  const chartSize = getElementFontSize(paragraphType, themeSeedToken);

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
    .attr('stroke', LINE_STROKE_COLOR)
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
        .attr('stroke', HIGHLIGHT_COLOR)
        .attr('stroke-width', ANOMALY_WIDTH);
    }
  });
};
