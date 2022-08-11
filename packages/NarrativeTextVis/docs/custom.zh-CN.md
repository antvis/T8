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
  order: 2
---

解读文本有一套默认的文本样式编码规范，但是如果你的业务中需要自定义样式、自定义交互也可以通过插件体系轻松实现。

## 自定义实体短语（EntityPhrase）展示

entity 短语规范了解读文本常见需要进行特殊样式编码的短语，如指标名、指标值、对比差值、对比差率等，默认样式及名称见 [Phrase 基本样式](./style#phrase)。通过引入各 entity 的 plugin 函数实例化 PluginManager 自定义 entity 样式和交互。

以指标值为例，通过引入 `pluginManager` 和 `createMetricValue` 实例出 plugin manager 后即可传入各级解读 `<NarrativeTextVis />`、`<Section />`、`<Paragraph />`和`<Phrase />`。

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

- 类似 `createMetricValue` 的其他 entity 插件生成函数可通过 entityType 相同的命名规则找到，`create{entityType}`;
- 每个 entity 生成函数参数，以 createMetricName 为例，`createMetricName(descriptor: EntityPhraseDescriptor, mode: 'overwrite' | 'merge')`，第一个参数用与描述节点数据映射规则，具体类型如下，第二个参数 `mode` 表示 `overwrite` 覆盖默认行为或者 `merge` 合并默认表现，默认是 `merge`。

```ts | pure
interface EntityPhraseDescriptor {
  /** entity 节点 encoding，大多数时候数据驱动静态文本都可以通过定义 encoding 描述完成 */
  encoding?: EntityEncoding<ReactNode>;
  /** 内容，默认是 value */
  content?: (value: string, metadata: EntityMetaData) => ReactNode;
  /** class name 列表 */
  classNames?: string[] | ((value: string, metadata: EntityMetaData) => string[]);
  /** 样式 */
  style?: CSSProperties | ((value: string, metadata: EntityMetaData) => CSSProperties);
  /** hover 事件 */
  onHover?: (value: string, metadata: EntityMetaData) => string;
  /** click 事件 */
  onClick?: (value: string, metadata: EntityMetaData) => string;
  /** 获取纯文本回调函数，用于导出模块，可不指定，默认是 text */
  getText?: (value: string, metadata: EntityMetaData) => string;
  /**
   * 覆盖节点形式，最高优先级
   * @param node 默认节点，可以基于此进行扩展
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
    /** 前缀，比如对比差值、对比差率前面的正负号逻辑 */
    prefix: TypeOrMetaReturnType<NodeType>;
    /** 后缀 */
    suffix: TypeOrMetaReturnType<NodeType>;
    inlineChart: TypeOrMetaReturnType<NodeType>;
}>;
```

Q：overwrite 和 content 有什么区别？应该怎么定义？

A：我们将实体节点 encoding 结构规范如下图，建议通过具体位置来完成映射制定，overwrite 通常是为了完成制定位置无法描述的内容，如 tooltip。由于 content 与 overwrite 都可以返回 ReactNode，您可以自由的选择合适的方式进行短语描述。
![EntityPhrase 结构](https://gw.alipayobjects.com/mdn/rms_fabca5/afts/img/A*ZuuOSovBOjQAAAAAAAAAAAAAARQnAQ)

下面是一个示例，通过插件改变了指标名的样式及对比差值和对比差率的默认展示方式。

```jsx
import React from 'react';
import { NarrativeTextVis, PluginManager, createMetricName, createRatioValue, createDeltaValue } from '@antv/narrative-text-vis';
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

## 自定义短语（CustomPhrase）节点

如果您的系统内短语类型超过 entityType 规范范围，可通过声明 CustomPhrase 并使用 `createCustomPhraseFactory` 配置自定义短语，自由扩展短语类型与交互。

```ts | pure
// MetaData 传入自定义节点 metadata 信息对应 CustomPhrase 的 metadata 结构
type CreateCustomPhraseFactory = <MetaData extends CustomMetaData>(descriptor: CustomPhraseDescriptor<MetaData>)=> PhraseDescriptor<MetaData>;

interface CustomPhraseDescriptor<MetaData> {
  /** 唯一标识 key 必传，相同的 key 前面的将被后面的覆盖 */
  key: string;
  /** 内容，默认是 value */
  content?: (value: string, metadata: MetaData) => ReactNode;
  /** class name 列表 */
  classNames?: string[] | ((value: string, metadata: MetaData) => string[]);
  /** 样式 */
  style?: CSSProperties | ((value: string, metadata: MetaData) => CSSProperties);
  /** hover 事件 */
  onHover?: (value: string, metadata: MetaData) => string;
  /** click 事件 */
  onClick?: (value: string, metadata: MetaData) => string;
  /** 获取纯文本回调函数，用于导出模块，可不指定，默认是 text */
  getText?: (value: string, metadata: MetaData) => string;
  /**
   * 覆盖节点形式，最高优先级
   * @param node 默认节点，可以基于此进行扩展
   * @param value PhraseSpec['value']
   * @param metadata PhraseSpec['metadata']
   */
  overwrite?: (node: ReactNode, value: string, metadata: MetaData) => ReactNode;
}
```

一个简单的 ts 类型示例：

```ts | pure
createCustomPhraseFactory<{ customType: string; level: number }>({
  key: 'level',
  content: (value, meta) => `${meta.level}-${value}`,
})
```

自定义场景类型描述

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
                  value: "公司数",
                  metadata: {
                    entityType: "metric_name",
                  }
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

## 自定义区块（CustomBlock）

除了短语级别，快级元素 section paragraph 也可能需要自定义扩展，可以使用 `createCustomBlockFactory` 配置自定义区块插件。

```ts | pure
type CreateCustomBlockFactory = <MetaData>(descriptor: BlockDescriptor<MetaData>) => BlockDescriptor<MetaData>;
interface BlockDescriptor<MetaData> {
  key: string;
  className?: string | ((metadata: MetaData) => string);
  style?: CSSProperties | ((metadata: MetaData) => CSSProperties);
  /** 自定义 render 行为 */
  render?: (metadata: MetaData) => ReactNode;
  /** 获取纯文本回调函数，用于导出模块 */
  getText?: (metadata: MetaData) => string;
}
```

下面的例子自定义扩展了图表展示区块。

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
