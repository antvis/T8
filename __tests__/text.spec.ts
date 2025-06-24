/**
 * @vitest-environment jsdom
 */

import { Text, NarrativeTextSpec } from '../src';
import SCHEMA from '../example/example.json';

describe('Text', () => {
  test('render', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    text.schema(SCHEMA as NarrativeTextSpec).theme('dark');

    const destroy = text.render();

    expect(div.innerHTML).toContain('Bookings This Quarter Higher than Usual');

    destroy();
  });
});
