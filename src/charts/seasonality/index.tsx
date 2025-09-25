import { createSvg, getElementFontSize, scaleLinear, line } from '../utils';

const SCALE_ADJUST = 2;
const WIDTH_MARGIN = 0.5;
const LINE_STROKE_COLOR = '#5B8FF9';
const RANGE_COLOR = '#FF8C00';
const OPACITY = 0.6;

export interface SeasonalityChartConfig {
  data: number[];
  range: [number, number][];
}

export const renderSeasonalityChart = (container: Element, config: SeasonalityChartConfig): void => {
  const { data = [], range = [] } = config;

  if (!data.length) return;

  const isValid = range.every((el) => {
    if (!Array.isArray(el)) return false;
    if (el.length !== 2) return false;
    if (el[1] <= el[0]) return false;
    if (typeof el[0] !== 'number' || typeof el[1] !== 'number') return false;
    return true;
  });

  if (!isValid) {
    console.warn('Invalid range input:', range);
    return;
  }

  const chartSize = getElementFontSize(container);
  const height = chartSize;
  const width = Math.max(chartSize * 2, data.length * 2);

  const svg = createSvg(container, width, height);

  const xScale = scaleLinear([0, data?.length - 1], [0, width]);
  const [min, max] = [Math.min(...data), Math.max(...data)];
  const yScale = scaleLinear([min, max], [SCALE_ADJUST, height - SCALE_ADJUST]);

  range.forEach((el) => {
    svg
      .append('rect')
      .attr('x', xScale(el[0]))
      .attr('y', SCALE_ADJUST)
      .attr('width', xScale(el[1]) - xScale(el[0]) - WIDTH_MARGIN)
      .attr('height', height - SCALE_ADJUST * 2)
      .attr('fill', RANGE_COLOR)
      .attr('fill-opacity', OPACITY);
  });

  const linePath = line(xScale, yScale, height)(data);
  if (linePath) {
    svg.append('path').attr('d', linePath).attr('stroke', LINE_STROKE_COLOR).attr('fill', 'transparent');
  }
};
