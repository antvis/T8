import { type NarrativeTextSpec, ParagraphType, Text } from '../src';
// import spec from './example.json';
import $spec from './test_json3.json';

import { createDimensionValue } from '../src/plugin/presets/createDimensionValue';
import { SpecificEntityPhraseDescriptor } from '../src/plugin/types';
import { SeedTokenOptions } from '../src/theme';

import {
  renderDifferenceChart,
  renderLineChart,
  renderProportionChart,
  renderRankChart,
  renderSeasonalityChart,
  renderAnomalyChart,
  renderDistribution,
  renderAssociationChart,
} from '../src/charts';
import { restore as restoreJson } from '../src/utils/schema-simplified';

const spec = restoreJson($spec);

console.info(JSON.stringify(spec).length, JSON.stringify($spec).length);
const dimensionValueDescriptor: SpecificEntityPhraseDescriptor = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  style: (value, _, themeSeedToken) => ({
    color: 'red',
    fontSize: 28,
  }),
  tooltip: false,
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const dimensionPlugin = createDimensionValue(dimensionValueDescriptor, 'overwrite');

const appChart = document.getElementById('app-chart');

const paragraphType = ParagraphType.HEADLINE;

const mockThemeSeedToken: SeedTokenOptions = {
  fontSize: 14,
  lineHeight: 24,
  fontFamily: 'PingFangSC, sans-serif',
  borderColor: 'rgb(199, 199, 199)',
  fontSizeMultiples: {
    h1: 2,
    h2: 1.72,
    h3: 1.4,
    h4: 1.15,
    h5: 1.08,
    h6: 1.08,
  },
  lineHeightMultiples: {
    h1: 1.5,
    h2: 1.3,
    h3: 1.15,
    h4: 1,
    h5: 1,
    h6: 1,
  },
  colorBase: '#000',
  colorEntityBase: '#000',
  colorHeadingBase: '#000',
  colorPositive: '#000',
  colorNegative: '#000',
  colorConclusion: '#000',
  colorDimensionValue: '#000',
  colorMetricName: '#000',
  colorMetricValue: '#000',
  colorOtherValue: '#000',
  colorProportionShadow: '#000',
  colorProportionFill: '#000',
  colorLineStroke: '#000',
};

function renderChart<T>(
  fn: (container: Element, config: T, paragraphType: ParagraphType, themeSeedToken: SeedTokenOptions) => void,
) {
  const element = document.createElement('span');
  appChart?.appendChild(element);

  return (config: T) => {
    fn(element, config, paragraphType, mockThemeSeedToken);
  };
}

/**
 * get random integer between min and max
 * @param min
 * @param max
 * @returns
 */
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const app = document.getElementById('app');
const app2 = document.getElementById('app2');
const app3 = document.getElementById('app3');
const app4 = document.getElementById('app4');
const app5 = document.getElementById('app5');

const text = new Text(app!);
text.schema(spec as NarrativeTextSpec);
text.on('narrative:click', (spec) => {
  console.log('onClickNarrative', spec);
});
text.on('paragraph:click', (spec) => {
  console.log('onClickParagraph', spec);
});
text.on('section:click', (spec) => {
  console.log('onClickSection', spec);
});
text.on('phrase:click', (spec) => {
  console.log('onClickPhrase', spec);
});
// text.theme(theme);
text.render();

const text2 = new Text(app2!);
text2.schema(spec as NarrativeTextSpec);
text2.theme('dark', { fontSize: 12, lineHeight: 20 });
text2.render();

const text3 = new Text(app3!);
text3.schema(spec as NarrativeTextSpec);
text3.theme('dark');
text3.render();

const text4 = new Text(app4!);
text4.schema(spec as NarrativeTextSpec);
text4.registerPlugin(dimensionPlugin);
text4.theme('dark');
text4.render();

const text5 = new Text(app5!);
// text5.registerPlugin(dimensionPlugin);
text5.theme('dark');

// mock streaming data
async function streamingRender() {
  const value = JSON.stringify(spec, null, 2).split('\n');
  for (let i = 0; i < value.length; i++) {
    await delay(Math.random() * 30 + 20);
    text5.streamRender(value[i]);
  }
}

streamingRender().then(() => {
  console.log('All data processed.');
});

const distributionData: number[] = [];
const SAMPLE_SIZE = 200;

// generate distribution data, 330-370, 530-570, 630-670
// 330-370: 30%
// 530-570: 20%
// 630-670: 50%
// you will see three peaks in the distribution chart

for (let i = 0; i < SAMPLE_SIZE * 0.3; i++) {
  distributionData.push(getRandomInt(330, 370));
}

for (let i = 0; i < SAMPLE_SIZE * 0.5; i++) {
  distributionData.push(getRandomInt(530, 570));
}
// 50% 数据集中在 350 附近（高销量）
for (let i = 0; i < SAMPLE_SIZE * 0.2; i++) {
  distributionData.push(getRandomInt(630, 670));
}

renderChart(renderDifferenceChart)({ data: [1, 2, 3, 4, 5] });
renderChart(renderProportionChart)({ data: 0.3 });
renderChart(renderLineChart)({ data: [1, 2, 3, 4, 5] });
renderChart(renderRankChart)({ data: [1, 2, 3, 4, 5] });
renderChart(renderSeasonalityChart)({
  data: [3, 11, 5, 1, 10, 3, 11, 5, 16, 2, 5, 19, 1, 13, 11, 5, 16, 2],
  range: [
    [-1, 2],
    [3, 4],
    [5, 10],
    [12, 100],
  ],
});
renderChart(renderAnomalyChart)({ data: [0, 1, 0, 0, 1, 0, 1, 0, 0] });

renderChart(renderDistribution)({
  data: distributionData,
});

renderChart(renderAssociationChart)({
  data: [
    { x: -1, y: -2 },
    { x: 2, y: 2 },
    { x: 3, y: 20 },
  ],
});
