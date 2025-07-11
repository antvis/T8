---
title: Advanced Usage
---

# Advanced Features of NarrativeTextVis

NarrativeTextVis has a plugin system that allows you to extend phrases and paragraphs by passing in custom plugins. This enables flexible implementation of various data text displays and interactions.

## Customizing Data Phrase Styles

While we provide default data phrase (EntityPhrase) styles as standards, businesses may need customization. You can simply instantiate the plugin and pass it to the component to customize the global style of similar data phrases. The following example demonstrates these modifications:

- Modified the default metric value color and added background color
- Changed the default delta value from plus/minus signs and ratio from up/down triangles to up/down arrows

For more API descriptions on customizing EntityPhrase, click [EntityPhrase](../../narrative/example/custom#custom-entity-phrase) to view.

```jsx
import React from 'react';
import {
  NarrativeTextVis,
  PluginManager,
  createMetricName,
  createRatioValue,
  createDeltaValue,
} from '@antv/narrative-text-vis';
import booking from '../packages/NarrativeTextVis/docs/mock/booking.json';

const plugins = [
  // Modify metric name display logic
  createMetricName({
    encoding: {
      bgColor: '#F8FAFC',
      color: '#424241',
      fontWeight: 600,
    },
    style: {
      padding: '0 6px',
    },
  }),
  createRatioValue({
    encoding: {
      // Modify default coloring
      color: (text, { assessment }) =>
        assessment === 'positive' ? '#f4664a' : assessment === 'negative' ? '#269075' : '',
      // Change ratio prefix to up/down arrows
      prefix: (text, { assessment }) => (assessment === 'positive' ? '↑' : assessment === 'negative' ? '↓' : ''),
    },
  }),
  createDeltaValue({
    encoding: {
      // Change delta value prefix to up/down arrows
      color: (text, { assessment }) =>
        assessment === 'positive' ? '#f4664a' : assessment === 'negative' ? '#269075' : '',
      // Modify default coloring
      prefix: (text, { assessment }) => (assessment === 'positive' ? '↑' : assessment === 'negative' ? '↓' : ''),
    },
  }),
];

const pluginManager = new PluginManager(plugins);

export default () => {
  return (
    <>
      <NarrativeTextVis spec={booking} pluginManager={pluginManager} />
    </>
  );
};
```

## Custom Phrase Extension Display and Interaction

Besides built-in EntityPhrases, you can extend more custom implementations through custom phrases. Click [CustomPhrase](../../narrative/example/custom#custom-phrase-node) to view examples and more usage. Through custom scenario type phrases, users can hover over corresponding scenarios to get details.

Custom phrases can also extend more useful text interactions to assist analysis. Click [Insight Analysis](../../narrative/example/interactive#insight-analysis) to view the demo.

## Custom Block Embedding Visualization Charts

In addition to phrase-level customization, block elements Section and Paragraph provide customization capabilities beyond their default supported types. This enables users to embed charts in text and implement basic chart-text interactions.

Click [Chart Linkage](../../narrative/example/interactive#chart-linkage) to view the demo, and [CustomBlock](../../narrative/example/custom#custom-block) for API usage details.
