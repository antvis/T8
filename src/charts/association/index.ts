import {
  createSvg,
  extent,
  getElementFontSize,
  scaleLinear,
  SCALE_ADJUST,
  arrow,
  LINE_STROKE_COLOR,
  linearRegression,
  ARROW_FILL_COLOR,
  HIGHLIGHT_COLOR,
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

  if (data.length < 2) throw new Error('data must contain at least 2 points');

  const chartSize = getElementFontSize(container);

  const height = chartSize;
  const width = chartSize * 2;

  const svg = createSvg(container, width, height);

  const xValueExtent = extent(data.map((d) => d.x));
  const yValueExtent = extent(data.map((d) => d.y));

  const xValueDomain: [number, number] = [
    xValueExtent[0] > 0 ? 0 : xValueExtent[0],
    xValueExtent[1] < 0 ? 0 : xValueExtent[1],
  ];
  const yValueDomain: [number, number] = [
    yValueExtent[0] > 0 ? 0 : yValueExtent[0],
    yValueExtent[1] < 0 ? 0 : yValueExtent[1],
  ];

  const xScale = scaleLinear(xValueDomain, [SCALE_ADJUST, width - SCALE_ADJUST]);
  const yScale = scaleLinear(yValueDomain, [height - SCALE_ADJUST, SCALE_ADJUST]);

  const zeroXPosition = xScale(0);
  const zeroYPosition = yScale(0);

  const linearRegressionResult = linearRegression(data);

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

  svg
    .append('path')
    .attr(
      'd',
      arrowPath(
        { index: tagData[0].x, value: tagData[0].y },
        { index: tagData[tagData.length - 1].x, value: tagData[tagData.length - 1].y },
      ),
    )
    .attr('stroke', ARROW_FILL_COLOR)
    .attr('fill', ARROW_FILL_COLOR);

  data.map((d) => {
    svg.append('circle').attr('cx', xScale(d.x)).attr('cy', yScale(d.y)).attr('r', 1).attr('fill', HIGHLIGHT_COLOR);
  });
};
