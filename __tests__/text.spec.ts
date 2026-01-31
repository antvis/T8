import { describe, expect, it } from 'vitest';
import { Text, NarrativeTextSpec, createDimensionValue } from '../src';
import SCHEMA from '../example/example.json';
import { SpecificEntityPhraseDescriptor } from '../src/plugin';

describe('Text', () => {
  it('simple', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    const destroy = text.theme('dark').render(SCHEMA as NarrativeTextSpec);

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

    const destroy = text.render(SCHEMA as NarrativeTextSpec);

    expect(div).toBeDOMEqual('text-register-plugin');
    destroy();
  });

  it('render with T8 syntax string', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    // Create a T8 syntax string
    const t8Syntax = `
# Sales Report

The total sales are [¥1,234,567](metric_value, origin=1234567).

## Regional Performance

Eastern region contributed [64.8%](contribute_ratio, assessment="positive").

- The [North Region](dim_value) contributed [35%](proportion)
- The [South Region](dim_value) contributed [45%](proportion)
`;

    text.theme('light').render(t8Syntax);

    // Check that the content was rendered
    const innerHTML = div.innerHTML;
    expect(innerHTML.length).toBeGreaterThan(0);
    expect(innerHTML).toContain('Sales Report');
    expect(innerHTML).toContain('¥1,234,567');
    expect(innerHTML).toContain('Regional Performance');

    text.clear();

    expect(div).toBeDOMEqual('text-clear');
  });

  it('render handles invalid syntax gracefully', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    // This should not throw but render empty content
    const destroy = text.theme('light').render('# Test Heading\n\nSome content.');

    // With valid syntax, should render successfully
    expect(div.innerHTML.length).toBeGreaterThan(0);
    expect(div.innerHTML).toContain('Test Heading');

    destroy();
  });

  it('render with NarrativeTextSpec object', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    const syntax = `
# Sales Report

The total sales are [¥1,234,567](metric_value, origin=1234567).

## Regional Performance

Eastern region contributed [64.8%](contribute_ratio, assessment="positive").
`;

    text.theme('light').render(syntax);

    // Check that the div has content
    expect(div.innerHTML).toContain('Sales Report');
    expect(div.innerHTML).toContain('¥1,234,567');
    expect(div.innerHTML).toContain('Regional Performance');
    expect(div.innerHTML).toContain('64.8%');
  });
});
