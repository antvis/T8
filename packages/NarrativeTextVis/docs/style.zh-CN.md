---
title: 基本样式
order: 1
group:
  path: /show
  title: 使用示例
  order: 0
nav:
  title: 解读文本可视化
  path: /narrative
  order: 1
---

## NarrativeTextVis

```jsx
import React from 'react';
import { NarrativeTextVis } from '@antv/narrative-text-vis';
import basicElements from './mock/basicElements.json';

export default () => <NarrativeTextVis spec={basicElements} />;
```

## Section

```jsx
import React from 'react';
import { Section } from '@antv/narrative-text-vis';
import basicElements from './mock/basicElements.json';

export default () => <Section spec={basicElements.sections[0]} />;
```

## Paragraph

```jsx
import React from 'react';
import { Paragraph } from '@antv/narrative-text-vis';
import basicElements from './mock/basicElements.json';

export default () => (
  <>
    <Paragraph 
      spec={{
        type: "heading3",
        phrases: [{ type: "text", value: "heading3" }]
      }} 
    />
    <Paragraph 
      spec={{
        type: "normal",
        phrases: [
          { type: "text", value: "text with marks " }, 
          { type: "text", value: "bold", bold: true }, 
          { type: "text", value: " " }, 
          { type: "text", value: "italic", italic: true },
          { type: "text", value: " " }, 
          { type: "text", value: "underline", underline: true },
        ]
      }} 
    />
    <Paragraph spec={basicElements.sections[0].paragraphs[7]} />
  </>
);
```

## Phrase

```jsx
import React from 'react';
import { Descriptions } from 'antd';
import { NarrativeTextVisProps, Phrase } from '@antv/narrative-text-vis';

export default () => (
  <div style={{ marginBottom: 48 }}>
    <Descriptions title="Data marking specification" bordered size="small">
      <Descriptions.Item label="Metric Name">
        <Phrase
          spec={{
            type: 'entity',
            value: 'DAU',
            metadata: {
              entityType: 'metric_name',
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Metric Value">
        <Phrase
          spec={{
            type: 'entity',
            value: '901632.11',
            metadata: {
              entityType: 'metric_value',
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Other Metric Value">
        <Phrase
          spec={{
            type: 'entity',
            value: '30%',
            metadata: {
              entityType: 'other_metric_value',
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Delta Value">
        <Phrase
          spec={{
            type: 'entity',
            value: '100.33',
            metadata: {
              entityType: 'delta_value',
              assessment: 'positive',
              detail: ['120.12', '220.45'],
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Ratio Value">
        <Phrase
          spec={{
            type: 'entity',
            value: '30%',
            metadata: {
              entityType: 'ratio_value',
              assessment: 'negative',
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Contribution">
        <Phrase
          spec={{
            type: 'entity',
            value: '20%',
            metadata: {
              entityType: 'contribute_ratio',
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Trend Description">
        <Phrase
          spec={{
            type: 'entity',
            value: 'periodic',
            metadata: {
              entityType: 'trend_desc',
              detail: [
                264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592,
                492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
              ],
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Drill Down Dimension">
        <Phrase
          spec={{
            type: 'entity',
            value: '北京',
            metadata: {
              entityType: 'dim_value',
              detail: {
                left: '城市',
                op: '=',
                right: '北京',
              },
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Time Description">
        <Phrase
          spec={{
            type: 'entity',
            value: '2021-10-11',
            metadata: {
              entityType: 'time_desc',
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Proportion">
        <Phrase
          spec={{
            type: 'entity',
            value: '30%',
            metadata: {
              entityType: 'proportion',
            },
          }}
        />
      </Descriptions.Item>
    </Descriptions>
  </div>
)
```
