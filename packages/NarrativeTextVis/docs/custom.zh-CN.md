---
title: 自定义
order: 4
group:
  path: /example
  title: 使用示例
  order: 1
nav:
  title: 解读文本可视化
  path: /narrative
  order: 1
---

## 自定义 entity phrase 展示

通过引入各 entity 的 plugin 函数实例化 PluginManager 自定义 entity 样式和交互。

```jsx
import React from 'react';
import { NarrativeTextVis, PluginManager, createMetricName, createMetricValue, createRatioValue, createDeltaValue } from '@antv/narrative-text-vis';
import booking from './mock/booking.json';

const plugins = [
  // 修改指标名的显示逻辑
  createMetricName({
    encoding: {
      bgColor: '#F8FAFC',
      color: '#424241',
      fontWeight: 600,
    },
    style: {
      padding: '0 6px',
    }
  }),
  createRatioValue({
    encoding: {
      // 修改默认着色
      color: (text, { assessment }) => assessment === 'positive'? '#f4664a': assessment === 'negative'? '#269075' : '',
      // 修改比率左侧的标记为上下箭头
      prefix: (text, { assessment }) => assessment === 'positive'? '↑': assessment === 'negative'? '↓' : ''
    }
  }),
  createDeltaValue({
    encoding: {
      // 修改差值左侧的标记为上下箭头
      color: (text, { assessment }) => assessment === 'positive'? '#f4664a': assessment === 'negative'? '#269075' : '',
      // 修改默认着色
      prefix: (text, { assessment }) => assessment === 'positive'? '↑': assessment === 'negative'? '↓' : ''
    }
  })
]

const pluginManager = new PluginManager(plugins);


export default () => {
  return (
    <>
      <NarrativeTextVis spec={booking} pluginManager={pluginManager} />
    </>
  )
};
```

## 自定义 phrase 节点

使用 `createCustomPhraseFactory` 配置自定义短语插件。

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
          type: "normal", 
          phrases: [
            { type: "text", value: "场景建议排序" },
            { 
              type: "custom", 
              value: "场景A-xxx",  
              metadata: {
                customType: "scenes",
                level: 1,
                desc: "",
                owner: "张三",
                scenesType: "最佳情景",
              }
            },
            { 
              type: "custom", 
              value: "场景B-yyy",  
              metadata: {
                customType: "scenes",
                level: 2,
              }
            },
            { 
              type: "custom", 
              value: "场景C-zzz",  
              metadata: {
                customType: "scenes",
                level: 3,
              }
            },
          ]
        },
        {
          type: "bullets",
          isOrder: true,
          bullets: [
            {
              type: "bullet-item",
              phrases: [
                { type: "text", value: "从整体看，有" },
                { 
                  type: "custom", 
                  value: "1",  
                  metadata: {
                    customType: "anomaly",
                  }
                },
                { type: "text", value: "个异常指标" },
              ]
            },
            {
              type: "bullet-item",
              phrases: [
                { type: "text", value: "从" },
                { 
                  type: "entity", 
                  value: "公司数" 
                },
                { type: "text", value: "上看，" },
                { 
                  type: "custom", 
                  value: "场景B-yyy",  
                  metadata: {
                    customType: "scenes",
                    level: 2,
                  }
                },
                { 
                  type: "custom", 
                  value: "8.1",  
                  metadata: {
                    customType: "anomaly",
                  }
                },
                { type: "text", value: "低于标准，" },
                { 
                  type: "custom", 
                  value: "场景C-zzz",  
                  metadata: {
                    customType: "scenes",
                    level: 3,
                  }
                },
                { 
                  type: "custom", 
                  value: "9.3%",  
                  metadata: {
                    customType: "percent",
                  }
                },
                { type: "text", value: "表现良好" },
              ]
            }
          ]
        }
      ]
    }
  ]
}

const plugins = [
  // 修改指标名的显示逻辑
  createMetricName({
    encoding: {
      bgColor: '#F8FAFC',
      color: '#424241',
      fontWeight: 600,
    },
    style: {
      padding: '0 6px',
    }
  }),
  createCustomPhraseFactory({
    key: 'anomaly',
    style: {
      backgroundColor: '#FEF5EF',
      color: '#D80D0B',
      padding: '0px 6px',
      margin: '0 4px'
    }
  }),
  createCustomPhraseFactory({
    key: 'percent',
    style: {
      backgroundColor: '#E6F6FF',
      color: '#2695FF',
      padding: '0px 6px',
      margin: '0 4px'
    }
  }),
  createCustomPhraseFactory({
    key: 'scenes',
    overwrite: (node, value, metadata) => {
      const content = (
        <span style={{
          margin: '0 2px',
          padding: '0px 6px',
          backgroundColor: '#F8F9F2'
        }}>
          {metadata?.level} {value}
        </span>
      )
      if (metadata?.scenesType) {
        return <Tooltip title={metadata?.scenesType}>{content}</Tooltip>
      }
      return content;
    }
  })
]

const pluginManager = new PluginManager(plugins);


export default () => {
  return (
    <>
      <NarrativeTextVis spec={textSpec} pluginManager={pluginManager} />
    </>
  )
};
```

## 自定义区块

使用 `createCustomBlockFactory` 配置自定义区块插件。

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
}

const LineChart = ({ config }) => {
  const container = useRef();
  useEffect(() => {
    if (container.current) {
      const line = new Line(container.current, config);
      line.render();
    }
  }, [config])
  return <div ref={container}></div>
}

const pluginManager = new PluginManager([
  createCustomBlockFactory({
    key: 'line',
    render(metadata) {
      if (metadata?.value) return <LineChart config={metadata.value}></LineChart>;
      return null;
    }
  })
]);

export default () => {
  return (
    <NarrativeTextVis spec={textSpec} pluginManager={pluginManager} />
  );
};
```
