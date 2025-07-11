---
title: Theme Configuration
---

# Theme Configuration

T8 provides a flexible theme system that allows you to customize the appearance of your narrative text visualization. You can configure fonts, colors, and other visual properties through the theme system.

## Basic Usage

```ts
import { NarrativeTextVis } from '@antv/narrative-text-vis';

// Use light theme (default)
<NarrativeTextVis theme="light" />

// Use dark theme
<NarrativeTextVis theme="dark" />

// Use custom theme
<NarrativeTextVis theme={{
  fontSize: 14,
  lineHeight: 24,
  fontFamily: 'Arial, sans-serif',
  // ... other theme options
}} />
```

## Theme Options

The theme configuration accepts the following options:

### Font Settings

| Property     | Type     | Description                | Default                    |
| ------------ | -------- | -------------------------- | -------------------------- |
| `fontSize`   | `number` | Base font size in pixels   | `14`                       |
| `lineHeight` | `number` | Base line height in pixels | `24`                       |
| `fontFamily` | `string` | Font family for text       | `'PingFangSC, sans-serif'` |

### Heading Size Multipliers

You can configure the size multipliers for different heading levels:

```ts
{
  fontSizeMultiples: {
    h1: 2,     // 2x base font size
    h2: 1.72,  // 1.72x base font size
    h3: 1.4,   // 1.4x base font size
    h4: 1.15,  // 1.15x base font size
    h5: 1.08,  // 1.08x base font size
    h6: 1.08   // 1.08x base font size
  },
  lineHeightMultiples: {
    h1: 1.5,   // 1.5x base line height
    h2: 1.3,   // 1.3x base line height
    h3: 1.15,  // 1.15x base line height
    h4: 1,     // 1x base line height
    h5: 1,     // 1x base line height
    h6: 1      // 1x base line height
  }
}
```

### Colors

The theme system provides two preset color schemes: light and dark. Here are the color options you can customize:

| Property                | Light Theme           | Dark Theme                  | Description                        |
| ----------------------- | --------------------- | --------------------------- | ---------------------------------- |
| `colorBase`             | `rgba(0, 0, 0, 0.65)` | `rgba(255, 255, 255, 0.65)` | Base text color                    |
| `colorEntityBase`       | `rgba(0, 0, 0, 0.65)` | `rgba(255, 255, 255, 0.65)` | Base color for entities            |
| `colorHeadingBase`      | `rgba(0, 0, 0, 0.85)` | `rgba(255, 255, 255, 0.85)` | Base color for headings            |
| `colorPositive`         | `#FA541C`             | `#FA541C`                   | Color for positive values          |
| `colorNegative`         | `#13A8A8`             | `#13A8A8`                   | Color for negative values          |
| `colorConclusion`       | `#1F0352`             | `#D8C3F3`                   | Color for conclusions              |
| `colorDimensionValue`   | `rgba(0, 0, 0, 0.88)` | `rgba(255, 255, 255, 0.88)` | Color for dimension values         |
| `colorMetricName`       | `rgba(0, 0, 0, 0.88)` | `rgba(255, 255, 255, 0.88)` | Color for metric names             |
| `colorMetricValue`      | `#1677FF`             | `#4B91FF`                   | Color for metric values            |
| `colorOtherValue`       | `rgba(0, 0, 0, 0.88)` | `rgba(255, 255, 255, 0.88)` | Color for other values             |
| `colorProportionShadow` | `#CDDDFD`             | `#CDDDFD`                   | Shadow color for proportion charts |
| `colorProportionFill`   | `#3471F9`             | `#3471F9`                   | Fill color for proportion charts   |
| `colorLineStroke`       | `#5B8FF9`             | `#5B8FF9`                   | Stroke color for line charts       |

## Custom Theme Example

Here's an example of creating a custom theme with your own colors and fonts:

```ts
const customTheme = {
  // Font settings
  fontSize: 16,
  lineHeight: 28,
  fontFamily: 'Arial, Helvetica, sans-serif',

  // Heading multipliers
  fontSizeMultiples: {
    h1: 2.5,
    h2: 2,
    h3: 1.5,
    h4: 1.2,
    h5: 1.1,
    h6: 1
  },

  // Custom colors
  colorBase: '#333333',
  colorEntityBase: '#444444',
  colorHeadingBase: '#222222',
  colorPositive: '#28a745',
  colorNegative: '#dc3545',
  colorConclusion: '#6610f2',
  colorDimensionValue: '#495057',
  colorMetricName: '#212529',
  colorMetricValue: '#0d6efd',
  colorOtherValue: '#6c757d',
  colorProportionShadow: '#e9ecef',
  colorProportionFill: '#0d6efd',
  colorLineStroke: '#0d6efd'
};

// Apply custom theme
<NarrativeTextVis theme={customTheme} />
```
