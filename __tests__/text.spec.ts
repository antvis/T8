import { describe, expect, it } from 'vitest';
import { Text, NarrativeTextSpec, createDimensionValue } from '../src';
import SCHEMA from '../example/example.json';
import { SpecificEntityPhraseDescriptor } from '../src/plugin';
import { delay } from './delay';

describe('Text', () => {
  it('simple', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    text.schema(SCHEMA as NarrativeTextSpec).theme('dark');

    const destroy = text.render();

    expect(div).toBeDOMEqual('text-simple');
    destroy();

    text.unmount();
    expect(div).toBeDOMEqual('text-unmount');
  });

  it('registerPlugin', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    const dimensionValueDescriptor: SpecificEntityPhraseDescriptor = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      style: (value, _, themeSeedToken) => ({
        color: 'red',
        fontSize: 28,
      }),
      tooltip: false,
    };

    const dimensionPlugin = createDimensionValue(dimensionValueDescriptor, 'overwrite');
    text.registerPlugin(dimensionPlugin);

    text.schema(SCHEMA as NarrativeTextSpec);

    const destroy = text.render();

    expect(div).toBeDOMEqual('text-register-plugin');
    destroy();
  });

  it('streamRender', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    const value = JSON.stringify(SCHEMA, null, 2).split('\n');
    for (let i = 0; i < value.length; i++) {
      await delay(Math.random());
      text.streamRender(value[i]);
    }

    expect(div).toBeDOMEqual('text-stream-render');

    text.clear();

    expect(div).toBeDOMEqual('text-clear');
  });

  it('syntax method should parse DSL and render', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    const dsl = `
# Sales Report

The total sales are [¥1,234,567](metric_value, origin=1234567).

## Regional Performance

Eastern region contributed [64.8%](contribute_ratio, assessment="positive").
`;

    text.syntax(dsl).theme('light').render();

    // Check that the div has content
    expect(div.innerHTML).toContain('Sales Report');
    expect(div.innerHTML).toContain('¥1,234,567');
    expect(div.innerHTML).toContain('Regional Performance');
    expect(div.innerHTML).toContain('64.8%');
  });
});
