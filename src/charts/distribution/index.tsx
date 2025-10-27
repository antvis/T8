import { createCurvePath, createSvg, extent, LINE_STROKE_COLOR, max, mean, scaleLinear } from '../utils';
import { ticks } from '../utils/scales';
import { ChartRenderFunction } from '../types';
import { getElementFontSize } from '../../utils';

const KDE_BANDWIDTH = 7; // Controls the smoothness of the KDE plot.
const TICK_COUNT = 40; // Number of points to sample for the density estimation.

export interface DistributionConfig {
  data: number[];
}

/**
 *
 * @param container
 * @param config
 */
export const renderDistribution: ChartRenderFunction<DistributionConfig> = (
  container,
  config,
  paragraphType,
  themeSeedToken,
) => {
  const { data } = config;

  function kernelDensityEstimator(kernel: (v: number) => number, X: number[]) {
    return (V: number[]): [number, number][] => X.map((x) => [x, mean(V, (v) => kernel(x - v))]);
  }

  function kernelEpanechnikov(k: number) {
    return (v: number) => {
      v /= k;
      return Math.abs(v) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
    };
  }

  const chartSize = getElementFontSize(paragraphType, themeSeedToken);

  const height = chartSize;
  const width = chartSize * 2;
  const padding = 1.5;

  // Clear old SVG
  container.innerHTML = '';

  const valueExtent = extent(data);

  if (valueExtent[0] === undefined) {
    throw new Error('Input data is empty or invalid, cannot calculate value extent.');
  }

  const xScale = scaleLinear(valueExtent, [padding, width - padding]);

  const kde = kernelDensityEstimator(kernelEpanechnikov(KDE_BANDWIDTH), ticks(valueExtent, TICK_COUNT));
  const density = kde(data);

  const maxDensity = max(density, (d) => d[1]);
  const finalYScale = scaleLinear([0, maxDensity], [height - padding, padding]);

  const svgD3 = createSvg(container, width, height);

  const pathData = createCurvePath(xScale, finalYScale, density);

  svgD3
    .append('path')
    .attr('class', 'mypath')
    .attr('fill', 'none')
    .attr('stroke', LINE_STROKE_COLOR)
    .attr('stroke-width', 1)
    .attr('stroke-linejoin', 'round')
    .attr('d', pathData);
};
