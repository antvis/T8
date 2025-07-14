---
title: Theme Configuration
order: 1
group:
  title: Advanced Usage
  order: 2
nav:
  title: Tutorial
  path: /tutorial
  order: 1
---

# Theme Configuration

T8 provides a flexible theme configuration system. You can use the `theme` method to set the text visualization theme style.

## Basic Usage

```ts
const text = new Text('#container');

// Use light theme
text.theme('light');

// Use dark theme
text.theme('dark');

// Custom theme configuration
text.theme('dark', {
  fontSize: 12,
  lineHeight: 20,
  // ... other configurations
});
```

::: my-sandbox {template=vanilla-ts}

```ts index.ts
import { Text } from '@antv/t8';
import spec from './example.json';

const app = document.getElementById('app');

app.style.background = 'black';

// Instantiate Text
const text = new Text(document.getElementById('app'));

// Specify visualization elements
text.schema(spec).theme('dark', { fontSize: 40 });

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

## Configuration Items

### Basic Configuration

Basic configuration items control the basic text styles:

| Configuration Item | Type   | Default Value            | Description      |
| ------------------ | ------ | ------------------------ | ---------------- |
| fontFamily         | string | 'PingFangSC, sans-serif' | Font family      |
| fontSize           | number | 14                       | Base font size   |
| lineHeight         | number | 24                       | Base line height |
| borderColor        | string | 'rgb(199, 199, 199)'     | Border color     |

### Heading Configuration

You can configure the size and line height of different heading levels through `fontSizeMultiples` and `lineHeightMultiples`:

```ts
{
  // Heading font size multipliers
  fontSizeMultiples: {
    h1: 2,      // 2 times base font size
    h2: 1.72,   // 1.72 times base font size
    h3: 1.4,    // 1.4 times base font size
    h4: 1.15,   // 1.15 times base font size
    h5: 1.08,   // 1.08 times base font size
    h6: 1.08,   // 1.08 times base font size
  },

  // Heading line height multipliers
  lineHeightMultiples: {
    h1: 1.5,    // 1.5 times base line height
    h2: 1.3,    // 1.3 times base line height
    h3: 1.15,   // 1.15 times base line height
    h4: 1,      // 1 times base line height
    h5: 1,      // 1 times base line height
    h6: 1,      // 1 times base line height
  }
}
```

### Color Configuration

T8 provides a complete set of preset colors for light and dark themes. Each theme includes the following color configurations:

| Configuration Item    | Description             | Light Theme         | Dark Theme                |
| --------------------- | ----------------------- | ------------------- | ------------------------- |
| colorBase             | Base text color         | rgba(0, 0, 0, 0.65) | rgba(255, 255, 255, 0.65) |
| colorEntityBase       | Entity base color       | rgba(0, 0, 0, 0.65) | rgba(255, 255, 255, 0.65) |
| colorHeadingBase      | Heading base color      | rgba(0, 0, 0, 0.85) | rgba(255, 255, 255, 0.85) |
| colorPositive         | Positive value color    | #FA541C             | #FA541C                   |
| colorNegative         | Negative value color    | #13A8A8             | #13A8A8                   |
| colorConclusion       | Conclusion color        | #1F0352             | #D8C3F3                   |
| colorDimensionValue   | Dimension value color   | rgba(0, 0, 0, 0.88) | rgba(255, 255, 255, 0.88) |
| colorMetricName       | Metric name color       | rgba(0, 0, 0, 0.88) | rgba(255, 255, 255, 0.88) |
| colorMetricValue      | Metric value color      | #1677FF             | #4B91FF                   |
| colorOtherValue       | Other value color       | rgba(0, 0, 0, 0.88) | rgba(255, 255, 255, 0.88) |
| colorProportionShadow | Proportion chart shadow | #CDDDFD             | #CDDDFD                   |
| colorProportionFill   | Proportion chart fill   | #3471F9             | #3471F9                   |
| colorLineStroke       | Line chart stroke       | #5B8FF9             | #5B8FF9                   |

## Theme Customization

### Overriding Preset Theme

You can override part of the configuration based on the preset theme:

```ts
text.theme('dark', {
  // Override basic configuration
  fontSize: 16,
  lineHeight: 28,

  // Override color configuration
  colorMetricValue: '#1890ff',
  colorPositive: '#52c41a',
  colorNegative: '#ff4d4f',

  // Override heading configuration
  fontSizeMultiples: {
    h1: 2.5,
    h2: 2,
    // ... other heading configurations
  },
});
```

### Complete Example

This is a complete example containing all configuration items:

```ts
text.theme('dark', {
  // Basic configuration
  fontFamily: 'PingFangSC, sans-serif',
  fontSize: 14,
  lineHeight: 24,
  borderColor: 'rgb(199, 199, 199)',

  // Heading size configuration
  fontSizeMultiples: {
    h1: 2,
    h2: 1.72,
    h3: 1.4,
    h4: 1.15,
    h5: 1.08,
    h6: 1.08,
  },

  // Heading line height configuration
  lineHeightMultiples: {
    h1: 1.5,
    h2: 1.3,
    h3: 1.15,
    h4: 1,
    h5: 1,
    h6: 1,
  },

  // Color configuration
  colorBase: 'rgba(255, 255, 255, 0.65)',
  colorEntityBase: 'rgba(255, 255, 255, 0.65)',
  colorHeadingBase: 'rgba(255, 255, 255, 0.85)',
  colorPositive: '#FA541C',
  colorNegative: '#13A8A8',
  colorConclusion: '#D8C3F3',
  colorDimensionValue: 'rgba(255, 255, 255, 0.88)',
  colorMetricName: 'rgba(255, 255, 255, 0.88)',
  colorMetricValue: '#4B91FF',
  colorOtherValue: 'rgba(255, 255, 255, 0.88)',
  colorProportionShadow: '#CDDDFD',
  colorProportionFill: '#3471F9',
  colorLineStroke: '#5B8FF9',
});
```
