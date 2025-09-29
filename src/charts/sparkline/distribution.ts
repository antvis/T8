import { createCurvePath, createSvg, extent, max, mean, scaleLinear } from '../utils';
import { ticks } from '../utils/scales';

const KDE_BANDWIDTH = 7; // Controls the smoothness of the KDE plot.
const TICK_COUNT = 40; // Number of points to sample for the density estimation.

export interface Distribution2Config {
  data: { cate: string; value: number }[];
  aspectRatio: string;
  //   sparkLinePosition: string;
  //   wordElement?: HTMLSpanElement;
}

/**
 *
 * @param container
 * @param config
 */
export const renderDistribution2 = (container: Element, config: Distribution2Config) => {
  const { data, aspectRatio } = config;

  function kernelDensityEstimator(kernel: (v: number) => number, X: number[]) {
    return (V: number[]): [number, number][] => X.map((x) => [x, mean(V, (v) => kernel(x - v))]);
  }

  function kernelEpanechnikov(k: number) {
    return (v: number) => {
      v /= k;
      return Math.abs(v) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
    };
  }

  const values = data.map((item) => item.value);
  let width;
  let height;
  const padding = 1.5;

  if (aspectRatio === '1:1') {
    width = 20;
    height = 20;
  } else if (aspectRatio === '2:1') {
    width = 50;
    height = 20;
  } else if (aspectRatio === '4:1') {
    width = 100;
    height = 20;
  } else if (aspectRatio === '4:3') {
    width = 27;
    height = 20;
  } else if (aspectRatio === '16:9') {
    width = 36;
    height = 20;
  } else if (aspectRatio === '6:1') {
    width = 120;
    height = 20;
  } else if (aspectRatio === '8:1') {
    width = 160;
    height = 20;
  } else if (aspectRatio === '10:1') {
    width = 200;
    height = 20;
  } else {
    width = 100;
    height = 20;
  }

  // Clear old SVG
  while (container.firstChild) {
    container.innerHTML = '';
  }

  const valueExtent = extent(values);
  if (valueExtent[0] === undefined) {
    throw new Error('Input data is empty or invalid, cannot calculate value extent.');
  }

  const xScale = scaleLinear(valueExtent, [padding, width - padding]);

  const kde = kernelDensityEstimator(kernelEpanechnikov(KDE_BANDWIDTH), ticks(valueExtent, TICK_COUNT));
  const density = kde(values);

  const maxDensity = max(density, (d) => d[1]);
  const finalYScale = scaleLinear([0, maxDensity], [height - padding, padding]);

  //   不确定要不要加上wordelement
  // 使用新的 createSvg 函数来创建和选择 SVG 元素
  const svgD3 = createSvg(container, width, height);

  const pathData = createCurvePath(xScale, finalYScale, density);

  svgD3
    .append('path')
    .attr('class', 'mypath')
    .datum(density)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('stroke-linejoin', 'round')
    .attr('d', pathData);
};
