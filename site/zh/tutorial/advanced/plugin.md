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
const metricValuePlugin = createMetricValue(
  {
    // 样式编码
    style: (value, metadata, themeSeedToken) => ({
      color: metadata.assessment === 'positive' ? themeSeedToken.colorPositive : themeSeedToken.colorNegative,
      fontSize: themeSeedToken.fontSize,
    }),
    // 工具提示
    tooltip: (value, metadata) => ({
      title: metadata.description,
    }),
    // 事件处理
    onClick: (value, metadata) => {
      console.log('Clicked:', value, metadata);
    },
  },
  'merge',
);
```

### 实际示例

下面是一个完整的示例，展示如何自定义指标值和对比值的展示：

```tsx
import { createMetricValue, Text } from '@antv/t8';

const metricValuePlugin = createMetricValue({
  style: (value, metadata, themeSeedToken) => ({
    color: themeSeedToken.colorPrimary,
    fontWeight: 600,
  }),
});

// 使用插件管理器
const text = new Text('#container');
text.registerPlugin(metricValuePlugin);
```

## 自定义短语插件（CustomPhrase）

当预定义的实体类型无法满足需求时，你可以使用自定义短语插件来创建新的短语类型。

### 创建自定义短语

使用 `createCustomPhraseFactory` 来创建自定义短语插件：

```ts
import { createCustomPhraseFactory } from '@antv/t8';

const customPhrasePlugin = createCustomPhraseFactory({
  // 唯一标识符
  key: 'custom-type',
  // 自定义渲染内容
  render: (value, metadata) => {
    const element = document.createElement('span');
    element.textContent = `${metadata.level}-${value}`;
    element.style.backgroundColor = '#f0f0f0';
    element.style.padding = '0 4px';
    return element;
  },
});
```

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
    container.textContent = '自定义区块内容';
    return container;
  },
});
```
