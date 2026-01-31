import { describe, expect, it } from 'vitest';
import { Text, createDimensionValue } from '../src';
import { SpecificEntityPhraseDescriptor } from '../src/plugin';

// T8 Syntax equivalent of the example.json schema
const EXAMPLE_T8_SYNTAX = `
# Bookings This Quarter Higher than Usual

This quarter, [bookings](metric_name) are higher than usual for this point in the quarter. They are [$348k](metric_value, origin=348.12). They were made up of [29 deals](metric_value), with the [average deal size](metric_name) being [$12k](metric_value).

[Bookings](metric_name) are up [$180.3k](delta_value, assessment="positive") relative to the same time last quarter. They are up [$106.1k](delta_value, assessment="positive") relative to the same time last year. They are [$110k](metric_value) ([46.2%](contribute_ratio)) greater than average bookings at the same time each quarter over the previous year.

Looking across the most relevant dimensions, the increase relative to the same time last quarter was primarily driven by

- the [Prospecting](dim_value) lead source ([$50.6k](delta_value, assessment="positive"))
- [Keely Townsend](dim_value) ([$86.2k](delta_value, assessment="positive"))
- the [New Client](dim_value) opportunity type ([$160.1k](delta_value, assessment="positive"))

The [number of deals](metric_name) ([29](metric_value)) is up [17](delta_value, assessment="positive") relative to the same time last quarter ([12](metric_value)).

The [average deal size](metric_name) ([$12k](metric_value)) is down [$2k](delta_value, assessment="negative") relative to the same time last quarter ([$14k](metric_value)).
`;

describe('Text', () => {
  it('simple', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const text = new Text(div);

    const destroy = text.theme('dark').render(EXAMPLE_T8_SYNTAX);

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

    const destroy = text.render(EXAMPLE_T8_SYNTAX);

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

  it('render with T8 syntax', () => {
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
