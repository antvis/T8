---
title: Interactive Examples
---

# Interactive Examples

Explore comprehensive examples of T8 features and capabilities. Each example demonstrates different aspects of T8's text visualization power and includes the full T8 Syntax source code.

## Example: 2024 Smartphone Market Analysis

This comprehensive example showcases T8's capabilities for rendering data-driven narrative text with rich entity annotations and inline visualizations. The example includes:

- Multiple entity types (metrics, dimensions, trends, ratios, etc.)
- Inline mini-charts (distributions, correlations, seasonality)
- Complex data relationships (rankings, proportions, comparisons)
- Structured markdown with sections and subsections

### Streaming Render

Watch the content render incrementally, simulating real-time data streaming or AI-generated content. Perfect for scenarios where data arrives progressively.

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';

const syntax = `
# 2024 Smartphone Market Analysis

## Market Overview

Global [smartphone shipments](metric_name) reached [1.2 billion units](metric_value, origin=1200000000) in [2024](time_desc), showing a [modest decline of 2.1%](ratio_value, origin=-0.021, assessment="negative") year-over-year.

The **premium segment** (devices over $800) showed *remarkable* [resilience](trend_desc, assessment="positive"), growing by [5.8%](ratio_value, origin=0.058, assessment="positive"). [Average selling price](other_metric_value) was [$420](metric_value, origin=420, unit="USD").

## Key Findings

1. [Asia-Pacific](dim_value) remains the __largest market__
2. [Premium devices](dim_value) showed **strong growth**
3. Budget segment faced *headwinds*

### Asia-Pacific

[Asia-Pacific](dim_value) remains the largest market with [680 million units](metric_value, origin=680000000) shipped, though this represents a [decline of 180 million units](delta_value, origin=-180000000, assessment="negative") from the previous year.

Key markets:
- [China](dim_value): [320M units](metric_value, origin=320000000) - down [8.5%](ratio_value, origin=-0.085, assessment="negative"), [ranked 1st](rank, detail=[320, 180, 90, 65, 45]) globally, accounting for [47%](contribute_ratio, origin=0.47, assessment="positive") of regional sales
- [India](dim_value): [180M units](metric_value, origin=180000000) - up [12.3%](ratio_value, origin=0.123, assessment="positive"), [ranked 2nd](rank, detail=[320, 180, 90, 65, 45]), representing [3 out of 4](proportion, origin=0.45) of the budget segment
- [Southeast Asia](dim_value): [180M units](metric_value, origin=180000000) - [stable](trend_desc, assessment="equal")

The [gap of 140M units](difference, detail=[200, 180, 160, 140]) between [China](dim_value) and [India](dim_value) is [narrowing](trend_desc, assessment="neutral").

### Market Dynamics

Sales showed [strong correlation](association, detail=[{"x":100,"y":105},{"x":120,"y":128},{"x":150,"y":155}]) with economic indicators. The [distribution](distribution, detail=[15, 25, 35, 15, 10]) was [uneven](anomaly, detail=[15, 18, 20, 65, 22]), with [unexpected concentration](anomaly, detail=[15, 18, 20, 65, 22]) in urban areas.

We observed [clear seasonality](seasonality, detail={"data":[80, 90, 95, 135], "range":[0, 150]}) with [Q4 peaks](seasonality, detail={"data":[80, 90, 95, 135]}) driven by holiday shopping.

For detailed methodology, visit [our research page](https://example.com/methodology).
`;

// Streaming Render - renders content incrementally
const app = document.getElementById('app');
const text = new Text(app!);

(async () => {
  let chunk = '';
  for (let i = 0; i < syntax.length; i += 10) {
    chunk += syntax.slice(i, i + 10);
    text.render(chunk);
    await new Promise((resolve) => setTimeout(resolve, 160));
  }
})();
```

:::

### Dark Theme with Custom Settings

The same content rendered with a dark theme and custom typography settings (12px font size, 20px line height).

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';

const syntax = `
# 2024 Smartphone Market Analysis

