import { Text, NarrativeTextSpec } from '../src';
import SCHEMA from '../example/example.json';
import './matcher';

describe('Text', () => {
  test('simple', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    text.schema(SCHEMA as NarrativeTextSpec).theme('dark');

    const destroy = text.render();

    expect(div).toBeDOMEqual('text-simple');
    destroy();
  });
});
