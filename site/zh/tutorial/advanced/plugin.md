---
title: 插件系统
order: 2
group:
  title: 高级用法
  order: 2
nav:
  title: 教程
  path: /tutorial
  order: 1
---

# 插件系统

T8 提供了强大的插件系统，允许你自定义和扩展文本可视化的功能。插件系统主要包括三种类型的插件：

- 实体短语插件（EntityPhrase）：用于自定义指标名、指标值等预定义实体的展示
- 自定义短语插件（CustomPhrase）：用于扩展新的短语类型
- 自定义区块插件（CustomBlock）：用于自定义段落和章节级别的展示

## 插件管理器

所有插件都通过 `PluginManager` 进行统一管理。`PluginManager` 负责注册和管理不同类型的插件：

```ts
import { PluginManager } from '@antv/t8';

const plugin = /* create a plugin with factory function */

// 使用插件管理器
const text = new Text('#container');
text.registerPlugin(plugin);
```

## 实体短语插件（EntityPhrase）

实体短语插件用于自定义预定义实体的展示样式和交互行为。T8 内置了一系列实体类型，每个实体类型都有对应的工厂函数来创建插件。

### 预设实体插件

```ts
import {
  createMetricName, // 指标名称
  createMetricValue, // 指标值
  createDeltaValue, // 对比差值
  createRatioValue, // 对比差率
  createDimensionValue, // 维度值
  createProportion, // 占比
  createTimeDesc, // 时间描述
  createTrendDesc, // 趋势描述
} from '@antv/t8';
```

### 预设实体插件配置

每个实体插件工厂函数接收两个参数：

1. `descriptor`: 描述器对象，用于定义实体的样式和行为
2. `mode`: 合并模式，可选 'merge'（默认）或 'overwrite'

```ts
import { createDimensionValue } from '@antv/t8';

const dimensionValueDescriptor = {
  // 样式编码
  style: (value, metadata, themeSeedToken) => ({
    color: 'red',
    fontSize: '40px',
  }),
  // 工具提示
  tooltip: {
    title: (value) => value,
  },
  // 事件处理
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
  // 样式编码
  style: (value, metadata, themeSeedToken) => ({
    color: 'red',
    fontSize: '40px',
  }),
  // 工具提示
  tooltip: {
    title: (value) => value,
  },
  // 事件处理
  onClick: (value, metadata) => {
    console.log('Clicked:', value, metadata);
  },
};

const dimensionPlugin = createDimensionValue(dimensionValueDescriptor, 'overwrite');

// 实例化 Text
const text = new Text(document.getElementById('app'));

// 指定可视化元素
text.schema(spec).theme('light', { fontSize: 20 });

text.registerPlugin(dimensionPlugin);

// 渲染
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

## 自定义短语插件（CustomPhrase）

当预定义的实体类型无法满足需求时，你可以使用自定义短语插件来创建新的短语类型。

### 创建自定义短语

使用 `createCustomPhraseFactory` 来创建自定义短语插件：

```ts
import { createCustomPhraseFactory } from '@antv/t8';

const customPhrasePlugin = createCustomPhraseFactory({
  // 唯一标识符
  key: 'custom_type',
  // 自定义渲染内容
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
  // 唯一标识符
  key: 'custom_type',
  // 自定义渲染内容
  render: (value, metadata) => {
    const element = document.createElement('span');
    element.textContent = `${metadata.level}-${value}`;
    element.style.backgroundColor = '#f0f0f0';
    element.style.color = 'red';
    element.style.padding = '0 4px';
    return element;
  },
});

// 实例化 Text
const text = new Text(document.getElementById('app'));

// 指定可视化元素
text.schema(spec).theme('light', { fontSize: 20 });

text.registerPlugin(customPhrasePlugin);

// 渲染
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

## 自定义区块插件（CustomBlock）

区块插件用于自定义段落和章节级别的展示，比如添加图表、自定义布局等。

### 创建区块插件

使用 `createCustomBlockFactory` 来创建区块插件：

```ts
import { createCustomBlockFactory } from '@antv/t8';

const customBlockPlugin = createCustomBlockFactory({
  key: 'custom-block',
  // 自定义类名
  className: 'custom-block-class',

  // 自定义样式
  style: {
    padding: '16px',
    backgroundColor: '#f0f0f0',
  },
  // 自定义渲染
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
  // 自定义类名
  className: 'custom-block-class',

  // 自定义样式
  style: {
    padding: '16px',
    backgroundColor: '#f0f0f0',
  },
  // 自定义渲染
  render: (metadata) => {
    const container = document.createElement('div');
    container.style.color = 'red';
    container.style.backgroundColor = 'green';
    container.style.fontSize = '40px';
    container.textContent = 'This is custom Block';
    return container;
  },
});

// 实例化 Text
const text = new Text(document.getElementById('app'));

// 指定可视化元素
text.schema(spec).theme('light', { fontSize: 20 });

text.registerPlugin(customBlockPlugin);

// 渲染
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
