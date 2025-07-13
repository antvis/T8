---
title: Plugin System
order: 2
group:
  title: Advanced Usage
  order: 2
nav:
  title: Tutorial
  path: /tutorial
  order: 1
---

# Plugin System

T8 provides a powerful plugin system that allows you to customize and extend text visualization functionality. The plugin system includes three types of plugins:

- Entity Phrase Plugins (EntityPhrase): Used to customize the display of predefined entities like metric names, metric values, etc.
- Custom Phrase Plugins (CustomPhrase): Used to extend new phrase types
- Custom Block Plugins (CustomBlock): Used to customize paragraph and section-level displays

## Plugin Manager

All plugins are managed uniformly through the `PluginManager`. The `PluginManager` is responsible for registering and managing different types of plugins:

```ts
import { PluginManager } from '@antv/t8';

const plugin = /* create a plugin with factory function */

// Use plugin manager
const text = new Text('#container');
text.registerPlugin(plugin);
```

## Entity Phrase Plugins (EntityPhrase)

Entity phrase plugins are used to customize the display style and interaction behavior of predefined entities. T8 includes a series of built-in entity types, with corresponding factory functions to create plugins.

### Preset Entity Plugins

```ts
import {
  createMetricName, // Metric name
  createMetricValue, // Metric value
  createDeltaValue, // Comparison difference
  createRatioValue, // Comparison ratio
  createDimensionValue, // Dimension value
  createProportion, // Proportion
  createTimeDesc, // Time description
  createTrendDesc, // Trend description
} from '@antv/t8';
```

### Preset Entity Plugin Configuration

Each entity plugin factory function accepts two parameters:

1. `descriptor`: Descriptor object for defining entity styles and behaviors
2. `mode`: Merge mode, either 'merge' (default) or 'overwrite'

```ts
const metricValuePlugin = createMetricValue(
  {
    // Style encoding
    style: (value, metadata, themeSeedToken) => ({
      color: metadata.assessment === 'positive' ? themeSeedToken.colorPositive : themeSeedToken.colorNegative,
      fontSize: themeSeedToken.fontSize,
    }),
    // Tooltip
    tooltip: (value, metadata) => ({
      title: metadata.description,
    }),
    // Event handling
    onClick: (value, metadata) => {
      console.log('Clicked:', value, metadata);
    },
  },
  'merge',
);
```

### Practical Example

Here's a complete example showing how to customize the display of metric values and comparison values:

```tsx
import { createMetricValue, Text } from '@antv/t8';

const metricValuePlugin = createMetricValue({
  style: (value, metadata, themeSeedToken) => ({
    color: themeSeedToken.colorPrimary,
    fontWeight: 600,
  }),
});

// Use plugin manager
const text = new Text('#container');
text.registerPlugin(metricValuePlugin);
```

## Custom Phrase Plugins (CustomPhrase)

When predefined entity types cannot meet your needs, you can use custom phrase plugins to create new phrase types.

### Creating Custom Phrases

Use `createCustomPhraseFactory` to create custom phrase plugins:

```ts
import { createCustomPhraseFactory } from '@antv/t8';

const customPhrasePlugin = createCustomPhraseFactory({
  // Unique identifier
  key: 'custom-type',
  // Custom render content
  render: (value, metadata) => {
    const element = document.createElement('span');
    element.textContent = `${metadata.level}-${value}`;
    element.style.backgroundColor = '#f0f0f0';
    element.style.padding = '0 4px';
    return element;
  },
});
```

## Custom Block Plugins (CustomBlock)

Block plugins are used to customize paragraph and section-level displays, such as adding charts, custom layouts, etc.

### Creating Block Plugins

Use `createCustomBlockFactory` to create block plugins:

```ts
import { createCustomBlockFactory } from '@antv/t8';

const customBlockPlugin = createCustomBlockFactory({
  key: 'custom-block',
  // Custom class name
  className: 'custom-block-class',
  // Custom style
  style: {
    padding: '16px',
    backgroundColor: '#f0f0f0',
  },
  // Custom rendering
  render: (metadata) => {
    const container = document.createElement('div');
    container.textContent = 'Custom block content';
    return container;
  },
});
```
