import {
  createSvg,
  extent,
  getElementFontSize,
  scaleLinear,
  SCALE_ADJUST,
  arrow,
  LINE_STROKE_COLOR,
  linearRegression,
} from '../utils';

interface Point {
  x: number;
  y: number;
}

export interface AssociationChartConfig {
  data: Point[];
}

export const renderAssociationChart = (container: Element, config: AssociationChartConfig): void => {
  const { data = [] } = config;
  if (!data.length) return;

  const chartSize = getElementFontSize(container);

  const height = chartSize;
  const width = Math.max(chartSize * 2, data.length * 2);

  const svg = createSvg(container, width, height);

  const xValueExtent = extent(data.map((d) => d.x));
  const yValueExtent = extent(data.map((d) => d.y));

  const xScale = scaleLinear(xValueExtent, [SCALE_ADJUST, width - SCALE_ADJUST]);
  const yScale = scaleLinear(yValueExtent, [height - SCALE_ADJUST, SCALE_ADJUST]);

  const zeroXPosition = xScale(0);
  const zeroYPosition = yScale(0);

  const linearRegressionResult = linearRegression(data);

  console.log(linearRegressionResult);
  const tagData: Point[] = data.map((d) => {
    const tag = linearRegressionResult.k * d.x + linearRegressionResult.b;

    return {
      x: d.x,
      y: tag,
    };
  });

  svg
    .append('line')
    .attr('x1', zeroXPosition)
    .attr('y1', 0)
    .attr('x2', zeroXPosition)
    .attr('y2', height)
    .attr('stroke', LINE_STROKE_COLOR);

  svg
    .append('line')
    .attr('x1', 0)
    .attr('y1', zeroYPosition)
    .attr('x2', width)
    .attr('y2', zeroYPosition)
    .attr('stroke', LINE_STROKE_COLOR);

  const arrowPath = arrow(xScale, yScale);

  console.log(tagData);

  svg
    .append('path')
    .attr(
      'd',
      arrowPath(
        { index: tagData[0].x, value: tagData[0].y },
        { index: tagData[tagData.length - 1].x, value: tagData[tagData.length - 1].y },
      ),
    )
    .attr('stroke', 'red')
    .attr('fill', 'red');

  data.map((d) => {
    svg.append('circle').attr('cx', xScale(d.x)).attr('cy', yScale(d.y)).attr('r', 1).attr('fill', 'red');
  });
};
