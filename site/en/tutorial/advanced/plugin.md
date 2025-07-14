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

- Entity Phrase Plugins (EntityPhrase): Used to customize the display of predefined entities such as metric names, metric values, etc.
- Custom Phrase Plugins (CustomPhrase): Used to extend new phrase types
- Custom Block Plugins (CustomBlock): Used to customize paragraph and section level displays

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

Entity phrase plugins are used to customize the display style and interaction behavior of predefined entities. T8 has built-in a series of entity types, and each entity type has a corresponding factory function to create plugins.

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
2. `mode`: Merge mode, can be 'merge' (default) or 'overwrite'

```ts
import { createDimensionValue } from '@antv/t8';

const dimensionValueDescriptor = {
  // Style encoding
  style: (value, metadata, themeSeedToken) => ({
    color: 'red',
    fontSize: '40px',
  }),
  // Tooltip
  tooltip: {
    title: (value) => value,
  },
  // Event handling
  onClick: (value, metadata) => {
    console.log('Clicked:', value, metadata);
  },
};

const dimensionPlugin = createDimensionValue(dimensionValueDescriptor, 'overwrite');
```

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text, createDimensionValue } from '@antv/t8';
import spec from './example.json';

const app = document.getElementById('app');

const dimensionValueDescriptor = {
  // Style encoding
  style: (value, metadata, themeSeedToken) => ({
    color: 'red',
    fontSize: '40px',
  }),
  // Tooltip
  tooltip: {
    title: (value) => value,
  },
  // Event handling
  onClick: (value, metadata) => {
    console.log('Clicked:', value, metadata);
  },
};

const dimensionPlugin = createDimensionValue(dimensionValueDescriptor, 'overwrite');

// Instantiate Text
const text = new Text(document.getElementById('app'));

// Specify visualization elements
text.schema(spec).theme('light', { fontSize: 20 });

text.registerPlugin(dimensionPlugin);

// Render
text.render();
```

```json example.json
{
  "sections": [
    {
      "key": "insight",
      "paragraphs": [
        {
          "type": "normal",
          "phrases": [
            {
              "type": "text",
              "value": "The "
            },
            {
              "type": "entity",
              "value": "average deal size",
              "metadata": {
                "entityType": "dim_value"
              }
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$12k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": "is down "
            },
            {
              "type": "entity",
              "value": "$2k",
              "metadata": {
                "entityType": "delta_value",
                "assessment": "negative"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "relative to the same time last quarter"
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$14k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": ". "
            }
          ]
        }
      ]
    }
  ]
}
```

:::

## Custom Phrase Plugins (CustomPhrase)

Use `createCustomPhraseFactory` to create custom phrase plugins:

```ts
import { createCustomPhraseFactory } from '@antv/t8';

const customPhrasePlugin = createCustomPhraseFactory({
  // Unique identifier
  key: 'custom_type',
  // Custom render content
  render: (value, metadata) => {
    const element = document.createElement('span');
    element.textContent = `${metadata.level}-${value}`;
    element.style.backgroundColor = '#f0f0f0';
    element.style.color = 'red';
    element.style.padding = '0 4px';
    return element;
  },
});
```

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text, createCustomPhraseFactory } from '@antv/t8';
import spec from './example.json';

const app = document.getElementById('app');

const customPhrasePlugin = createCustomPhraseFactory({
  // Unique identifier
  key: 'custom_type',
  // Custom render content
  render: (value, metadata) => {
    const element = document.createElement('span');
    element.textContent = `${metadata.level}-${value}`;
    element.style.backgroundColor = '#f0f0f0';
    element.style.color = 'red';
    element.style.padding = '0 4px';
    return element;
  },
});

// Instantiate Text
const text = new Text(document.getElementById('app'));

// Specify visualization elements
text.schema(spec).theme('light', { fontSize: 20 });

text.registerPlugin(customPhrasePlugin);

// Render
text.render();
```

```json example.json
{
  "sections": [
    {
      "key": "insight",
      "paragraphs": [
        {
          "type": "normal",
          "phrases": [
            {
              "type": "text",
              "value": "The "
            },
            {
              "type": "custom",
              "value": "average deal size",
              "metadata": {
                "level": 1,
                "customType": "custom_type"
              }
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$12k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": "is down "
            },
            {
              "type": "entity",
              "value": "$2k",
              "metadata": {
                "entityType": "delta_value",
                "assessment": "negative"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "relative to the same time last quarter"
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$14k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": ". "
            }
          ]
        }
      ]
    }
  ]
}
```

:::

## Custom Block Plugins (CustomBlock)

Block plugins are used to customize paragraph and section level displays, such as adding charts, custom layouts, etc.

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
    container.style.color = 'red';
    container.style.backgroundColor = 'green';
    container.style.fontSize = '40px';
    container.textContent = 'This is custom Block';
    return container;
  },
});
```

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text, createCustomBlockFactory } from '@antv/t8';
import spec from './example.json';

const app = document.getElementById('app');

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
    container.style.color = 'red';
    container.style.backgroundColor = 'green';
    container.style.fontSize = '40px';
    container.textContent = 'This is custom Block';
    return container;
  },
});

// Instantiate Text
const text = new Text(document.getElementById('app'));

// Specify visualization elements
text.schema(spec).theme('light', { fontSize: 20 });

text.registerPlugin(customBlockPlugin);

// Render
text.render();
```

```json example.json
{
  "sections": [
    {
      "customType": "custom-block"
    },
    {
      "key": "insight",
      "paragraphs": [
        {
          "type": "normal",
          "phrases": [
            {
              "type": "text",
              "value": "The "
            },
            {
              "type": "entity",
              "value": "average deal size",
              "metadata": {
                "entityType": "metric_name"
              }
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$12k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": "is down "
            },
            {
              "type": "entity",
              "value": "$2k",
              "metadata": {
                "entityType": "delta_value",
                "assessment": "negative"
              }
            },
            {
              "type": "text",
              "value": " "
            },
            {
              "type": "text",
              "value": "relative to the same time last quarter"
            },
            {
              "type": "text",
              "value": " ("
            },
            {
              "type": "entity",
              "value": "$14k",
              "metadata": {
                "entityType": "metric_value"
              }
            },
            {
              "type": "text",
              "value": ") "
            },
            {
              "type": "text",
              "value": ". "
            }
          ]
        }
      ]
    }
  ]
}
```

:::
