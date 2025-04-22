import { NarrativeTextSpec, Text } from '../src';
import spec from './example.json';

const app = document.getElementById('app');
const app2 = document.getElementById('app2');

const text = new Text(app!);
text.schema(spec as NarrativeTextSpec);
// text.theme(theme);
text.render();

const text2 = new Text(app2!);
text2.schema(spec as NarrativeTextSpec);
text2.theme({ size: 'small' });
text2.render();
