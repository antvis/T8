import { type NarrativeTextSpec, Text, EventType } from '../src';
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

const text = new Text(app!);
text.schema(spec as NarrativeTextSpec);
text.on(EventType.ON_NARRATIVE_CLICK, (spec) => {
  console.log('onClickNarrative', spec);
});
text.on(EventType.ON_PARAGRAPH_CLICK, (spec) => {
  console.log('onClickParagraph', spec);
});
text.on(EventType.ON_SECTION_CLICK, (spec) => {
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
