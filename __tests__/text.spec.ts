import { describe, expect, it } from 'vitest';
import { Text, NarrativeTextSpec, createDimensionValue } from '../src';
import SCHEMA from '../example/example.json';
import { SpecificEntityPhraseDescriptor } from '../src/plugin';

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

  it('streamRender', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    // Set theme (required for rendering)
    text.theme('light');

    // Create a T8 syntax string to test the new streamRender implementation
    const t8Syntax = `
# Sales Report

The total sales are [¥1,234,567](metric_value, origin=1234567).

## Regional Performance

Eastern region contributed [64.8%](contribute_ratio, assessment="positive").

- The [North Region](dim_value) contributed [35%](proportion)
- The [South Region](dim_value) contributed [45%](proportion)
`;

    // Test with onComplete callback
    let completionCalled = false;
    text.streamRender(t8Syntax, {
      onComplete: (result) => {
        completionCalled = true;
        expect(result).toBeDefined();
        expect(result.sections).toBeDefined();
      },
    });

    expect(completionCalled).toBe(true);

    // Check that the content was rendered
    const innerHTML = div.innerHTML;
    expect(innerHTML.length).toBeGreaterThan(0);
    expect(innerHTML).toContain('Sales Report');
    expect(innerHTML).toContain('¥1,234,567');
    expect(innerHTML).toContain('Regional Performance');

    text.clear();

    expect(div).toBeDOMEqual('text-clear');
  });

  it('streamRender with callbacks', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    // Test that callbacks are properly invoked
    let completeCalled = false;
    let errorCalled = false;

    const validSyntax = '# Test Heading\n\nSome content.';

    text.streamRender(validSyntax, {
      onError: () => {
        errorCalled = true;
      },
      onComplete: (result) => {
        completeCalled = true;
        expect(result).toBeDefined();
        expect(result.sections).toBeDefined();
      },
    });

    // With valid syntax, onComplete should be called and onError should not
    expect(completeCalled).toBe(true);
    expect(errorCalled).toBe(false);
  });

  it('syntax method should parse DSL and render', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    const syntax = `
# Sales Report

The total sales are [¥1,234,567](metric_value, origin=1234567).

## Regional Performance

Eastern region contributed [64.8%](contribute_ratio, assessment="positive").
`;

    text.syntax(syntax).theme('light').render();

    // Check that the div has content
    expect(div.innerHTML).toContain('Sales Report');
    expect(div.innerHTML).toContain('¥1,234,567');
    expect(div.innerHTML).toContain('Regional Performance');
    expect(div.innerHTML).toContain('64.8%');
  });
});
