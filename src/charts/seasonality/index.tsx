import {
  createSvg,
  getElementFontSize,
  scaleLinear,
  line,
  getSafeDomain,
  SCALE_ADJUST,
  WIDTH_MARGIN,
  RANGE_COLOR,
  OPACITY,
  LINE_STROKE_COLOR,
} from '../utils';

export interface SeasonalityChartConfig {
  data: number[];
  range: [number, number][];
}

export const renderSeasonalityChart = (container: Element, config: SeasonalityChartConfig): void => {
  const { data = [], range = [] } = config;

  if (!data.length) return;

  const isRangeValid = range.every(
    (el) =>
      Array.isArray(el) && el.length === 2 && typeof el[0] === 'number' && typeof el[1] === 'number' && el[0] < el[1],
  );

  if (!isRangeValid) {
    console.warn('Invalid range input:', range);
    return;
  }

  const chartSize = getElementFontSize(container);
  const height = chartSize;
  const width = Math.max(chartSize * 2, data.length * 2);

  const svg = createSvg(container, width, height);

  const xScale = scaleLinear([0, data?.length - 1], [0, width]);
  const yDomain = getSafeDomain(data);

  const yScale = scaleLinear(yDomain, [SCALE_ADJUST, height - SCALE_ADJUST]);

  range.forEach((el) => {
    const dataLastIndex = data.length - 1;
    const start = Math.max(0, el[0]);
    const end = Math.min(dataLastIndex, el[1]);

    if (start >= end) {
      return;
    }

    svg
      .append('rect')
      .attr('x', xScale(el[0]))
      .attr('y', SCALE_ADJUST)
      .attr('width', xScale(el[1]) - xScale(el[0]) - WIDTH_MARGIN)
      .attr('height', height)
      .attr('fill', RANGE_COLOR)
      .attr('fill-opacity', OPACITY);
  });

  const linePath = line(xScale, yScale, height)(data);
  if (linePath) {
    svg.append('path').attr('d', linePath).attr('stroke', LINE_STROKE_COLOR).attr('fill', 'transparent');
  }
};
