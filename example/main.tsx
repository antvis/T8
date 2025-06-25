import { type NarrativeTextSpec, Text, Events } from '../src';
import spec from './example.json';

const app = document.getElementById('app');
const app2 = document.getElementById('app2');
const app3 = document.getElementById('app3');

const text = new Text(app!);
text.schema(spec as NarrativeTextSpec);
text.on(Events.onClickNarrative, (spec) => {
  console.log('onClickNarrative', spec);
});
text.on(Events.onClickParagraph, (spec) => {
  console.log('onClickParagraph', spec);
});
text.on(Events.onClickSection, (spec) => {
  console.log('onClickSection', spec);
});
text.on(Events.onClickPhrase, (spec) => {
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
