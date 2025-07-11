---
title: Customization
---

# Customization

The narrative text visualization system has a default text style encoding specification, but if you need to customize styles or interactions in your business, you can easily achieve this through the plugin system.

## Customizing Entity Phrase Display

Entity phrases standardize common phrases in narrative text that need special style encoding, such as metric names, metric values, comparison deltas, comparison ratios, etc. The default styles and names can be found in [Phrase Basic Styles](./style#phrase). You can customize entity styles and interactions by instantiating a PluginManager with entity plugin functions.

Taking metric values as an example, you can pass the plugin manager to various narrative components (`<NarrativeTextVis />`, `<Section />`, `<Paragraph />`, and `<Phrase />`) after instantiating it with `pluginManager` and `createMetricValue`.

```jsx | pure
import { PluginManager, createMetricValue } from '@antv/narrative-text-vis';
const plugins = [
  createMetricName({
    encoding: {
      bgColor: '#F8FAFC',
      color: '#424241',
      fontWeight: 600,
    },
  }),
];
const pluginManager = new PluginManager(plugins);
```

- Other entity plugin generation functions similar to `createMetricValue` can be found using the same naming rule with entityType, `create{entityType}`;
- For each entity generation function parameter, taking createMetricName as an example, `createMetricName(descriptor: EntityPhraseDescriptor, mode: 'overwrite' | 'merge')`, the first parameter is used to describe node data mapping rules, with specific types as follows, and the second parameter `mode` indicates whether to `overwrite` default behavior or `merge` with default behavior, defaulting to `merge`.

```ts | pure
interface EntityPhraseDescriptor {
  /** Entity node encoding, most data-driven static text can be described by defining encoding */
  encoding?: EntityEncoding<ReactNode>;
  /** Content, defaults to value */
  content?: (value: string, metadata: EntityMetaData) => ReactNode;
  /** Class name list */
  classNames?: string[] | ((value: string, metadata: EntityMetaData) => string[]);
  /** Style */
  style?: CSSProperties | ((value: string, metadata: EntityMetaData) => CSSProperties);
  /** Hover event */
  onHover?: (value: string, metadata: EntityMetaData) => string;
  /** Click event */
  onClick?: (value: string, metadata: EntityMetaData) => string;
  /** Get plain text callback function, used for export module, can be unspecified, defaults to text */
  getText?: (value: string, metadata: EntityMetaData) => string;
  /**
   * Override node form, highest priority
   * @param node Default node, can be extended based on this
   * @param value PhraseSpec['value']
   * @param metadata PhraseSpec['metadata']
   */
  overwrite?: (node: ReactNode, value: string, metadata: EntityMetaData) => ReactNode;
}

type TypeOrMetaReturnType<T> = T | ((value: string, metadata: EntityMetaData) => T);
type EntityEncoding<NodeType> = Partial<{
  color: TypeOrMetaReturnType<string>;
  bgColor: TypeOrMetaReturnType<string>;
  fontSize: TypeOrMetaReturnType<string | number>;
  fontWeight: TypeOrMetaReturnType<string | number>;
  underline: TypeOrMetaReturnType<boolean>;
  /** Prefix, such as positive/negative sign logic before comparison delta/ratio */
  prefix: TypeOrMetaReturnType<NodeType>;
  /** Suffix */
  suffix: TypeOrMetaReturnType<NodeType>;
  inlineChart: TypeOrMetaReturnType<NodeType>;
}>;
```

Q: What's the difference between overwrite and content? How should they be defined?

A: We standardize the entity node encoding structure as shown in the figure below. It is recommended to complete mapping specification through specific positions. Overwrite is usually used to complete content that cannot be described by specified positions, such as tooltips. Since both content and overwrite can return ReactNode, you can freely choose the appropriate way to describe phrases.
![EntityPhrase Structure](https://gw.alipayobjects.com/mdn/rms_fabca5/afts/img/A*ZuuOSovBOjQAAAAAAAAAAAAAARQnAQ)

Below is an example that changes the style of metric names and the default display of comparison deltas and ratios through plugins.

```jsx
import React from 'react';
import {
  NarrativeTextVis,
  PluginManager,
  createMetricName,
  createRatioValue,
  createDeltaValue,
} from '@antv/narrative-text-vis';
import booking from './mock/booking.json';

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
      // Change ratio left marker to up/down arrows
      prefix: (text, { assessment }) => (assessment === 'positive' ? '↑' : assessment === 'negative' ? '↓' : ''),
    },
  }),
  createDeltaValue({
    encoding: {
      // Change delta left marker to up/down arrows
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

## Customizing Custom Phrase Nodes

If your system's phrase types exceed the entityType specification range, you can declare CustomPhrase and use `createCustomPhraseFactory` to configure custom phrases, freely extending phrase types and interactions.

```ts | pure
// MetaData passes in custom node metadata information corresponding to CustomPhrase's metadata structure
type CreateCustomPhraseFactory = <MetaData extends CustomBlockElement>(
  descriptor: CustomPhraseDescriptor<MetaData>,
) => PhraseDescriptor<MetaData>;

interface CustomPhraseDescriptor<MetaData> {
  /** Unique identifier key is required, same key will be overwritten by later ones */
  key: string;
  /** Content, defaults to value */
  content?: (value: string, metadata: MetaData) => ReactNode;
  /** Class name list */
  classNames?: string[] | ((value: string, metadata: MetaData) => string[]);
  /** Style */
  style?: CSSProperties | ((value: string, metadata: MetaData) => CSSProperties);
  /** Hover event */
  onHover?: (value: string, metadata: MetaData) => string;
  /** Click event */
  onClick?: (value: string, metadata: MetaData) => string;
  /** Get plain text callback function, used for export module, can be unspecified, defaults to text */
  getText?: (value: string, metadata: MetaData) => string;
  /**
   * Override node form, highest priority
   * @param node Default node, can be extended based on this
   * @param value PhraseSpec['value']
   * @param metadata PhraseSpec['metadata']
   */
  overwrite?: (node: ReactNode, value: string, metadata: MetaData) => ReactNode;
}
```

A simple TypeScript type example:

```ts | pure
createCustomPhraseFactory<{ customType: string; level: number }>({
  key: 'level',
  content: (value, meta) => `${meta.level}-${value}`,
});
```

Custom scenario type description:

```jsx
import React from 'react';
import { Tooltip } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { NarrativeTextVis, PluginManager, createMetricName, createCustomPhraseFactory } from '@antv/narrative-text-vis';

const textSpec = {
  sections: [
    {
      paragraphs: [
        {
          type: 'normal',
          phrases: [
            { type: 'text', value: 'Scenario suggestion sorting' },
            {
              type: 'custom',
              value: 'Scenario A-xxx',
              metadata: {
                customType: 'scenes',
                level: 1,
                desc: '',
                owner: 'John',
                scenesType: 'Best scenario',
              },
            },
            {
              type: 'custom',
              value: 'Scenario B-yyy',
              metadata: {
                customType: 'scenes',
                level: 2,
              },
            },
            {
              type: 'custom',
              value: 'Scenario C-zzz',
              metadata: {
                customType: 'scenes',
                level: 3,
              },
            },
          ],
        },
        {
          type: 'bullets',
          isOrder: true,
          bullets: [
            {
              type: 'bullet-item',
              phrases: [
                { type: 'text', value: 'Overall, there are ' },
                {
                  type: 'custom',
                  value: '1',
                  metadata: {
                    customType: 'anomaly',
                  },
                },
                { type: 'text', value: ' anomalous metrics' },
              ],
            },
            {
              type: 'bullet-item',
              phrases: [{ type: 'text', value: 'From ' }],
            },
          ],
        },
      ],
    },
  ],
};

const pluginManager = new PluginManager([
  createCustomPhraseFactory({
    key: 'scenes',
    overwrite: (node, value, metadata) => {
      const { level, desc, owner, scenesType } = metadata;
      return (
        <Tooltip
          title={
            <div>
              <div>Level: {level}</div>
              <div>Description: {desc || 'No description'}</div>
              <div>Owner: {owner || 'Unassigned'}</div>
              <div>Type: {scenesType || 'Unknown'}</div>
            </div>
          }
        >
          <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>{value}</span>
        </Tooltip>
      );
    },
  }),
  createCustomPhraseFactory({
    key: 'anomaly',
    content: (value) => (
      <span style={{ color: '#f5222d', fontWeight: 'bold' }}>
        {value} <HeartOutlined />
      </span>
    ),
  }),
]);

export default () => {
  return <NarrativeTextVis spec={textSpec} pluginManager={pluginManager} />;
};
```

## Customizing Custom Blocks

In addition to phrase levels, fast-level elements such as section, paragraph, may also need to be customized and extended. You can use `createCustomBlockFactory` to configure custom block plugins.

```ts | pure
type CreateCustomBlockFactory = <MetaData>(descriptor: BlockDescriptor<MetaData>) => BlockDescriptor<MetaData>;
interface BlockDescriptor<MetaData> {
  key: string;
  className?: string | ((metadata: MetaData) => string);
  style?: CSSProperties | ((metadata: MetaData) => CSSProperties);
  /** Custom render behavior */
  render?: (metadata: MetaData) => ReactNode;
  /** Get plain text callback function, used for export module */
  getText?: (metadata: MetaData) => string;
}
```

The following example customizes the chart display block.

```jsx
import React, { useRef, useEffect } from 'react';
import { Line } from '@antv/g2plot';
import { NarrativeTextVis, PluginManager, createCustomBlockFactory } from '@antv/narrative-text-vis';

const SALES_BY_AREA = [
  { month: '2020-01', value: 2681567, count: 1 },
  { month: '2020-02', value: 4137415, count: 1234 },
  { month: '2020-03', value: 4684506 },
  { month: '2020-04', value: 2447301 },
  { month: '2020-05', value: 815039 },
  { month: '2020-06', value: 1303124 },
];

const textSpec = {
  sections: [
    {
      paragraphs: [
        {
          type: 'normal',
          phrases: [
            { type: 'entity', value: '销量', metadata: { entityType: 'metric_name' } },
            { type: 'text', value: ' ' },
            { type: 'entity', value: '1.23亿', metadata: { entityType: 'metric_value' } },
            { type: 'text', value: '，环比昨日' },
            {
              type: 'entity',
              value: '50万',
              metadata: { entityType: 'delta_value', assessment: 'positive' },
            },
            { type: 'text', value: '。' },
          ],
          styles: {
            marginBottom: 24,
          },
        },
        {
          customType: 'line',
          value: {
            data: SALES_BY_AREA,
            padding: 'auto',
            xField: 'month',
            yField: 'value',
          },
        },
      ],
    },
  ],
};

const LineChart = ({ config }) => {
  const container = useRef();
  useEffect(() => {
    if (container.current) {
      const line = new Line(container.current, config);
      line.render();
    }
  }, [config]);
  return <div ref={container}></div>;
};

const pluginManager = new PluginManager([
  createCustomBlockFactory({
    key: 'line',
    render(metadata) {
      if (metadata?.value) return <LineChart config={metadata.value}></LineChart>;
      return null;
    },
  }),
]);

export default () => {
  return <NarrativeTextVis spec={textSpec} pluginManager={pluginManager} />;
};
```