## Market Overview

Global [smartphone shipments](metric_name) reached [1.2 billion units](metric_value, origin=1200000000) in [2024](time_desc), showing a [modest decline of 2.1%](ratio_value, origin=-0.021, assessment="negative") year-over-year.

The **premium segment** (devices over $800) showed *remarkable* [resilience](trend_desc, assessment="positive"), growing by [5.8%](ratio_value, origin=0.058, assessment="positive"). [Average selling price](other_metric_value) was [$420](metric_value, origin=420, unit="USD").

## Key Findings

1. [Asia-Pacific](dim_value) remains the __largest market__
2. [Premium devices](dim_value) showed **strong growth**
3. Budget segment faced *headwinds*

### Asia-Pacific

[Asia-Pacific](dim_value) remains the largest market with [680 million units](metric_value, origin=680000000) shipped, though this represents a [decline of 180 million units](delta_value, origin=-180000000, assessment="negative") from the previous year.

Key markets:
- [China](dim_value): [320M units](metric_value, origin=320000000) - down [8.5%](ratio_value, origin=-0.085, assessment="negative"), [ranked 1st](rank, detail=[320, 180, 90, 65, 45]) globally, accounting for [47%](contribute_ratio, origin=0.47, assessment="positive") of regional sales
- [India](dim_value): [180M units](metric_value, origin=180000000) - up [12.3%](ratio_value, origin=0.123, assessment="positive"), [ranked 2nd](rank, detail=[320, 180, 90, 65, 45]), representing [3 out of 4](proportion, origin=0.45) of the budget segment
- [Southeast Asia](dim_value): [180M units](metric_value, origin=180000000) - [stable](trend_desc, assessment="equal")

The [gap of 140M units](difference, detail=[200, 180, 160, 140]) between [China](dim_value) and [India](dim_value) is [narrowing](trend_desc, assessment="neutral").

### Market Dynamics

Sales showed [strong correlation](association, detail=[{"x":100,"y":105},{"x":120,"y":128},{"x":150,"y":155}]) with economic indicators. The [distribution](distribution, detail=[15, 25, 35, 15, 10]) was [uneven](anomaly, detail=[15, 18, 20, 65, 22]), with [unexpected concentration](anomaly, detail=[15, 18, 20, 65, 22]) in urban areas.

We observed [clear seasonality](seasonality, detail={"data":[80, 90, 95, 135], "range":[0, 150]}) with [Q4 peaks](seasonality, detail={"data":[80, 90, 95, 135]}) driven by holiday shopping.

