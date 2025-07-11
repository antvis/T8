---
title: 基本样式与 API
---

## NarrativeTextVis

```jsx
import React from 'react';
import { NarrativeTextVis } from '@antv/narrative-text-vis';
import basicElements from './mock/basicElements.json';

export default () => <NarrativeTextVis spec={basicElements} />;
```

<API src="../src/NarrativeTextVis.tsx" hideTitle />

## Section

```jsx
import React from 'react';
import { Section } from '@antv/narrative-text-vis';
import basicElements from './mock/basicElements.json';

export default () => <Section spec={basicElements.sections[0]} />;
```

<API src="../src/section/index.tsx" hideTitle />

## Paragraph

```jsx
import React from 'react';
import { Paragraph } from '@antv/narrative-text-vis';
import basicElements from './mock/basicElements.json';

export default () => (
  <>
    <Paragraph
      spec={{
        type: 'heading3',
        phrases: [{ type: 'text', value: 'heading3' }],
      }}
    />
    <Paragraph
      spec={{
        type: 'normal',
        phrases: [
          { type: 'text', value: 'text with marks ' },
          { type: 'text', value: 'bold', bold: true },
          { type: 'text', value: ' ' },
          { type: 'text', value: 'italic', italic: true },
          { type: 'text', value: ' ' },
          { type: 'text', value: 'underline', underline: true },
        ],
      }}
    />
    <Paragraph spec={basicElements.sections[0].paragraphs[7]} />
  </>
);
```

<API src="../src/paragraph/index.tsx" hideTitle />

## Phrase

```jsx
import React from 'react';
import { Descriptions } from 'antd';
import { NarrativeTextVisProps, Phrase } from '@antv/narrative-text-vis';

export default () => (
  <div style={{ marginBottom: 48 }}>
    <Descriptions title="数据标记规范" bordered size="small">
      <Descriptions.Item label="指标名 (metric_name)">
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
      <Descriptions.Item label="指标值 (metric_value)">
        <Phrase
          spec={{
            type: 'entity',
            value: '90.1w',
            metadata: {
              entityType: 'metric_value',
              origin: 901632.11,
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="其他指标 (other_metric_value)">
        <Phrase
          spec={{
            type: 'entity',
            value: '30%',
            metadata: {
              entityType: 'other_metric_value',
              origin: 0.30012,
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="差值 (delta_value)">
        <Phrase
          spec={{
            type: 'entity',
            value: '100.33',
            metadata: {
              entityType: 'delta_value',
              assessment: 'positive',
              detail: ['120.12', '220.45'],
              origin: 100.33456,
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="比率 (ratio_value)">
        <Phrase
          spec={{
            type: 'entity',
            value: '30%',
            metadata: {
              entityType: 'ratio_value',
              assessment: 'negative',
              origin: 0.30012,
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="贡献度 (contribute_ratio)">
        <Phrase
          spec={{
            type: 'entity',
            value: '20%',
            metadata: {
              entityType: 'contribute_ratio',
              origin: 0.2000077,
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="趋势描述 (trend_desc)">
        <Phrase
          spec={{
            type: 'entity',
            value: 'periodic',
            metadata: {
              entityType: 'trend_desc',
              detail: [
                264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226,
                192,
              ],
            },
          }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="维度值 (dim_value)">
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
      <Descriptions.Item label="时间描述 (time_desc)">
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
      <Descriptions.Item label="占比 (proportion)">
        <Phrase
          spec={{
            type: 'entity',
            value: '30%',
            metadata: {
              entityType: 'proportion',
              origin: 0.30012,
            },
          }}
        />
      </Descriptions.Item>
    </Descriptions>
  </div>
);
```

<API src="../src/phrases/Phrase.tsx" hideTitle />

## 内联图表

```jsx
import React from 'react';
import { ProportionChart, SingleLineChart } from '@antv/narrative-text-vis';

export default () => {
  return (
    <div>
      <p>
        饼图
        <ProportionChart data={-0.1} />
        <ProportionChart data={0.1} />
        <ProportionChart data={0.6} />
        <ProportionChart data={0.9} />
        <ProportionChart data={1.2} />
      </p>
      <br />
      <p>
        折线图
        <SingleLineChart data={[1, 2, 6, 18, 24, 48]} />
        <SingleLineChart data={[1, 2, 10, 12, 35, 60, 38, 24]} />
        <SingleLineChart data={[52, 44, 42, 21, 15, 6]} />
        <SingleLineChart data={[10, 10, 10]} />
      </p>
    </div>
  );
};
```
