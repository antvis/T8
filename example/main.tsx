import { type NarrativeTextSpec, Text } from '../src';
import spec from './example.json';

import { createDimensionValue } from '../src/plugin/presets/createDimensionValue';
import { SpecificEntityPhraseDescriptor } from '../src/plugin/types';

const dimensionValueDescriptor: SpecificEntityPhraseDescriptor = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  style: (value, _, themeSeedToken) => ({
    color: 'red',
    fontSize: 28,
  }),
  tooltip: false,
};

export const dimensionPlugin = createDimensionValue(dimensionValueDescriptor, 'overwrite');

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

const value = JSON.stringify(spec, null, 2).split('\n');

const text5 = new Text(app5!);
text5.registerPlugin(dimensionPlugin);
text5.theme('dark');

const mockAsyncOperation = async (data: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Processing: ${data}`);
      text5.streamRender(data);
      resolve();
    }, 50);
  });
};

const processData = async (data: string[]): Promise<void> => {
  console.log('Starting to process data...');

  for (let i = 0; i < data.length; i++) {
    await mockAsyncOperation(data[i]);
  }

  console.log('All data processed.');
};

processData(value);