For detailed methodology, visit [our research page](https://example.com/methodology).
`;

// Dark theme with custom settings
const app = document.getElementById('app');
const text = new Text(app!);
text.theme('dark', { fontSize: 12, lineHeight: 20 }).render(syntax);
```

:::

### Custom Plugin - Styled Dimension Values

This example demonstrates how to customize entity rendering using plugins. Here, dimension values (like country/region names) are styled with custom colors and fonts.

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';
import { createDimensionValue } from '@antv/t8/plugin';

const syntax = `
# 2024 Smartphone Market Analysis

## Market Overview

Global [smartphone shipments](metric_name) reached [1.2 billion units](metric_value, origin=1200000000) in [2024](time_desc), showing a [modest decline of 2.1%](ratio_value, origin=-0.021, assessment="negative") year-over-year.

The **premium segment** (devices over $800) showed *remarkable* [resilience](trend_desc, assessment="positive"), growing by [5.8%](ratio_value, origin=0.058, assessment="positive"). [Average selling price](other_metric_value) was [$420](metric_value, origin=420, unit="USD").

## Key Findings

1. [Asia-Pacific](dim_value) remains the __largest market__
2. [Premium devices](dim_value) showed **strong growth**
3. Budget segment faced *headwinds*

### Asia-Pacific

[Asia-Pacific](dim_value) remains the largest market with [680 million units](metric_value, origin=680000000) shipped, though this represents a [decline of 180 million units](delta_value, origin=-180000000, assessment="negative") from the previous year.

Key markets:
- [China](dim_value): [320M units](metric_value, origin=320000000) - down [8.5%](ratio_value, origin=-0.085, assessment="negative"), [ranked 1st](rank, detail=[320, 180, 90, 65, 45]) globally, accounting for [47%](contribute_ratio, origin=0.47, assessment="positive") of regional sales
- [India](dim_value): [180M units](metric_value, origin=180000000) - up [12.3%](ratio_value, origin=0.123, assessment="positive"), [ranked 2nd](rank, detail=[320, 180, 90, 65, 45]), representing [3 out of 4](proportion, origin=0.45) of the budget segment
- [Southeast Asia](dim_value): [180M units](metric_value, origin=180000000) - [stable](trend_desc, assessment="equal")

The [gap of 140M units](difference, detail=[200, 180, 160, 140]) between [China](dim_value) and [India](dim_value) is [narrowing](trend_desc, assessment="neutral").

### Market Dynamics

Sales showed [strong correlation](association, detail=[{"x":100,"y":105},{"x":120,"y":128},{"x":150,"y":155}]) with economic indicators. The [distribution](distribution, detail=[15, 25, 35, 15, 10]) was [uneven](anomaly, detail=[15, 18, 20, 65, 22]), with [unexpected concentration](anomaly, detail=[15, 18, 20, 65, 22]) in urban areas.

We observed [clear seasonality](seasonality, detail={"data":[80, 90, 95, 135], "range":[0, 150]}) with [Q4 peaks](seasonality, detail={"data":[80, 90, 95, 135]}) driven by holiday shopping.

For detailed methodology, visit [our research page](https://example.com/methodology).
`;

// Create a custom plugin to style dimension values
const dimensionValueDescriptor = {
  style: (value, _, themeSeedToken) => ({
    color: 'red',
    fontSize: 19,
  }),
  tooltip: false,
};

const dimensionPlugin = createDimensionValue(dimensionValueDescriptor, 'overwrite');

// Apply custom plugin
const app = document.getElementById('app');
const text = new Text(app!);
text.registerPlugin(dimensionPlugin);
text.render(syntax);
```

:::

## Understanding T8 Syntax

The examples above use **T8 Syntax** - a markdown-based declarative language for narrative text visualization. Key features demonstrated:

### Entity Annotations

Entities are marked using bracket notation: `[text](entity_type, properties)`

- `[smartphone shipments](metric_name)` - Metric names
- `[1.2 billion units](metric_value, origin=1200000000)` - Metric values with raw data
- `[2024](time_desc)` - Time descriptions
- `[modest decline of 2.1%](ratio_value, origin=-0.021, assessment="negative")` - Ratios with sentiment
- `[Asia-Pacific](dim_value)` - Dimension values (categories, regions, etc.)
- `[resilience](trend_desc, assessment="positive")` - Trend descriptions
- `[ranked 1st](rank, detail=[320, 180, 90, 65, 45])` - Rankings with data

### Inline Visualizations

- `[distribution](distribution, detail=[15, 25, 35, 15, 10])` - Mini bar charts
- `[strong correlation](association, detail=[...])` - Scatter plots
- `[clear seasonality](seasonality, detail={...})` - Line charts
- `[gap of 140M units](difference, detail=[200, 180, 160, 140])` - Difference indicators

### Markdown Formatting

Standard markdown syntax is supported:

- `**bold**` for emphasis
- `*italic*` for subtle emphasis
- `__underline__` for highlighting
- Headers (`#`, `##`, `###`) for structure
- Lists (numbered and bulleted)
- Links

Learn more in the [T8 Syntax Documentation](../syntax/index.md).
